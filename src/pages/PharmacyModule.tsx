import {
  Search,
  Plus,
  AlertTriangle,
  Package,
  Pill,
  FileText,
  CheckCircle,
  Clock,
  Filter,
  Download,
  ShieldAlert,
  Truck,
  BarChart3
} from 'lucide-react';
import { useState } from 'react';

// Mock prescriptions data
const mockPrescriptions = [
  {
    id: '1',
    patientName: 'Doe, John',
    aNumber: 'A# 098-765-432',
    medication: 'Metformin 500mg',
    dosage: '1 tablet',
    frequency: 'BID',
    prescriber: 'Dr. Smith',
    status: 'Pending',
    isControlled: false,
    orderDate: '2024-01-20',
    kop: true,
    dot: false,
  },
  {
    id: '2',
    patientName: 'Smith, Jane',
    aNumber: 'A# 098-765-433',
    medication: 'Oxycodone 5mg',
    dosage: '1 tablet',
    frequency: 'Q6H PRN',
    prescriber: 'Dr. Jones',
    status: 'Requires Review',
    isControlled: true,
    orderDate: '2024-01-20',
    kop: false,
    dot: true,
  },
  {
    id: '3',
    patientName: 'Johnson, Mike',
    aNumber: 'A# 098-765-434',
    medication: 'Lisinopril 10mg',
    dosage: '1 tablet',
    frequency: 'Daily',
    prescriber: 'Dr. Smith',
    status: 'Filled',
    isControlled: false,
    orderDate: '2024-01-19',
    kop: true,
    dot: false,
  },
];

// Mock inventory alerts
const inventoryAlerts = [
  { medication: 'Metformin 500mg', currentStock: 150, reorderLevel: 200, status: 'Low' },
  { medication: 'Lisinopril 10mg', currentStock: 45, reorderLevel: 100, status: 'Critical' },
  { medication: 'Omeprazole 20mg', currentStock: 180, reorderLevel: 200, status: 'Low' },
];

// Mock formulary medications
const formularyMedications = [
  { name: 'Metformin', strength: '500mg, 850mg, 1000mg', category: 'Antidiabetic', status: 'Approved' },
  { name: 'Lisinopril', strength: '5mg, 10mg, 20mg', category: 'Antihypertensive', status: 'Approved' },
  { name: 'Omeprazole', strength: '20mg, 40mg', category: 'PPI', status: 'Approved' },
  { name: 'Sertraline', strength: '25mg, 50mg, 100mg', category: 'Antidepressant', status: 'Approved' },
  { name: 'Gabapentin', strength: '100mg, 300mg, 400mg', category: 'Anticonvulsant', status: 'Restricted' },
];

export default function PharmacyModule() {
  const [activeTab, setActiveTab] = useState<'orders' | 'formulary' | 'inventory' | 'controlled'>('orders');
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <div className="p-6 max-w-[1440px] mx-auto">
      {/* Page Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-neutral-gray-700">Pharmacy</h1>
          <p className="text-neutral-gray-500">E-Prescribing & Medication Management</p>
        </div>
        <div className="flex items-center gap-3">
          <button className="btn-primary flex items-center gap-2">
            <Plus className="w-4 h-4" />
            New Order
          </button>
          <button className="btn-secondary flex items-center gap-2">
            <Download className="w-4 h-4" />
            Export
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <div className="card">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-neutral-gray-500">Pending Orders</p>
              <p className="text-2xl font-bold text-neutral-gray-700">23</p>
            </div>
            <div className="w-10 h-10 bg-yellow-100 rounded-full flex items-center justify-center">
              <Clock className="w-5 h-5 text-yellow-600" />
            </div>
          </div>
        </div>
        <div className="card">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-neutral-gray-500">Filled Today</p>
              <p className="text-2xl font-bold text-neutral-gray-700">156</p>
            </div>
            <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
              <CheckCircle className="w-5 h-5 text-green-600" />
            </div>
          </div>
        </div>
        <div className="card">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-neutral-gray-500">Controlled Substances</p>
              <p className="text-2xl font-bold text-neutral-gray-700">8</p>
            </div>
            <div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center">
              <ShieldAlert className="w-5 h-5 text-red-600" />
            </div>
          </div>
        </div>
        <div className="card">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-neutral-gray-500">Inventory Alerts</p>
              <p className="text-2xl font-bold text-neutral-gray-700">3</p>
            </div>
            <div className="w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center">
              <AlertTriangle className="w-5 h-5 text-orange-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="flex items-center border-b border-neutral-gray-200 mb-6">
        {[
          { id: 'orders', label: 'Active Orders', icon: FileText },
          { id: 'formulary', label: 'Formulary', icon: Pill },
          { id: 'inventory', label: 'Inventory', icon: Package },
          { id: 'controlled', label: 'Controlled Substances', icon: ShieldAlert },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as typeof activeTab)}
            className={`flex items-center gap-2 px-4 py-3 text-sm font-medium border-b-2 transition-colors ${
              activeTab === tab.id
                ? 'border-vsee-primary text-vsee-primary'
                : 'border-transparent text-neutral-gray-500 hover:text-neutral-gray-700'
            }`}
          >
            <tab.icon className="w-4 h-4" />
            {tab.label}
          </button>
        ))}
      </div>

      {/* Search and Filters */}
      <div className="flex items-center gap-4 mb-6">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-neutral-gray-400" />
          <input
            type="text"
            placeholder="Search by patient name, A-Number, or medication..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="input pl-10"
          />
        </div>
        <button className="btn-secondary flex items-center gap-2">
          <Filter className="w-4 h-4" />
          Filters
        </button>
      </div>

      {/* Content based on active tab */}
      {activeTab === 'orders' && (
        <div className="card">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="table-header">
                  <th className="text-left px-4 py-3">Patient</th>
                  <th className="text-left px-4 py-3">Medication</th>
                  <th className="text-left px-4 py-3">Dosage</th>
                  <th className="text-left px-4 py-3">Frequency</th>
                  <th className="text-left px-4 py-3">Prescriber</th>
                  <th className="text-left px-4 py-3">Type</th>
                  <th className="text-left px-4 py-3">Status</th>
                  <th className="text-left px-4 py-3">Actions</th>
                </tr>
              </thead>
              <tbody>
                {mockPrescriptions.map((rx) => (
                  <tr key={rx.id} className="table-row">
                    <td className="table-cell">
                      <div className="font-medium">{rx.patientName}</div>
                      <div className="text-xs text-vsee-primary">{rx.aNumber}</div>
                    </td>
                    <td className="table-cell">
                      <div className="flex items-center gap-2">
                        {rx.medication}
                        {rx.isControlled && (
                          <ShieldAlert className="w-4 h-4 text-status-error" />
                        )}
                      </div>
                    </td>
                    <td className="table-cell">{rx.dosage}</td>
                    <td className="table-cell">{rx.frequency}</td>
                    <td className="table-cell">{rx.prescriber}</td>
                    <td className="table-cell">
                      <div className="flex gap-1">
                        {rx.kop && <span className="badge badge-success">KOP</span>}
                        {rx.dot && <span className="badge badge-warning">DOT</span>}
                      </div>
                    </td>
                    <td className="table-cell">
                      <span className={`badge ${
                        rx.status === 'Pending' ? 'badge-warning' :
                        rx.status === 'Filled' ? 'badge-success' :
                        rx.status === 'Requires Review' ? 'badge-error' : ''
                      }`}>
                        {rx.status}
                      </span>
                    </td>
                    <td className="table-cell">
                      <div className="flex gap-2">
                        <button className="text-vsee-primary hover:underline text-sm">View</button>
                        <button className="text-vsee-primary hover:underline text-sm">Fill</button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {activeTab === 'formulary' && (
        <div className="card">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-neutral-gray-700">Approved Formulary Medications</h3>
            <button className="text-sm text-vsee-primary hover:underline">View Full Formulary</button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="table-header">
                  <th className="text-left px-4 py-3">Medication Name</th>
                  <th className="text-left px-4 py-3">Available Strengths</th>
                  <th className="text-left px-4 py-3">Category</th>
                  <th className="text-left px-4 py-3">Formulary Status</th>
                </tr>
              </thead>
              <tbody>
                {formularyMedications.map((med, index) => (
                  <tr key={index} className="table-row">
                    <td className="table-cell font-medium">{med.name}</td>
                    <td className="table-cell">{med.strength}</td>
                    <td className="table-cell">{med.category}</td>
                    <td className="table-cell">
                      <span className={`badge ${
                        med.status === 'Approved' ? 'badge-success' : 'badge-warning'
                      }`}>
                        {med.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {activeTab === 'inventory' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Inventory Alerts */}
          <div className="card">
            <div className="flex items-center gap-2 mb-4">
              <AlertTriangle className="w-5 h-5 text-status-warning" />
              <h3 className="font-semibold text-neutral-gray-700">Stock Alerts</h3>
            </div>
            <div className="space-y-3">
              {inventoryAlerts.map((item, index) => (
                <div key={index} className={`p-3 rounded-lg ${
                  item.status === 'Critical' ? 'bg-red-50' : 'bg-yellow-50'
                }`}>
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-medium text-neutral-gray-700">{item.medication}</span>
                    <span className={`badge ${
                      item.status === 'Critical' ? 'badge-error' : 'badge-warning'
                    }`}>
                      {item.status}
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-sm text-neutral-gray-600">
                    <span>Current: {item.currentStock} units</span>
                    <span>Reorder at: {item.reorderLevel} units</span>
                  </div>
                  <div className="mt-2">
                    <div className="w-full bg-neutral-gray-200 rounded-full h-2">
                      <div
                        className={`h-2 rounded-full ${
                          item.status === 'Critical' ? 'bg-status-error' : 'bg-status-warning'
                        }`}
                        style={{ width: `${(item.currentStock / item.reorderLevel) * 100}%` }}
                      ></div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <button className="btn-secondary w-full mt-4 flex items-center justify-center gap-2">
              <Truck className="w-4 h-4" />
              Generate Reorder Report
            </button>
          </div>

          {/* Inventory Stats */}
          <div className="card">
            <div className="flex items-center gap-2 mb-4">
              <BarChart3 className="w-5 h-5 text-vsee-primary" />
              <h3 className="font-semibold text-neutral-gray-700">Inventory Overview</h3>
            </div>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-3 bg-neutral-gray-100 rounded-lg">
                <span className="text-neutral-gray-600">Total SKUs</span>
                <span className="font-semibold text-neutral-gray-700">1,247</span>
              </div>
              <div className="flex items-center justify-between p-3 bg-neutral-gray-100 rounded-lg">
                <span className="text-neutral-gray-600">Total Value</span>
                <span className="font-semibold text-neutral-gray-700">$245,680</span>
              </div>
              <div className="flex items-center justify-between p-3 bg-neutral-gray-100 rounded-lg">
                <span className="text-neutral-gray-600">Items Below Reorder</span>
                <span className="font-semibold text-status-warning">12</span>
              </div>
              <div className="flex items-center justify-between p-3 bg-neutral-gray-100 rounded-lg">
                <span className="text-neutral-gray-600">Expiring (30 days)</span>
                <span className="font-semibold text-status-error">5</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'controlled' && (
        <div className="card">
          <div className="flex items-center gap-2 mb-4">
            <ShieldAlert className="w-5 h-5 text-status-error" />
            <h3 className="font-semibold text-neutral-gray-700">Controlled Substance Tracking</h3>
            <span className="badge badge-info ml-2">DEA Compliant</span>
          </div>
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-4">
            <div className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-yellow-600 flex-shrink-0 mt-0.5" />
              <div>
                <p className="font-medium text-yellow-800">DEA Compliance Notice</p>
                <p className="text-sm text-yellow-700">All controlled substance orders require dual verification and are logged for DEA audit requirements.</p>
              </div>
            </div>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="table-header">
                  <th className="text-left px-4 py-3">Date/Time</th>
                  <th className="text-left px-4 py-3">Medication</th>
                  <th className="text-left px-4 py-3">Schedule</th>
                  <th className="text-left px-4 py-3">Patient</th>
                  <th className="text-left px-4 py-3">Quantity</th>
                  <th className="text-left px-4 py-3">Dispensed By</th>
                  <th className="text-left px-4 py-3">Witness</th>
                </tr>
              </thead>
              <tbody>
                <tr className="table-row">
                  <td className="table-cell">01/20/24 14:30</td>
                  <td className="table-cell font-medium">Oxycodone 5mg</td>
                  <td className="table-cell"><span className="badge badge-error">Schedule II</span></td>
                  <td className="table-cell">
                    <div>Smith, Jane</div>
                    <div className="text-xs text-vsee-primary">A# 098-765-433</div>
                  </td>
                  <td className="table-cell">30 tablets</td>
                  <td className="table-cell">PharmD Williams</td>
                  <td className="table-cell">RN Johnson</td>
                </tr>
                <tr className="table-row">
                  <td className="table-cell">01/20/24 10:15</td>
                  <td className="table-cell font-medium">Alprazolam 0.5mg</td>
                  <td className="table-cell"><span className="badge badge-warning">Schedule IV</span></td>
                  <td className="table-cell">
                    <div>Brown, Robert</div>
                    <div className="text-xs text-vsee-primary">A# 098-765-445</div>
                  </td>
                  <td className="table-cell">14 tablets</td>
                  <td className="table-cell">PharmD Williams</td>
                  <td className="table-cell">RN Martinez</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Drug Interaction Alert Modal (conceptual - shows UI pattern) */}
      <div className="hidden">
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-xl max-w-md w-full mx-4 p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center">
                <AlertTriangle className="w-5 h-5 text-status-error" />
              </div>
              <div>
                <h3 className="font-semibold text-neutral-gray-700">Drug Interaction Alert</h3>
                <p className="text-sm text-neutral-gray-500">Requires review before proceeding</p>
              </div>
            </div>
            <div className="bg-red-50 p-4 rounded-lg mb-4">
              <p className="text-sm text-red-800">
                <strong>Moderate Interaction:</strong> Metformin may interact with contrast dye during imaging procedures.
              </p>
            </div>
            <div className="flex gap-3">
              <button className="btn-secondary flex-1">Cancel Order</button>
              <button className="btn-danger flex-1">Override & Continue</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
