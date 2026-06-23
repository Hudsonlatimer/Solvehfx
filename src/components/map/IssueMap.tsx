'use client';

import { useState, useCallback, useEffect, useMemo, useRef } from 'react';
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

type MapStyleId = 'streets' | 'satellite' | 'dark';

const MAP_STYLES: { id: MapStyleId; label: string; url: string }[] = [
  { id: 'streets', label: 'Map', url: 'mapbox://styles/mapbox/streets-v12' },
  { id: 'satellite', label: 'Satellite', url: 'mapbox://styles/mapbox/satellite-streets-v12' },
  { id: 'dark', label: 'Dark', url: 'mapbox://styles/mapbox/dark-v11' },
];

const AUTHORITY_LABELS: Record<string, string> = {
  hrm: 'HRM 311',
  province: 'NS Public Works',
  transit: 'Halifax Transit',
};

export default function IssueMap({ reports, focusDistrict }: IssueMapProps) {
  const [selectedReport, setSelectedReport] = useState<Report | null>(null);
  const [mapLoaded, setMapLoaded] = useState(false);
  const [styleId, setStyleId] = useState<MapStyleId>('satellite');
  const [is3D, setIs3D] = useState(false);
  const mapRef = useRef<MapRef>(null);
  const pendingFlyRef = useRef<number | null | undefined>(undefined);
  const pendingFlyTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const is3DRef = useRef(is3D);
  const styleIdRef = useRef<MapStyleId>(styleId);

  useEffect(() => {
    is3DRef.current = is3D;
  }, [is3D]);
  useEffect(() => {
    styleIdRef.current = styleId;
  }, [styleId]);

  const activeStyleUrl = MAP_STYLES.find((s) => s.id === styleId)!.url;
  const visibleReports = useMemo(
    () => reports.filter((report) => report.status !== 'resolved'),
    [reports]
  );

  // 3D is added against the raw mapbox instance (terrain + sky + extruded
  // buildings) so it survives base-style swaps. Typed loosely on purpose —
  // the GL style-spec expressions don't map cleanly to react-map-gl's types.
  const apply3D = useCallback(() => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const map = mapRef.current?.getMap() as any;
    if (!map || !map.isStyleLoaded?.()) return;
    try {
      if (!map.getSource('mapbox-dem')) {
        map.addSource('mapbox-dem', {
          type: 'raster-dem',
          url: 'mapbox://mapbox.mapbox-terrain-dem-v1',
          tileSize: 512,
          maxzoom: 14,
        });
      }
      map.setTerrain({ source: 'mapbox-dem', exaggeration: 1.3 });
      if (!map.getLayer('sky')) {
        map.addLayer({
          id: 'sky',
          type: 'sky',
          paint: {
            'sky-type': 'atmosphere',
            'sky-atmosphere-sun': [0.0, 90.0],
            'sky-atmosphere-sun-intensity': 12,
          },
        });
      }
      if (styleIdRef.current !== 'satellite' && !map.getLayer('3d-buildings')) {
        map.addLayer({
          id: '3d-buildings',
          source: 'composite',
          'source-layer': 'building',
          filter: ['==', 'extrude', 'true'],
          type: 'fill-extrusion',
          minzoom: 14,
          paint: {
            'fill-extrusion-color': styleIdRef.current === 'dark' ? '#2b3a52' : '#c7d0db',
            'fill-extrusion-height': ['interpolate', ['linear'], ['zoom'], 14, 0, 16, ['get', 'height']],
            'fill-extrusion-base': ['interpolate', ['linear'], ['zoom'], 14, 0, 16, ['get', 'min_height']],
            'fill-extrusion-opacity': 0.65,
          },
        });
      }
    } catch {
      // Style still settling or lacks a building layer — terrain/sky degrade gracefully.
    }
  }, []);

  const remove3D = useCallback(() => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const map = mapRef.current?.getMap() as any;
    if (!map) return;
    if (map.getLayer('3d-buildings')) map.removeLayer('3d-buildings');
    if (map.getLayer('sky')) map.removeLayer('sky');
    try {
      map.setTerrain(null);
    } catch {
      /* no-op */
    }
  }, []);

  // Re-apply 3D whenever 3D is on and the base style finishes (re)loading.
  useEffect(() => {
    if (!mapLoaded) return;
    const map = mapRef.current;
    if (!map) return;
    if (is3D) {
      apply3D();
      map.easeTo({ pitch: 58, duration: 800 });
    } else {
      remove3D();
      map.easeTo({ pitch: 0, bearing: 0, duration: 800 });
    }
  }, [is3D, styleId, mapLoaded, apply3D, remove3D]);

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

  const handleMapLoad = useCallback(() => {
    setMapLoaded(true);
    if (is3DRef.current) apply3D();
    if (pendingFlyRef.current !== undefined) {
      pendingFlyTimeoutRef.current = setTimeout(() => flyToDistrict(pendingFlyRef.current), 300);
      pendingFlyRef.current = undefined;
    }
  }, [flyToDistrict, apply3D]);

  useEffect(() => {
    if (!mapLoaded) return;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const map = mapRef.current?.getMap() as any;
    if (!map) return;
    const onStyleLoad = () => {
      if (is3DRef.current) apply3D();
    };
    map.on('style.load', onStyleLoad);
    return () => {
      map.off('style.load', onStyleLoad);
    };
  }, [mapLoaded, apply3D]);

  useEffect(() => {
    return () => {
      if (pendingFlyTimeoutRef.current) clearTimeout(pendingFlyTimeoutRef.current);
    };
  }, []);

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
    <div className="relative h-full w-full">
      {/* Style + 3D controls */}
      <div className="absolute left-3 top-3 z-10 flex flex-col items-start gap-2">
        <div className="flex rounded-lg border border-rule bg-bg-elev/95 p-0.5 shadow-civic backdrop-blur">
          {MAP_STYLES.map((s) => (
            <button
              key={s.id}
              type="button"
              onClick={() => setStyleId(s.id)}
              className={`min-h-11 rounded-md px-3 py-2.5 text-sm font-medium tracking-tight transition-colors ${
                styleId === s.id
                  ? 'bg-primary text-white'
                  : 'text-text-secondary hover:text-text-primary'
              }`}
            >
              {s.label}
            </button>
          ))}
        </div>
        <button
          type="button"
          onClick={() => setIs3D((v) => !v)}
          aria-pressed={is3D}
          className={`inline-flex min-h-11 items-center gap-1.5 rounded-lg border px-3 py-2.5 text-sm font-semibold tracking-tight shadow-civic backdrop-blur transition-colors ${
            is3D
              ? 'border-primary bg-primary text-white'
              : 'border-rule bg-bg-elev/95 text-text-secondary hover:text-text-primary'
          }`}
        >
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
            <path d="M12 2l9 5v10l-9 5-9-5V7l9-5z" />
            <path d="M12 22V12M21 7l-9 5-9-5" />
          </svg>
          3D
        </button>
      </div>

      <Map
        ref={mapRef}
        initialViewState={INITIAL_VIEW}
        style={{ width: '100%', height: '100%' }}
        mapStyle={activeStyleUrl}
        maxPitch={80}
        mapboxAccessToken={process.env.NEXT_PUBLIC_MAPBOX_TOKEN}
        onLoad={handleMapLoad}
      >
        <NavigationControl position="top-right" />

      {visibleReports.map((report) => {
        return (
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
        );
      })}

      {selectedReport && (
        <Popup
          longitude={selectedReport.lng}
          latitude={selectedReport.lat}
          anchor="bottom"
          offset={15}
          onClose={() => setSelectedReport(null)}
          closeButton={true}
          closeOnClick={false}
          maxWidth="340px"
        >
          <MapPopup report={selectedReport} onVerified={handleVerified} />
        </Popup>
      )}
      </Map>
    </div>
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
  const ageLabel =
    daysSince < 1 ? 'today' :
      daysSince < 30 ? `${daysSince}d ago` :
        daysSince < 365 ? `${Math.floor(daysSince / 30)}mo ago` :
          `${Math.floor(daysSince / 365)}y ago`;
  const districtLabel = report.districts?.name ? `District ${report.districts.name}` : 'District unknown';
  const authorityLabel = AUTHORITY_LABELS[report.road_authority] || 'Jurisdiction unknown';
  const detailsText = report.description.length > 140 ? `${report.description.slice(0, 140).trim()}...` : report.description;

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
    <div className="w-[min(calc(100vw-2rem),340px)] min-w-0 overflow-hidden rounded-xl border border-rule bg-white shadow-xl">
      {report.photo_url && (
        <div className="relative h-40 w-full">
          <Image
            src={report.photo_url}
            alt={report.title}
            fill
            className="object-cover"
            sizes="340px"
          />
          <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/55 to-transparent px-3 pb-2 pt-8">
            <div className="inline-flex items-center rounded-md bg-black/45 px-2 py-0.5 text-[11px] font-medium text-white backdrop-blur">
              {cat?.icon} {cat?.label || 'Issue'}
            </div>
          </div>
        </div>
      )}

      <div className="space-y-3 p-3">
        <div className="flex flex-wrap items-center gap-1.5">
          <StatusBadge status={report.status as ReportStatus} />
          {!report.photo_url && (
            <span className="inline-flex items-center rounded-md bg-bg px-2 py-0.5 text-[11px] font-medium text-text-secondary">
              {cat?.icon} {cat?.label || 'Issue'}
            </span>
          )}
          <span className="inline-flex items-center rounded-md bg-primary/10 px-2 py-0.5 text-[11px] font-semibold text-primary">
            {authorityLabel}
          </span>
        </div>

        <div>
          <p className="text-[16px] font-semibold leading-tight text-text-primary">
            {report.title}
          </p>
          <p className="mt-1 text-[12.5px] leading-snug text-text-secondary">
            {detailsText}
          </p>
        </div>

        <div className="space-y-1.5 rounded-lg border border-rule bg-bg px-2.5 py-2 text-[12px]">
          <p className="text-text-secondary">{report.address || 'Halifax, NS'}</p>
          <div className="flex items-center justify-between gap-2 text-text-secondary">
            <span>{districtLabel}</span>
            <span className="font-medium">{ageLabel}</span>
          </div>
          <div className="flex items-center justify-between gap-2">
            <span className="text-text-muted">Reported {reportedDate}</span>
            <span className="font-mono text-[11px] text-primary">{report.reference_number}</span>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-2 text-[12px]">
          <div className="rounded-lg border border-amber-200 bg-amber-50 px-2 py-1.5 text-amber-900">
            <p className="text-[11px] font-medium uppercase tracking-wide text-amber-700">Still exists</p>
            <p className="mt-0.5 text-[14px] font-semibold">{existsCount}</p>
          </div>
          <div className="rounded-lg border border-green-200 bg-green-50 px-2 py-1.5 text-green-900">
            <p className="text-[11px] font-medium uppercase tracking-wide text-green-700">Says fixed</p>
            <p className="mt-0.5 text-[14px] font-semibold">{fixedCount}</p>
          </div>
        </div>
      </div>

      {report.status !== 'resolved' && !fixVoted && (
        <div className="flex gap-1.5 px-3 pb-1">
          <button
            onClick={handleConfirmExists}
            disabled={verifying}
            className="min-h-11 flex-1 rounded-lg border border-amber-300 bg-amber-50 px-2 py-2.5 text-sm font-semibold text-amber-800 transition-colors hover:bg-amber-100 disabled:opacity-50"
          >
            Still exists
          </button>
          <button
            onClick={handleMarkFixed}
            disabled={verifying}
            className="min-h-11 flex-1 rounded-lg border border-green-300 bg-green-50 px-2 py-2.5 text-sm font-semibold text-green-800 transition-colors hover:bg-green-100 disabled:opacity-50"
          >
            It&apos;s fixed!
          </button>
        </div>
      )}

      {fixVoted && (
        <p className="mx-3 mb-1 rounded-lg bg-green-50 px-2 py-1.5 text-[12px] text-green-700">
          Thanks for your input!
        </p>
      )}

      {error && <p className="mx-3 mb-1 text-[12px] text-red-600">{error}</p>}

      <Link
        href={`/reports/${report.id}`}
        className="mx-3 mb-3 inline-flex min-h-11 w-[calc(100%-1.5rem)] items-center justify-center rounded-lg border border-rule px-3 py-2.5 text-sm font-semibold text-primary transition-colors hover:bg-primary/5"
      >
        View full report
      </Link>
    </div>
  );
}
