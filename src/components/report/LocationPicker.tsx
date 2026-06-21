'use client';

import { useState, useCallback, useRef } from 'react';
import Map, { Marker, NavigationControl } from 'react-map-gl/mapbox';
import 'mapbox-gl/dist/mapbox-gl.css';
import type { MapRef, MarkerDragEvent } from 'react-map-gl/mapbox';
import Button from '@/components/ui/Button';

interface LocationPickerProps {
  onLocationSelect: (location: {
    lat: number;
    lng: number;
    address: string;
  }) => void;
  initialLat?: number;
  initialLng?: number;
}

export default function LocationPicker({
  onLocationSelect,
  initialLat,
  initialLng,
}: LocationPickerProps) {
  const [lat, setLat] = useState(initialLat || 44.6488);
  const [lng, setLng] = useState(initialLng || -63.5752);
  const [address, setAddress] = useState('');
  const [loading, setLoading] = useState(false);
  const [located, setLocated] = useState(false);
  const mapRef = useRef<MapRef>(null);

  const reverseGeocode = useCallback(async (latitude: number, longitude: number) => {
    try {
      const token = process.env.NEXT_PUBLIC_MAPBOX_TOKEN;
      const res = await fetch(
        `https://api.mapbox.com/geocoding/v5/mapbox.places/${longitude},${latitude}.json?access_token=${token}`
      );
      const data = await res.json();
      return data.features?.[0]?.place_name || `${latitude.toFixed(5)}, ${longitude.toFixed(5)}`;
    } catch {
      return `${latitude.toFixed(5)}, ${longitude.toFixed(5)}`;
    }
  }, []);

  const updateLocation = useCallback(async (newLat: number, newLng: number) => {
    setLat(newLat);
    setLng(newLng);
    const addr = await reverseGeocode(newLat, newLng);
    setAddress(addr);
    setLocated(true);
    onLocationSelect({ lat: newLat, lng: newLng, address: addr });
  }, [reverseGeocode, onLocationSelect]);

  const handleUseMyLocation = async () => {
    if (!navigator.geolocation) {
      alert('Geolocation is not supported by your browser.');
      return;
    }
    setLoading(true);
    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const newLat = position.coords.latitude;
        const newLng = position.coords.longitude;
        await updateLocation(newLat, newLng);
        setLoading(false);
        mapRef.current?.flyTo({ center: [newLng, newLat], zoom: 15, duration: 1500 });
      },
      (err) => {
        setLoading(false);
        alert('Could not get your location. Please allow location access or drag the pin on the map.');
        console.error(err);
      },
      { enableHighAccuracy: true, timeout: 10000 }
    );
  };

  const handleMapClick = useCallback(async (e: { lngLat: { lat: number; lng: number } }) => {
    await updateLocation(e.lngLat.lat, e.lngLat.lng);
  }, [updateLocation]);

  const handleMarkerDragEnd = useCallback(async (e: MarkerDragEvent) => {
    await updateLocation(e.lngLat.lat, e.lngLat.lng);
  }, [updateLocation]);

  return (
    <div className="space-y-4">
      <Button
        type="button"
        onClick={handleUseMyLocation}
        loading={loading}
        variant="secondary"
        className="w-full"
      >
        {located ? 'Update My Location' : 'Use My Location'}
      </Button>

      <div
        className="w-full h-60 sm:h-72 rounded-xl overflow-hidden border border-rule"
        role="application"
        aria-label="Interactive map — click or drag the pin to set the issue location"
      >
        <Map
          ref={mapRef}
          initialViewState={{
            longitude: lng,
            latitude: lat,
            zoom: 12,
          }}
          style={{ width: '100%', height: '100%' }}
          mapStyle="mapbox://styles/mapbox/streets-v12"
          mapboxAccessToken={process.env.NEXT_PUBLIC_MAPBOX_TOKEN}
          onClick={handleMapClick}
          cursor="crosshair"
        >
          <NavigationControl position="top-right" />
          {located && (
            <Marker
              longitude={lng}
              latitude={lat}
              anchor="bottom"
              draggable
              onDragEnd={handleMarkerDragEnd}
            >
              <svg width="32" height="40" viewBox="0 0 24 30" fill="none">
                <path
                  d="M12 0C5.37 0 0 5.37 0 12c0 9 12 18 12 18s12-9 12-18c0-6.63-5.37-12-12-12z"
                  fill="#003865"
                />
                <circle cx="12" cy="12" r="4" fill="white" />
              </svg>
            </Marker>
          )}
        </Map>
      </div>

      <p className="text-xs text-text-secondary text-center">
        {located ? 'Drag the pin to adjust the location' : 'Click the map or use GPS to set location'}
      </p>

      {address && (
        <div className="rounded-lg bg-primary/5 border border-primary/15 p-3">
          <p className="text-sm font-medium text-primary">{address}</p>
          <p className="text-xs text-text-secondary mt-1">
            {lat.toFixed(5)}, {lng.toFixed(5)}
          </p>
        </div>
      )}
    </div>
  );
}
