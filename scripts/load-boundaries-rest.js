// Load HRM district boundaries via Supabase REST API
// This creates a temporary RPC function, loads boundaries, then cleans up
//
// Run: node scripts/load-boundaries-rest.js

const fs = require('fs');
const path = require('path');

// Read .env.local
const envPath = path.join(__dirname, '..', '.env.local');
const env = {};
fs.readFileSync(envPath, 'utf8').split('\n').forEach(line => {
  const eq = line.indexOf('=');
  if (eq > 0) env[line.slice(0, eq).trim()] = line.slice(eq + 1).trim();
});

const SUPABASE_URL = env.NEXT_PUBLIC_SUPABASE_URL;
const SERVICE_KEY = env.SUPABASE_SERVICE_ROLE_KEY;

async function supabaseQuery(sql) {
  // Use the Supabase Management API to execute SQL
  // Alternative: use the pg_net extension or create helper functions

  // Actually, let's use the simplest approach:
  // Create an RPC function that accepts GeoJSON and district ID
  const res = await fetch(`${SUPABASE_URL}/rest/v1/rpc/update_district_boundary`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'apikey': SERVICE_KEY,
      'Authorization': `Bearer ${SERVICE_KEY}`,
      'Prefer': 'return=representation',
    },
    body: sql,
  });
  return res;
}

async function main() {
  const geoPath = path.join(__dirname, '..', 'data', 'hrm_districts.geojson');
  const data = JSON.parse(fs.readFileSync(geoPath, 'utf8'));
  console.log(`Found ${data.features.length} districts\n`);

  // Step 1: Create a helper RPC function via the SQL API
  console.log('Step 1: Creating helper RPC function...');
  console.log('  You need to run this SQL in the Supabase SQL Editor first:\n');
  console.log(`CREATE OR REPLACE FUNCTION update_district_boundary(p_id integer, p_geojson text)
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
  UPDATE districts
  SET boundary = ST_Multi(ST_SetSRID(ST_GeomFromGeoJSON(p_geojson), 4326))
  WHERE id = p_id;
END;
$$;\n`);

  // Check if the function exists
  const testRes = await fetch(`${SUPABASE_URL}/rest/v1/rpc/update_district_boundary`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'apikey': SERVICE_KEY,
      'Authorization': `Bearer ${SERVICE_KEY}`,
    },
    body: JSON.stringify({ p_id: 0, p_geojson: '{"type":"Polygon","coordinates":[[[0,0],[1,0],[1,1],[0,0]]]}' }),
  });

  if (testRes.status === 404) {
    console.log('ERROR: The helper function does not exist yet.');
    console.log('Please run the SQL above in the Supabase SQL Editor, then re-run this script.');
    process.exit(1);
  }

  console.log('  Helper function found!\n');
  console.log('Step 2: Loading boundaries...\n');

  let success = 0;
  let failed = 0;

  for (const feature of data.features) {
    const distId = feature.properties.DIST_ID;
    const distName = feature.properties.DISTNAME;
    const geojson = JSON.stringify(feature.geometry);

    const res = await fetch(`${SUPABASE_URL}/rest/v1/rpc/update_district_boundary`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'apikey': SERVICE_KEY,
        'Authorization': `Bearer ${SERVICE_KEY}`,
      },
      body: JSON.stringify({ p_id: distId, p_geojson: geojson }),
    });

    if (res.ok) {
      console.log(`  ✓ District ${distId}: ${distName}`);
      success++;
    } else {
      const err = await res.text();
      console.error(`  ✗ District ${distId}: ${err}`);
      failed++;
    }
  }

  // Verify
  console.log(`\nStep 3: Verifying...\n`);

  const verifyRes = await fetch(`${SUPABASE_URL}/rest/v1/districts?select=id,name&boundary=not.is.null&order=id`, {
    headers: {
      'apikey': SERVICE_KEY,
      'Authorization': `Bearer ${SERVICE_KEY}`,
    },
  });

  if (verifyRes.ok) {
    const districts = await verifyRes.json();
    console.log(`${districts.length} districts have boundaries loaded:`);
    districts.forEach(d => console.log(`  District ${d.id}: ${d.name}`));
  }

  console.log(`\nDone! ${success} loaded, ${failed} failed.`);
}

main().catch(err => {
  console.error('Error:', err.message);
  process.exit(1);
});
