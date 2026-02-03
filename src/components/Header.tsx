import {
  Menu,
  Search,
  Bell,
  User,
  ChevronDown,
  Building2
} from 'lucide-react';
import { useState } from 'react';
import type { ModuleType } from '../types';

interface HeaderProps {
  currentModule: ModuleType;
  onModuleChange: (module: ModuleType) => void;
  currentFacility: string;
  userName: string;
  userRole: string;
  onMenuClick: () => void;
}

const modules: { id: ModuleType; label: string }[] = [
  { id: 'EHR', label: 'EHR' },
  { id: 'Pharmacy', label: 'Pharmacy' },
  { id: 'MAR', label: 'MAR' },
  { id: 'Dental', label: 'Dental' },
  { id: 'Referrals', label: 'Referrals' },
  { id: 'Claims', label: 'Claims' },
  { id: 'Dashboard', label: 'Dashboard' },
  { id: 'Facilities', label: 'Facilities' },
  { id: 'Support', label: 'Support' },
  { id: 'Training', label: 'Training' },
];

const facilities = [
  'Adelanto ICE Processing Center',
  'South Texas Family Residential Center',
  'Otay Mesa Detention Center',
  'Tacoma Northwest Detention Center',
];

export default function Header({
  currentModule,
  onModuleChange,
  currentFacility,
  userName,
  userRole,
  onMenuClick,
}: HeaderProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [showFacilityDropdown, setShowFacilityDropdown] = useState(false);
  const [showProfileDropdown, setShowProfileDropdown] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-white shadow-header">
      {/* Global Sticky Header - Top Bar */}
      <div className="bg-vsee-primary text-white">
        <div className="max-w-[1440px] mx-auto px-4">
          <div className="flex items-center justify-between h-14">
            {/* Left section: Menu + Logo */}
            <div className="flex items-center space-x-4">
              <button
                onClick={onMenuClick}
                className="p-2 hover:bg-vsee-primary-dark rounded-lg transition-colors"
                aria-label="Open menu"
              >
                <Menu className="w-5 h-5" />
              </button>

              {/* DHS/ICE Logo and Branding */}
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-white rounded flex items-center justify-center">
                  <span className="text-vsee-primary font-bold text-sm">DHS</span>
                </div>
                <div className="hidden sm:block">
                  <div className="font-semibold text-sm">ICE Health Service Corps</div>
                  <div className="text-xs text-white/80">Electronic Health Record</div>
                </div>
              </div>
            </div>

            {/* Center: Facility Selector */}
            <div className="relative">
              <button
                onClick={() => setShowFacilityDropdown(!showFacilityDropdown)}
                className="flex items-center space-x-2 px-4 py-2 bg-vsee-primary-dark rounded-lg hover:bg-opacity-80 transition-colors"
              >
                <Building2 className="w-4 h-4" />
                <span className="text-sm font-medium hidden md:inline">{currentFacility}</span>
                <span className="text-sm font-medium md:hidden">Facility</span>
                <ChevronDown className="w-4 h-4" />
              </button>

              {showFacilityDropdown && (
                <div className="absolute top-full mt-1 left-0 bg-white rounded-lg shadow-lg py-1 min-w-[280px] z-50">
                  {facilities.map((facility) => (
                    <button
                      key={facility}
                      onClick={() => {
                        setShowFacilityDropdown(false);
                      }}
                      className={`w-full text-left px-4 py-2 text-sm hover:bg-neutral-gray-100 ${
                        facility === currentFacility
                          ? 'text-vsee-primary font-medium bg-vsee-primary/5'
                          : 'text-neutral-gray-700'
                      }`}
                    >
                      {facility}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Right section: Search + Notifications + Profile */}
            <div className="flex items-center space-x-3">
              {/* Patient Search */}
              <div className="hidden md:flex items-center bg-vsee-primary-dark rounded-lg px-3 py-1.5">
                <Search className="w-4 h-4 text-white/70" />
                <input
                  type="text"
                  placeholder="Search by Name or A-Number..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="bg-transparent border-none outline-none text-sm text-white placeholder-white/50 ml-2 w-48"
                />
              </div>

              {/* Mobile Search Button */}
              <button className="md:hidden p-2 hover:bg-vsee-primary-dark rounded-lg">
                <Search className="w-5 h-5" />
              </button>

              {/* Notifications */}
              <button className="relative p-2 hover:bg-vsee-primary-dark rounded-lg transition-colors">
                <Bell className="w-5 h-5" />
                <span className="absolute top-1 right-1 w-2 h-2 bg-status-error rounded-full"></span>
              </button>

              {/* User Profile */}
              <div className="relative">
                <button
                  onClick={() => setShowProfileDropdown(!showProfileDropdown)}
                  className="flex items-center space-x-2 p-2 hover:bg-vsee-primary-dark rounded-lg transition-colors"
                >
                  <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center">
                    <User className="w-4 h-4 text-vsee-primary" />
                  </div>
                  <div className="hidden lg:block text-left">
                    <div className="text-sm font-medium">{userName}</div>
                    <div className="text-xs text-white/70">{userRole}</div>
                  </div>
                  <ChevronDown className="w-4 h-4 hidden lg:block" />
                </button>

                {showProfileDropdown && (
                  <div className="absolute top-full mt-1 right-0 bg-white rounded-lg shadow-lg py-1 min-w-[180px] z-50">
                    <div className="px-4 py-2 border-b border-neutral-gray-200">
                      <div className="text-sm font-medium text-neutral-gray-700">{userName}</div>
                      <div className="text-xs text-neutral-gray-500">{userRole}</div>
                    </div>
                    <button className="w-full text-left px-4 py-2 text-sm text-neutral-gray-700 hover:bg-neutral-gray-100">
                      Profile Settings
                    </button>
                    <button className="w-full text-left px-4 py-2 text-sm text-neutral-gray-700 hover:bg-neutral-gray-100">
                      Help & Support
                    </button>
                    <button className="w-full text-left px-4 py-2 text-sm text-status-error hover:bg-neutral-gray-100">
                      Sign Out
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Module Quick-Switch Bar */}
      <div className="bg-white border-b border-neutral-gray-200">
        <div className="max-w-[1440px] mx-auto px-4">
          <div className="flex items-center overflow-x-auto hide-scrollbar">
            {modules.map((module) => (
              <button
                key={module.id}
                onClick={() => onModuleChange(module.id)}
                className={`module-tab whitespace-nowrap ${
                  currentModule === module.id ? 'module-tab-active' : ''
                }`}
              >
                {module.label}
              </button>
            ))}
            <button className="module-tab whitespace-nowrap text-neutral-gray-400">
              More...
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
