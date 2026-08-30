import { Pool, types } from 'pg';

// Parse DATE (OID 1082) as a raw string directly to prevent timezone-shifting offsets
types.setTypeParser(types.builtins.DATE, val => val);

const connectionString = 
  process.env.POSTGRES_URL || 
  process.env.POSTGRES_PRISMA_URL ||
  process.env.POSTGRES_URL_NON_POOLING ||
  process.env.DATABASE_URL || 
  'postgresql://postgres:postgres@localhost:5432/postgres';

let pool;

if (!global.pgPool) {
  const isLocal = connectionString.includes('localhost') || connectionString.includes('127.0.0.1');
  global.pgPool = new Pool({
    connectionString,
    ssl: isLocal ? false : { rejectUnauthorized: false },
    max: 10,
    idleTimeoutMillis: 30000,
    connectionTimeoutMillis: 10000,
  });
}
pool = global.pgPool;

let isInitialized = false;
let initPromise = null;

async function ensureSchema() {
  if (isInitialized) return;
  if (!initPromise) {
    initPromise = (async () => {
      try {
        await pool.query(`
          ALTER TABLE leads ALTER COLUMN travel_dates TYPE TEXT;
          ALTER TABLE leads ALTER COLUMN client_phone TYPE VARCHAR(100);
          ALTER TABLE leads ALTER COLUMN client_name TYPE VARCHAR(255);
        `);
        isInitialized = true;
      } catch (err) {
        console.warn('Schema alteration note:', err.message);
        isInitialized = true;
      }
    })();
  }
  return initPromise;
}

export async function query(text, params) {
  await ensureSchema();
  const start = Date.now();
  const res = await pool.query(text, params);
  const duration = Date.now() - start;
  console.log('Executed query', { text, duration, rows: res.rowCount });
  return res;
}

export async function getClient() {
  await ensureSchema();
  return await pool.connect();
}
