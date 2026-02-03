import React, { useEffect, useRef } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { Pharmacy, UserLocation } from '../types';
import { formatDistance } from '../utils/locationUtils';

// Fix for default marker icons in React-Leaflet
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png',
});

// Custom marker icons
const createIcon = (color: string, isSelected: boolean = false) => {
  const size = isSelected ? 40 : 30;
  return L.divIcon({
    className: 'custom-marker',
    html: `
      <div style="
        width: ${size}px;
        height: ${size}px;
        background: ${color};
        border: 3px solid white;
        border-radius: 50% 50% 50% 0;
        transform: rotate(-45deg);
        box-shadow: 0 2px 6px rgba(0,0,0,0.3);
        display: flex;
        align-items: center;
        justify-content: center;
      ">
        <svg style="transform: rotate(45deg); width: ${size * 0.5}px; height: ${size * 0.5}px;" viewBox="0 0 24 24" fill="white">
          <path d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"/>
        </svg>
      </div>
    `,
    iconSize: [size, size],
    iconAnchor: [size / 2, size],
    popupAnchor: [0, -size],
  });
};

const pharmacyIcon = createIcon('#3B82F6');
const selectedIcon = createIcon('#1D4ED8', true);
const userLocationIcon = L.divIcon({
  className: 'user-location-marker',
  html: `
    <div style="
      width: 20px;
      height: 20px;
      background: #3B82F6;
      border: 4px solid white;
      border-radius: 50%;
      box-shadow: 0 0 0 2px #3B82F6, 0 2px 6px rgba(0,0,0,0.3);
    "></div>
  `,
  iconSize: [20, 20],
  iconAnchor: [10, 10],
});

// Component to handle map center updates
function MapController({
  center,
  pharmacies,
  selectedPharmacy
}: {
  center: [number, number] | null;
  pharmacies: Pharmacy[];
  selectedPharmacy: Pharmacy | null;
}) {
  const map = useMap();
  const initialFitDone = useRef(false);

  useEffect(() => {
    if (selectedPharmacy) {
      map.setView([selectedPharmacy.latitude, selectedPharmacy.longitude], 15, {
        animate: true,
      });
    } else if (center) {
      map.setView(center, 13, { animate: true });
    } else if (pharmacies.length > 0 && !initialFitDone.current) {
      const bounds = L.latLngBounds(
        pharmacies.map((p) => [p.latitude, p.longitude])
      );
      map.fitBounds(bounds, { padding: [50, 50] });
      initialFitDone.current = true;
    }
  }, [center, pharmacies, selectedPharmacy, map]);

  return null;
}

interface PharmacyMapProps {
  pharmacies: Pharmacy[];
  selectedPharmacy: Pharmacy | null;
  userLocation: UserLocation | null;
  onSelectPharmacy: (pharmacy: Pharmacy) => void;
  className?: string;
}

export function PharmacyMap({
  pharmacies,
  selectedPharmacy,
  userLocation,
  onSelectPharmacy,
  className = '',
}: PharmacyMapProps) {
  // Default center (San Francisco)
  const defaultCenter: [number, number] = [37.7749, -122.4194];
  const mapCenter = userLocation
    ? [userLocation.latitude, userLocation.longitude] as [number, number]
    : defaultCenter;

  return (
    <div className={`relative ${className}`}>
      <MapContainer
        center={mapCenter}
        zoom={12}
        className="w-full h-full rounded-xl"
        style={{ minHeight: '400px' }}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        <MapController
          center={userLocation ? [userLocation.latitude, userLocation.longitude] : null}
          pharmacies={pharmacies}
          selectedPharmacy={selectedPharmacy}
        />

        {/* User location marker */}
        {userLocation && (
          <Marker
            position={[userLocation.latitude, userLocation.longitude]}
            icon={userLocationIcon}
          >
            <Popup>
              <div className="text-center">
                <strong>Your Location</strong>
              </div>
            </Popup>
          </Marker>
        )}

        {/* Pharmacy markers */}
        {pharmacies.map((pharmacy) => (
          <Marker
            key={pharmacy.id}
            position={[pharmacy.latitude, pharmacy.longitude]}
            icon={selectedPharmacy?.id === pharmacy.id ? selectedIcon : pharmacyIcon}
            eventHandlers={{
              click: () => onSelectPharmacy(pharmacy),
            }}
          >
            <Popup>
              <div className="min-w-[200px]">
                <h3 className="font-semibold text-gray-900 mb-1">{pharmacy.name}</h3>
                <p className="text-sm text-gray-600 mb-1">
                  {pharmacy.address}<br />
                  {pharmacy.city}, {pharmacy.state} {pharmacy.zipCode}
                </p>
                <p className="text-sm text-gray-500 mb-2">{pharmacy.phone}</p>

                <div className="flex flex-wrap gap-1 mb-2">
                  <span className={`text-xs px-2 py-0.5 rounded-full ${
                    pharmacy.isOpen24Hours
                      ? 'bg-green-100 text-green-700'
                      : 'bg-gray-100 text-gray-600'
                  }`}>
                    {pharmacy.hours}
                  </span>
                  {pharmacy.hasDelivery && (
                    <span className="text-xs px-2 py-0.5 rounded-full bg-purple-100 text-purple-700">
                      Delivery
                    </span>
                  )}
                  {pharmacy.hasDriveThru && (
                    <span className="text-xs px-2 py-0.5 rounded-full bg-orange-100 text-orange-700">
                      Drive-Thru
                    </span>
                  )}
                </div>

                {pharmacy.distance !== undefined && (
                  <p className="text-sm font-medium text-blue-600 mb-2">
                    {formatDistance(pharmacy.distance)} away
                  </p>
                )}

                <button
                  onClick={() => onSelectPharmacy(pharmacy)}
                  className="w-full bg-blue-600 text-white text-sm py-1.5 px-3 rounded-lg
                           hover:bg-blue-700 transition-colors font-medium"
                >
                  Select This Pharmacy
                </button>
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>

      {/* Map Legend */}
      <div className="absolute bottom-4 left-4 bg-white rounded-lg shadow-md p-3 z-[1000]">
        <div className="flex items-center gap-2 text-xs text-gray-600 mb-1">
          <div className="w-3 h-3 bg-blue-500 rounded-full border-2 border-white shadow"></div>
          <span>Your location</span>
        </div>
        <div className="flex items-center gap-2 text-xs text-gray-600">
          <div className="w-3 h-3 bg-blue-500 rounded-sm"></div>
          <span>Pharmacy</span>
        </div>
      </div>
    </div>
  );
}

export default PharmacyMap;
