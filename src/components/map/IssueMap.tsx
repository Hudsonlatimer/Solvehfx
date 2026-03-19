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
        >
          <div className="p-1 min-w-[200px]">
            <div className="flex items-center gap-1.5 mb-1">
              <StatusBadge status={selectedReport.status as ReportStatus} />
              <span className="text-xs text-text-secondary">
                {getCategoryById(selectedReport.category)?.icon}{' '}
                {getCategoryById(selectedReport.category)?.label}
              </span>
            </div>
            <p className="font-medium text-sm text-text-primary mb-1">
              {selectedReport.title}
            </p>
            <p className="text-xs text-text-secondary mb-2 line-clamp-2">
              {selectedReport.address}
            </p>
            <Link
              href={`/reports/${selectedReport.id}`}
              className="text-xs font-medium text-primary hover:underline"
            >
              View Report &rarr;
            </Link>
          </div>
        </Popup>
      )}
    </Map>
  );
}
