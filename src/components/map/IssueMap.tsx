'use client';

import { useState, useCallback, useEffect, useRef } from 'react';
import Map, { Marker, Popup, NavigationControl } from 'react-map-gl/mapbox';
import 'mapbox-gl/dist/mapbox-gl.css';
import IssuePin from './IssuePin';
import StatusBadge from '@/components/reports/StatusBadge';
import { getCategoryById } from '@/lib/districts';
import type { Report, ReportStatus } from '@/lib/types';
import type { MapRef } from 'react-map-gl/mapbox';
import Link from 'next/link';
import Image from 'next/image';

// Approximate center + zoom for each HRM district
const DISTRICT_VIEWS: Record<number, { lng: number; lat: number; zoom: number }> = {
  1:  { lng: -63.30, lat: 44.85, zoom: 10 },
  2:  { lng: -63.05, lat: 44.72, zoom: 10 },
  3:  { lng: -63.50, lat: 44.62, zoom: 12 },
  4:  { lng: -63.47, lat: 44.65, zoom: 12 },
  5:  { lng: -63.56, lat: 44.67, zoom: 13 },
  6:  { lng: -63.50, lat: 44.70, zoom: 12 },
  7:  { lng: -63.57, lat: 44.64, zoom: 14 },
  8:  { lng: -63.59, lat: 44.66, zoom: 14 },
  9:  { lng: -63.61, lat: 44.63, zoom: 13 },
  10: { lng: -63.65, lat: 44.68, zoom: 12 },
  11: { lng: -63.63, lat: 44.55, zoom: 11 },
  12: { lng: -63.67, lat: 44.66, zoom: 12 },
  13: { lng: -63.80, lat: 44.55, zoom: 10 },
  14: { lng: -63.78, lat: 44.75, zoom: 11 },
  15: { lng: -63.67, lat: 44.76, zoom: 12 },
  16: { lng: -63.66, lat: 44.73, zoom: 13 },
};

interface IssueMapProps {
  reports: Report[];
  focusDistrict?: number | null;
}

const INITIAL_VIEW = {
  longitude: -63.5752,
  latitude: 44.6488,
  zoom: 11,
};

export default function IssueMap({ reports, focusDistrict }: IssueMapProps) {
  const [selectedReport, setSelectedReport] = useState<Report | null>(null);
  const [mapLoaded, setMapLoaded] = useState(false);
  const mapRef = useRef<MapRef>(null);
  const pendingFlyRef = useRef<number | null | undefined>(undefined);

  const flyToDistrict = useCallback((districtId: number | null | undefined) => {
    const map = mapRef.current;
    if (!map) return;

    if (districtId && DISTRICT_VIEWS[districtId]) {
      const view = DISTRICT_VIEWS[districtId];
      map.flyTo({
        center: [view.lng, view.lat],
        zoom: view.zoom,
        duration: 1500,
      });
    } else if (districtId === null || districtId === undefined) {
      map.flyTo({
        center: [INITIAL_VIEW.longitude, INITIAL_VIEW.latitude],
        zoom: INITIAL_VIEW.zoom,
        duration: 1500,
      });
    }
  }, []);

  // When map loads, fly to pending district if any
  const handleMapLoad = useCallback(() => {
    setMapLoaded(true);
    if (pendingFlyRef.current !== undefined) {
      // Small delay to ensure map is fully interactive
      setTimeout(() => flyToDistrict(pendingFlyRef.current), 300);
      pendingFlyRef.current = undefined;
    }
  }, [flyToDistrict]);

  // React to focusDistrict changes
  useEffect(() => {
    if (mapLoaded) {
      flyToDistrict(focusDistrict);
    } else {
      // Map not loaded yet — queue the fly
      pendingFlyRef.current = focusDistrict;
    }
  }, [focusDistrict, mapLoaded, flyToDistrict]);

  const handleMarkerClick = useCallback((report: Report) => {
    setSelectedReport(report);
  }, []);

  const handleVerified = useCallback(() => {
    // Update verification count on the selected report in local state
    if (selectedReport) {
      setSelectedReport({
        ...selectedReport,
        verifications: [
          ...(selectedReport.verifications || []),
          { id: 'temp', report_id: selectedReport.id, user_id: null, type: 'confirmed_fixed', photo_url: null, created_at: new Date().toISOString() },
        ],
      });
    }
  }, [selectedReport]);

  return (
    <Map
      ref={mapRef}
      initialViewState={INITIAL_VIEW}
      style={{ width: '100%', height: '100%' }}
      mapStyle="mapbox://styles/mapbox/streets-v12"
      mapboxAccessToken={process.env.NEXT_PUBLIC_MAPBOX_TOKEN}
      onLoad={handleMapLoad}
    >
      <NavigationControl position="top-right" />

      {reports.map((report) => (
        <Marker
          key={report.id}
          longitude={report.lng}
          latitude={report.lat}
          anchor="bottom"
        >
          <IssuePin
            category={report.category}
            status={report.status}
            hasPhoto={!!report.photo_url}
            verificationCount={report.verifications?.length || 0}
            onClick={() => handleMarkerClick(report)}
          />
        </Marker>
      ))}

      {selectedReport && (
        <Popup
          longitude={selectedReport.lng}
          latitude={selectedReport.lat}
          anchor="bottom"
          offset={15}
          onClose={() => setSelectedReport(null)}
          closeButton={true}
          closeOnClick={false}
          maxWidth="320px"
        >
          <MapPopup report={selectedReport} onVerified={handleVerified} />
        </Popup>
      )}
    </Map>
  );
}

/* ───── Enhanced Map Popup ───── */

function MapPopup({ report, onVerified }: { report: Report; onVerified: () => void }) {
  const [verifying, setVerifying] = useState(false);
  const [fixVoted, setFixVoted] = useState(false);
  const [error, setError] = useState('');

  const cat = getCategoryById(report.category);
  const verifications = report.verifications || [];
  const existsCount = verifications.filter((v) => v.type === 'confirmed_exists').length;
  const fixedCount = verifications.filter((v) => v.type === 'confirmed_fixed').length;
  const reportedDate = new Date(report.created_at).toLocaleDateString('en-CA', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });
  const daysSince = Math.floor(
    (Date.now() - new Date(report.created_at).getTime()) / (1000 * 60 * 60 * 24)
  );

  const handleMarkFixed = async () => {
    setVerifying(true);
    setError('');
    try {
      const res = await fetch(`/api/reports/${report.id}/verify`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ type: 'confirmed_fixed' }),
      });
      if (res.status === 409) {
        setError('Already verified');
        return;
      }
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error || 'Failed');
      }
      setFixVoted(true);
      onVerified();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed');
    } finally {
      setVerifying(false);
    }
  };

  const handleConfirmExists = async () => {
    setVerifying(true);
    setError('');
    try {
      const res = await fetch(`/api/reports/${report.id}/verify`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ type: 'confirmed_exists' }),
      });
      if (res.status === 409) {
        setError('Already verified');
        return;
      }
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error || 'Failed');
      }
      setFixVoted(true);
      onVerified();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed');
    } finally {
      setVerifying(false);
    }
  };

  return (
    <div className="min-w-[260px] max-w-[300px]">
      {/* Photo */}
      {report.photo_url && (
        <div className="relative w-full h-36 -mt-2.5 -mx-2.5 mb-2" style={{ width: 'calc(100% + 20px)' }}>
          <Image
            src={report.photo_url}
            alt={report.title}
            fill
            className="object-cover rounded-t-lg"
            sizes="300px"
          />
        </div>
      )}

      {/* Status + Category */}
      <div className="flex items-center gap-1.5 mb-1.5">
        <StatusBadge status={report.status as ReportStatus} />
        <span className="text-xs text-text-secondary">
          {cat?.icon} {cat?.label}
        </span>
      </div>

      {/* Title */}
      <p className="font-semibold text-sm text-text-primary mb-1 leading-tight">
        {report.title}
      </p>

      {/* Address + Date */}
      <p className="text-xs text-text-secondary mb-0.5">{report.address || 'Halifax, NS'}</p>
      <p className="text-xs text-text-secondary mb-2">
        Reported {reportedDate} &middot; {daysSince === 0 ? 'today' : `${daysSince}d ago`}
      </p>

      {/* Verification stats */}
      <div className="flex items-center gap-3 text-xs mb-2 py-1.5 px-2 bg-gray-50 rounded-lg">
        <span title="People who confirmed this issue still exists">
          👁 {existsCount} confirmed
        </span>
        <span title="People who say this is fixed">
          ✅ {fixedCount} say fixed
        </span>
      </div>

      {/* Community verification buttons */}
      {report.status !== 'resolved' && !fixVoted && (
        <div className="flex gap-1.5 mb-2">
          <button
            onClick={handleConfirmExists}
            disabled={verifying}
            className="flex-1 text-xs font-medium py-1.5 px-2 rounded-lg border border-amber-200 bg-amber-50 text-amber-800 hover:bg-amber-100 transition-colors disabled:opacity-50"
          >
            Still exists
          </button>
          <button
            onClick={handleMarkFixed}
            disabled={verifying}
            className="flex-1 text-xs font-medium py-1.5 px-2 rounded-lg border border-green-200 bg-green-50 text-green-800 hover:bg-green-100 transition-colors disabled:opacity-50"
          >
            It&apos;s fixed!
          </button>
        </div>
      )}

      {fixVoted && (
        <p className="text-xs text-green-700 bg-green-50 rounded-lg py-1.5 px-2 mb-2">
          Thanks for your input!
        </p>
      )}

      {error && <p className="text-xs text-red-600 mb-2">{error}</p>}

      {/* View full report link */}
      <Link
        href={`/reports/${report.id}`}
        className="text-xs font-medium text-primary hover:underline"
      >
        View full report &rarr;
      </Link>
    </div>
  );
}
