const { Client } = require('pg');
const c = new Client({
  host: 'db.iuhrvlwzxebwydakyyee.supabase.co',
  port: 5432,
  database: 'postgres',
  user: 'postgres',
  password: 'Glaceau1254$',
  ssl: { rejectUnauthorized: false }
});
c.connect()
  .then(() => { console.log('Connected!'); return c.query('SELECT 1 as test'); })
  .then(r => { console.log('OK:', r.rows); c.end(); })
  .catch(e => { console.error('Error:', e.message); process.exit(1); });
