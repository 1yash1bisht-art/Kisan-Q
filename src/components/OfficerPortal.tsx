import React, { useState } from 'react';
import { 
  Building2, 
  ShieldAlert, 
  Clock, 
  Truck, 
  Scale, 
  CheckCircle, 
  AlertTriangle, 
  Send, 
  RefreshCw, 
  Banknote, 
  LogOut, 
  Sparkles,
  ArrowRight,
  PhoneCall,
  Search,
  CheckCircle2
} from 'lucide-react';
import { OfficerProfile, SlotBooking, UttarakhandMandi, Language, QueueStage } from '../types';
import { TRANSLATIONS } from '../i18n/translations';
import confetti from 'canvas-confetti';

interface OfficerPortalProps {
  currentLang: Language;
  currentOfficer: OfficerProfile | null;
  onOfficerLogin: (officer: OfficerProfile) => void;
  onOfficerRegister: (officer: OfficerProfile) => void;
  onOfficerLogout: () => void;
  mandis: UttarakhandMandi[];
  allBookings: SlotBooking[];
  onUpdateBookingStage: (
    bookingId: string, 
    nextStage: QueueStage, 
    extraData?: {
      actualWeight?: number;
      qualityGrade?: 'A' | 'B' | 'C';
      totalPayable?: number;
      delayMinutes?: number;
    }
  ) => void;
  onBroadcastSMS: (messageText: string) => void;
}

export const OfficerPortal: React.FC<OfficerPortalProps> = ({
  currentLang,
  currentOfficer,
  onOfficerLogin,
  onOfficerRegister,
  onOfficerLogout,
  mandis,
  allBookings,
  onUpdateBookingStage,
  onBroadcastSMS
}) => {
  const t = TRANSLATIONS[currentLang];

  // Auth state
  const [authMode, setAuthMode] = useState<'signin' | 'register'>('signin');
  const [empIdInput, setEmpIdInput] = useState('');
  const [officerNameInput, setOfficerNameInput] = useState('');
  const [designationInput, setDesignationInput] = useState('वरिष्ठ मंडी सचिव (Mandi Secretary)');
  const [assignedMandiInput, setAssignedMandiInput] = useState('mandi-haldwani');
  const [pinInput, setPinInput] = useState('2026');

  // Officer Operations state
  const [selectedMandiFilter, setSelectedMandiFilter] = useState<string>(
    currentOfficer ? currentOfficer.assignedMandiId : 'mandi-haldwani'
  );
  const [weighingModalBooking, setWeighingModalBooking] = useState<SlotBooking | null>(null);
  const [weighedAmount, setWeighedAmount] = useState<string>('45');
  const [weighedGrade, setWeighedGrade] = useState<'A' | 'B' | 'C'>('A');

  // Broadcast & Rebalance state
  const [broadcastText, setBroadcastText] = useState('');
  const [broadcastSuccess, setBroadcastSuccess] = useState(false);
  const [rebalanceMinutes, setRebalanceMinutes] = useState('25');

  // Search in officer portal
  const [searchQuery, setSearchQuery] = useState('');

  // Handle Login
  const handleSignIn = (e: React.FormEvent) => {
    e.preventDefault();
    const officer: OfficerProfile = {
      id: `officer-${Date.now()}`,
      employeeId: empIdInput || 'DOCA-UK-8491',
      name: officerNameInput || 'श्री आर. एस. बिष्ट (R.S. Bisht)',
      designation: designationInput,
      assignedMandiId: assignedMandiInput,
      mobileNumber: '9837012345',
      department: 'Department of Consumer Affairs (DoCA), Uttarakhand APMC'
    };
    onOfficerLogin(officer);
    setSelectedMandiFilter(officer.assignedMandiId);
  };

  // Handle Registration
  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    const officer: OfficerProfile = {
      id: `officer-${Date.now()}`,
      employeeId: empIdInput || `DOCA-UK-${Math.floor(1000 + Math.random() * 9000)}`,
      name: officerNameInput || 'अधिकारी (Officer)',
      designation: designationInput,
      assignedMandiId: assignedMandiInput,
      mobileNumber: '9837000000',
      department: 'Department of Consumer Affairs, Uttarakhand'
    };
    onOfficerRegister(officer);
    setSelectedMandiFilter(officer.assignedMandiId);
    confetti({ particleCount: 70, spread: 50 });
  };

  const loadDemoOfficer = (type: 'haldwani' | 'dehradun') => {
    if (type === 'haldwani') {
      onOfficerLogin({
        id: 'officer-1',
        employeeId: 'DOCA-UK-8491',
        name: 'श्री आर. एस. बिष्ट (R.S. Bisht)',
        designation: 'वरिष्ठ मंडी सचिव (Mandi Secretary)',
        assignedMandiId: 'mandi-haldwani',
        mobileNumber: '9837012345',
        department: 'DoCA Uttarakhand APMC Board'
      });
      setSelectedMandiFilter('mandi-haldwani');
    } else {
      onOfficerLogin({
        id: 'officer-2',
        employeeId: 'DOCA-UK-3920',
        name: 'श्रीमती अनीता जोशी (Anita Joshi)',
        designation: 'मुख्य खरीद अधिकारी (Chief Procurement Officer)',
        assignedMandiId: 'mandi-dehradun',
        mobileNumber: '9411122334',
        department: 'DoCA Uttarakhand APMC Board'
      });
      setSelectedMandiFilter('mandi-dehradun');
    }
  };

  // If officer NOT logged in, show Officer Portal Sign-In / Registration
  if (!currentOfficer) {
    return (
      <div className="max-w-xl mx-auto py-8 px-4">
        <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-sm border border-slate-200">
          
          <div className="text-center mb-6">
            <div className="w-14 h-14 bg-blue-100 rounded-2xl flex items-center justify-center text-blue-800 mx-auto mb-3 shadow-xs">
              <Building2 className="w-8 h-8" />
            </div>
            <h2 className="text-2xl font-black text-slate-900">
              {t.officerLoginTitle}
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 mt-1">
              {t.officerLoginSubtitle}
            </p>
          </div>

          <div className="grid grid-cols-2 p-1 bg-slate-100 rounded-xl mb-6 text-xs sm:text-sm font-bold">
            <button
              id="officer-tab-signin"
              onClick={() => setAuthMode('signin')}
              className={`py-2 rounded-lg transition-all ${
                authMode === 'signin' ? 'bg-white text-blue-950 shadow-xs' : 'text-slate-500'
              }`}
            >
              {currentLang === 'en' ? 'Officer Sign In' : 'अधिकारी लॉगिन'}
            </button>
            <button
              id="officer-tab-register"
              onClick={() => setAuthMode('register')}
              className={`py-2 rounded-lg transition-all ${
                authMode === 'register' ? 'bg-white text-blue-950 shadow-xs' : 'text-slate-500'
              }`}
            >
              {currentLang === 'en' ? 'New Officer Registration' : 'नया अधिकारी पंजीकरण'}
            </button>
          </div>

          <form onSubmit={authMode === 'signin' ? handleSignIn : handleRegister} className="space-y-3.5 text-xs sm:text-sm">
            <div>
              <label className="block font-bold text-slate-700 mb-1">
                {t.empIdLabel} *
              </label>
              <input
                id="officer-empid-input"
                type="text"
                required
                value={empIdInput}
                onChange={(e) => setEmpIdInput(e.target.value)}
                placeholder={t.empIdPlaceholder}
                className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl font-mono text-sm uppercase focus:border-blue-600 outline-none"
              />
            </div>

            {authMode === 'register' && (
              <div>
                <label className="block font-bold text-slate-700 mb-1">
                  {t.officerNameLabel} *
                </label>
                <input
                  type="text"
                  required
                  value={officerNameInput}
                  onChange={(e) => setOfficerNameInput(e.target.value)}
                  placeholder={t.officerNamePlaceholder}
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-sm"
                />
              </div>
            )}

            <div>
              <label className="block font-bold text-slate-700 mb-1">
                {t.assignedMandiLabel}
              </label>
              <select
                id="officer-mandi-select"
                value={assignedMandiInput}
                onChange={(e) => setAssignedMandiInput(e.target.value)}
                className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl font-medium"
              >
                {mandis.map(m => (
                  <option key={m.id} value={m.id}>
                    {m.name[currentLang] || m.name.hi} ({m.district[currentLang === 'en' ? 'en' : 'hi']})
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block font-bold text-slate-700 mb-1">
                {t.designationLabel}
              </label>
              <select
                value={designationInput}
                onChange={(e) => setDesignationInput(e.target.value)}
                className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl font-medium"
              >
                <option value="वरिष्ठ मंडी सचिव (Mandi Secretary)">वरिष्ठ मंडी सचिव (Senior Mandi Secretary)</option>
                <option value="मुख्य खरीद अधिकारी (Chief Procurement Officer)">मुख्य खरीद अधिकारी (Procurement Officer)</option>
                <option value="इलेक्ट्रॉनिक धर्मकांटा निरीक्षक (Weighbridge Inspector)">इलेक्ट्रॉनिक धर्मकांटा निरीक्षक (Weighbridge Inspector)</option>
                <option value="DoCA जिला नोडल अधिकारी (District Nodal Officer)">DoCA जिला नोडल अधिकारी (District Nodal Officer)</option>
              </select>
            </div>

            <div>
              <label className="block font-bold text-slate-700 mb-1">
                {t.officerPinLabel}
              </label>
              <input
                id="officer-pin-input"
                type="password"
                maxLength={4}
                value={pinInput}
                onChange={(e) => setPinInput(e.target.value)}
                placeholder="2026"
                className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl font-mono text-center tracking-widest text-base"
              />
            </div>

            <button
              id="officer-submit-btn"
              type="submit"
              className="w-full py-3.5 bg-blue-700 hover:bg-blue-800 text-white font-black text-sm rounded-xl shadow-xs transition-colors flex items-center justify-center gap-2 mt-4"
            >
              <span>{t.loginOfficerBtn}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>

          {/* Quick Demo logins */}
          <div className="mt-6 pt-5 border-t border-slate-100">
            <p className="text-xs text-slate-500 font-bold mb-2">
              {currentLang === 'en' ? 'Quick Test One-Click Officer Login:' : 'त्वरित टेस्ट हेतु एक-क्लिक अधिकारी लॉगिन:'}
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              <button
                id="quick-officer-haldwani"
                onClick={() => loadDemoOfficer('haldwani')}
                className="p-2.5 text-left rounded-xl bg-slate-50 hover:bg-blue-50 border border-slate-200 text-xs transition-all"
              >
                <div className="font-bold text-blue-950">हल्द्वानी मंडी (आर. एस. बिष्ट)</div>
                <div className="text-[11px] text-slate-500">ID: DOCA-UK-8491 • Kumaon Hub</div>
              </button>
              <button
                id="quick-officer-dehradun"
                onClick={() => loadDemoOfficer('dehradun')}
                className="p-2.5 text-left rounded-xl bg-slate-50 hover:bg-blue-50 border border-slate-200 text-xs transition-all"
              >
                <div className="font-bold text-blue-950">देहरादून मंडी (अनीता जोशी)</div>
                <div className="text-[11px] text-slate-500">ID: DOCA-UK-3920 • Niranjanpur</div>
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Officer IS logged in
  const currentMandi = mandis.find(m => m.id === selectedMandiFilter) || mandis[0];
  const mandiBookings = allBookings.filter(b => b.mandiId === currentMandi.id);

  // Search filtered
  const filteredBookings = mandiBookings.filter(b => {
    const q = searchQuery.toLowerCase();
    return (
      b.tokenNumber.toLowerCase().includes(q) ||
      b.farmerName.toLowerCase().includes(q) ||
      b.farmerAadhaar.includes(q) ||
      b.vehiclePlateNumber.toLowerCase().includes(q)
    );
  });

  const handleOpenWeighingModal = (b: SlotBooking) => {
    setWeighingModalBooking(b);
    setWeighedAmount(b.quantityQuintals.toString());
  };

  const handleSaveWeighing = () => {
    if (!weighingModalBooking) return;
    const actual = parseFloat(weighedAmount) || weighingModalBooking.quantityQuintals;
    const rate = currentMandi.potatoProcurementPricePerQtl || 1490;
    const totalAmount = Math.round(actual * rate);

    onUpdateBookingStage(weighingModalBooking.id, 'weighing_quality', {
      actualWeight: actual,
      qualityGrade: weighedGrade,
      totalPayable: totalAmount
    });
    setWeighingModalBooking(null);
  };

  const handleBroadcast = (e: React.FormEvent) => {
    e.preventDefault();
    if (!broadcastText.trim()) return;
    onBroadcastSMS(broadcastText);
    setBroadcastSuccess(true);
    setBroadcastText('');
    setTimeout(() => setBroadcastSuccess(false), 4000);
  };

  const handleRebalance = () => {
    const mins = parseInt(rebalanceMinutes) || 30;
    onBroadcastSMS(`अलर्ट: मंडी तौल रश के कारण आगामी स्लॉट में ${mins} मिनट का अतिरिक्त समय जोड़ा गया है।`);
    alert(`Dynamic Slot Rebalancing Complete! All active farmers shifted by +${mins} mins and SMS dispatched.`);
  };

  return (
    <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 space-y-6">
      
      {/* Officer Header Card */}
      <div className="bg-gradient-to-r from-blue-950 via-slate-900 to-indigo-950 text-white rounded-3xl p-6 sm:p-8 shadow-md">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-1 bg-blue-600/80 px-3 py-1 rounded-full text-xs font-bold mb-2">
              <Building2 className="w-3.5 h-3.5" />
              <span>{currentOfficer.designation}</span>
            </div>
            
            <h1 className="text-2xl sm:text-3xl font-black tracking-tight">
              {currentOfficer.name}
            </h1>
            
            <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs sm:text-sm text-blue-200 mt-2">
              <span>Employee ID: <strong className="font-mono text-white">{currentOfficer.employeeId}</strong></span>
              <span>•</span>
              <span>नियुक्त मंडी: <strong className="text-white">{currentMandi.name[currentLang] || currentMandi.name.hi}</strong></span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {/* Mandi selector for officers inspecting different hubs */}
            <select
              value={selectedMandiFilter}
              onChange={(e) => setSelectedMandiFilter(e.target.value)}
              className="bg-white/10 text-white border border-white/20 rounded-xl px-3 py-2 text-xs font-bold outline-none cursor-pointer"
            >
              {mandis.map(m => (
                <option key={m.id} value={m.id} className="text-slate-900">
                  {m.name.hi}
                </option>
              ))}
            </select>

            <button
              id="officer-logout-top-btn"
              onClick={onOfficerLogout}
              className="px-3 py-2 bg-red-600/80 hover:bg-red-600 text-white rounded-xl text-xs font-bold transition-colors flex items-center gap-1.5"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>{t.signOut}</span>
            </button>
          </div>
        </div>

        {/* Live Mandi Gauges */}
        <div className="mt-6 pt-5 border-t border-white/10 grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs">
          <div className="bg-white/5 p-3 rounded-xl border border-white/10">
            <span className="text-blue-300 block text-[11px]">{t.todayThroughput}</span>
            <span className="text-lg font-black text-white">{currentMandi.bookedQuintals} Qtl</span>
          </div>
          <div className="bg-white/5 p-3 rounded-xl border border-white/10">
            <span className="text-blue-300 block text-[11px]">{t.activeTokensToday}</span>
            <span className="text-lg font-black text-white">{mandiBookings.length} टोकन</span>
          </div>
          <div className="bg-white/5 p-3 rounded-xl border border-white/10">
            <span className="text-blue-300 block text-[11px]">{t.currentWaitAvg}</span>
            <span className="text-lg font-black text-amber-300">{currentMandi.currentWaitTimeMinutes} मिनट ({currentMandi.vehiclesInQueue} ट्रक)</span>
          </div>
          <div className="bg-white/5 p-3 rounded-xl border border-white/10">
            <span className="text-blue-300 block text-[11px]">{t.remainingCapacity}</span>
            <span className="text-lg font-black text-emerald-400">{currentMandi.dailyCapacityQuintals - currentMandi.bookedQuintals} Qtl शेष</span>
          </div>
        </div>
      </div>

      {/* Dynamic Rebalancing & Emergency SMS Dispatch (Highlighted in SIH PDF) */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* Dynamic Rebalancing */}
        <div className="bg-white rounded-3xl p-6 shadow-xs border border-slate-200">
          <div className="flex items-center gap-2 mb-2">
            <RefreshCw className="w-5 h-5 text-indigo-600" />
            <h3 className="font-bold text-slate-900 text-base">
              {t.dynamicRebalance}
            </h3>
          </div>
          <p className="text-xs text-slate-500 mb-4">
            {t.rebalanceDesc}
          </p>

          <div className="flex items-center gap-3">
            <select
              value={rebalanceMinutes}
              onChange={(e) => setRebalanceMinutes(e.target.value)}
              className="px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl text-xs font-bold"
            >
              <option value="15">+15 मिनट स्लॉट शिफ्ट करें</option>
              <option value="25">+25 मिनट स्लॉट शिफ्ट करें</option>
              <option value="40">+40 मिनट स्लॉट शिफ्ट करें</option>
              <option value="60">+1 घंटा रीशेड्यूल करें</option>
            </select>

            <button
              id="trigger-rebalance-btn"
              onClick={handleRebalance}
              className="flex-1 py-2 px-3 bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs rounded-xl transition-colors shadow-xs"
            >
              री-बैलेंस लागू करें (Auto Reshuffle)
            </button>
          </div>
        </div>

        {/* Emergency SMS Broadcast */}
        <div className="bg-white rounded-3xl p-6 shadow-xs border border-slate-200">
          <div className="flex items-center gap-2 mb-2">
            <Send className="w-5 h-5 text-emerald-600" />
            <h3 className="font-bold text-slate-900 text-base">
              {t.sendSmsAlertAll}
            </h3>
          </div>
          <form onSubmit={handleBroadcast} className="flex gap-2">
            <input
              id="broadcast-sms-input"
              type="text"
              value={broadcastText}
              onChange={(e) => setBroadcastText(e.target.value)}
              placeholder={t.alertMessagePlaceholder}
              className="flex-1 px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl text-xs outline-none focus:border-emerald-600"
            />
            <button
              id="broadcast-sms-submit-btn"
              type="submit"
              className="px-4 py-2 bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs rounded-xl shrink-0"
            >
              भेजें (Send)
            </button>
          </form>
          {broadcastSuccess && (
            <p className="text-[11px] text-emerald-700 font-bold mt-2">
              ✓ सभी पंजीकृत किसानों को एसएमएस संदेश सफलतापूर्वक भेजा गया!
            </p>
          )}
        </div>
      </div>

      {/* Live Queue Operations Table */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-xs border border-slate-200">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
          <div>
            <h3 className="text-xl font-extrabold text-slate-900">
              {currentMandi.name.hi} — {currentLang === 'en' ? 'Live Queue Operations' : 'लाइव कतार संचालन'}
            </h3>
            <p className="text-xs text-slate-500">
              {currentLang === 'en' 
                ? 'Advance token stages, record electronic weighbridge readings, and trigger immediate DBT payments' 
                : 'टोकन का गेट आगमन दर्ज करें, तौल व गुणवत्ता भरें और सीधे बैंक खाते में भुगतान (DBT) स्वीकृत करें'}
            </p>
          </div>

          <div className="relative w-full sm:w-64">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="टोकन, किसान या आधार से खोजें..."
              className="w-full pl-8 pr-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs outline-none"
            />
            <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-3" />
          </div>
        </div>

        {/* Table of Bookings */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200 text-slate-600 font-bold">
                <th className="py-3 px-3">टोकन / किसान</th>
                <th className="py-3 px-3">आधार / फोन</th>
                <th className="py-3 px-3">फसल व मात्रा</th>
                <th className="py-3 px-3">वाहन / गेट</th>
                <th className="py-3 px-3">वर्तमान स्थिति</th>
                <th className="py-3 px-3 text-right">कार्रवाई (Action)</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredBookings.map((b) => (
                <tr key={b.id} className="hover:bg-slate-50/80 transition-colors">
                  <td className="py-3 px-3">
                    <div className="font-mono font-extrabold text-emerald-800 text-sm">
                      {b.tokenNumber}
                    </div>
                    <div className="font-bold text-slate-900 text-xs mt-0.5">
                      {b.farmerName}
                    </div>
                  </td>

                  <td className="py-3 px-3">
                    <div className="font-mono text-slate-600">
                      XXXX-{b.farmerAadhaar.slice(-4)}
                    </div>
                    <div className="text-slate-500 text-[11px]">
                      +91 {b.farmerMobile}
                    </div>
                  </td>

                  <td className="py-3 px-3">
                    <div className="font-bold text-slate-800">
                      🥔 आलू (Potato)
                    </div>
                    <div className="text-slate-500">
                      {b.actualWeightQuintals ? `${b.actualWeightQuintals} Qtl (तौल)` : `${b.quantityQuintals} Qtl (अनुमानित)`}
                    </div>
                  </td>

                  <td className="py-3 px-3">
                    <div className="font-mono uppercase font-semibold text-slate-700">
                      {b.vehiclePlateNumber}
                    </div>
                    <div className="text-emerald-700 font-medium text-[11px]">
                      {b.assignedGate}
                    </div>
                  </td>

                  <td className="py-3 px-3">
                    <span className={`inline-block px-2.5 py-1 rounded-full font-bold text-[10px] ${
                      b.currentStage === 'payment_settled'
                        ? 'bg-emerald-100 text-emerald-900'
                        : b.currentStage === 'procurement_approved'
                        ? 'bg-blue-100 text-blue-900'
                        : b.currentStage === 'weighing_quality'
                        ? 'bg-purple-100 text-purple-900'
                        : b.currentStage === 'gate_arrived'
                        ? 'bg-amber-100 text-amber-900'
                        : 'bg-slate-100 text-slate-700'
                    }`}>
                      {b.currentStage === 'slot_booked' && '1. स्लॉट बुक'}
                      {b.currentStage === 'gate_arrived' && '2. गेट आगमन'}
                      {b.currentStage === 'weighing_quality' && '3. तौल व गुणवत्ता'}
                      {b.currentStage === 'procurement_approved' && '4. खरीद स्वीकृत'}
                      {b.currentStage === 'payment_settled' && '5. DBT भुगतान पूर्ण'}
                    </span>
                  </td>

                  <td className="py-3 px-3 text-right">
                    <div className="flex items-center justify-end gap-1.5">
                      {b.currentStage === 'slot_booked' && (
                        <button
                          id={`officer-gate-${b.id}`}
                          onClick={() => onUpdateBookingStage(b.id, 'gate_arrived')}
                          className="px-2.5 py-1.5 bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold rounded-lg text-[11px]"
                        >
                          गेट आगमन दर्ज
                        </button>
                      )}

                      {b.currentStage === 'gate_arrived' && (
                        <button
                          id={`officer-weigh-${b.id}`}
                          onClick={() => handleOpenWeighingModal(b)}
                          className="px-2.5 py-1.5 bg-purple-600 hover:bg-purple-700 text-white font-bold rounded-lg text-[11px] flex items-center gap-1"
                        >
                          <Scale className="w-3 h-3" />
                          <span>तौल दर्ज करें</span>
                        </button>
                      )}

                      {b.currentStage === 'weighing_quality' && (
                        <button
                          id={`officer-approve-${b.id}`}
                          onClick={() => onUpdateBookingStage(b.id, 'procurement_approved')}
                          className="px-2.5 py-1.5 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-lg text-[11px]"
                        >
                          खरीद स्वीकृत करें
                        </button>
                      )}

                      {b.currentStage === 'procurement_approved' && (
                        <button
                          id={`officer-pay-${b.id}`}
                          onClick={() => {
                            const rate = currentMandi.potatoProcurementPricePerQtl;
                            const amount = (b.actualWeightQuintals || b.quantityQuintals) * rate;
                            onUpdateBookingStage(b.id, 'payment_settled', { totalPayable: amount });
                            confetti({ particleCount: 100, spread: 70 });
                          }}
                          className="px-2.5 py-1.5 bg-emerald-700 hover:bg-emerald-800 text-white font-bold rounded-lg text-[11px] flex items-center gap-1"
                        >
                          <Banknote className="w-3 h-3 text-amber-300" />
                          <span>DBT जारी करें</span>
                        </button>
                      )}

                      {b.currentStage === 'payment_settled' && (
                        <span className="text-emerald-700 font-bold text-xs flex items-center gap-1">
                          <CheckCircle2 className="w-4 h-4" />
                          <span>संपन्न (₹{b.totalPayableAmount?.toLocaleString()})</span>
                        </span>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Weighing Modal */}
      {weighingModalBooking && (
        <div className="fixed inset-0 z-50 bg-slate-950/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl border border-slate-100">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 mb-4">
              <h4 className="text-lg font-bold text-slate-900">
                इलेक्ट्रॉनिक धर्मकांटा तौल - {weighingModalBooking.tokenNumber}
              </h4>
              <button
                onClick={() => setWeighingModalBooking(null)}
                className="w-7 h-7 rounded-full bg-slate-100 text-slate-500 font-bold"
              >
                ✕
              </button>
            </div>

            <div className="space-y-4 text-xs sm:text-sm">
              <div>
                <span className="text-slate-500 block text-xs">किसान का नाम:</span>
                <strong className="text-slate-900 text-sm">{weighingModalBooking.farmerName}</strong>
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">
                  वास्तविक तौल (Net Weight in Quintals) *
                </label>
                <input
                  type="number"
                  step="0.1"
                  required
                  value={weighedAmount}
                  onChange={(e) => setWeighedAmount(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl font-mono text-base font-bold"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">
                  फसल गुणवत्ता ग्रेड (Quality Grade)
                </label>
                <select
                  value={weighedGrade}
                  onChange={(e: any) => setWeighedGrade(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl font-bold"
                >
                  <option value="A">Grade A (उत्कृष्ट गुणवत्ता - Full Rate ₹{currentMandi.potatoProcurementPricePerQtl})</option>
                  <option value="B">Grade B (मध्यम गुणवत्ता)</option>
                  <option value="C">Grade C (साधारण गुणवत्ता)</option>
                </select>
              </div>

              <div className="p-3 bg-emerald-50 rounded-xl border border-emerald-200">
                <span className="text-emerald-900 block text-xs">अनुमानित DBT देय राशि:</span>
                <strong className="text-xl font-black text-emerald-950 font-mono">
                  ₹{Math.round((parseFloat(weighedAmount) || 0) * currentMandi.potatoProcurementPricePerQtl).toLocaleString()}
                </strong>
              </div>

              <div className="pt-2 flex gap-3">
                <button
                  type="button"
                  onClick={() => setWeighingModalBooking(null)}
                  className="flex-1 py-2.5 border border-slate-300 rounded-xl font-bold text-slate-700"
                >
                  रद्द करें
                </button>
                <button
                  type="button"
                  onClick={handleSaveWeighing}
                  className="flex-1 py-2.5 bg-purple-700 hover:bg-purple-800 text-white rounded-xl font-bold"
                >
                  तौल दर्ज करें
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
