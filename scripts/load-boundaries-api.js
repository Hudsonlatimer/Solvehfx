// Load HRM district boundary polygons into Supabase via Management API
// Run with: node scripts/load-boundaries-api.js

const fs = require('fs');
const path = require('path');

// Read env
const envPath = path.join(__dirname, '..', '.env.local');
const env = {};
fs.readFileSync(envPath, 'utf8').split('\n').forEach(line => {
  const [key, ...rest] = line.split('=');
  if (key && rest.length) env[key.trim()] = rest.join('=').trim();
});

const SUPABASE_URL = env.NEXT_PUBLIC_SUPABASE_URL;
const SERVICE_KEY = env.SUPABASE_SERVICE_ROLE_KEY;

// Extract project ref from URL (e.g. "iuhrvlwzxebwydakyyee" from "https://iuhrvlwzxebwydakyyee.supabase.co")
const PROJECT_REF = SUPABASE_URL.match(/https:\/\/(.+)\.supabase\.co/)?.[1];

async function runSQL(sql) {
  // Use the PostgREST SQL execution via Supabase's direct postgres connection
  // We'll use the service role key with the /rest/v1/ endpoint
  // Actually, we need to use supabase-js for this

  const { createClient } = require('@supabase/supabase-js');
  const supabase = createClient(SUPABASE_URL, SERVICE_KEY);

  // Use rpc to execute raw SQL by creating a temporary function
  const { data, error } = await supabase.rpc('exec_sql', { query: sql });
  if (error) throw error;
  return data;
}

async function loadViaDirect() {
  const { createClient } = require('@supabase/supabase-js');
  const supabase = createClient(SUPABASE_URL, SERVICE_KEY);

  const geoPath = path.join(__dirname, '..', 'data', 'hrm_districts.geojson');
  const data = JSON.parse(fs.readFileSync(geoPath, 'utf8'));

  console.log(`Found ${data.features.length} districts\n`);

  // Since we can't run raw SQL easily via PostgREST,
  // we'll create a helper RPC function first, then call it for each district

  // First, try using the Supabase CLI or direct pg connection
  // Simplest approach: generate one combined SQL and use the Supabase CLI

  // Generate combined SQL
  let combinedSql = '';
  const batches = [[], []]; // Split into 2 batches by size

  for (const feature of data.features) {
    const distId = feature.properties.DIST_ID;
    const distName = feature.properties.DISTNAME;
    const geojson = JSON.stringify(feature.geometry);

    const sql = `UPDATE districts SET boundary = ST_Multi(ST_SetSRID(ST_GeomFromGeoJSON('${geojson.replace(/'/g, "''")}'), 4326)) WHERE id = ${distId};\n`;

    // Put large districts in batch 1, small ones in batch 0
    if (sql.length > 100000) {
      batches[1].push({ distId, distName, sql });
    } else {
      batches[0].push({ distId, distName, sql });
    }
  }

  // Write batches
  for (let i = 0; i < batches.length; i++) {
    if (batches[i].length === 0) continue;
    const batchSql = batches[i].map(b => b.sql).join('\n');
    const batchFile = path.join(__dirname, '..', 'data', `batch_${i + 1}.sql`);
    fs.writeFileSync(batchFile, batchSql);

    const districts = batches[i].map(b => `  District ${b.distId}: ${b.distName}`).join('\n');
    const sizeKB = Math.round(batchSql.length / 1024);
    console.log(`Batch ${i + 1} (${sizeKB}KB):`);
    console.log(districts);
    console.log();
  }

  console.log('=== INSTRUCTIONS ===\n');
  console.log('The SQL files are too large for the Supabase SQL Editor UI.');
  console.log('Use one of these methods:\n');
  console.log('METHOD 1 — Supabase CLI (recommended):');
  console.log('  npx supabase db execute --project-ref ' + PROJECT_REF + ' < data/batch_1.sql');
  console.log('  npx supabase db execute --project-ref ' + PROJECT_REF + ' < data/batch_2.sql\n');
  console.log('METHOD 2 — psql (if you have PostgreSQL installed):');
  console.log('  Get your database connection string from Supabase Dashboard → Settings → Database');
  console.log('  psql "postgresql://postgres.[ref]:[password]@aws-0-[region].pooler.supabase.com:6543/postgres" < data/load_boundaries.sql\n');
  console.log('METHOD 3 — Paste individual files into SQL Editor:');
  console.log('  The smaller districts can be pasted individually from data/sql/');
  console.log('  Files under 100KB should work in the SQL Editor.');
}

loadViaDirect().catch(console.error);
