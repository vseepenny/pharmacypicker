import { useState } from 'react';
import { Routes, Route, useNavigate, Navigate } from 'react-router-dom';
import Header from './components/Header';
import EHRModule from './pages/EHRModule';
import PharmacyModule from './pages/PharmacyModule';
import MARModule from './pages/MARModule';
import DashboardModule from './pages/DashboardModule';
import FacilitiesModule from './pages/FacilitiesModule';
import type { ModuleType } from './types';

// Sidebar component
function Sidebar({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/50 z-40"
        onClick={onClose}
      />
      {/* Sidebar */}
      <div className="fixed left-0 top-0 h-full w-72 bg-white shadow-xl z-50 overflow-y-auto">
        <div className="p-4 border-b border-neutral-gray-200">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-vsee-primary rounded flex items-center justify-center">
              <span className="text-white font-bold text-sm">DHS</span>
            </div>
            <div>
              <div className="font-semibold text-neutral-gray-700">ICE IHSC EHR</div>
              <div className="text-xs text-neutral-gray-500">v4.2.1</div>
            </div>
          </div>
        </div>

        <nav className="py-4">
          <div className="px-4 text-xs font-semibold text-neutral-gray-500 uppercase tracking-wider mb-2">
            Clinical Modules
          </div>
          {[
            { label: 'EHR', path: '/ehr' },
            { label: 'Pharmacy', path: '/pharmacy' },
            { label: 'MAR', path: '/mar' },
            { label: 'Dental', path: '/dental' },
            { label: 'Referrals', path: '/referrals' },
          ].map((item) => (
            <a
              key={item.path}
              href={item.path}
              className="sidebar-item"
              onClick={onClose}
            >
              {item.label}
            </a>
          ))}

          <div className="px-4 text-xs font-semibold text-neutral-gray-500 uppercase tracking-wider mb-2 mt-6">
            Administrative
          </div>
          {[
            { label: 'Claims', path: '/claims' },
            { label: 'Payments', path: '/payments' },
            { label: 'Utilization', path: '/utilization' },
          ].map((item) => (
            <a
              key={item.path}
              href={item.path}
              className="sidebar-item"
              onClick={onClose}
            >
              {item.label}
            </a>
          ))}

          <div className="px-4 text-xs font-semibold text-neutral-gray-500 uppercase tracking-wider mb-2 mt-6">
            System
          </div>
          {[
            { label: 'Dashboard', path: '/dashboard' },
            { label: 'Facilities', path: '/facilities' },
            { label: 'Support', path: '/support' },
            { label: 'Training', path: '/training' },
          ].map((item) => (
            <a
              key={item.path}
              href={item.path}
              className="sidebar-item"
              onClick={onClose}
            >
              {item.label}
            </a>
          ))}
        </nav>

        <div className="p-4 border-t border-neutral-gray-200 mt-auto">
          <div className="onc-hit-badge justify-center w-full">
            ONC-HIT Certified
          </div>
        </div>
      </div>
    </>
  );
}

// Placeholder components for other modules
function PlaceholderModule({ title }: { title: string }) {
  return (
    <div className="p-6 max-w-[1440px] mx-auto">
      <div className="card text-center py-12">
        <h1 className="text-2xl font-bold text-neutral-gray-700 mb-2">{title}</h1>
        <p className="text-neutral-gray-500">This module is coming soon.</p>
      </div>
    </div>
  );
}

export default function App() {
  const [currentModule, setCurrentModule] = useState<ModuleType>('Dashboard');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const navigate = useNavigate();

  const handleModuleChange = (module: ModuleType) => {
    setCurrentModule(module);
    const routes: Record<ModuleType, string> = {
      EHR: '/ehr',
      Pharmacy: '/pharmacy',
      MAR: '/mar',
      Dental: '/dental',
      Referrals: '/referrals',
      Utilization: '/utilization',
      Claims: '/claims',
      Payment: '/payments',
      Dashboard: '/dashboard',
      Facilities: '/facilities',
      Support: '/support',
      Training: '/training',
    };
    navigate(routes[module] || '/dashboard');
  };

  return (
    <div className="min-h-screen bg-neutral-gray-100">
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      <Header
        currentModule={currentModule}
        onModuleChange={handleModuleChange}
        currentFacility="Adelanto ICE Processing Center"
        userName="Dr. Smith"
        userRole="Chief Medical Officer"
        onMenuClick={() => setSidebarOpen(true)}
      />

      <main>
        <Routes>
          <Route path="/" element={<Navigate to="/dashboard" replace />} />
          <Route path="/dashboard" element={<DashboardModule />} />
          <Route path="/ehr" element={<EHRModule />} />
          <Route path="/pharmacy" element={<PharmacyModule />} />
          <Route path="/mar" element={<MARModule />} />
          <Route path="/facilities" element={<FacilitiesModule />} />
          <Route path="/dental" element={<PlaceholderModule title="Dental Module" />} />
          <Route path="/referrals" element={<PlaceholderModule title="Referral Management" />} />
          <Route path="/claims" element={<PlaceholderModule title="Claims Management" />} />
          <Route path="/payments" element={<PlaceholderModule title="Medical Payments" />} />
          <Route path="/utilization" element={<PlaceholderModule title="Utilization Management" />} />
          <Route path="/support" element={<PlaceholderModule title="Support Portal" />} />
          <Route path="/training" element={<PlaceholderModule title="Training / LMS" />} />
        </Routes>
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-neutral-gray-200 py-4 mt-8">
        <div className="max-w-[1440px] mx-auto px-6 flex items-center justify-between text-sm text-neutral-gray-500">
          <div className="flex items-center gap-4">
            <span>ICE IHSC EHR Modernization</span>
            <span>|</span>
            <span>Version 4.2.1</span>
            <span>|</span>
            <span>Release: Sprint 2026.4.2</span>
          </div>
          <div className="flex items-center gap-4">
            <a href="#" className="text-vsee-primary hover:underline">Release Notes</a>
            <a href="#" className="text-vsee-primary hover:underline">Submit Feedback</a>
            <span className="onc-hit-badge">ONC-HIT Certified</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
