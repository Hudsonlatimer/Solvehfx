// Load HRM district boundary polygons into Supabase via direct Postgres connection
//
// STEP 1: Get your database password from Supabase Dashboard:
//   → Settings → Database → Connection string → Copy URI
//
// STEP 2: Run this script:
//   node scripts/load-boundaries-pg.js "postgresql://postgres.iuhrvlwzxebwydakyyee:YOUR_DB_PASSWORD@aws-0-ca-central-1.pooler.supabase.com:6543/postgres"

const fs = require('fs');
const path = require('path');
const { Client } = require('pg');

const connectionString = process.argv[2];

if (!connectionString) {
  console.log('Usage: node scripts/load-boundaries-pg.js "postgresql://postgres.[ref]:[password]@aws-0-[region].pooler.supabase.com:6543/postgres"');
  console.log('');
  console.log('Get your connection string from:');
  console.log('  Supabase Dashboard → Settings → Database → Connection string (URI)');
  process.exit(1);
}

async function main() {
  const geoPath = path.join(__dirname, '..', 'data', 'hrm_districts.geojson');
  const data = JSON.parse(fs.readFileSync(geoPath, 'utf8'));

  console.log(`Found ${data.features.length} districts in GeoJSON\n`);

  const client = new Client({
    connectionString,
    ssl: { rejectUnauthorized: false },
  });

  await client.connect();
  console.log('Connected to Supabase Postgres\n');

  let success = 0;
  let failed = 0;

  for (const feature of data.features) {
    const distId = feature.properties.DIST_ID;
    const distName = feature.properties.DISTNAME;
    const geojson = JSON.stringify(feature.geometry);

    try {
      await client.query(
        `UPDATE districts SET boundary = ST_Multi(ST_SetSRID(ST_GeomFromGeoJSON($1), 4326)) WHERE id = $2`,
        [geojson, distId]
      );
      console.log(`  ✓ District ${distId}: ${distName}`);
      success++;
    } catch (err) {
      console.error(`  ✗ District ${distId}: ${err.message}`);
      failed++;
    }
  }

  // Verify
  const result = await client.query(
    `SELECT id, name, ST_AsText(ST_Centroid(boundary)) as centroid FROM districts WHERE boundary IS NOT NULL ORDER BY id`
  );
  console.log(`\n=== Verification ===`);
  console.log(`${result.rows.length} districts have boundaries loaded:\n`);
  result.rows.forEach(row => {
    console.log(`  District ${row.id}: ${row.name} — centroid: ${row.centroid}`);
  });

  // Test a point lookup (Halifax downtown)
  const testResult = await client.query(
    `SELECT id, name, councillor_name FROM districts WHERE ST_Contains(boundary, ST_SetSRID(ST_MakePoint(-63.5752, 44.6488), 4326)) LIMIT 1`
  );
  if (testResult.rows.length > 0) {
    const r = testResult.rows[0];
    console.log(`\n=== Test Lookup (Halifax downtown -63.5752, 44.6488) ===`);
    console.log(`  District ${r.id}: ${r.name} — Councillor: ${r.councillor_name}`);
  }

  await client.end();
  console.log(`\nDone! ${success} loaded, ${failed} failed.`);
}

main().catch(err => {
  console.error('Error:', err.message);
  process.exit(1);
});
