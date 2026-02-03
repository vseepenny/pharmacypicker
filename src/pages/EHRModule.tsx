import {
  User,
  AlertTriangle,
  FileText,
  Activity,
  Pill,
  Calendar,
  ClipboardList,
  Share2,
  Shield,
  Clock,
  Building2,
  MapPin
} from 'lucide-react';
import type { Patient } from '../types';

// Mock patient data
const mockPatient: Patient = {
  id: '1',
  aNumber: 'A# 098-765-432',
  firstName: 'John',
  lastName: 'Doe',
  dateOfBirth: '1985-03-15',
  gender: 'M',
  housingUnit: 'Unit 4A',
  bedAssignment: 'Bed 12',
  custodyLevel: 'Medium',
  facilityName: 'Adelanto IPC',
  admissionDate: '2024-01-15',
  allergies: ['Penicillin', 'Sulfa drugs'],
  activeProblems: ['Hypertension', 'Type 2 Diabetes', 'Anxiety Disorder'],
  medications: [
    {
      id: '1',
      name: 'Metformin',
      dosage: '500mg',
      frequency: 'BID',
      route: 'PO',
      startDate: '2024-01-16',
      prescriber: 'Dr. Smith',
      isControlled: false,
      kop: true,
      dot: false,
    },
    {
      id: '2',
      name: 'Lisinopril',
      dosage: '10mg',
      frequency: 'Daily',
      route: 'PO',
      startDate: '2024-01-16',
      prescriber: 'Dr. Smith',
      isControlled: false,
      kop: true,
      dot: false,
    },
  ],
  medicalHold: false,
  transferClearance: true,
};

export default function EHRModule() {
  return (
    <div className="p-6 max-w-[1440px] mx-auto">
      {/* Patient Header Banner */}
      <div className="card mb-6">
        <div className="flex flex-col lg:flex-row lg:items-start gap-6">
          {/* Patient Photo & Basic Info */}
          <div className="flex items-start gap-4">
            <div className="w-24 h-24 bg-neutral-gray-200 rounded-lg flex items-center justify-center flex-shrink-0">
              <User className="w-12 h-12 text-neutral-gray-400" />
            </div>
            <div>
              <div className="flex items-center gap-3 mb-1">
                <h1 className="text-2xl font-bold text-neutral-gray-700">
                  {mockPatient.lastName}, {mockPatient.firstName}
                </h1>
                {/* Custody Status - RED and BOLD as per requirements */}
                <span className="custody-status-alert px-2 py-0.5 bg-red-100 rounded text-sm">
                  {mockPatient.custodyLevel} Custody
                </span>
              </div>
              <div className="text-lg font-mono text-vsee-primary mb-2">
                {mockPatient.aNumber}
              </div>
              <div className="flex flex-wrap gap-4 text-sm text-neutral-gray-600">
                <span className="flex items-center gap-1">
                  <Calendar className="w-4 h-4" />
                  DOB: {new Date(mockPatient.dateOfBirth).toLocaleDateString()}
                </span>
                <span>Sex: {mockPatient.gender === 'M' ? 'Male' : 'Female'}</span>
                <span className="flex items-center gap-1">
                  <Building2 className="w-4 h-4" />
                  {mockPatient.housingUnit}, {mockPatient.bedAssignment}
                </span>
              </div>
            </div>
          </div>

          {/* Detention-Specific Info */}
          <div className="lg:ml-auto grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="bg-neutral-gray-100 rounded-lg p-3 text-center">
              <div className="text-xs text-neutral-gray-500 mb-1">Facility</div>
              <div className="font-medium text-sm">{mockPatient.facilityName}</div>
            </div>
            <div className="bg-neutral-gray-100 rounded-lg p-3 text-center">
              <div className="text-xs text-neutral-gray-500 mb-1">Admission</div>
              <div className="font-medium text-sm">
                {new Date(mockPatient.admissionDate).toLocaleDateString()}
              </div>
            </div>
            <div className={`rounded-lg p-3 text-center ${mockPatient.medicalHold ? 'bg-red-100' : 'bg-green-100'}`}>
              <div className="text-xs text-neutral-gray-500 mb-1">Medical Hold</div>
              <div className={`font-medium text-sm ${mockPatient.medicalHold ? 'text-status-error' : 'text-status-success'}`}>
                {mockPatient.medicalHold ? 'Yes' : 'None'}
              </div>
            </div>
            <div className={`rounded-lg p-3 text-center ${mockPatient.transferClearance ? 'bg-green-100' : 'bg-yellow-100'}`}>
              <div className="text-xs text-neutral-gray-500 mb-1">Transfer</div>
              <div className={`font-medium text-sm ${mockPatient.transferClearance ? 'text-status-success' : 'text-status-warning'}`}>
                {mockPatient.transferClearance ? 'Cleared' : 'Pending'}
              </div>
            </div>
          </div>
        </div>

        {/* Interoperability Indicators */}
        <div className="mt-4 pt-4 border-t border-neutral-gray-200 flex items-center justify-between flex-wrap gap-4">
          <div className="flex items-center gap-2">
            <Share2 className="w-4 h-4 text-neutral-gray-500" />
            <span className="text-sm text-neutral-gray-500">Interoperability:</span>
            <span className="interop-badge interop-hl7">HL7</span>
            <span className="interop-badge interop-fhir">FHIR</span>
            <span className="interop-badge interop-ccda">C-CDA</span>
            <span className="interop-badge bg-blue-100 text-blue-800">Direct Messaging</span>
          </div>
          <div className="onc-hit-badge">
            <Shield className="w-3 h-3 mr-1" />
            ONC-HIT Certified
          </div>
        </div>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column - Medical Summary */}
        <div className="lg:col-span-2 space-y-6">
          {/* Allergies */}
          <div className="card">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-neutral-gray-700 flex items-center gap-2">
                <AlertTriangle className="w-5 h-5 text-status-error" />
                Allergies
              </h2>
            </div>
            <div className="flex flex-wrap gap-2">
              {mockPatient.allergies.map((allergy, index) => (
                <span key={index} className="badge badge-error">
                  {allergy}
                </span>
              ))}
            </div>
          </div>

          {/* Active Problems */}
          <div className="card">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-neutral-gray-700 flex items-center gap-2">
                <Activity className="w-5 h-5 text-vsee-primary" />
                Active Problems
              </h2>
              <button className="text-sm text-vsee-primary hover:underline">View All</button>
            </div>
            <div className="space-y-2">
              {mockPatient.activeProblems.map((problem, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between py-2 border-b border-neutral-gray-200 last:border-0"
                >
                  <span className="text-neutral-gray-700">{problem}</span>
                  <span className="badge badge-info">Active</span>
                </div>
              ))}
            </div>
          </div>

          {/* Current Medications */}
          <div className="card">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-neutral-gray-700 flex items-center gap-2">
                <Pill className="w-5 h-5 text-module-pharmacy" />
                Current Medications
              </h2>
              <button className="text-sm text-vsee-primary hover:underline">View All</button>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="table-header">
                    <th className="text-left px-4 py-2">Medication</th>
                    <th className="text-left px-4 py-2">Dosage</th>
                    <th className="text-left px-4 py-2">Frequency</th>
                    <th className="text-left px-4 py-2">Route</th>
                    <th className="text-left px-4 py-2">Type</th>
                  </tr>
                </thead>
                <tbody>
                  {mockPatient.medications.map((med) => (
                    <tr key={med.id} className="table-row">
                      <td className="table-cell font-medium">{med.name}</td>
                      <td className="table-cell">{med.dosage}</td>
                      <td className="table-cell">{med.frequency}</td>
                      <td className="table-cell">{med.route}</td>
                      <td className="table-cell">
                        {med.kop && <span className="badge badge-success mr-1">KOP</span>}
                        {med.dot && <span className="badge badge-warning mr-1">DOT</span>}
                        {med.isControlled && <span className="badge badge-error">Controlled</span>}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Transfer History */}
          <div className="card">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-neutral-gray-700 flex items-center gap-2">
                <MapPin className="w-5 h-5 text-vsee-primary" />
                Transfer History Between ICE Facilities
              </h2>
            </div>
            <div className="space-y-3">
              <div className="flex items-start gap-3 py-2 border-l-4 border-vsee-primary pl-4">
                <Clock className="w-4 h-4 text-neutral-gray-400 mt-0.5" />
                <div>
                  <div className="font-medium text-neutral-gray-700">Adelanto ICE Processing Center</div>
                  <div className="text-sm text-neutral-gray-500">Admitted: Jan 15, 2024 - Present</div>
                </div>
              </div>
              <div className="flex items-start gap-3 py-2 border-l-4 border-neutral-gray-300 pl-4">
                <Clock className="w-4 h-4 text-neutral-gray-400 mt-0.5" />
                <div>
                  <div className="font-medium text-neutral-gray-600">Otay Mesa Detention Center</div>
                  <div className="text-sm text-neutral-gray-500">Dec 1, 2023 - Jan 14, 2024</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column - Quick Actions & Integration */}
        <div className="space-y-6">
          {/* Quick Actions */}
          <div className="card">
            <h2 className="text-lg font-semibold text-neutral-gray-700 mb-4">Quick Actions</h2>
            <div className="space-y-2">
              <button className="btn-primary w-full flex items-center justify-center gap-2">
                <FileText className="w-4 h-4" />
                New Encounter Note
              </button>
              <button className="btn-secondary w-full flex items-center justify-center gap-2">
                <Pill className="w-4 h-4" />
                New Order
              </button>
              <button className="btn-secondary w-full flex items-center justify-center gap-2">
                <ClipboardList className="w-4 h-4" />
                Create Referral
              </button>
            </div>
          </div>

          {/* Integration Indicator */}
          <div className="card">
            <h2 className="text-lg font-semibold text-neutral-gray-700 mb-4">Connected Modules</h2>
            <div className="space-y-2">
              {[
                { name: 'Pharmacy', color: 'bg-module-pharmacy', status: 'Online' },
                { name: 'MAR', color: 'bg-module-mar', status: 'Online' },
                { name: 'Referrals', color: 'bg-module-referral', status: 'Online' },
                { name: 'Dental', color: 'bg-module-dental', status: 'Online' },
                { name: 'Claims', color: 'bg-module-claims', status: 'Online' },
              ].map((module) => (
                <div key={module.name} className="flex items-center justify-between py-2">
                  <div className="flex items-center gap-2">
                    <div className={`w-3 h-3 rounded-full ${module.color}`}></div>
                    <span className="text-sm text-neutral-gray-700">{module.name}</span>
                  </div>
                  <span className="status-dot status-online"></span>
                </div>
              ))}
            </div>
          </div>

          {/* Recent Activity */}
          <div className="card">
            <h2 className="text-lg font-semibold text-neutral-gray-700 mb-4">Recent Activity</h2>
            <div className="space-y-3">
              <div className="text-sm">
                <div className="text-neutral-gray-700">Vitals recorded</div>
                <div className="text-neutral-gray-500 text-xs">Today, 8:30 AM - Nurse Johnson</div>
              </div>
              <div className="text-sm">
                <div className="text-neutral-gray-700">Medication administered</div>
                <div className="text-neutral-gray-500 text-xs">Today, 7:00 AM - Nurse Smith</div>
              </div>
              <div className="text-sm">
                <div className="text-neutral-gray-700">Lab results received</div>
                <div className="text-neutral-gray-500 text-xs">Yesterday, 3:45 PM - System</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
