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
          CREATE TABLE IF NOT EXISTS leads (
            id SERIAL PRIMARY KEY,
            partner_id INTEGER,
            client_name VARCHAR(255) NOT NULL,
            client_phone VARCHAR(100) NOT NULL,
            travel_dates TEXT,
            num_travelers INTEGER DEFAULT 2,
            status VARCHAR(50) DEFAULT 'new',
            start_date TEXT,
            created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
          );

          CREATE TABLE IF NOT EXISTS reviews (
            id SERIAL PRIMARY KEY,
            client_name VARCHAR(255) NOT NULL,
            client_phone VARCHAR(100),
            client_email VARCHAR(255),
            location VARCHAR(255),
            tour_name VARCHAR(255),
            rating INTEGER NOT NULL DEFAULT 5,
            review_text TEXT NOT NULL,
            travel_date VARCHAR(100),
            is_approved BOOLEAN DEFAULT FALSE,
            created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
          );
        `);

        // Check if reviews table is empty, if so seed initial approved reviews
        try {
          const revCount = await pool.query('SELECT count(*) FROM reviews');
          if (parseInt(revCount.rows[0].count, 10) === 0) {
            await pool.query(`
              INSERT INTO reviews (client_name, location, tour_name, rating, review_text, travel_date, is_approved)
              VALUES 
              ('Dr. Vivek Sengupta', 'Kolkata', 'North Sikkim 3N/4D Tour (Gurudongmar & Yumthang)', 5, 'Exceptional service by Sandesh Travels! We booked an Innova for our family trip to Lachen & Lachung. The driver was extremely polite, knowledgeable on high altitude mountain roads, and the permits were ready before we even reached Gangtok.', 'Visited Oct 2025', TRUE),
              ('Megha & Rohan Iyer', 'Bangalore', 'Gangtok, Nathula & Pelling 6D/5N Honeymoon Circuit', 5, 'Received quotation and day-wise itinerary on WhatsApp within 3 minutes of submitting our request. The hotel stays and scenic viewpoint timings recommended were spot on. 10/10 local tour operators in Sikkim.', 'Visited Dec 2025', TRUE),
              ('Sunil Mathur & Group', 'Mumbai', 'Silk Route 4D/3N (Zuluk, Thambi & Kupup Lake)', 5, 'Traveling with an 8-member group in their Tempo Traveller. Everything from Rongli permits to homestays in Zuluk was taken care of seamlessly. Very transparent pricing with no hidden charges.', 'Visited Jan 2026', TRUE);
            `);
          }
        } catch (seedErr) {
          console.warn('Review seed check note:', seedErr.message);
        }

        try {
          await pool.query(`
            ALTER TABLE leads ADD COLUMN IF NOT EXISTS start_date TEXT;
            ALTER TABLE leads ALTER COLUMN travel_dates TYPE TEXT;
            ALTER TABLE leads ALTER COLUMN client_phone TYPE VARCHAR(100);
            ALTER TABLE leads ALTER COLUMN client_name TYPE VARCHAR(255);
            ALTER TABLE reviews ADD COLUMN IF NOT EXISTS client_email VARCHAR(255);
            ALTER TABLE reviews ADD COLUMN IF NOT EXISTS travel_date VARCHAR(100);
          `);
        } catch (alterErr) {
          console.warn('Column alter note:', alterErr.message);
        }
        isInitialized = true;
      } catch (err) {
        console.warn('Schema initialization note:', err.message);
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
