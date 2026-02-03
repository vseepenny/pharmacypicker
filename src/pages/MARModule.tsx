import {
  User,
  Clock,
  CheckCircle,
  XCircle,
  AlertTriangle,
  Scan,
  Camera,
  Filter,
  Calendar,
  ChevronLeft,
  ChevronRight,
  Eye,
  FileText
} from 'lucide-react';
import { useState } from 'react';

// Time slots for the MAR grid
const timeSlots = ['06:00', '08:00', '12:00', '14:00', '18:00', '20:00', '22:00'];

// Mock MAR data organized by housing unit
const marData: {
  patientId: string;
  patientName: string;
  aNumber: string;
  photo: string | null;
  housingUnit: string;
  bed: string;
  medications: {
    name: string;
    times: string[];
    administered: Record<string, boolean>;
  }[];
}[] = [
  {
    patientId: '1',
    patientName: 'Doe, John',
    aNumber: 'A# 098-765-432',
    photo: null,
    housingUnit: 'Unit 4A',
    bed: 'Bed 12',
    medications: [
      { name: 'Metformin 500mg', times: ['08:00', '18:00'], administered: { '08:00': true, '18:00': false } },
      { name: 'Lisinopril 10mg', times: ['08:00'], administered: { '08:00': true } },
    ]
  },
  {
    patientId: '2',
    patientName: 'Smith, Jane',
    aNumber: 'A# 098-765-433',
    photo: null,
    housingUnit: 'Unit 4A',
    bed: 'Bed 14',
    medications: [
      { name: 'Sertraline 50mg', times: ['08:00'], administered: { '08:00': true } },
      { name: 'Gabapentin 300mg', times: ['08:00', '14:00', '20:00'], administered: { '08:00': true, '14:00': false, '20:00': false } },
    ]
  },
  {
    patientId: '3',
    patientName: 'Johnson, Mike',
    aNumber: 'A# 098-765-434',
    photo: null,
    housingUnit: 'Unit 4A',
    bed: 'Bed 16',
    medications: [
      { name: 'Omeprazole 20mg', times: ['06:00'], administered: { '06:00': true } },
      { name: 'Atorvastatin 20mg', times: ['20:00'], administered: { '20:00': false } },
    ]
  },
];

// Mock stats
const marStats = {
  totalDue: 156,
  administered: 124,
  pending: 28,
  refused: 3,
  held: 1,
};

export default function MARModule() {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedUnit, setSelectedUnit] = useState('Unit 4A');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' });
  };

  return (
    <div className="p-6 max-w-[1440px] mx-auto">
      {/* Page Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-neutral-gray-700">Medication Administration Record</h1>
          <p className="text-neutral-gray-500">Pill Line / Med Pass Management</p>
        </div>
        <div className="flex items-center gap-3">
          <button className="btn-secondary flex items-center gap-2">
            <Scan className="w-4 h-4" />
            Barcode Scan
          </button>
          <button className="btn-primary flex items-center gap-2">
            <FileText className="w-4 h-4" />
            Print MAR
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-6">
        <div className="card text-center">
          <div className="text-2xl font-bold text-neutral-gray-700">{marStats.totalDue}</div>
          <div className="text-sm text-neutral-gray-500">Total Due</div>
        </div>
        <div className="card text-center bg-green-50">
          <div className="text-2xl font-bold text-status-success">{marStats.administered}</div>
          <div className="text-sm text-neutral-gray-500">Administered</div>
        </div>
        <div className="card text-center bg-yellow-50">
          <div className="text-2xl font-bold text-status-warning">{marStats.pending}</div>
          <div className="text-sm text-neutral-gray-500">Pending</div>
        </div>
        <div className="card text-center bg-red-50">
          <div className="text-2xl font-bold text-status-error">{marStats.refused}</div>
          <div className="text-sm text-neutral-gray-500">Refused</div>
        </div>
        <div className="card text-center bg-neutral-gray-100">
          <div className="text-2xl font-bold text-neutral-gray-600">{marStats.held}</div>
          <div className="text-sm text-neutral-gray-500">Held</div>
        </div>
      </div>

      {/* Controls Bar */}
      <div className="card mb-6">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          {/* Date Navigation */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => setSelectedDate(new Date(selectedDate.getTime() - 86400000))}
              className="p-2 hover:bg-neutral-gray-100 rounded"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <div className="flex items-center gap-2 px-4 py-2 bg-neutral-gray-100 rounded-lg">
              <Calendar className="w-4 h-4 text-neutral-gray-500" />
              <span className="font-medium">{formatDate(selectedDate)}</span>
            </div>
            <button
              onClick={() => setSelectedDate(new Date(selectedDate.getTime() + 86400000))}
              className="p-2 hover:bg-neutral-gray-100 rounded"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
            <button
              onClick={() => setSelectedDate(new Date())}
              className="text-sm text-vsee-primary hover:underline ml-2"
            >
              Today
            </button>
          </div>

          {/* Housing Unit Selector */}
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <label className="text-sm text-neutral-gray-600">Housing Unit:</label>
              <select
                value={selectedUnit}
                onChange={(e) => setSelectedUnit(e.target.value)}
                className="input w-auto py-1.5"
              >
                <option>Unit 4A</option>
                <option>Unit 4B</option>
                <option>Unit 5A</option>
                <option>Unit 5B</option>
                <option>Medical Housing</option>
                <option>Segregation</option>
              </select>
            </div>
            <button className="btn-secondary flex items-center gap-2 py-1.5">
              <Filter className="w-4 h-4" />
              Filters
            </button>
          </div>

          {/* View Toggle */}
          <div className="flex items-center gap-1 bg-neutral-gray-100 rounded-lg p-1">
            <button
              onClick={() => setViewMode('grid')}
              className={`px-3 py-1.5 text-sm rounded ${
                viewMode === 'grid' ? 'bg-white shadow text-vsee-primary' : 'text-neutral-gray-600'
              }`}
            >
              Grid View
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`px-3 py-1.5 text-sm rounded ${
                viewMode === 'list' ? 'bg-white shadow text-vsee-primary' : 'text-neutral-gray-600'
              }`}
            >
              List View
            </button>
          </div>
        </div>
      </div>

      {/* Barcode Scanning Notice */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
        <div className="flex items-start gap-3">
          <Scan className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
          <div>
            <p className="font-medium text-blue-800">Barcode Verification Active</p>
            <p className="text-sm text-blue-700">Scan patient wristband and medication barcode to verify identity and medication before administration.</p>
          </div>
        </div>
      </div>

      {/* MAR Grid View */}
      {viewMode === 'grid' && (
        <div className="card overflow-x-auto">
          <table className="w-full min-w-[900px]">
            <thead>
              <tr className="table-header">
                <th className="text-left px-4 py-3 w-64">Patient</th>
                <th className="text-left px-4 py-3">Medication</th>
                {timeSlots.map((time) => (
                  <th key={time} className="text-center px-2 py-3 w-16">{time}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {marData.map((patient) => (
                patient.medications.map((med, medIndex) => (
                  <tr key={`${patient.patientId}-${medIndex}`} className="table-row">
                    {medIndex === 0 && (
                      <td className="table-cell align-top" rowSpan={patient.medications.length}>
                        <div className="flex items-start gap-3">
                          {/* Large Patient Photo - Critical for identity verification in uniform environment */}
                          <div className="w-16 h-16 bg-neutral-gray-200 rounded-lg flex items-center justify-center flex-shrink-0">
                            {patient.photo ? (
                              <img src={patient.photo} alt={patient.patientName} className="w-full h-full object-cover rounded-lg" />
                            ) : (
                              <User className="w-8 h-8 text-neutral-gray-400" />
                            )}
                          </div>
                          <div>
                            <div className="font-medium text-neutral-gray-700">{patient.patientName}</div>
                            <div className="text-xs text-vsee-primary font-mono">{patient.aNumber}</div>
                            <div className="text-xs text-neutral-gray-500 mt-1">{patient.housingUnit}, {patient.bed}</div>
                            <button className="text-xs text-vsee-primary hover:underline mt-1 flex items-center gap-1">
                              <Camera className="w-3 h-3" />
                              Verify ID
                            </button>
                          </div>
                        </div>
                      </td>
                    )}
                    <td className="table-cell">
                      <span className="font-medium">{med.name}</span>
                    </td>
                    {timeSlots.map((time) => {
                      const isDue = med.times.includes(time);
                      const isAdministered = med.administered[time];

                      return (
                        <td key={time} className="table-cell text-center p-1">
                          {isDue ? (
                            <button
                              className={`w-10 h-10 rounded-lg flex items-center justify-center transition-colors ${
                                isAdministered
                                  ? 'bg-green-100 text-status-success'
                                  : 'bg-yellow-100 text-status-warning hover:bg-yellow-200'
                              }`}
                            >
                              {isAdministered ? (
                                <CheckCircle className="w-5 h-5" />
                              ) : (
                                <Clock className="w-5 h-5" />
                              )}
                            </button>
                          ) : (
                            <span className="text-neutral-gray-300">-</span>
                          )}
                        </td>
                      );
                    })}
                  </tr>
                ))
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* MAR List View */}
      {viewMode === 'list' && (
        <div className="space-y-4">
          {marData.map((patient) => (
            <div key={patient.patientId} className="card">
              <div className="flex items-start gap-4 mb-4 pb-4 border-b border-neutral-gray-200">
                {/* Large Patient Photo */}
                <div className="w-20 h-20 bg-neutral-gray-200 rounded-lg flex items-center justify-center flex-shrink-0">
                  {patient.photo ? (
                    <img src={patient.photo} alt={patient.patientName} className="w-full h-full object-cover rounded-lg" />
                  ) : (
                    <User className="w-10 h-10 text-neutral-gray-400" />
                  )}
                </div>
                <div className="flex-1">
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="text-lg font-semibold text-neutral-gray-700">{patient.patientName}</h3>
                      <p className="text-vsee-primary font-mono">{patient.aNumber}</p>
                      <p className="text-sm text-neutral-gray-500">{patient.housingUnit}, {patient.bed}</p>
                    </div>
                    <div className="flex gap-2">
                      <button className="btn-secondary py-1.5 flex items-center gap-1">
                        <Scan className="w-4 h-4" />
                        Scan
                      </button>
                      <button className="btn-secondary py-1.5 flex items-center gap-1">
                        <Eye className="w-4 h-4" />
                        View Chart
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              <div className="space-y-3">
                {patient.medications.map((med, index) => (
                  <div key={index} className="flex items-center justify-between py-2 px-3 bg-neutral-gray-50 rounded-lg">
                    <div className="flex items-center gap-3">
                      <div className="font-medium text-neutral-gray-700">{med.name}</div>
                      <div className="text-sm text-neutral-gray-500">
                        Due: {med.times.join(', ')}
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      {med.times.map((time) => (
                        <div key={time} className="flex items-center gap-1">
                          <span className="text-xs text-neutral-gray-500">{time}</span>
                          {med.administered[time] ? (
                            <CheckCircle className="w-5 h-5 text-status-success" />
                          ) : (
                            <button className="btn-primary py-1 px-2 text-xs">Give</button>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Refusal Documentation Modal (conceptual) */}
      <div className="hidden">
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-xl max-w-md w-full mx-4 p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center">
                <XCircle className="w-5 h-5 text-status-error" />
              </div>
              <div>
                <h3 className="font-semibold text-neutral-gray-700">Document Refusal</h3>
                <p className="text-sm text-neutral-gray-500">Patient refused medication</p>
              </div>
            </div>

            <div className="space-y-4 mb-4">
              <div>
                <label className="block text-sm font-medium text-neutral-gray-700 mb-1">Reason Code</label>
                <select className="input">
                  <option>Patient refused - no reason given</option>
                  <option>Patient refused - side effects</option>
                  <option>Patient refused - religious/cultural</option>
                  <option>Patient unavailable</option>
                  <option>Other - see notes</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-neutral-gray-700 mb-1">Notes</label>
                <textarea className="input h-24" placeholder="Additional documentation..."></textarea>
              </div>
              <div>
                <label className="block text-sm font-medium text-neutral-gray-700 mb-1">Witness</label>
                <input type="text" className="input" placeholder="Witness name" />
              </div>
            </div>

            <div className="flex gap-3">
              <button className="btn-secondary flex-1">Cancel</button>
              <button className="btn-danger flex-1">Document Refusal</button>
            </div>
          </div>
        </div>
      </div>

      {/* Missed Dose Alert */}
      <div className="fixed bottom-6 right-6 z-40">
        <div className="bg-status-error text-white p-4 rounded-lg shadow-lg max-w-sm">
          <div className="flex items-start gap-3">
            <AlertTriangle className="w-5 h-5 flex-shrink-0 mt-0.5" />
            <div>
              <p className="font-medium">Missed Dose Alert</p>
              <p className="text-sm text-white/80">3 medications past due time window. Review immediately.</p>
              <button className="mt-2 text-sm underline">View Details</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
