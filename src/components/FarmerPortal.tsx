import React, { useState } from 'react';
import { 
  ShieldCheck, 
  User, 
  Calendar, 
  Clock, 
  Truck, 
  FileCheck2, 
  Printer, 
  QrCode, 
  ArrowRight, 
  CheckCircle2, 
  PlusCircle, 
  LogOut, 
  Sparkles,
  Layers,
  AlertCircle,
  Banknote,
  Wheat,
  MapPin,
  ChevronRight
} from 'lucide-react';
import { FarmerProfile, SlotBooking, UttarakhandMandi, Language, CropType } from '../types';
import { TRANSLATIONS } from '../i18n/translations';
import { CROPS_CONFIG } from '../data/mockData';
import confetti from 'canvas-confetti';

interface FarmerPortalProps {
  currentLang: Language;
  currentFarmer: FarmerProfile | null;
  onFarmerLogin: (farmer: FarmerProfile) => void;
  onFarmerRegister: (farmer: FarmerProfile) => void;
  onFarmerLogout: () => void;
  mandis: UttarakhandMandi[];
  farmerBookings: SlotBooking[];
  onBookSlot: (booking: Omit<SlotBooking, 'id' | 'tokenNumber' | 'createdAt' | 'currentStage' | 'queuePosition' | 'approxWaitTimeMinutes'>) => void;
  preselectedMandiId?: string;
  onSelectBookingForPass: (booking: SlotBooking) => void;
  onOpenIVR: () => void;
}

export const FarmerPortal: React.FC<FarmerPortalProps> = ({
  currentLang,
  currentFarmer,
  onFarmerLogin,
  onFarmerRegister,
  onFarmerLogout,
  mandis,
  farmerBookings,
  onBookSlot,
  preselectedMandiId,
  onSelectBookingForPass,
  onOpenIVR
}) => {
  const t = TRANSLATIONS[currentLang];

  // Auth form state
  const [authMode, setAuthMode] = useState<'signin' | 'register'>('signin');
  const [aadhaarInput, setAadhaarInput] = useState('');
  const [mobileInput, setMobileInput] = useState('');
  const [otpInput, setOtpInput] = useState('');
  const [otpSent, setOtpSent] = useState(false);
  const [otpCountdown, setOtpCountdown] = useState(30);

  // Registration specifics
  const [regName, setRegName] = useState('');
  const [regDistrict, setRegDistrict] = useState('देहरादून');
  const [regVillage, setRegVillage] = useState('');
  const [regLandSize, setRegLandSize] = useState('3.5');
  const [regPrimaryCrop, setRegPrimaryCrop] = useState<CropType>('potato');
  const [regBankLast4, setRegBankLast4] = useState('4891');
  const [regIfsc, setRegIfsc] = useState('SBIN0001234');

  // Slot Booking Form state
  const [selectedCrop, setSelectedCrop] = useState<CropType>('potato');
  const [selectedVariety, setSelectedVariety] = useState('Kufri Jyoti (कुफरी ज्योति)');
  const [quantity, setQuantity] = useState('40');
  const [vehicleType, setVehicleType] = useState<'tractor' | 'pickup' | 'truck' | 'cart'>('tractor');
  const [vehiclePlate, setVehiclePlate] = useState('UK 07 AA 4491');
  const [selectedMandiId, setSelectedMandiId] = useState(preselectedMandiId || 'mandi-haldwani');
  const [bookingDate, setBookingDate] = useState('2026-09-14');
  const [selectedTimeSlot, setSelectedTimeSlot] = useState('09:00 AM - 11:00 AM');
  const [showBookingModal, setShowBookingModal] = useState(false);

  // Trigger demo OTP
  const handleSendOtp = () => {
    if (aadhaarInput.replace(/\D/g, '').length < 12) {
      alert('कृपया 12 अंकों का वैध आधार नंबर दर्ज करें। (Please enter a valid 12-digit Aadhaar number)');
      return;
    }
    setOtpSent(true);
    setOtpInput('849201'); // Pre-fill mock OTP for zero friction
  };

  const handleSignIn = (e: React.FormEvent) => {
    e.preventDefault();
    const cleanAadhaar = aadhaarInput.replace(/\D/g, '');
    
    // Check if farmer matches an existing sample or create session
    const existingFarmer: FarmerProfile = {
      id: `farmer-${Date.now()}`,
      aadhaarNumber: cleanAadhaar || '583491207412',
      name: cleanAadhaar === '876543219012' ? 'बलबीर सिंह रावत (Balbeer Singh Rawat)' : 'रमेश सिंह नेगी (Ramesh Singh Negi)',
      mobileNumber: mobileInput || '9876543210',
      district: 'देहरादून',
      village: 'डोईवाला, देहरादून (Doiwala)',
      landSizeAcres: 4.5,
      primaryCrop: 'potato',
      bankAccountLast4: '4891',
      ifscCode: 'SBIN0001234',
      registeredAt: '2026-09-13',
      isAadhaarVerified: true
    };
    onFarmerLogin(existingFarmer);
  };

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    const cleanAadhaar = aadhaarInput.replace(/\D/g, '');
    if (cleanAadhaar.length < 12) {
      alert('कृपया 12 अंकों का आधार नंबर दर्ज करें (Please enter 12-digit Aadhaar)');
      return;
    }

    const newFarmer: FarmerProfile = {
      id: `farmer-${Date.now()}`,
      aadhaarNumber: cleanAadhaar,
      name: regName || 'किसान (Farmer)',
      mobileNumber: mobileInput || '9876543210',
      district: regDistrict,
      village: regVillage || 'ग्राम सभा, उत्तराखंड',
      landSizeAcres: parseFloat(regLandSize) || 2.0,
      primaryCrop: regPrimaryCrop,
      bankAccountLast4: regBankLast4 || '1234',
      ifscCode: regIfsc || 'SBIN0001234',
      registeredAt: new Date().toISOString().split('T')[0],
      isAadhaarVerified: true
    };

    onFarmerRegister(newFarmer);
    confetti({ particleCount: 80, spread: 60 });
  };

  // Demo 1-click logins
  const loadDemoFarmer = (farmerType: 'ramesh' | 'balbeer') => {
    if (farmerType === 'ramesh') {
      onFarmerLogin({
        id: 'farmer-1',
        aadhaarNumber: '583491207412',
        name: 'रमेश सिंह नेगी (Ramesh Singh Negi)',
        mobileNumber: '9876543210',
        district: 'देहरादून',
        village: 'सहारनपुर रोड, डोईवाला',
        landSizeAcres: 4.5,
        primaryCrop: 'potato',
        bankAccountLast4: '4891',
        ifscCode: 'SBIN0001234',
        registeredAt: '2026-08-10',
        isAadhaarVerified: true
      });
    } else {
      onFarmerLogin({
        id: 'farmer-2',
        aadhaarNumber: '876543219012',
        name: 'बलबीर सिंह रावत (Balbeer Singh Rawat)',
        mobileNumber: '9412098765',
        district: 'नैनीताल',
        village: 'हल्दूचौड़, हल्द्वानी',
        landSizeAcres: 6.0,
        primaryCrop: 'potato',
        bankAccountLast4: '8820',
        ifscCode: 'PUNB0182700',
        registeredAt: '2026-08-15',
        isAadhaarVerified: true
      });
    }
    confetti({ particleCount: 60, spread: 50 });
  };

  const handleBookingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentFarmer) return;

    const chosenMandi = mandis.find(m => m.id === selectedMandiId) || mandis[0];
    const qty = parseFloat(quantity) || 40;

    onBookSlot({
      farmerAadhaar: currentFarmer.aadhaarNumber,
      farmerName: currentFarmer.name,
      farmerMobile: currentFarmer.mobileNumber,
      mandiId: chosenMandi.id,
      mandiName: chosenMandi.name[currentLang] || chosenMandi.name.hi,
      crop: selectedCrop,
      variety: selectedVariety,
      quantityQuintals: qty,
      vehicleType,
      vehiclePlateNumber: vehiclePlate,
      scheduledDate: bookingDate,
      timeSlot: selectedTimeSlot,
      estimatedArrivalWindow: selectedTimeSlot.includes('09:00') ? '09:15 AM - 09:45 AM' : '11:15 AM - 11:45 AM',
      assignedGate: 'गेट नं. 2 (Gate No. 2)'
    });

    setShowBookingModal(false);
    confetti({ particleCount: 100, spread: 70 });
  };

  const selectedMandiObj = mandis.find(m => m.id === selectedMandiId) || mandis[0];

  // If farmer is NOT logged in, show Farmer Sign-In / Registration form
  if (!currentFarmer) {
    return (
      <div className="max-w-xl mx-auto py-8 px-4">
        <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-sm border border-slate-200">
          
          {/* Header */}
          <div className="text-center mb-6">
            <div className="w-14 h-14 bg-emerald-100 rounded-2xl flex items-center justify-center text-emerald-800 mx-auto mb-3 shadow-xs">
              <User className="w-8 h-8" />
            </div>
            <h2 className="text-2xl font-black text-slate-900">
              {t.farmerLoginTitle}
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 mt-1">
              {t.farmerLoginSubtitle}
            </p>
          </div>

          {/* Tab switch between Sign In and New Registration */}
          <div className="grid grid-cols-2 p-1 bg-slate-100 rounded-xl mb-6 text-xs sm:text-sm font-bold">
            <button
              id="farmer-tab-signin"
              onClick={() => setAuthMode('signin')}
              className={`py-2 rounded-lg transition-all ${
                authMode === 'signin' ? 'bg-white text-emerald-950 shadow-xs' : 'text-slate-500'
              }`}
            >
              {currentLang === 'en' ? 'Aadhaar Login' : 'आधार लॉगिन'}
            </button>
            <button
              id="farmer-tab-register"
              onClick={() => setAuthMode('register')}
              className={`py-2 rounded-lg transition-all ${
                authMode === 'register' ? 'bg-white text-emerald-950 shadow-xs' : 'text-slate-500'
              }`}
            >
              {currentLang === 'en' ? 'New Registration' : 'नया किसान पंजीकरण'}
            </button>
          </div>

          {/* Sign In Form */}
          {authMode === 'signin' ? (
            <form onSubmit={handleSignIn} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  {t.aadhaarLabel}
                </label>
                <input
                  id="farmer-aadhaar-input"
                  type="text"
                  maxLength={12}
                  required
                  value={aadhaarInput}
                  onChange={(e) => setAadhaarInput(e.target.value)}
                  placeholder={t.aadhaarPlaceholder}
                  className="w-full px-4 py-3 bg-slate-50 border border-slate-300 rounded-xl text-base font-mono focus:border-emerald-600 focus:bg-white outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  {t.mobileLabel}
                </label>
                <div className="flex gap-2">
                  <input
                    id="farmer-mobile-input"
                    type="tel"
                    maxLength={10}
                    value={mobileInput}
                    onChange={(e) => setMobileInput(e.target.value)}
                    placeholder={t.mobilePlaceholder}
                    className="flex-1 px-4 py-3 bg-slate-50 border border-slate-300 rounded-xl text-sm focus:border-emerald-600 outline-none"
                  />
                  <button
                    type="button"
                    onClick={handleSendOtp}
                    className="px-4 py-3 bg-emerald-100 text-emerald-800 hover:bg-emerald-200 font-bold text-xs rounded-xl whitespace-nowrap"
                  >
                    {otpSent ? 'OTP भेजा गया ✓' : t.sendOtp}
                  </button>
                </div>
              </div>

              {otpSent && (
                <div className="p-3 bg-emerald-50 rounded-xl border border-emerald-200 animate-fadeIn">
                  <label className="block text-xs font-bold text-emerald-900 mb-1">
                    {t.otpLabel}
                  </label>
                  <input
                    id="farmer-otp-input"
                    type="text"
                    maxLength={6}
                    value={otpInput}
                    onChange={(e) => setOtpInput(e.target.value)}
                    placeholder="849201"
                    className="w-full px-4 py-2 bg-white border border-emerald-300 rounded-lg text-lg font-mono text-center tracking-widest font-bold"
                  />
                  <span className="text-[10px] text-emerald-700 mt-1 block">
                    ✓ डेमो सत्यापन: स्वतः भरा गया (Auto-filled mock OTP for testing)
                  </span>
                </div>
              )}

              <button
                id="farmer-submit-signin-btn"
                type="submit"
                className="w-full py-3.5 bg-emerald-700 hover:bg-emerald-800 text-white font-black text-sm rounded-xl shadow-xs transition-colors flex items-center justify-center gap-2 mt-2"
              >
                <span>{t.verifyAndLogin}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </form>
          ) : (
            /* Registration Form */
            <form onSubmit={handleRegister} className="space-y-3.5 text-xs">
              <div>
                <label className="block font-bold text-slate-700 mb-1">
                  {t.aadhaarLabel} *
                </label>
                <input
                  type="text"
                  maxLength={12}
                  required
                  value={aadhaarInput}
                  onChange={(e) => setAadhaarInput(e.target.value)}
                  placeholder="12-अंकों का आधार नंबर"
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl font-mono text-sm"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">
                    {t.fullNameLabel} *
                  </label>
                  <input
                    type="text"
                    required
                    value={regName}
                    onChange={(e) => setRegName(e.target.value)}
                    placeholder="उदा. रमेश सिंह नेगी"
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-sm"
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-700 mb-1">
                    {t.mobileLabel} *
                  </label>
                  <input
                    type="tel"
                    required
                    value={mobileInput}
                    onChange={(e) => setMobileInput(e.target.value)}
                    placeholder="9876543210"
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-sm"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">
                    {t.districtLabel} *
                  </label>
                  <select
                    value={regDistrict}
                    onChange={(e) => setRegDistrict(e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-sm"
                  >
                    <option value="देहरादून">देहरादून (Dehradun)</option>
                    <option value="नैनीताल">नैनीताल (Nainital)</option>
                    <option value="हरिद्वार">हरिद्वार (Haridwar)</option>
                    <option value="ऊधम सिंह नगर">ऊधम सिंह नगर (US Nagar)</option>
                    <option value="पौड़ी गढ़वाल">पौड़ी गढ़वाल (Pauri)</option>
                    <option value="टिहरी गढ़वाल">टिहरी गढ़वाल (Tehri)</option>
                    <option value="अल्मोड़ा">अल्मोड़ा (Almora)</option>
                  </select>
                </div>
                <div>
                  <label className="block font-bold text-slate-700 mb-1">
                    {t.villageLabel}
                  </label>
                  <input
                    type="text"
                    value={regVillage}
                    onChange={(e) => setRegVillage(e.target.value)}
                    placeholder="उदा. डोईवाला / ऋषिकेश"
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-sm"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">
                    {t.landLabel}
                  </label>
                  <input
                    type="number"
                    step="0.5"
                    value={regLandSize}
                    onChange={(e) => setRegLandSize(e.target.value)}
                    placeholder="3.5"
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-sm"
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-700 mb-1">
                    {t.primaryCropLabel}
                  </label>
                  <select
                    value={regPrimaryCrop}
                    onChange={(e: any) => setRegPrimaryCrop(e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-sm font-semibold"
                  >
                    <option value="potato">🥔 आलू (Potato)</option>
                    <option value="wheat">🌾 गेहूं (Wheat)</option>
                    <option value="paddy">🍚 धान (Paddy)</option>
                    <option value="tomato">🍅 टमाटर (Tomato)</option>
                    <option value="apple">🍎 सेब (Apple)</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">
                    {t.bankLast4Label}
                  </label>
                  <input
                    type="text"
                    maxLength={4}
                    value={regBankLast4}
                    onChange={(e) => setRegBankLast4(e.target.value)}
                    placeholder="4891"
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl font-mono text-sm"
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-700 mb-1">
                    {t.ifscLabel}
                  </label>
                  <input
                    type="text"
                    value={regIfsc}
                    onChange={(e) => setRegIfsc(e.target.value)}
                    placeholder="SBIN0001234"
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl font-mono text-sm"
                  />
                </div>
              </div>

              <button
                id="farmer-submit-register-btn"
                type="submit"
                className="w-full py-3.5 bg-emerald-700 hover:bg-emerald-800 text-white font-black text-sm rounded-xl shadow-xs transition-colors flex items-center justify-center gap-2 mt-4"
              >
                <span>पंजीकरण पूर्ण करें व स्लॉट बुक करें</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </form>
          )}

          {/* Quick Demo Pre-fills */}
          <div className="mt-6 pt-5 border-t border-slate-100">
            <p className="text-xs text-slate-500 font-bold mb-2">
              {currentLang === 'en' ? 'Quick Test One-Click Logins:' : 'त्वरित टेस्ट हेतु एक-क्लिक लॉगिन:'}
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              <button
                id="quick-login-ramesh"
                onClick={() => loadDemoFarmer('ramesh')}
                className="p-2.5 text-left rounded-xl bg-slate-50 hover:bg-emerald-50 border border-slate-200 text-xs transition-all"
              >
                <div className="font-bold text-emerald-950">रमेश सिंह नेगी (Dehradun)</div>
                <div className="text-[11px] text-slate-500">Aadhaar: 5834-9120-7412 • Potato</div>
              </button>
              <button
                id="quick-login-balbeer"
                onClick={() => loadDemoFarmer('balbeer')}
                className="p-2.5 text-left rounded-xl bg-slate-50 hover:bg-emerald-50 border border-slate-200 text-xs transition-all"
              >
                <div className="font-bold text-emerald-950">बलबीर सिंह रावत (Haldwani)</div>
                <div className="text-[11px] text-slate-500">Aadhaar: 8765-4321-9012 • Potato</div>
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Farmer IS logged in: Render profile info, slot booking, active tokens & tracking
  const activeBooking = farmerBookings.find(b => b.farmerAadhaar === currentFarmer.aadhaarNumber && b.currentStage !== 'payment_settled')
    || farmerBookings.find(b => b.farmerAadhaar === currentFarmer.aadhaarNumber);

  return (
    <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 space-y-6">
      
      {/* 1. Farmer Identity & Verified Info Card (Requirement: Farmer jb registration karega usko uski info dikhni chahiye) */}
      <div className="bg-gradient-to-r from-emerald-900 via-emerald-800 to-teal-950 text-white rounded-3xl p-6 sm:p-8 shadow-md">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <div className="flex flex-wrap items-center gap-2 mb-2">
              <span className="inline-flex items-center gap-1 bg-emerald-700/80 px-3 py-1 rounded-full text-xs font-bold text-emerald-200">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-300" />
                <span>{t.verifiedAadhaarBadge}</span>
              </span>
              <span className="inline-flex items-center gap-1 bg-teal-800/80 px-3 py-1 rounded-full text-xs font-semibold text-teal-200">
                <Banknote className="w-3.5 h-3.5" />
                <span>{t.dbtLinked}</span>
              </span>
            </div>
            
            <h1 className="text-2xl sm:text-3xl font-black tracking-tight">
              {currentFarmer.name}
            </h1>

            <div className="flex flex-wrap items-center gap-y-1 gap-x-4 text-xs sm:text-sm text-emerald-100/90 mt-2">
              <span>
                आधार: <strong className="font-mono text-white">XXXX-XXXX-{currentFarmer.aadhaarNumber.slice(-4)}</strong>
              </span>
              <span>•</span>
              <span>
                मोबाइल: <strong className="font-mono text-white">+91 {currentFarmer.mobileNumber}</strong>
              </span>
              <span>•</span>
              <span>
                स्थान: <strong className="text-white">{currentFarmer.village}, {currentFarmer.district}</strong>
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              id="book-new-slot-btn"
              onClick={() => setShowBookingModal(true)}
              className="px-4 py-2.5 bg-amber-400 hover:bg-amber-500 text-slate-950 font-black text-xs sm:text-sm rounded-xl shadow-xs transition-all flex items-center gap-1.5 active:scale-95"
            >
              <PlusCircle className="w-4 h-4" />
              <span>{t.navBookSlot}</span>
            </button>

            <button
              id="farmer-logout-header-btn"
              onClick={onFarmerLogout}
              className="px-3 py-2.5 bg-white/10 hover:bg-white/20 text-white rounded-xl text-xs font-bold transition-colors"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Detailed Farmer Info Grid */}
        <div className="mt-6 pt-5 border-t border-emerald-700/60 grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs">
          <div className="bg-emerald-950/40 p-3 rounded-xl border border-emerald-700/40">
            <span className="text-emerald-300 block text-[11px]">{t.primaryCropLabel}</span>
            <span className="font-bold text-white text-sm capitalize">🥔 आलू (Potato)</span>
          </div>
          <div className="bg-emerald-950/40 p-3 rounded-xl border border-emerald-700/40">
            <span className="text-emerald-300 block text-[11px]">{t.landLabel}</span>
            <span className="font-bold text-white text-sm">{currentFarmer.landSizeAcres} एकड़ (Acres)</span>
          </div>
          <div className="bg-emerald-950/40 p-3 rounded-xl border border-emerald-700/40">
            <span className="text-emerald-300 block text-[11px]">DBT बैंक खाता</span>
            <span className="font-bold text-white text-sm font-mono">A/C ..{currentFarmer.bankAccountLast4}</span>
          </div>
          <div className="bg-emerald-950/40 p-3 rounded-xl border border-emerald-700/40">
            <span className="text-emerald-300 block text-[11px]">IFSC कोड</span>
            <span className="font-bold text-white text-sm font-mono">{currentFarmer.ifscCode}</span>
          </div>
        </div>
      </div>

      {/* 2. Active Slot Booking & 5-Stage Live Queue Tracker from PDF */}
      {activeBooking ? (
        <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-xs border border-slate-200">
          <div className="flex flex-wrap items-center justify-between gap-3 mb-6 pb-4 border-b border-slate-100">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-emerald-800 bg-emerald-100 px-2.5 py-1 rounded-md">
                सक्रिय टोकन (Active Token)
              </span>
              <h2 className="text-2xl font-black text-slate-900 mt-1 flex items-center gap-2">
                <span className="font-mono text-emerald-800">{activeBooking.tokenNumber}</span>
                <span className="text-sm font-semibold text-slate-600">({activeBooking.mandiName})</span>
              </h2>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => onSelectBookingForPass(activeBooking)}
                className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs sm:text-sm rounded-xl flex items-center gap-2 transition-colors"
              >
                <Printer className="w-4 h-4 text-amber-400" />
                <span>{t.downloadPass}</span>
              </button>
            </div>
          </div>

          {/* 5-Stage Progress Visualizer (From Tech Titans SIH 2026 Presentation PDF) */}
          <div className="my-6">
            <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-4">
              कतार एवं खरीद प्रक्रिया (Real-Time 5-Stage Queue Engine):
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-5 gap-3">
              {[
                { stage: 'slot_booked', num: '1', title: t.stage1, desc: 'स्लॉट कन्फर्म' },
                { stage: 'gate_arrived', num: '2', title: t.stage2, desc: activeBooking.assignedGate },
                { stage: 'weighing_quality', num: '3', title: t.stage3, desc: 'इलेक्ट्रॉनिक धर्मकांटा' },
                { stage: 'procurement_approved', num: '4', title: t.stage4, desc: 'अधिकारी रसीद' },
                { stage: 'payment_settled', num: '5', title: t.stage5, desc: 'सीधा DBT ट्रांसफर' }
              ].map((step, idx) => {
                const stagesOrder = ['slot_booked', 'gate_arrived', 'weighing_quality', 'procurement_approved', 'payment_settled'];
                const currentIndex = stagesOrder.indexOf(activeBooking.currentStage);
                const isPassed = currentIndex >= idx;
                const isCurrent = currentIndex === idx;

                return (
                  <div
                    key={step.stage}
                    className={`p-3 rounded-2xl border-2 transition-all text-left ${
                      isCurrent
                        ? 'border-emerald-600 bg-emerald-50/80 shadow-xs ring-2 ring-emerald-600/20'
                        : isPassed
                        ? 'border-emerald-200 bg-emerald-50/40 text-emerald-950'
                        : 'border-slate-100 bg-slate-50 text-slate-400'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${
                        isPassed ? 'bg-emerald-700 text-white' : 'bg-slate-200 text-slate-600'
                      }`}>
                        {isPassed && !isCurrent ? '✓' : step.num}
                      </span>
                      {isCurrent && (
                        <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-ping"></span>
                      )}
                    </div>
                    <div className="font-bold text-xs sm:text-sm text-slate-900 line-clamp-1">
                      {step.title}
                    </div>
                    <div className="text-[11px] text-slate-500 mt-0.5">
                      {step.desc}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Arrival Window & Queue Status Box */}
          <div className="p-4 rounded-2xl bg-amber-50/80 border border-amber-200 grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
            <div>
              <span className="text-amber-800 font-medium block">{t.arrivalWindow}:</span>
              <strong className="text-base text-amber-950 font-bold">
                {activeBooking.estimatedArrivalWindow}
              </strong>
              <p className="text-[11px] text-amber-700">दिनांक: {activeBooking.scheduledDate}</p>
            </div>
            <div>
              <span className="text-amber-800 font-medium block">वर्तमान कतार स्थिति:</span>
              <strong className="text-base text-amber-950 font-bold">
                {activeBooking.currentStage === 'payment_settled' 
                  ? 'सफलतापूर्वक पूर्ण' 
                  : `आगे ${activeBooking.queuePosition} गाड़ियां (प्रतीक्षा ~${activeBooking.approxWaitTimeMinutes} मिनट)`}
              </strong>
              <p className="text-[11px] text-amber-700">आवंटित: {activeBooking.assignedGate}</p>
            </div>
            <div>
              <span className="text-amber-800 font-medium block">फसल व अनुमानित मूल्य:</span>
              <strong className="text-base text-amber-950 font-bold">
                {activeBooking.quantityQuintals} क्विंटल आलू (₹{activeBooking.quantityQuintals * 1490})
              </strong>
              <p className="text-[11px] text-amber-700">वाहन: {activeBooking.vehiclePlateNumber}</p>
            </div>
          </div>
        </div>
      ) : (
        <div className="bg-white rounded-3xl p-8 text-center border border-slate-200 shadow-xs">
          <Wheat className="w-12 h-12 text-emerald-600 mx-auto mb-3" />
          <h3 className="text-xl font-bold text-slate-900">{t.noActiveBooking}</h3>
          <p className="text-xs sm:text-sm text-slate-500 max-w-md mx-auto mt-1 mb-5">
            उत्तराखंड की किसी भी मंडी में आलू या फसल बेचने के लिए ऑनलाइन स्लॉट बुक करें और बिना लाइन में खड़े निश्चित समय पर मंडी पहुंचे।
          </p>
          <button
            onClick={() => setShowBookingModal(true)}
            className="px-6 py-3 bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-sm rounded-xl shadow-xs inline-flex items-center gap-2"
          >
            <PlusCircle className="w-4 h-4" />
            <span>{t.navBookSlot}</span>
          </button>
        </div>
      )}

      {/* 3. Slot Booking Form / Modal */}
      {showBookingModal && (
        <div className="fixed inset-0 z-50 bg-slate-950/60 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-3xl max-w-2xl w-full p-6 sm:p-8 shadow-2xl border border-slate-100 my-8">
            <div className="flex items-center justify-between pb-4 border-b border-slate-100 mb-5">
              <div>
                <h3 className="text-xl font-extrabold text-slate-900">
                  {t.bookSlotTitle}
                </h3>
                <p className="text-xs text-slate-500">
                  {t.bookSlotSubtitle}
                </p>
              </div>
              <button
                onClick={() => setShowBookingModal(false)}
                className="w-8 h-8 rounded-full bg-slate-100 text-slate-500 hover:bg-slate-200 flex items-center justify-center font-bold"
              >
                ✕
              </button>
            </div>

            {/* Smart Mandi Recommendation Notice */}
            <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-xl text-xs text-emerald-950 flex items-start gap-2 mb-4">
              <Sparkles className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
              <span>{t.bestRecommendationNotice}</span>
            </div>

            <form onSubmit={handleBookingSubmit} className="space-y-4 text-xs sm:text-sm">
              
              {/* Crop Selection */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">
                    {t.selectCrop}
                  </label>
                  <select
                    value={selectedCrop}
                    onChange={(e: any) => {
                      setSelectedCrop(e.target.value);
                      const cropObj = CROPS_CONFIG.find(c => c.id === e.target.value);
                      if (cropObj && cropObj.varieties.length > 0) {
                        setSelectedVariety(cropObj.varieties[0]);
                      }
                    }}
                    className="w-full px-3 py-2.5 bg-slate-50 border border-slate-300 rounded-xl font-semibold"
                  >
                    {CROPS_CONFIG.map(c => (
                      <option key={c.id} value={c.id}>
                        {c.name[currentLang] || c.name.hi} (MSP: ₹{c.defaultMspPerQtl})
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">
                    {t.cropVariety}
                  </label>
                  <select
                    value={selectedVariety}
                    onChange={(e) => setSelectedVariety(e.target.value)}
                    className="w-full px-3 py-2.5 bg-slate-50 border border-slate-300 rounded-xl"
                  >
                    {(CROPS_CONFIG.find(c => c.id === selectedCrop)?.varieties || []).map(v => (
                      <option key={v} value={v}>{v}</option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Quantity & Transport */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">
                    {t.quantityQuintal} *
                  </label>
                  <input
                    type="number"
                    min="1"
                    max="500"
                    required
                    value={quantity}
                    onChange={(e) => setQuantity(e.target.value)}
                    className="w-full px-3 py-2.5 bg-slate-50 border border-slate-300 rounded-xl font-bold"
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">
                    {t.vehicleType}
                  </label>
                  <select
                    value={vehicleType}
                    onChange={(e: any) => setVehicleType(e.target.value)}
                    className="w-full px-3 py-2.5 bg-slate-50 border border-slate-300 rounded-xl"
                  >
                    <option value="tractor">🚜 ट्रैक्टर-ट्राली (Tractor-Trolley)</option>
                    <option value="pickup">🛻 पिकअप / छोटा हाथी (Mini-Truck)</option>
                    <option value="truck">🚛 बड़ा ट्रक (Heavy Truck)</option>
                    <option value="cart">🐂 बैलगाड़ी (Bullock Cart)</option>
                  </select>
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">
                    {t.vehiclePlate}
                  </label>
                  <input
                    type="text"
                    required
                    value={vehiclePlate}
                    onChange={(e) => setVehiclePlate(e.target.value)}
                    placeholder="UK 07 AA 4491"
                    className="w-full px-3 py-2.5 bg-slate-50 border border-slate-300 rounded-xl font-mono uppercase"
                  />
                </div>
              </div>

              {/* Mandi Selection */}
              <div>
                <label className="block font-bold text-slate-700 mb-1">
                  {t.preferredMandi} (उत्तराखंड)
                </label>
                <select
                  value={selectedMandiId}
                  onChange={(e) => setSelectedMandiId(e.target.value)}
                  className="w-full px-3 py-2.5 bg-slate-50 border border-slate-300 rounded-xl font-medium"
                >
                  {mandis.map(m => (
                    <option key={m.id} value={m.id}>
                      {m.name[currentLang] || m.name.hi} — {m.approxDistanceKm}km | {m.currentWaitTimeMinutes}m wait | Potato: ₹{m.potatoProcurementPricePerQtl}
                    </option>
                  ))}
                </select>
                
                {/* Mandi detail pill */}
                {selectedMandiObj && (
                  <div className="mt-2 text-[11px] text-slate-600 bg-slate-100 p-2.5 rounded-xl flex items-center justify-between">
                    <span>स्थान: <strong>{selectedMandiObj.locationAddress}</strong></span>
                    <span>आलू भाव: <strong className="text-emerald-800">₹{selectedMandiObj.potatoProcurementPricePerQtl}/क्विंटल</strong></span>
                  </div>
                )}
              </div>

              {/* Date and Time Slot */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">
                    {t.preferredDate}
                  </label>
                  <input
                    type="date"
                    value={bookingDate}
                    onChange={(e) => setBookingDate(e.target.value)}
                    className="w-full px-3 py-2.5 bg-slate-50 border border-slate-300 rounded-xl"
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">
                    {t.preferredTimeSlot}
                  </label>
                  <select
                    value={selectedTimeSlot}
                    onChange={(e) => setSelectedTimeSlot(e.target.value)}
                    className="w-full px-3 py-2.5 bg-slate-50 border border-slate-300 rounded-xl font-medium"
                  >
                    <option value="08:00 AM - 10:00 AM">प्रातः 08:00 AM - 10:00 AM (कम भीड़)</option>
                    <option value="10:00 AM - 12:00 PM">सुबह 10:00 AM - 12:00 PM</option>
                    <option value="12:00 PM - 02:00 PM">दोपहर 12:00 PM - 02:00 PM</option>
                    <option value="02:00 PM - 04:00 PM">दोपहर 02:00 PM - 04:00 PM (तेज तौल)</option>
                  </select>
                </div>
              </div>

              {/* Submit Buttons */}
              <div className="pt-4 flex items-center gap-3">
                <button
                  type="button"
                  onClick={() => setShowBookingModal(false)}
                  className="flex-1 py-3 border border-slate-300 text-slate-700 font-bold rounded-xl"
                >
                  रद्द करें (Cancel)
                </button>
                <button
                  id="submit-slot-booking-btn"
                  type="submit"
                  className="flex-2 py-3 bg-emerald-700 hover:bg-emerald-800 text-white font-bold rounded-xl shadow-xs flex items-center justify-center gap-2"
                >
                  <CheckCircle2 className="w-4 h-4" />
                  <span>{t.confirmBookingBtn}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* 4. Booking History List */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-xs border border-slate-200">
        <h3 className="text-lg font-bold text-slate-900 mb-4 flex items-center gap-2">
          <Calendar className="w-5 h-5 text-emerald-700" />
          <span>{currentLang === 'en' ? 'Previous Bookings & Settlement Records' : 'पूर्व बुकिंग एवं भुगतान इतिहास'}</span>
        </h3>

        {farmerBookings.length > 0 ? (
          <div className="space-y-3">
            {farmerBookings.map((b) => (
              <div
                key={b.id}
                className="p-4 rounded-2xl border border-slate-200 hover:border-slate-300 bg-slate-50/50 flex flex-wrap items-center justify-between gap-3 text-xs sm:text-sm"
              >
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-mono font-bold text-emerald-900 bg-emerald-100 px-2 py-0.5 rounded">
                      {b.tokenNumber}
                    </span>
                    <span className="font-bold text-slate-800">
                      {b.mandiName}
                    </span>
                  </div>
                  <p className="text-xs text-slate-600 mt-1">
                    {b.scheduledDate} ({b.timeSlot}) • {b.quantityQuintals} Qtl Potato • {b.vehiclePlateNumber}
                  </p>
                </div>

                <div className="flex items-center gap-3">
                  <div className="text-right">
                    <span className={`text-xs font-bold px-2.5 py-1 rounded-full ${
                      b.currentStage === 'payment_settled' ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'
                    }`}>
                      {b.currentStage === 'payment_settled' ? 'DBT पूर्ण (₹' + (b.totalPayableAmount?.toLocaleString() || '') + ')' : 'कतार में (In Queue)'}
                    </span>
                  </div>

                  <button
                    onClick={() => onSelectBookingForPass(b)}
                    className="p-2 text-slate-600 hover:text-emerald-700 border border-slate-200 rounded-lg bg-white"
                    title="View Pass"
                  >
                    <QrCode className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-xs text-slate-500">{t.noActiveBooking}</p>
        )}
      </div>
    </div>
  );
};
