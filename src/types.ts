export interface Pharmacy {
  id: string;
  name: string;
  address: string;
  city: string;
  state: string;
  zipCode: string;
  phone: string;
  latitude: number;
  longitude: number;
  hours: string;
  isOpen24Hours: boolean;
  hasDelivery: boolean;
  hasDriveThru: boolean;
  distance?: number; // calculated distance in miles
}

export interface SearchFilters {
  query: string;
  hasDelivery: boolean;
  hasDriveThru: boolean;
  isOpen24Hours: boolean;
}

export interface UserLocation {
  latitude: number;
  longitude: number;
}
