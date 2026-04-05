-- SolveHFX Database Schema & Functions
-- Run this in your Supabase SQL Editor

-- 1. Enable PostGIS extension
CREATE EXTENSION IF NOT EXISTS postgis;

-- 2. Create Districts table
CREATE TABLE IF NOT EXISTS districts (
  id INTEGER PRIMARY KEY,
  name TEXT NOT NULL,
  councillor_name TEXT,
  councillor_email TEXT,
  boundary GEOMETRY(MultiPolygon, 4326)
);

-- 3. Create Reports table
CREATE TABLE IF NOT EXISTS reports (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id),
  reference_number TEXT UNIQUE NOT NULL,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  category TEXT NOT NULL,
  lat FLOAT8 NOT NULL,
  lng FLOAT8 NOT NULL,
  address TEXT,
  district_id INTEGER REFERENCES districts(id),
  road_authority TEXT NOT NULL,
  photo_url TEXT,
  status TEXT DEFAULT 'open',
  is_anonymous BOOLEAN DEFAULT false,
  contact_email TEXT,
  notify_councillor BOOLEAN DEFAULT false,
  client_ip TEXT,
  
  -- Tracking
  hrm_responded BOOLEAN DEFAULT false,
  hrm_response_date TIMESTAMPTZ,
  councillor_responded BOOLEAN DEFAULT false,
  councillor_response_date TIMESTAMPTZ,
  hrm_work_order_id TEXT,
  estimated_resolution_date TIMESTAMPTZ,
  
  created_at TIMESTAMPTZ DEFAULT now(),
  resolved_at TIMESTAMPTZ
);

-- Ensure all columns exist (in case table was created previously)
ALTER TABLE reports ADD COLUMN IF NOT EXISTS client_ip TEXT;
ALTER TABLE reports ADD COLUMN IF NOT EXISTS is_anonymous BOOLEAN DEFAULT false;
ALTER TABLE reports ADD COLUMN IF NOT EXISTS contact_email TEXT;
ALTER TABLE reports ADD COLUMN IF NOT EXISTS notify_councillor BOOLEAN DEFAULT false;
ALTER TABLE reports ADD COLUMN IF NOT EXISTS hrm_responded BOOLEAN DEFAULT false;
ALTER TABLE reports ADD COLUMN IF NOT EXISTS hrm_response_date TIMESTAMPTZ;
ALTER TABLE reports ADD COLUMN IF NOT EXISTS councillor_responded BOOLEAN DEFAULT false;
ALTER TABLE reports ADD COLUMN IF NOT EXISTS councillor_response_date TIMESTAMPTZ;
ALTER TABLE reports ADD COLUMN IF NOT EXISTS hrm_work_order_id TEXT;
ALTER TABLE reports ADD COLUMN IF NOT EXISTS estimated_resolution_date TIMESTAMPTZ;

-- 4. Create Verifications table
CREATE TABLE IF NOT EXISTS verifications (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  report_id UUID REFERENCES reports(id) ON DELETE CASCADE,
  user_id UUID REFERENCES auth.users(id),
  type TEXT NOT NULL, -- 'confirmed_exists', 'confirmed_fixed'
  photo_url TEXT,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- 5. Create find_district function (RPC)
DROP FUNCTION IF EXISTS find_district(FLOAT8, FLOAT8);
CREATE OR REPLACE FUNCTION find_district(p_lng FLOAT8, p_lat FLOAT8)
RETURNS SETOF districts AS $$
BEGIN
  RETURN QUERY
  SELECT *
  FROM districts
  WHERE ST_Contains(boundary, ST_SetSRID(ST_MakePoint(p_lng, p_lat), 4326))
  LIMIT 1;
END;
$$ LANGUAGE plpgsql STABLE;

-- 6. Indices for performance
CREATE INDEX IF NOT EXISTS idx_reports_category ON reports(category);
CREATE INDEX IF NOT EXISTS idx_reports_status ON reports(status);
CREATE INDEX IF NOT EXISTS idx_reports_location ON reports USING GIST (ST_SetSRID(ST_MakePoint(lng, lat), 4326));
CREATE INDEX IF NOT EXISTS idx_districts_boundary ON districts USING GIST (boundary);

-- 7. Add sample districts (minimal)
INSERT INTO districts (id, name, councillor_name, councillor_email)
VALUES 
  (1, 'Waverley-Fall River-Musquodoboit Valley', 'Cathy Deagle Gammon', 'c.deaglegammon@halifax.ca'),
  (2, 'Lawrencetown-The Lakes-Chezzetcook-Eastern Shore', 'David Hendsbee', 'd.hendsbee@halifax.ca'),
  (3, 'Dartmouth South-Woodside-Eastern Passage', 'Becky Kent', 'b.kent@halifax.ca'),
  (4, 'Cole Harbour-Preston-Westphal-Cherry Brook', 'Trish Purdy', 't.purdy@halifax.ca'),
  (5, 'Dartmouth Centre', 'Sam Austin', 's.austin@halifax.ca'),
  (6, 'Dartmouth East-Burnside', 'Tony Mancini', 't.mancini@halifax.ca'),
  (7, 'Halifax South Downtown', 'Laura White', 'l.white@halifax.ca'),
  (8, 'Halifax Peninsula North', 'Virginia Hinch', 'v.hinch@halifax.ca'),
  (9, 'Halifax West Armdale', 'Shawn Cleary', 's.cleary@halifax.ca'),
  (10, 'Halifax-Bedford Basin West', 'Kathryn Morse', 'k.morse@halifax.ca'),
  (11, 'Spryfield-Sambro Loop-Prospect Road', 'Patty Cuttell', 'p.cuttell@halifax.ca'),
  (12, 'Timberlea-Beechville-Clayton Park-Wedgewood', 'Janet Steele', 'j.steele@halifax.ca'),
  (13, 'Prospect Road-St. Margarets', 'Nancy Hartling', 'n.hartling@halifax.ca'),
  (14, 'Hammonds Plains-Lucasville-Middle & Upper Sackville', 'John A. Young', 'j.young@halifax.ca'),
  (15, 'Lower Sackville-Beaver Bank', 'Billy Gillis', 'b.gillis@halifax.ca'),
  (16, 'Bedford-Wentworth', 'Jean St-Amand', 'j.stamand@halifax.ca')
ON CONFLICT (id) DO NOTHING;
