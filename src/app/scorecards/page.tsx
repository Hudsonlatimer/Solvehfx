'use client';

import { useEffect, useState } from 'react';
import type { District } from '@/lib/types';

interface CouncillorStats {
  district: District;
  totalReports: number;
  responded: number;
  responseRate: number;
  avgDaysToRespond: number;
  resolved: number;
  resolutionRate: number;
}

export default function ScorecardsPage() {
  const [stats, setStats] = useState<CouncillorStats[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await fetch('/api/scorecards');
        if (res.ok) {
          const data = await res.json();
          setStats(data.stats);
        }
      } catch (err) {
        console.error('Failed to load scorecards:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  if (loading) {
    return <div className="text-center py-12">Loading scorecards...</div>;
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-text-primary mb-3">Councillor Scorecards</h1>
        <p className="text-lg text-text-secondary">
          Transparency: How quickly do Halifax councillors respond to constituent reports?
        </p>
      </div>

      <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-12">
        <p className="text-sm text-blue-900">
          <strong>How we measure:</strong> We track when reports are submitted via SolveHFX and when councillors respond.
          Higher response rates = better accountability. This data is public and updated daily.
        </p>
      </div>

      <div className="space-y-4">
        {stats.length === 0 ? (
          <div className="text-center py-12 text-text-secondary">No data available yet</div>
        ) : (
          stats
            .sort((a, b) => b.responseRate - a.responseRate)
            .map((stat) => (
              <div
                key={stat.district.id}
                className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow"
              >
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="text-lg font-semibold text-text-primary">
                      {stat.district.councillor_name || 'Unknown Councillor'}
                    </h3>
                    <p className="text-sm text-text-secondary">District {stat.district.id}: {stat.district.name}</p>
                  </div>
                  <div className="text-right">
                    <div className="text-3xl font-bold text-primary">{Math.round(stat.responseRate)}%</div>
                    <p className="text-xs text-text-secondary">Response Rate</p>
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <p className="text-2xl font-bold text-text-primary">{stat.responded}</p>
                    <p className="text-xs text-text-secondary">Responded</p>
                    <p className="text-xs text-text-secondary">of {stat.totalReports}</p>
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-text-primary">{stat.avgDaysToRespond}</p>
                    <p className="text-xs text-text-secondary">Avg Days</p>
                    <p className="text-xs text-text-secondary">to Respond</p>
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-text-primary">{Math.round(stat.resolutionRate)}%</p>
                    <p className="text-xs text-text-secondary">Resolution Rate</p>
                    <p className="text-xs text-text-secondary">{stat.resolved} resolved</p>
                  </div>
                </div>

                {/* Response rate indicator */}
                <div className="mt-4">
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-primary rounded-full h-2 transition-all"
                      style={{ width: `${Math.min(stat.responseRate, 100)}%` }}
                    />
                  </div>
                </div>
              </div>
            ))
        )}
      </div>

      <div className="mt-12 bg-amber-50 border border-amber-200 rounded-lg p-6">
        <h3 className="font-semibold text-amber-900 mb-2">About These Scorecards</h3>
        <ul className="text-sm text-amber-900 space-y-1">
          <li>• Updated daily from SolveHFX reports</li>
          <li>• Based on real constituent reports with contact info</li>
          <li>• Response = Councillor replied to resident or HRM escalated</li>
          <li>• Resolution = Report marked as fixed or closed</li>
          <li>• Public data drives accountability</li>
        </ul>
      </div>
    </div>
  );
}
