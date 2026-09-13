import React from 'react';
import { 
  Tractor, 
  PhoneCall, 
  MessageSquare, 
  Search, 
  Wifi, 
  WifiOff, 
  ShieldCheck, 
  LogOut, 
  Building2, 
  User, 
  Wheat
} from 'lucide-react';
import { Language, UserRole, FarmerProfile, OfficerProfile } from '../types';
import { TRANSLATIONS } from '../i18n/translations';

interface NavbarProps {
  currentLang: Language;
  onLanguageChange: (lang: Language) => void;
  activeRole: UserRole;
  onRoleChange: (role: UserRole) => void;
  lowDataMode: boolean;
  onToggleLowData: () => void;
  currentFarmer: FarmerProfile | null;
  currentOfficer: OfficerProfile | null;
  onFarmerLogout: () => void;
  onOfficerLogout: () => void;
  activeTab: string;
  onTabChange: (tab: string) => void;
  onOpenIVR: () => void;
  onOpenSMS: () => void;
  unreadSMSCount: number;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentLang,
  onLanguageChange,
  activeRole,
  onRoleChange,
  lowDataMode,
  onToggleLowData,
  currentFarmer,
  currentOfficer,
  onFarmerLogout,
  onOfficerLogout,
  activeTab,
  onTabChange,
  onOpenIVR,
  onOpenSMS,
  unreadSMSCount
}) => {
  const t = TRANSLATIONS[currentLang];

  return (
    <header className="sticky top-0 z-40 bg-white border-b border-emerald-900/10 shadow-xs">
      {/* Top Gov / DoCA Info Banner */}
      <div className="bg-emerald-800 text-emerald-50 text-xs py-1.5 px-4">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <span className="font-semibold bg-emerald-900/60 px-2 py-0.5 rounded text-[11px] tracking-wide">
              DoCA | SIH 2026
            </span>
            <span className="hidden sm:inline">
              {t.govLabel}
            </span>
          </div>

          <div className="flex items-center gap-3">
            {/* Low-data toggle button */}
            <button
              id="low-data-mode-toggle"
              onClick={onToggleLowData}
              title="Optimize for 2G/3G low-data rural networks"
              className={`flex items-center gap-1.5 px-2 py-0.5 rounded text-[11px] font-medium transition-colors ${
                lowDataMode 
                  ? 'bg-amber-400 text-amber-950 font-bold' 
                  : 'bg-emerald-900/50 hover:bg-emerald-900 text-emerald-100'
              }`}
            >
              {lowDataMode ? <WifiOff className="w-3.5 h-3.5" /> : <Wifi className="w-3.5 h-3.5" />}
              <span>{lowDataMode ? t.lowDataActive : t.lowDataMode}</span>
            </button>

            {/* Language Selector */}
            <div className="flex items-center bg-emerald-950/70 rounded-lg p-0.5 text-xs">
              <select
                id="language-select-dropdown"
                value={currentLang}
                onChange={(e) => onLanguageChange(e.target.value as Language)}
                aria-label="Select Language"
                className="bg-transparent text-white text-xs font-bold py-1 px-2.5 rounded outline-none cursor-pointer border border-emerald-700/50 hover:border-emerald-500"
              >
                <option value="hi" className="text-slate-900 font-medium">🇮🇳 हिन्दी (Hindi)</option>
                <option value="en" className="text-slate-900 font-medium">🇬🇧 English</option>
                <option value="gar" className="text-slate-900 font-medium">⛰️ गढ़वाली (Garhwali)</option>
                <option value="kum" className="text-slate-900 font-medium">🏔️ कुमाऊँनी (Kumaoni)</option>
                <option value="pa" className="text-slate-900 font-medium">🌾 ਪੰਜਾਬੀ (Punjabi)</option>
                <option value="ne" className="text-slate-900 font-medium">🏔️ नेपाली (Nepali)</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Main Navigation Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3">
        <div className="flex items-center justify-between gap-4">
          
          {/* Logo & Brand */}
          <div 
            onClick={() => onTabChange('mandis')}
            className="flex items-center gap-3 cursor-pointer group"
          >
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-600 to-emerald-800 flex items-center justify-center text-white shadow-md shadow-emerald-700/20 group-hover:scale-105 transition-transform">
              <Tractor className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-extrabold text-xl sm:text-2xl text-emerald-950 tracking-tight">
                  {currentLang === 'en' ? 'KisanQ' : 'किसान क्यू'}
                </span>
                <span className="bg-emerald-100 text-emerald-800 text-[10px] font-bold px-1.5 py-0.5 rounded uppercase tracking-wider">
                  Uttarakhand Mandi
                </span>
              </div>
              <p className="text-xs text-slate-500 hidden md:block">
                {t.appTagline}
              </p>
            </div>
          </div>

          {/* Quick Actions: IVR Toll-Free Helpline & SMS Alerts */}
          <div className="flex items-center gap-2 sm:gap-3">
            <button
              id="ivr-helpline-btn"
              onClick={onOpenIVR}
              className="flex items-center gap-1.5 px-3 py-1.5 bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold text-xs sm:text-sm rounded-lg shadow-xs transition-all active:scale-95"
              title="Toll-Free 1800-180-1551"
            >
              <PhoneCall className="w-4 h-4 animate-bounce" />
              <span className="hidden sm:inline">IVR हेल्पलाइन</span>
              <span className="sm:hidden">1800</span>
            </button>

            <button
              id="sms-notifications-btn"
              onClick={onOpenSMS}
              className="relative flex items-center gap-1.5 px-2.5 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-800 font-medium text-xs sm:text-sm rounded-lg transition-colors"
              title="SMS Alerts"
            >
              <MessageSquare className="w-4 h-4 text-emerald-700" />
              <span className="hidden md:inline">{t.navSMS}</span>
              {unreadSMSCount > 0 && (
                <span className="bg-red-600 text-white text-[10px] font-bold w-5 h-5 rounded-full flex items-center justify-center">
                  {unreadSMSCount}
                </span>
              )}
            </button>
          </div>
        </div>

        {/* Portal Switching Bar & Nav Tabs */}
        <div className="mt-3 pt-2.5 border-t border-slate-100 flex flex-wrap items-center justify-between gap-3">
          {/* Main Tabs */}
          <nav className="flex items-center gap-1 sm:gap-2 overflow-x-auto pb-1 max-w-full">
            <button
              id="nav-tab-farmer"
              onClick={() => {
                onRoleChange('farmer');
                onTabChange('farmer');
              }}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs sm:text-sm font-semibold transition-colors whitespace-nowrap ${
                activeRole === 'farmer' && activeTab === 'farmer'
                  ? 'bg-emerald-700 text-white shadow-xs'
                  : 'text-slate-700 hover:bg-emerald-50 hover:text-emerald-800'
              }`}
            >
              <User className="w-4 h-4" />
              <span>{t.portalFarmer}</span>
              {currentFarmer && (
                <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
              )}
            </button>

            <button
              id="nav-tab-officer"
              onClick={() => {
                onRoleChange('officer');
                onTabChange('officer');
              }}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs sm:text-sm font-semibold transition-colors whitespace-nowrap ${
                activeRole === 'officer' && activeTab === 'officer'
                  ? 'bg-blue-700 text-white shadow-xs'
                  : 'text-slate-700 hover:bg-blue-50 hover:text-blue-800'
              }`}
            >
              <Building2 className="w-4 h-4" />
              <span>{t.portalOfficer}</span>
              {currentOfficer && (
                <span className="w-2 h-2 rounded-full bg-blue-400"></span>
              )}
            </button>

            <button
              id="nav-tab-mandis"
              onClick={() => onTabChange('mandis')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs sm:text-sm font-medium transition-colors whitespace-nowrap ${
                activeTab === 'mandis'
                  ? 'bg-slate-800 text-white'
                  : 'text-slate-600 hover:bg-slate-100'
              }`}
            >
              <Wheat className="w-4 h-4 text-amber-500" />
              <span>{t.navMandis}</span>
            </button>

            <button
              id="nav-tab-aadhaar"
              onClick={() => onTabChange('aadhaar-search')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs sm:text-sm font-medium transition-colors whitespace-nowrap ${
                activeTab === 'aadhaar-search'
                  ? 'bg-slate-800 text-white'
                  : 'text-slate-600 hover:bg-slate-100'
              }`}
            >
              <Search className="w-4 h-4 text-emerald-600" />
              <span>{t.navAadhaarCheck}</span>
            </button>
          </nav>

          {/* User Status / Logout Pill */}
          <div className="flex items-center gap-2 text-xs">
            {activeRole === 'farmer' && currentFarmer ? (
              <div className="flex items-center gap-2 bg-emerald-50 border border-emerald-200 px-2.5 py-1 rounded-lg">
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
                <div className="text-left">
                  <p className="font-bold text-emerald-950 truncate max-w-[130px] sm:max-w-[180px]">
                    {currentFarmer.name}
                  </p>
                  <p className="text-[10px] text-emerald-700">
                    आधार: XXXX-{currentFarmer.aadhaarNumber.slice(-4)}
                  </p>
                </div>
                <button
                  id="farmer-logout-btn"
                  onClick={onFarmerLogout}
                  title="Sign Out"
                  className="ml-1 text-slate-400 hover:text-red-600 p-1"
                >
                  <LogOut className="w-3.5 h-3.5" />
                </button>
              </div>
            ) : activeRole === 'officer' && currentOfficer ? (
              <div className="flex items-center gap-2 bg-blue-50 border border-blue-200 px-2.5 py-1 rounded-lg">
                <Building2 className="w-4 h-4 text-blue-600" />
                <div className="text-left">
                  <p className="font-bold text-blue-950 truncate max-w-[130px] sm:max-w-[180px]">
                    {currentOfficer.name}
                  </p>
                  <p className="text-[10px] text-blue-700">
                    ID: {currentOfficer.employeeId}
                  </p>
                </div>
                <button
                  id="officer-logout-btn"
                  onClick={onOfficerLogout}
                  title="Sign Out"
                  className="ml-1 text-slate-400 hover:text-red-600 p-1"
                >
                  <LogOut className="w-3.5 h-3.5" />
                </button>
              </div>
            ) : (
              <div className="text-slate-500 text-[11px] italic">
                {activeRole === 'farmer' 
                  ? (currentLang === 'en' ? 'Farmer: Not signed in' : 'किसान: साइन इन नहीं')
                  : (currentLang === 'en' ? 'Officer: Not signed in' : 'अधिकारी: साइन इन नहीं')}
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};
