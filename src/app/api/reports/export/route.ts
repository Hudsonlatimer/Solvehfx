import { NextRequest, NextResponse } from 'next/server';
import { createServiceClient } from '@/lib/supabase/server';

// Public open-data export. Deliberately whitelists columns rather than
// selecting '*' — contact_name, contact_email, client_ip, and user_id must
// never leave this endpoint, even though they're all on the same row.
const PUBLIC_COLUMNS =
  'id, reference_number, title, description, category, lat, lng, address, ' +
  'district_id, road_authority, status, created_at, resolved_at, ' +
  'estimated_resolution_date, districts(id,name,councillor_name)';

const MAX_ROWS = 5000;

function toCsv(rows: Record<string, unknown>[]): string {
  if (rows.length === 0) return '';

  const headers = Object.keys(rows[0]);
  const escape = (value: unknown): string => {
    if (value == null) return '';
    const str = typeof value === 'object' ? JSON.stringify(value) : String(value);
    // Quote whenever the field could otherwise corrupt column alignment.
    if (/[",\n\r]/.test(str)) {
      return `"${str.replace(/"/g, '""')}"`;
    }
    return str;
  };

  const lines = [headers.join(',')];
  for (const row of rows) {
    lines.push(headers.map((h) => escape(row[h])).join(','));
  }
  return lines.join('\r\n');
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const format = (searchParams.get('format') || 'csv').toLowerCase();
    const category = searchParams.get('category');
    const district = searchParams.get('district');
    const status = searchParams.get('status');

    if (format !== 'csv' && format !== 'json') {
      return NextResponse.json({ error: 'format must be "csv" or "json"' }, { status: 400 });
    }

    const supabase = await createServiceClient();
    let query = supabase
      .from('reports')
      .select(PUBLIC_COLUMNS)
      .order('created_at', { ascending: false })
      .limit(MAX_ROWS);

    if (category) query = query.eq('category', category);
    if (district) query = query.eq('district_id', parseInt(district, 10));
    if (status) query = query.eq('status', status);

    const { data, error } = await query;

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    const rows = data || [];

    if (format === 'json') {
      return NextResponse.json(
        { reports: rows, count: rows.length, limit: MAX_ROWS },
        { headers: { 'Cache-Control': 'public, max-age=300' } }
      );
    }

    const csv = toCsv(rows as unknown as Record<string, unknown>[]);
    return new NextResponse(csv, {
      headers: {
        'Content-Type': 'text/csv; charset=utf-8',
        'Content-Disposition': 'attachment; filename="solvehfx-reports.csv"',
        'Cache-Control': 'public, max-age=300',
      },
    });
  } catch (error) {
    console.error('Failed to export reports:', error);
    return NextResponse.json({ error: 'Failed to export reports' }, { status: 500 });
  }
}
