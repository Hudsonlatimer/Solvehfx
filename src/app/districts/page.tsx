import Link from 'next/link';
import { HRM_DISTRICTS } from '@/lib/districts';
import { createClient } from '@/lib/supabase/server';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'HRM Districts — Find Your Councillor in Halifax',
  description:
    'Halifax Regional Municipality has 16 districts, each with a councillor. Find your district, see active civic reports, and learn who represents you at City Hall.',
  alternates: { canonical: 'https://solvehfx.ca/districts' },
  openGraph: {
    title: 'HRM Districts — Find Your Halifax Councillor',
    description: 'All 16 Halifax districts with councillor info and active civic issue reports.',
    url: 'https://solvehfx.ca/districts',
  },
};

export default async function DistrictsPage() {
  const supabase = await createClient();

  // Get report counts per district
  const { data: reportCounts } = await supabase
    .from('reports')
    .select('district_id');

  const countMap = new Map<number, number>();
  reportCounts?.forEach((r) => {
    if (r.district_id) {
      countMap.set(r.district_id, (countMap.get(r.district_id) || 0) + 1);
    }
  });

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold text-text-primary mb-2">HRM Districts</h1>
      <p className="text-text-secondary mb-8">
        Halifax Regional Municipality has 16 districts, each with a councillor who represents residents at City Hall.
        Mayor Andy Fillmore leads council.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {HRM_DISTRICTS.map((d) => {
          const count = countMap.get(d.id) || 0;
          return (
            <Link
              key={d.id}
              href={`/map?district=${d.id}`}
              className="rounded-xl border border-gray-100 shadow-sm bg-white p-4 hover:shadow-md transition-shadow"
            >
              <div className="flex items-center gap-2 mb-2">
                <span className="w-8 h-8 rounded-full bg-primary text-white text-sm font-bold flex items-center justify-center">
                  {d.id}
                </span>
                <span className="text-xs text-text-secondary">District {d.id}</span>
              </div>
              <h3 className="font-semibold text-sm text-text-primary mb-1 line-clamp-2">
                {d.name}
              </h3>
              <p className="text-xs text-text-secondary mb-2">
                Councillor: {d.councillor_name}
              </p>
              <p className="text-xs text-primary font-medium">
                {count} report{count !== 1 ? 's' : ''}
              </p>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
