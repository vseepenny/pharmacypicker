import {
  Activity,
  CheckCircle,
  AlertCircle,
  Clock,
  TrendingUp,
  Users,
  FileText,
  Pill,
  Calendar,
  BarChart3,
  ArrowRight,
  RefreshCw,
  Zap,
  MessageSquare
} from 'lucide-react';
import type { ModuleStatus, ActivityItem } from '../types';

// Mock data for module status
const moduleStatuses: ModuleStatus[] = [
  { name: 'EHR Module', status: 'Online', lastUpdated: '2 min ago', version: '4.2.1' },
  { name: 'Pharmacy Module', status: 'Online', lastUpdated: '1 min ago', version: '4.2.1' },
  { name: 'MAR Module', status: 'Online', lastUpdated: '3 min ago', version: '4.2.1' },
  { name: 'Dental Module', status: 'Online', lastUpdated: '5 min ago', version: '4.2.1' },
  { name: 'Claims Module', status: 'Online', lastUpdated: '1 min ago', version: '4.2.1' },
  { name: 'Referrals Module', status: 'Online', lastUpdated: '2 min ago', version: '4.2.1' },
];

// Mock activity feed mixing clinical and admin tasks
const activityFeed: ActivityItem[] = [
  {
    id: '1',
    type: 'Clinical',
    action: 'Dr. Jones signed Order #123',
    user: 'Dr. Jones',
    timestamp: '2 min ago',
    details: 'Medication order for patient A# 098-765-432',
  },
  {
    id: '2',
    type: 'Admin',
    action: 'Claim #998 Approved',
    user: 'System',
    timestamp: '5 min ago',
    details: '$1,250.00 - External provider visit',
  },
  {
    id: '3',
    type: 'Clinical',
    action: 'Lab results received',
    user: 'Lab System',
    timestamp: '10 min ago',
    details: 'CBC panel for 15 patients',
  },
  {
    id: '4',
    type: 'Admin',
    action: 'Referral #445 Scheduled',
    user: 'Scheduling',
    timestamp: '15 min ago',
    details: 'Cardiology consult - Jan 25, 2024',
  },
  {
    id: '5',
    type: 'System',
    action: 'Backup completed',
    user: 'System',
    timestamp: '1 hour ago',
    details: 'Daily backup successful',
  },
];

export default function DashboardModule() {
  return (
    <div className="p-6 max-w-[1440px] mx-auto">
      {/* Dashboard Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-neutral-gray-700">System Integration Dashboard</h1>
          <p className="text-neutral-gray-500">Unified view across all modules</p>
        </div>
        <div className="flex items-center gap-4">
          {/* Agile Requirement: Sprint/Release indicator */}
          <div className="bg-vsee-primary/10 px-4 py-2 rounded-lg">
            <span className="text-sm text-vsee-primary font-medium">Release: Sprint 2026.4.2</span>
            <span className="mx-2 text-neutral-gray-300">|</span>
            <span className="text-sm text-neutral-gray-600">Version 4.2.1</span>
            <span className="mx-2 text-neutral-gray-300">|</span>
            <span className="text-sm text-neutral-gray-500">Last Updated: Feb 2026</span>
          </div>
          <button className="btn-secondary flex items-center gap-2">
            <MessageSquare className="w-4 h-4" />
            Submit Feature Request
          </button>
        </div>
      </div>

      {/* Single Sign-On Indicator */}
      <div className="card mb-6 bg-gradient-to-r from-vsee-primary to-vsee-primary-dark text-white">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
              <Zap className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-lg font-semibold">Single Sign-On Active</h2>
              <p className="text-white/80 text-sm">One login for entire ICE IHSC EHR system - All 8 modules accessible</p>
            </div>
          </div>
          <div className="flex items-center gap-6">
            <div className="text-center">
              <div className="text-2xl font-bold">8</div>
              <div className="text-xs text-white/70">Modules Connected</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold">100%</div>
              <div className="text-xs text-white/70">System Uptime</div>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <div className="card">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-neutral-gray-500">Active Patients</p>
              <p className="text-2xl font-bold text-neutral-gray-700">1,247</p>
            </div>
            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
              <Users className="w-6 h-6 text-blue-600" />
            </div>
          </div>
          <div className="mt-2 flex items-center text-sm text-status-success">
            <TrendingUp className="w-4 h-4 mr-1" />
            +12 today
          </div>
        </div>

        <div className="card">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-neutral-gray-500">Pending Orders</p>
              <p className="text-2xl font-bold text-neutral-gray-700">43</p>
            </div>
            <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center">
              <FileText className="w-6 h-6 text-yellow-600" />
            </div>
          </div>
          <div className="mt-2 flex items-center text-sm text-status-warning">
            <Clock className="w-4 h-4 mr-1" />
            8 urgent
          </div>
        </div>

        <div className="card">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-neutral-gray-500">Medications Due</p>
              <p className="text-2xl font-bold text-neutral-gray-700">156</p>
            </div>
            <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
              <Pill className="w-6 h-6 text-purple-600" />
            </div>
          </div>
          <div className="mt-2 flex items-center text-sm text-neutral-gray-500">
            <Calendar className="w-4 h-4 mr-1" />
            Next 4 hours
          </div>
        </div>

        <div className="card">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-neutral-gray-500">Claims This Week</p>
              <p className="text-2xl font-bold text-neutral-gray-700">$45.2K</p>
            </div>
            <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
              <BarChart3 className="w-6 h-6 text-green-600" />
            </div>
          </div>
          <div className="mt-2 flex items-center text-sm text-status-success">
            <TrendingUp className="w-4 h-4 mr-1" />
            89% approved
          </div>
        </div>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Module Status Widget - Subcontractor Requirement */}
        <div className="lg:col-span-1">
          <div className="card h-full">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-neutral-gray-700">Module Status</h2>
              <button className="text-vsee-primary hover:text-vsee-primary-dark">
                <RefreshCw className="w-4 h-4" />
              </button>
            </div>
            <div className="space-y-3">
              {moduleStatuses.map((module) => (
                <div key={module.name} className="flex items-center justify-between py-2 border-b border-neutral-gray-200 last:border-0">
                  <div className="flex items-center gap-3">
                    {module.status === 'Online' ? (
                      <CheckCircle className="w-5 h-5 text-status-success" />
                    ) : module.status === 'Degraded' ? (
                      <AlertCircle className="w-5 h-5 text-status-warning" />
                    ) : (
                      <AlertCircle className="w-5 h-5 text-status-error" />
                    )}
                    <div>
                      <div className="font-medium text-sm text-neutral-gray-700">{module.name}</div>
                      <div className="text-xs text-neutral-gray-500">v{module.version}</div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className={`text-xs font-medium ${
                      module.status === 'Online' ? 'text-status-success' :
                      module.status === 'Degraded' ? 'text-status-warning' : 'text-status-error'
                    }`}>
                      {module.status}
                    </div>
                    <div className="text-xs text-neutral-gray-400">{module.lastUpdated}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Data Flow Visualization */}
        <div className="lg:col-span-1">
          <div className="card h-full">
            <h2 className="text-lg font-semibold text-neutral-gray-700 mb-4">Data Flow</h2>
            <div className="space-y-4">
              {/* Simplified data flow visualization */}
              <div className="bg-neutral-gray-100 rounded-lg p-4">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-sm font-medium text-neutral-gray-700">EHR</span>
                  <ArrowRight className="w-4 h-4 text-vsee-primary" />
                  <span className="text-sm font-medium text-neutral-gray-700">Pharmacy</span>
                </div>
                <div className="w-full bg-neutral-gray-300 rounded-full h-2">
                  <div className="bg-vsee-primary h-2 rounded-full" style={{ width: '95%' }}></div>
                </div>
                <div className="text-xs text-neutral-gray-500 mt-1">1,234 orders synced</div>
              </div>

              <div className="bg-neutral-gray-100 rounded-lg p-4">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-sm font-medium text-neutral-gray-700">Referrals</span>
                  <ArrowRight className="w-4 h-4 text-vsee-primary" />
                  <span className="text-sm font-medium text-neutral-gray-700">Claims</span>
                </div>
                <div className="w-full bg-neutral-gray-300 rounded-full h-2">
                  <div className="bg-status-success h-2 rounded-full" style={{ width: '87%' }}></div>
                </div>
                <div className="text-xs text-neutral-gray-500 mt-1">456 claims linked</div>
              </div>

              <div className="bg-neutral-gray-100 rounded-lg p-4">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-sm font-medium text-neutral-gray-700">MAR</span>
                  <ArrowRight className="w-4 h-4 text-vsee-primary" />
                  <span className="text-sm font-medium text-neutral-gray-700">Inventory</span>
                </div>
                <div className="w-full bg-neutral-gray-300 rounded-full h-2">
                  <div className="bg-module-mar h-2 rounded-full" style={{ width: '100%' }}></div>
                </div>
                <div className="text-xs text-neutral-gray-500 mt-1">Real-time sync</div>
              </div>
            </div>
          </div>
        </div>

        {/* Cross-Module Alerts */}
        <div className="lg:col-span-1">
          <div className="card h-full">
            <h2 className="text-lg font-semibold text-neutral-gray-700 mb-4">System Alerts</h2>
            <div className="space-y-3">
              <div className="flex items-start gap-3 p-3 bg-yellow-50 rounded-lg">
                <AlertCircle className="w-5 h-5 text-status-warning flex-shrink-0 mt-0.5" />
                <div>
                  <div className="text-sm font-medium text-neutral-gray-700">Inventory Alert</div>
                  <div className="text-xs text-neutral-gray-500">5 medications below reorder level</div>
                </div>
              </div>
              <div className="flex items-start gap-3 p-3 bg-blue-50 rounded-lg">
                <Activity className="w-5 h-5 text-status-info flex-shrink-0 mt-0.5" />
                <div>
                  <div className="text-sm font-medium text-neutral-gray-700">Lab Integration</div>
                  <div className="text-xs text-neutral-gray-500">15 new results pending review</div>
                </div>
              </div>
              <div className="flex items-start gap-3 p-3 bg-green-50 rounded-lg">
                <CheckCircle className="w-5 h-5 text-status-success flex-shrink-0 mt-0.5" />
                <div>
                  <div className="text-sm font-medium text-neutral-gray-700">Backup Complete</div>
                  <div className="text-xs text-neutral-gray-500">All data secured - 2 hours ago</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Activity Feed - Mix of Clinical and Admin */}
      <div className="card mt-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-neutral-gray-700">Recent Activity Feed</h2>
          <div className="flex items-center gap-2">
            <button className="text-xs px-3 py-1 rounded-full bg-vsee-primary text-white">All</button>
            <button className="text-xs px-3 py-1 rounded-full bg-neutral-gray-100 text-neutral-gray-600 hover:bg-neutral-gray-200">Clinical</button>
            <button className="text-xs px-3 py-1 rounded-full bg-neutral-gray-100 text-neutral-gray-600 hover:bg-neutral-gray-200">Admin</button>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="table-header">
                <th className="text-left px-4 py-2">Type</th>
                <th className="text-left px-4 py-2">Action</th>
                <th className="text-left px-4 py-2">Details</th>
                <th className="text-left px-4 py-2">User</th>
                <th className="text-left px-4 py-2">Time</th>
              </tr>
            </thead>
            <tbody>
              {activityFeed.map((activity) => (
                <tr key={activity.id} className="table-row">
                  <td className="table-cell">
                    <span className={`badge ${
                      activity.type === 'Clinical' ? 'badge-info' :
                      activity.type === 'Admin' ? 'badge-success' : 'bg-neutral-gray-100 text-neutral-gray-700'
                    }`}>
                      {activity.type}
                    </span>
                  </td>
                  <td className="table-cell font-medium">{activity.action}</td>
                  <td className="table-cell text-neutral-gray-500">{activity.details}</td>
                  <td className="table-cell">{activity.user}</td>
                  <td className="table-cell text-neutral-gray-400">{activity.timestamp}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Footer with Agile Elements */}
      <div className="mt-6 flex items-center justify-between text-sm text-neutral-gray-500">
        <div className="flex items-center gap-4">
          <span>ICE IHSC EHR v4.2.1</span>
          <span>|</span>
          <a href="#" className="text-vsee-primary hover:underline">Release Notes</a>
          <span>|</span>
          <a href="#" className="text-vsee-primary hover:underline">Upcoming Features</a>
        </div>
        <div>
          <span className="onc-hit-badge">ONC-HIT Certified</span>
        </div>
      </div>
    </div>
  );
}
