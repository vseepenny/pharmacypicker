import {
  Building2,
  Users,
  AlertTriangle,
  BarChart3,
  MapPin,
  ArrowRight,
  Settings,
  Download,
  RefreshCw,
  CheckCircle,
  Clock
} from 'lucide-react';
import { useState } from 'react';
import type { Facility } from '../types';

// Mock facilities data
const mockFacilities: (Facility & {
  utilizationRate: number;
  pendingTransfers: number;
  medicalHolds: number;
  staffedBeds: number;
})[] = [
  {
    id: '1',
    name: 'Adelanto ICE Processing Center',
    type: 'IPC',
    address: '10250 Rancho Rd',
    city: 'Adelanto',
    state: 'CA',
    census: 1180,
    capacity: 1455,
    utilizationRate: 81,
    pendingTransfers: 12,
    medicalHolds: 5,
    staffedBeds: 1400,
  },
  {
    id: '2',
    name: 'South Texas Family Residential Center',
    type: 'SPC',
    address: '4226 FM 3168',
    city: 'Dilley',
    state: 'TX',
    census: 2100,
    capacity: 2400,
    utilizationRate: 88,
    pendingTransfers: 8,
    medicalHolds: 3,
    staffedBeds: 2400,
  },
  {
    id: '3',
    name: 'Otay Mesa Detention Center',
    type: 'CDF',
    address: '7488 Calzada de la Fuente',
    city: 'San Diego',
    state: 'CA',
    census: 820,
    capacity: 1100,
    utilizationRate: 75,
    pendingTransfers: 15,
    medicalHolds: 8,
    staffedBeds: 1050,
  },
  {
    id: '4',
    name: 'Tacoma Northwest Detention Center',
    type: 'CDF',
    address: '1623 E J St',
    city: 'Tacoma',
    state: 'WA',
    census: 1450,
    capacity: 1575,
    utilizationRate: 92,
    pendingTransfers: 5,
    medicalHolds: 2,
    staffedBeds: 1575,
  },
];

// Mock comparison data
const comparisonMetrics = [
  { metric: 'Avg Length of Stay', unit: 'days', facilities: { 'Adelanto IPC': 45, 'S. Texas FRC': 38, 'Otay Mesa': 52, 'Tacoma NW': 41 } },
  { metric: 'Medical Encounters/Day', unit: '', facilities: { 'Adelanto IPC': 234, 'S. Texas FRC': 412, 'Otay Mesa': 156, 'Tacoma NW': 289 } },
  { metric: 'Rx Cost per Detainee', unit: '$', facilities: { 'Adelanto IPC': 127, 'S. Texas FRC': 98, 'Otay Mesa': 145, 'Tacoma NW': 112 } },
  { metric: 'External Referral Rate', unit: '%', facilities: { 'Adelanto IPC': 8.2, 'S. Texas FRC': 6.5, 'Otay Mesa': 11.3, 'Tacoma NW': 7.8 } },
];

export default function FacilitiesModule() {
  const [selectedFacility, setSelectedFacility] = useState<string | null>(null);

  const totalCensus = mockFacilities.reduce((sum, f) => sum + f.census, 0);
  const totalCapacity = mockFacilities.reduce((sum, f) => sum + f.capacity, 0);
  const overallUtilization = Math.round((totalCensus / totalCapacity) * 100);

  return (
    <div className="p-6 max-w-[1440px] mx-auto">
      {/* Page Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-neutral-gray-700">Multi-Facility Management</h1>
          <p className="text-neutral-gray-500">Enterprise dashboard for all IHSC facilities</p>
        </div>
        <div className="flex items-center gap-3">
          <button className="btn-secondary flex items-center gap-2">
            <Download className="w-4 h-4" />
            Export Reports
          </button>
          <button className="btn-secondary flex items-center gap-2">
            <Settings className="w-4 h-4" />
            Configuration
          </button>
        </div>
      </div>

      {/* Enterprise Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <div className="card">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-neutral-gray-500">Total Census</p>
              <p className="text-2xl font-bold text-neutral-gray-700">{totalCensus.toLocaleString()}</p>
            </div>
            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
              <Users className="w-6 h-6 text-blue-600" />
            </div>
          </div>
          <div className="mt-2 text-sm text-neutral-gray-500">
            Capacity: {totalCapacity.toLocaleString()}
          </div>
        </div>

        <div className="card">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-neutral-gray-500">Overall Utilization</p>
              <p className="text-2xl font-bold text-neutral-gray-700">{overallUtilization}%</p>
            </div>
            <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
              overallUtilization > 90 ? 'bg-red-100' : overallUtilization > 80 ? 'bg-yellow-100' : 'bg-green-100'
            }`}>
              <BarChart3 className={`w-6 h-6 ${
                overallUtilization > 90 ? 'text-red-600' : overallUtilization > 80 ? 'text-yellow-600' : 'text-green-600'
              }`} />
            </div>
          </div>
          <div className="mt-2">
            <div className="w-full bg-neutral-gray-200 rounded-full h-2">
              <div
                className={`h-2 rounded-full ${
                  overallUtilization > 90 ? 'bg-status-error' : overallUtilization > 80 ? 'bg-status-warning' : 'bg-status-success'
                }`}
                style={{ width: `${overallUtilization}%` }}
              ></div>
            </div>
          </div>
        </div>

        <div className="card">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-neutral-gray-500">Active Facilities</p>
              <p className="text-2xl font-bold text-neutral-gray-700">{mockFacilities.length}</p>
            </div>
            <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
              <Building2 className="w-6 h-6 text-green-600" />
            </div>
          </div>
          <div className="mt-2 flex items-center text-sm text-status-success">
            <CheckCircle className="w-4 h-4 mr-1" />
            All systems online
          </div>
        </div>

        <div className="card">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-neutral-gray-500">Pending Transfers</p>
              <p className="text-2xl font-bold text-neutral-gray-700">
                {mockFacilities.reduce((sum, f) => sum + f.pendingTransfers, 0)}
              </p>
            </div>
            <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center">
              <ArrowRight className="w-6 h-6 text-orange-600" />
            </div>
          </div>
          <div className="mt-2 flex items-center text-sm text-status-warning">
            <Clock className="w-4 h-4 mr-1" />
            18 require medical clearance
          </div>
        </div>
      </div>

      {/* Facility Cards Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        {mockFacilities.map((facility) => (
          <div
            key={facility.id}
            className={`card cursor-pointer transition-all ${
              selectedFacility === facility.id ? 'ring-2 ring-vsee-primary' : 'hover:shadow-card-hover'
            }`}
            onClick={() => setSelectedFacility(selectedFacility === facility.id ? null : facility.id)}
          >
            <div className="flex items-start justify-between mb-4">
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="font-semibold text-neutral-gray-700">{facility.name}</h3>
                  <span className="badge badge-info">{facility.type}</span>
                </div>
                <div className="flex items-center gap-1 text-sm text-neutral-gray-500 mt-1">
                  <MapPin className="w-3 h-3" />
                  {facility.city}, {facility.state}
                </div>
              </div>
              <button className="text-vsee-primary hover:underline text-sm">
                Switch to Facility
              </button>
            </div>

            {/* Census Bar */}
            <div className="mb-4">
              <div className="flex items-center justify-between text-sm mb-1">
                <span className="text-neutral-gray-600">Census / Capacity</span>
                <span className="font-medium">
                  {facility.census.toLocaleString()} / {facility.capacity.toLocaleString()}
                </span>
              </div>
              <div className="w-full bg-neutral-gray-200 rounded-full h-3">
                <div
                  className={`h-3 rounded-full ${
                    facility.utilizationRate > 90 ? 'bg-status-error' :
                    facility.utilizationRate > 80 ? 'bg-status-warning' : 'bg-status-success'
                  }`}
                  style={{ width: `${facility.utilizationRate}%` }}
                ></div>
              </div>
              <div className="flex items-center justify-between text-xs text-neutral-gray-500 mt-1">
                <span>{facility.utilizationRate}% utilized</span>
                <span>{facility.staffedBeds - facility.census} beds available</span>
              </div>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-3 gap-4">
              <div className="text-center p-2 bg-neutral-gray-100 rounded-lg">
                <div className="text-lg font-semibold text-neutral-gray-700">{facility.pendingTransfers}</div>
                <div className="text-xs text-neutral-gray-500">Pending Transfers</div>
              </div>
              <div className="text-center p-2 bg-neutral-gray-100 rounded-lg">
                <div className="text-lg font-semibold text-status-error">{facility.medicalHolds}</div>
                <div className="text-xs text-neutral-gray-500">Medical Holds</div>
              </div>
              <div className="text-center p-2 bg-neutral-gray-100 rounded-lg">
                <div className="text-lg font-semibold text-neutral-gray-700">{facility.staffedBeds}</div>
                <div className="text-xs text-neutral-gray-500">Staffed Beds</div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Cross-Facility Patient Transfer */}
      <div className="card mb-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-neutral-gray-700">Cross-Facility Patient Transfer Workflow</h2>
          <button className="btn-primary flex items-center gap-2">
            <Plus className="w-4 h-4" />
            Initiate Transfer
          </button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="table-header">
                <th className="text-left px-4 py-3">Patient</th>
                <th className="text-left px-4 py-3">From</th>
                <th className="text-left px-4 py-3">To</th>
                <th className="text-left px-4 py-3">Medical Clearance</th>
                <th className="text-left px-4 py-3">Status</th>
                <th className="text-left px-4 py-3">Actions</th>
              </tr>
            </thead>
            <tbody>
              <tr className="table-row">
                <td className="table-cell">
                  <div className="font-medium">Garcia, Maria</div>
                  <div className="text-xs text-vsee-primary">A# 098-765-445</div>
                </td>
                <td className="table-cell">Adelanto IPC</td>
                <td className="table-cell">S. Texas FRC</td>
                <td className="table-cell">
                  <span className="badge badge-success">Cleared</span>
                </td>
                <td className="table-cell">
                  <span className="badge badge-warning">Pending Transport</span>
                </td>
                <td className="table-cell">
                  <button className="text-vsee-primary hover:underline text-sm">View Details</button>
                </td>
              </tr>
              <tr className="table-row">
                <td className="table-cell">
                  <div className="font-medium">Nguyen, Thanh</div>
                  <div className="text-xs text-vsee-primary">A# 098-765-456</div>
                </td>
                <td className="table-cell">Otay Mesa</td>
                <td className="table-cell">Tacoma NW</td>
                <td className="table-cell">
                  <span className="badge badge-error">Pending</span>
                </td>
                <td className="table-cell">
                  <span className="badge bg-neutral-gray-100 text-neutral-gray-700">Awaiting Clearance</span>
                </td>
                <td className="table-cell">
                  <button className="text-vsee-primary hover:underline text-sm">Review</button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Facility Comparison Reports */}
      <div className="card">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-neutral-gray-700">Facility Comparison Reports</h2>
          <div className="flex items-center gap-2">
            <button className="btn-secondary py-1.5 flex items-center gap-1">
              <RefreshCw className="w-4 h-4" />
              Refresh
            </button>
            <button className="btn-secondary py-1.5 flex items-center gap-1">
              <Download className="w-4 h-4" />
              Export
            </button>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="table-header">
                <th className="text-left px-4 py-3">Metric</th>
                <th className="text-center px-4 py-3">Adelanto IPC</th>
                <th className="text-center px-4 py-3">S. Texas FRC</th>
                <th className="text-center px-4 py-3">Otay Mesa</th>
                <th className="text-center px-4 py-3">Tacoma NW</th>
              </tr>
            </thead>
            <tbody>
              {comparisonMetrics.map((row, index) => (
                <tr key={index} className="table-row">
                  <td className="table-cell font-medium">{row.metric}</td>
                  <td className="table-cell text-center">
                    {row.unit === '$' ? '$' : ''}{row.facilities['Adelanto IPC']}{row.unit === '%' ? '%' : row.unit === 'days' ? ' days' : ''}
                  </td>
                  <td className="table-cell text-center">
                    {row.unit === '$' ? '$' : ''}{row.facilities['S. Texas FRC']}{row.unit === '%' ? '%' : row.unit === 'days' ? ' days' : ''}
                  </td>
                  <td className="table-cell text-center">
                    {row.unit === '$' ? '$' : ''}{row.facilities['Otay Mesa']}{row.unit === '%' ? '%' : row.unit === 'days' ? ' days' : ''}
                  </td>
                  <td className="table-cell text-center">
                    {row.unit === '$' ? '$' : ''}{row.facilities['Tacoma NW']}{row.unit === '%' ? '%' : row.unit === 'days' ? ' days' : ''}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Role-Based Access Notice */}
      <div className="mt-6 bg-blue-50 border border-blue-200 rounded-lg p-4">
        <div className="flex items-start gap-3">
          <AlertTriangle className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
          <div>
            <p className="font-medium text-blue-800">Role-Based Access by Facility</p>
            <p className="text-sm text-blue-700">Your access level varies by facility. You have full administrative access at Adelanto IPC and read-only access at other facilities. Contact your administrator to request additional permissions.</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function Plus(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M5 12h14"/>
      <path d="M12 5v14"/>
    </svg>
  );
}
