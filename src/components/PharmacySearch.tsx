import React, { useState, useEffect, useCallback } from 'react';
import { Pharmacy, SearchFilters, UserLocation } from '../types';
import { mockPharmacies } from '../data/mockPharmacies';
import {
  getCurrentLocation,
  getCoordinatesFromZipcode,
  isValidZipcode,
  addDistanceToPharmacies,
  sortByDistance,
  formatDistance,
} from '../utils/locationUtils';
import { PharmacyMap } from './PharmacyMap';

type ViewMode = 'list' | 'map' | 'split';

interface PharmacySearchProps {
  onSelectPharmacy?: (pharmacy: Pharmacy) => void;
}

export function PharmacySearch({ onSelectPharmacy }: PharmacySearchProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [pharmacies, setPharmacies] = useState<Pharmacy[]>(mockPharmacies);
  const [filteredPharmacies, setFilteredPharmacies] = useState<Pharmacy[]>(mockPharmacies);
  const [userLocation, setUserLocation] = useState<UserLocation | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [locationError, setLocationError] = useState<string | null>(null);
  const [selectedPharmacy, setSelectedPharmacy] = useState<Pharmacy | null>(null);
  const [viewMode, setViewMode] = useState<ViewMode>('split');
  const [filters, setFilters] = useState<SearchFilters>({
    query: '',
    hasDelivery: false,
    hasDriveThru: false,
    isOpen24Hours: false,
  });
  const [showFilters, setShowFilters] = useState(false);

  // Filter and search pharmacies
  const filterPharmacies = useCallback(
    (pharmacyList: Pharmacy[], searchFilters: SearchFilters) => {
      let results = [...pharmacyList];

      // Filter by search query (name, address, city, or zipcode)
      if (searchFilters.query.trim()) {
        const query = searchFilters.query.toLowerCase().trim();
        results = results.filter(
          (pharmacy) =>
            pharmacy.name.toLowerCase().includes(query) ||
            pharmacy.address.toLowerCase().includes(query) ||
            pharmacy.city.toLowerCase().includes(query) ||
            pharmacy.zipCode.includes(query)
        );
      }

      // Apply feature filters
      if (searchFilters.hasDelivery) {
        results = results.filter((pharmacy) => pharmacy.hasDelivery);
      }
      if (searchFilters.hasDriveThru) {
        results = results.filter((pharmacy) => pharmacy.hasDriveThru);
      }
      if (searchFilters.isOpen24Hours) {
        results = results.filter((pharmacy) => pharmacy.isOpen24Hours);
      }

      // Sort by distance if available
      if (results.some((p) => p.distance !== undefined)) {
        results = sortByDistance(results);
      }

      return results;
    },
    []
  );

  // Update filtered results when pharmacies or filters change
  useEffect(() => {
    const filtered = filterPharmacies(pharmacies, filters);
    setFilteredPharmacies(filtered);
  }, [pharmacies, filters, filterPharmacies]);

  // Request user's current location
  const handleUseMyLocation = async () => {
    setIsLoading(true);
    setLocationError(null);

    try {
      const location = await getCurrentLocation();
      setUserLocation(location);
      const pharmaciesWithDistance = addDistanceToPharmacies(mockPharmacies, location);
      setPharmacies(sortByDistance(pharmaciesWithDistance));
    } catch (error) {
      setLocationError(error instanceof Error ? error.message : 'Failed to get location');
    } finally {
      setIsLoading(false);
    }
  };

  // Handle search input change
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchQuery(value);
    setFilters((prev) => ({ ...prev, query: value }));

    // If it's a valid zipcode, update distances based on that location
    if (isValidZipcode(value)) {
      const zipcodeLocation = getCoordinatesFromZipcode(value.trim());
      if (zipcodeLocation) {
        setUserLocation(zipcodeLocation);
        const pharmaciesWithDistance = addDistanceToPharmacies(mockPharmacies, zipcodeLocation);
        setPharmacies(sortByDistance(pharmaciesWithDistance));
        setLocationError(null);
      }
    }
  };

  // Handle search submission
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // Search is already reactive, but this handles explicit submit
    if (isValidZipcode(searchQuery)) {
      const zipcodeLocation = getCoordinatesFromZipcode(searchQuery.trim());
      if (zipcodeLocation) {
        setUserLocation(zipcodeLocation);
        const pharmaciesWithDistance = addDistanceToPharmacies(mockPharmacies, zipcodeLocation);
        setPharmacies(sortByDistance(pharmaciesWithDistance));
        setLocationError(null);
      } else {
        setLocationError('Zipcode not found. Try a different one.');
      }
    }
  };

  // Handle pharmacy selection
  const handleSelectPharmacy = (pharmacy: Pharmacy) => {
    setSelectedPharmacy(pharmacy);
    onSelectPharmacy?.(pharmacy);
  };

  // Toggle filter options
  const toggleFilter = (filterName: keyof Omit<SearchFilters, 'query'>) => {
    setFilters((prev) => ({ ...prev, [filterName]: !prev[filterName] }));
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white">
        <div className="max-w-7xl mx-auto px-4 py-6 sm:py-8">
          <h1 className="text-2xl sm:text-3xl font-bold mb-2">Find a Pharmacy</h1>
          <p className="text-blue-100 text-sm sm:text-base">
            Search by address, zipcode, or pharmacy name
          </p>
        </div>
      </div>

      {/* Search Section */}
      <div className="max-w-7xl mx-auto px-4 -mt-4 sm:-mt-6">
        <div className="bg-white rounded-xl shadow-lg p-4 sm:p-6">
          <form onSubmit={handleSearch} className="space-y-4">
            {/* Search Input */}
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <svg
                  className="h-5 w-5 text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
              </div>
              <input
                type="text"
                value={searchQuery}
                onChange={handleSearchChange}
                placeholder="Enter address, zipcode, or pharmacy name"
                className="block w-full pl-10 pr-4 py-3 sm:py-4 border border-gray-300 rounded-lg
                         text-base focus:ring-2 focus:ring-blue-500 focus:border-transparent
                         placeholder-gray-400"
              />
            </div>

            {/* Location, Filter, and View Toggle Buttons */}
            <div className="flex flex-col sm:flex-row gap-3">
              <button
                type="button"
                onClick={handleUseMyLocation}
                disabled={isLoading}
                className="flex items-center justify-center gap-2 px-4 py-2.5 bg-blue-50
                         text-blue-700 rounded-lg hover:bg-blue-100 transition-colors
                         disabled:opacity-50 disabled:cursor-not-allowed font-medium"
              >
                {isLoading ? (
                  <svg
                    className="animate-spin h-5 w-5"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    />
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    />
                  </svg>
                ) : (
                  <svg
                    className="h-5 w-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                  </svg>
                )}
                Use My Location
              </button>

              <button
                type="button"
                onClick={() => setShowFilters(!showFilters)}
                className={`flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg
                          font-medium transition-colors ${
                            showFilters || filters.hasDelivery || filters.hasDriveThru || filters.isOpen24Hours
                              ? 'bg-blue-600 text-white'
                              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                          }`}
              >
                <svg
                  className="h-5 w-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z"
                  />
                </svg>
                Filters
                {(filters.hasDelivery || filters.hasDriveThru || filters.isOpen24Hours) && (
                  <span className="bg-white text-blue-600 text-xs font-bold px-1.5 py-0.5 rounded-full">
                    {[filters.hasDelivery, filters.hasDriveThru, filters.isOpen24Hours].filter(Boolean).length}
                  </span>
                )}
              </button>

              {/* View Mode Toggle */}
              <div className="flex rounded-lg overflow-hidden border border-gray-200 sm:ml-auto">
                <button
                  type="button"
                  onClick={() => setViewMode('list')}
                  className={`flex items-center gap-1.5 px-3 py-2 text-sm font-medium transition-colors ${
                    viewMode === 'list'
                      ? 'bg-blue-600 text-white'
                      : 'bg-white text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 10h16M4 14h16M4 18h16" />
                  </svg>
                  <span className="hidden sm:inline">List</span>
                </button>
                <button
                  type="button"
                  onClick={() => setViewMode('split')}
                  className={`flex items-center gap-1.5 px-3 py-2 text-sm font-medium transition-colors border-x border-gray-200 ${
                    viewMode === 'split'
                      ? 'bg-blue-600 text-white'
                      : 'bg-white text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 17V7m0 10a2 2 0 01-2 2H5a2 2 0 01-2-2V7a2 2 0 012-2h2a2 2 0 012 2m0 10a2 2 0 002 2h2a2 2 0 002-2M9 7a2 2 0 012-2h2a2 2 0 012 2m0 10V7m0 10a2 2 0 002 2h2a2 2 0 002-2V7a2 2 0 00-2-2h-2a2 2 0 00-2 2" />
                  </svg>
                  <span className="hidden sm:inline">Both</span>
                </button>
                <button
                  type="button"
                  onClick={() => setViewMode('map')}
                  className={`flex items-center gap-1.5 px-3 py-2 text-sm font-medium transition-colors ${
                    viewMode === 'map'
                      ? 'bg-blue-600 text-white'
                      : 'bg-white text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
                  </svg>
                  <span className="hidden sm:inline">Map</span>
                </button>
              </div>
            </div>

            {/* Filter Options */}
            {showFilters && (
              <div className="flex flex-wrap gap-2 pt-2 border-t border-gray-100">
                <FilterChip
                  label="Delivery Available"
                  isActive={filters.hasDelivery}
                  onClick={() => toggleFilter('hasDelivery')}
                />
                <FilterChip
                  label="Drive-Thru"
                  isActive={filters.hasDriveThru}
                  onClick={() => toggleFilter('hasDriveThru')}
                />
                <FilterChip
                  label="Open 24 Hours"
                  isActive={filters.isOpen24Hours}
                  onClick={() => toggleFilter('isOpen24Hours')}
                />
              </div>
            )}
          </form>

          {/* Location Status */}
          {locationError && (
            <div className="mt-4 p-3 bg-red-50 text-red-700 rounded-lg text-sm flex items-center gap-2">
              <svg className="h-5 w-5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                  clipRule="evenodd"
                />
              </svg>
              {locationError}
            </div>
          )}

          {userLocation && !locationError && (
            <div className="mt-4 p-3 bg-green-50 text-green-700 rounded-lg text-sm flex items-center gap-2">
              <svg className="h-5 w-5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                  clipRule="evenodd"
                />
              </svg>
              Location set - showing pharmacies sorted by distance
            </div>
          )}
        </div>
      </div>

      {/* Results Section - Split View */}
      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-gray-900">
            {filteredPharmacies.length} {filteredPharmacies.length === 1 ? 'Pharmacy' : 'Pharmacies'} Found
          </h2>
        </div>

        {filteredPharmacies.length === 0 ? (
          <div className="bg-white rounded-xl p-8 text-center shadow-sm">
            <svg
              className="mx-auto h-12 w-12 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <h3 className="mt-4 text-lg font-medium text-gray-900">No pharmacies found</h3>
            <p className="mt-2 text-gray-500">Try adjusting your search or filters</p>
          </div>
        ) : (
          <div className={`grid gap-6 ${
            viewMode === 'split' ? 'lg:grid-cols-2' : 'grid-cols-1'
          }`}>
            {/* List View */}
            {(viewMode === 'list' || viewMode === 'split') && (
              <div className={`space-y-3 ${viewMode === 'split' ? 'lg:max-h-[600px] lg:overflow-y-auto lg:pr-2' : ''}`}>
                {filteredPharmacies.map((pharmacy) => (
                  <PharmacyCard
                    key={pharmacy.id}
                    pharmacy={pharmacy}
                    isSelected={selectedPharmacy?.id === pharmacy.id}
                    onSelect={() => handleSelectPharmacy(pharmacy)}
                  />
                ))}
              </div>
            )}

            {/* Map View */}
            {(viewMode === 'map' || viewMode === 'split') && (
              <div className={`${viewMode === 'map' ? 'h-[600px]' : 'h-[400px] lg:h-[600px]'} ${viewMode === 'split' ? 'order-first lg:order-last' : ''}`}>
                <PharmacyMap
                  pharmacies={filteredPharmacies}
                  selectedPharmacy={selectedPharmacy}
                  userLocation={userLocation}
                  onSelectPharmacy={handleSelectPharmacy}
                  className="h-full"
                />
              </div>
            )}
          </div>
        )}
      </div>

      {/* Selected Pharmacy Footer (Mobile-friendly sticky footer) */}
      {selectedPharmacy && (
        <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-lg p-4 sm:hidden z-[1001]">
          <div className="flex items-center justify-between">
            <div className="flex-1 min-w-0 mr-4">
              <p className="font-medium text-gray-900 truncate">{selectedPharmacy.name}</p>
              <p className="text-sm text-gray-500 truncate">{selectedPharmacy.address}</p>
            </div>
            <button
              onClick={() => onSelectPharmacy?.(selectedPharmacy)}
              className="flex-shrink-0 bg-blue-600 text-white px-4 py-2 rounded-lg font-medium
                       hover:bg-blue-700 transition-colors"
            >
              Continue
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

// Filter Chip Component
interface FilterChipProps {
  label: string;
  isActive: boolean;
  onClick: () => void;
}

function FilterChip({ label, isActive, onClick }: FilterChipProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`px-3 py-1.5 rounded-full text-sm font-medium transition-colors ${
        isActive
          ? 'bg-blue-600 text-white'
          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
      }`}
    >
      {label}
    </button>
  );
}

// Pharmacy Card Component
interface PharmacyCardProps {
  pharmacy: Pharmacy;
  isSelected: boolean;
  onSelect: () => void;
}

function PharmacyCard({ pharmacy, isSelected, onSelect }: PharmacyCardProps) {
  return (
    <button
      onClick={onSelect}
      className={`w-full text-left bg-white rounded-xl p-4 shadow-sm transition-all
                hover:shadow-md hover:scale-[1.01] active:scale-[0.99]
                ${isSelected ? 'ring-2 ring-blue-500 bg-blue-50' : 'border border-gray-100'}`}
    >
      <div className="flex items-start gap-4">
        {/* Pharmacy Icon */}
        <div
          className={`flex-shrink-0 w-12 h-12 rounded-full flex items-center justify-center
                    ${isSelected ? 'bg-blue-600 text-white' : 'bg-blue-100 text-blue-600'}`}
        >
          <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
            />
          </svg>
        </div>

        {/* Pharmacy Details */}
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-2">
            <h3 className="font-semibold text-gray-900 truncate">{pharmacy.name}</h3>
            {pharmacy.distance !== undefined && (
              <span className="flex-shrink-0 text-sm font-medium text-blue-600 bg-blue-50 px-2 py-0.5 rounded">
                {formatDistance(pharmacy.distance)}
              </span>
            )}
          </div>

          <p className="text-sm text-gray-600 mt-1">
            {pharmacy.address}, {pharmacy.city}, {pharmacy.state} {pharmacy.zipCode}
          </p>

          <p className="text-sm text-gray-500 mt-1">{pharmacy.phone}</p>

          {/* Hours and Features */}
          <div className="flex flex-wrap items-center gap-2 mt-2">
            <span
              className={`text-xs px-2 py-1 rounded-full ${
                pharmacy.isOpen24Hours
                  ? 'bg-green-100 text-green-700'
                  : 'bg-gray-100 text-gray-600'
              }`}
            >
              {pharmacy.hours}
            </span>

            {pharmacy.hasDelivery && (
              <span className="text-xs px-2 py-1 rounded-full bg-purple-100 text-purple-700">
                Delivery
              </span>
            )}

            {pharmacy.hasDriveThru && (
              <span className="text-xs px-2 py-1 rounded-full bg-orange-100 text-orange-700">
                Drive-Thru
              </span>
            )}
          </div>
        </div>

        {/* Selection Indicator */}
        <div className="flex-shrink-0 hidden sm:flex items-center">
          {isSelected ? (
            <div className="w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center">
              <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fillRule="evenodd"
                  d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
          ) : (
            <div className="w-6 h-6 border-2 border-gray-300 rounded-full" />
          )}
        </div>
      </div>
    </button>
  );
}

export default PharmacySearch;
