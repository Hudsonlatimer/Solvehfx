// Load HRM district boundary polygons into Supabase
// Run with: node scripts/load-boundaries.js

const fs = require('fs');
const path = require('path');

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://iuhrvlwzxebwydakyyee.supabase.co';
const SUPABASE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!SUPABASE_KEY) {
  // Read from .env.local
  const envPath = path.join(__dirname, '..', '.env.local');
  const envContent = fs.readFileSync(envPath, 'utf8');
  const match = envContent.match(/SUPABASE_SERVICE_ROLE_KEY=(.+)/);
  if (match) {
    process.env.SUPABASE_SERVICE_ROLE_KEY = match[1].trim();
  } else {
    console.error('Missing SUPABASE_SERVICE_ROLE_KEY');
    process.exit(1);
  }
}

async function main() {
  const geoPath = path.join(__dirname, '..', 'data', 'hrm_districts.geojson');
  const data = JSON.parse(fs.readFileSync(geoPath, 'utf8'));

  console.log(`Found ${data.features.length} districts in GeoJSON\n`);

  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;

  for (const feature of data.features) {
    const distId = feature.properties.DIST_ID;
    const distName = feature.properties.DISTNAME;
    const geojson = JSON.stringify(feature.geometry);

    // Use Supabase's PostgREST RPC to run raw SQL via an RPC function,
    // or use the REST API to call a helper. Simplest: use the SQL endpoint.
    const sql = `UPDATE districts SET boundary = ST_Multi(ST_SetSRID(ST_GeomFromGeoJSON('${geojson.replace(/'/g, "''")}'), 4326)) WHERE id = ${distId};`;

    console.log(`Loading District ${distId}: ${distName}...`);

    const res = await fetch(`${SUPABASE_URL}/rest/v1/rpc/exec_sql`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'apikey': key,
        'Authorization': `Bearer ${key}`,
      },
      body: JSON.stringify({ query: sql }),
    });

    if (!res.ok) {
      // Fallback: try direct PostgREST won't work for geometry updates
      // We'll need to use the SQL approach via the management API
      console.log(`  RPC not available, will generate SQL file instead`);
      generateSqlFiles(data);
      return;
    }

    console.log(`  Done`);
  }

  console.log('\nAll boundaries loaded!');
}

function generateSqlFiles(data) {
  console.log('\nGenerating individual SQL files (paste each into Supabase SQL Editor)...\n');

  const outDir = path.join(__dirname, '..', 'data', 'sql');
  if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true });

  for (const feature of data.features) {
    const distId = feature.properties.DIST_ID;
    const distName = feature.properties.DISTNAME;
    const geojson = JSON.stringify(feature.geometry);

    const sql = `-- District ${distId}: ${distName}\nUPDATE districts SET boundary = ST_Multi(ST_SetSRID(ST_GeomFromGeoJSON('${geojson.replace(/'/g, "''")}'), 4326)) WHERE id = ${distId};\n`;

    const fileName = `district_${String(distId).padStart(2, '0')}.sql`;
    fs.writeFileSync(path.join(outDir, fileName), sql);
    console.log(`  ${fileName} (${Math.round(sql.length / 1024)}KB) — ${distName}`);
  }

  console.log(`\nGenerated ${data.features.length} SQL files in data/sql/`);
  console.log('Paste each one into the Supabase SQL Editor and click Run.');
  console.log('Or paste them all at once if under the size limit.');
}

main().catch(console.error);
