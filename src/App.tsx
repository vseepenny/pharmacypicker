import React, { useState } from 'react';
import { PharmacySearch } from './components/PharmacySearch';
import { Pharmacy } from './types';

function App() {
  const [selectedPharmacy, setSelectedPharmacy] = useState<Pharmacy | null>(null);

  const handlePharmacySelect = (pharmacy: Pharmacy) => {
    setSelectedPharmacy(pharmacy);
    console.log('Selected pharmacy:', pharmacy);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <PharmacySearch onSelectPharmacy={handlePharmacySelect} />

      {/* Desktop confirmation panel - shows when pharmacy is selected */}
      {selectedPharmacy && (
        <div className="hidden sm:block fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-lg z-[1001]">
          <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center">
                <svg className="h-5 w-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              </div>
              <div>
                <p className="font-semibold text-gray-900">{selectedPharmacy.name}</p>
                <p className="text-sm text-gray-500">
                  {selectedPharmacy.address}, {selectedPharmacy.city}
                  {selectedPharmacy.distance !== undefined && (
                    <span className="ml-2 text-blue-600">({selectedPharmacy.distance.toFixed(1)} mi)</span>
                  )}
                </p>
              </div>
            </div>
            <button
              onClick={() => {
                alert(`You selected: ${selectedPharmacy.name}\n${selectedPharmacy.address}, ${selectedPharmacy.city}, ${selectedPharmacy.state} ${selectedPharmacy.zipCode}`);
              }}
              className="bg-blue-600 text-white px-6 py-2.5 rounded-lg font-medium
                       hover:bg-blue-700 transition-colors"
            >
              Continue with this pharmacy
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
