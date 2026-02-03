import { Pharmacy, UserLocation } from '../types';
import { zipcodeCoordinates } from '../data/mockPharmacies';

// Calculate distance between two coordinates using Haversine formula
export function calculateDistance(
  lat1: number,
  lon1: number,
  lat2: number,
  lon2: number
): number {
  const R = 3959; // Earth's radius in miles
  const dLat = toRad(lat2 - lat1);
  const dLon = toRad(lon2 - lon1);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(toRad(lat1)) *
      Math.cos(toRad(lat2)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
}

function toRad(deg: number): number {
  return deg * (Math.PI / 180);
}

// Get user's current location using browser geolocation API
export function getCurrentLocation(): Promise<UserLocation> {
  return new Promise((resolve, reject) => {
    if (!navigator.geolocation) {
      reject(new Error('Geolocation is not supported by your browser'));
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        resolve({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        });
      },
      (error) => {
        let message = 'Unable to retrieve your location';
        switch (error.code) {
          case error.PERMISSION_DENIED:
            message = 'Location access was denied. Please enable location services.';
            break;
          case error.POSITION_UNAVAILABLE:
            message = 'Location information is unavailable.';
            break;
          case error.TIMEOUT:
            message = 'The request to get your location timed out.';
            break;
        }
        reject(new Error(message));
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 300000, // 5 minutes
      }
    );
  });
}

// Get coordinates from a zipcode
export function getCoordinatesFromZipcode(zipcode: string): UserLocation | null {
  const coords = zipcodeCoordinates[zipcode];
  return coords ? { latitude: coords.latitude, longitude: coords.longitude } : null;
}

// Check if a string is a valid US zipcode format
export function isValidZipcode(input: string): boolean {
  return /^\d{5}(-\d{4})?$/.test(input.trim());
}

// Add distance to pharmacies based on user location
export function addDistanceToPharmacies(
  pharmacies: Pharmacy[],
  userLocation: UserLocation
): Pharmacy[] {
  return pharmacies.map((pharmacy) => ({
    ...pharmacy,
    distance: calculateDistance(
      userLocation.latitude,
      userLocation.longitude,
      pharmacy.latitude,
      pharmacy.longitude
    ),
  }));
}

// Sort pharmacies by distance
export function sortByDistance(pharmacies: Pharmacy[]): Pharmacy[] {
  return [...pharmacies].sort((a, b) => {
    if (a.distance === undefined) return 1;
    if (b.distance === undefined) return -1;
    return a.distance - b.distance;
  });
}

// Format distance for display
export function formatDistance(distance: number | undefined): string {
  if (distance === undefined) return '';
  if (distance < 0.1) return '< 0.1 mi';
  return `${distance.toFixed(1)} mi`;
}
