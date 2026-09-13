import React, { useState } from 'react';
import { 
  Search, 
  ShieldCheck, 
  Calendar, 
  Clock, 
  CheckCircle2, 
  FileText, 
  Truck, 
  Wheat, 
  Sparkles,
  ArrowRight
} from 'lucide-react';
import { Language, FarmerProfile, SlotBooking } from '../types';
import { TRANSLATIONS } from '../i18n/translations';

interface AadhaarQuickLookupProps {
  currentLang: Language;
  farmers: FarmerProfile[];
  bookings: SlotBooking[];
  onSelectBooking: (booking: SlotBooking) => void;
  onLoginAsFarmer?: (farmer: FarmerProfile) => void;
}

export const AadhaarQuickLookup: React.FC<AadhaarQuickLookupProps> = ({
  currentLang,
  farmers,
  bookings,
  onSelectBooking,
  onLoginAsFarmer
}) => {
  const t = TRANSLATIONS[currentLang];
  const [searchAadhaar, setSearchAadhaar] = useState('');
  const [searched, setSearched] = useState(false);

  // Clean and find matching farmer
  const cleanQuery = searchAadhaar.replace(/\D/g, '');
  const matchedFarmer = farmers.find(
    f => f.aadhaarNumber === cleanQuery || f.aadhaarNumber.slice(-4) === cleanQuery
  );

  const matchedBookings = matchedFarmer 
    ? bookings.filter(b => b.farmerAadhaar === matchedFarmer.aadhaarNumber)
    : [];

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setSearched(true);
  };

  const setSampleAadhaar = (num: string) => {
    setSearchAadhaar(num);
    setSearched(true);
  };

  const getStageLabel = (stage: SlotBooking['currentStage']) => {
    switch (stage) {
      case 'slot_booked': return t.stage1;
      case 'gate_arrived': return t.stage2;
      case 'weighing_quality': return t.stage3;
      case 'procurement_approved': return t.stage4;
      case 'payment_settled': return t.stage5;
      default: return stage;
    }
  };

  return (
    <div className="max-w-4xl mx-auto py-6 px-4">
      {/* Search Header */}
      <div className="bg-white rounded-2xl p-6 shadow-xs border border-slate-200">
        <div className="flex items-center gap-3 mb-2">
          <div className="w-10 h-10 rounded-xl bg-emerald-100 flex items-center justify-center text-emerald-800">
            <Search className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-slate-900">
              {t.aadhaarLookupTitle}
            </h2>
            <p className="text-xs sm:text-sm text-slate-500">
              {t.aadhaarLookupSubtitle}
            </p>
          </div>
        </div>

        {/* Aadhaar Input Form */}
        <form onSubmit={handleSearch} className="mt-5">
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="relative flex-1">
              <input
                id="aadhaar-search-input"
                type="text"
                maxLength={14}
                value={searchAadhaar}
                onChange={(e) => {
                  setSearchAadhaar(e.target.value);
                  if (searched) setSearched(false);
                }}
                placeholder={
                  currentLang === 'en'
                    ? 'Enter 12-digit Aadhaar number (e.g. 5834 9120 7412)'
                    : currentLang === 'pa'
                    ? '12 ਅੰਕਾਂ ਦਾ ਆਧਾਰ ਨੰਬਰ ਦਰਜ ਕਰੋ (ਜਿਵੇਂ 5834 9120 7412)'
                    : currentLang === 'ne'
                    ? '१२ अंकको आधार नम्बर हाल्नुहोस् (जस्तै ५८३४ ९१२० ७४१२)'
                    : '12 अंकों का आधार नंबर दर्ज करें (उदा. 5834 9120 7412)'
                }
                className="w-full pl-4 pr-10 py-3.5 bg-slate-50 border-2 border-slate-200 focus:border-emerald-600 focus:bg-white rounded-xl text-base font-medium text-slate-900 placeholder:text-slate-400 outline-none transition-all"
              />
              <span className="absolute right-3.5 top-3.5 text-xs text-slate-400 font-mono">
                12 DIGITS
              </span>
            </div>
            <button
              id="aadhaar-search-submit-btn"
              type="submit"
              className="px-6 py-3.5 bg-emerald-700 hover:bg-emerald-800 text-white font-bold rounded-xl shadow-xs transition-colors flex items-center justify-center gap-2"
            >
              <Search className="w-4 h-4" />
              <span>{t.searchBtn}</span>
            </button>
          </div>

          {/* Quick Demo Pre-fill Aadhaar chips */}
          <div className="mt-4 flex flex-wrap items-center gap-2 text-xs">
            <span className="text-slate-500 font-medium">
              {currentLang === 'en' ? 'Quick Test Aadhaar Numbers:' : 'त्वरित परीक्षण हेतु आधार नंबर:'}
            </span>
            <button
              type="button"
              id="quick-aadhaar-1"
              onClick={() => setSampleAadhaar('583491207412')}
              className="px-2.5 py-1 bg-emerald-50 text-emerald-800 border border-emerald-200 rounded-md font-mono hover:bg-emerald-100 transition-colors"
            >
              5834 9120 7412 (देहरादून - रमेश)
            </button>
            <button
              type="button"
              id="quick-aadhaar-2"
              onClick={() => setSampleAadhaar('876543219012')}
              className="px-2.5 py-1 bg-emerald-50 text-emerald-800 border border-emerald-200 rounded-md font-mono hover:bg-emerald-100 transition-colors"
            >
              8765 4321 9012 (हल्द्वानी - बलबीर)
            </button>
          </div>
        </form>
      </div>

      {/* Results View */}
      {searched && (
        <div className="mt-6 space-y-5">
          {matchedFarmer ? (
            <>
              {/* Farmer Profile Card */}
              <div className="bg-gradient-to-r from-emerald-900 to-emerald-950 text-white rounded-2xl p-6 shadow-md">
                <div className="flex flex-wrap items-start justify-between gap-4">
                  <div>
                    <div className="inline-flex items-center gap-1.5 bg-emerald-700/80 px-2.5 py-1 rounded-full text-xs font-semibold mb-2">
                      <ShieldCheck className="w-4 h-4 text-emerald-300" />
                      <span>{t.verifiedAadhaarBadge}</span>
                    </div>
                    <h3 className="text-2xl font-black tracking-tight">
                      {matchedFarmer.name}
                    </h3>
                    <p className="text-emerald-200 text-sm mt-0.5">
                      {currentLang === 'en' ? 'Aadhaar Number:' : currentLang === 'pa' ? 'ਆਧਾਰ ਨੰਬਰ:' : currentLang === 'ne' ? 'आधार नम्बर:' : 'आधार संख्या:'} <span className="font-mono font-bold text-white tracking-wider">
                        XXXX XXXX {matchedFarmer.aadhaarNumber.slice(-4)}
                      </span>
                    </p>
                  </div>

                  {onLoginAsFarmer && (
                    <button
                      onClick={() => onLoginAsFarmer(matchedFarmer)}
                      className="px-4 py-2 bg-amber-400 hover:bg-amber-500 text-slate-950 font-bold text-xs rounded-xl shadow-sm transition-all flex items-center gap-1.5"
                    >
                      <span>{currentLang === 'en' ? 'Open Full Farmer Portal' : 'किसान पोर्टल में खोलें'}</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  )}
                </div>

                <div className="mt-5 pt-4 border-t border-emerald-800/80 grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs">
                  <div>
                    <span className="text-emerald-300 block">{t.mobileLabel}</span>
                    <span className="font-semibold text-white text-sm font-mono">+91 {matchedFarmer.mobileNumber}</span>
                  </div>
                  <div>
                    <span className="text-emerald-300 block">{t.districtLabel}</span>
                    <span className="font-semibold text-white text-sm">{matchedFarmer.district}</span>
                  </div>
                  <div>
                    <span className="text-emerald-300 block">{t.villageLabel}</span>
                    <span className="font-semibold text-white text-sm">{matchedFarmer.village}</span>
                  </div>
                  <div>
                    <span className="text-emerald-300 block">{t.bankLast4Label}</span>
                    <span className="font-semibold text-white text-sm">A/C ..{matchedFarmer.bankAccountLast4} (DBT Active)</span>
                  </div>
                </div>
              </div>

              {/* Bookings Section */}
              <div className="bg-white rounded-2xl p-6 shadow-xs border border-slate-200">
                <div className="flex items-center justify-between mb-4">
                  <h4 className="font-bold text-slate-900 text-lg flex items-center gap-2">
                    <Calendar className="w-5 h-5 text-emerald-700" />
                    <span>{currentLang === 'en' ? 'Linked Mandi Bookings & Token Slips' : 'लिंक किए गए मंडी टोकन व बुकिंग'}</span>
                  </h4>
                  <span className="bg-slate-100 text-slate-700 text-xs font-semibold px-2.5 py-1 rounded-full">
                    {matchedBookings.length} {t.recordsFound}
                  </span>
                </div>

                {matchedBookings.length > 0 ? (
                  <div className="space-y-4">
                    {matchedBookings.map((booking) => (
                      <div 
                        key={booking.id}
                        className="p-4 rounded-xl border-2 border-slate-200 hover:border-emerald-600 transition-colors bg-slate-50/60"
                      >
                        <div className="flex flex-wrap items-start justify-between gap-3">
                          <div>
                            <div className="flex items-center gap-2">
                              <span className="font-mono font-extrabold text-emerald-800 text-lg bg-emerald-100 px-2.5 py-0.5 rounded">
                                {booking.tokenNumber}
                              </span>
                              <span className={`text-xs font-bold px-2.5 py-1 rounded-full ${
                                booking.currentStage === 'payment_settled' 
                                  ? 'bg-emerald-100 text-emerald-900' 
                                  : booking.currentStage === 'gate_arrived'
                                  ? 'bg-blue-100 text-blue-900'
                                  : 'bg-amber-100 text-amber-900'
                              }`}>
                                {getStageLabel(booking.currentStage)}
                              </span>
                            </div>
                            <h5 className="font-bold text-slate-900 text-base mt-2">
                              {booking.mandiName}
                            </h5>
                            <p className="text-xs text-slate-600 mt-0.5 flex items-center gap-2">
                              <span>फसल: <strong className="text-slate-900">{booking.crop === 'potato' ? 'आलू (Potato)' : booking.crop}</strong></span>
                              <span>•</span>
                              <span>मात्रा: <strong className="text-slate-900">{booking.quantityQuintals} क्विंटल</strong></span>
                              <span>•</span>
                              <span>वाहन: <strong className="text-slate-900">{booking.vehiclePlateNumber}</strong></span>
                            </p>
                          </div>

                          <div className="text-right">
                            <span className="text-[11px] text-slate-500 block">{t.preferredDate} & {t.arrivalWindow}</span>
                            <span className="font-semibold text-slate-900 text-sm">{booking.scheduledDate}</span>
                            <p className="text-xs text-emerald-700 font-bold">{booking.estimatedArrivalWindow}</p>
                            <p className="text-xs text-slate-500">{booking.assignedGate}</p>
                          </div>
                        </div>

                        {/* Progress Status Bar (5 Stages from PDF) */}
                        <div className="mt-4 pt-3 border-t border-slate-200 flex items-center justify-between text-[11px]">
                          <div className="flex items-center gap-1.5 text-slate-600">
                            <Clock className="w-3.5 h-3.5 text-amber-600" />
                            <span>
                              {booking.currentStage === 'payment_settled' 
                                ? (currentLang === 'en' ? 'Completed & Paid via DBT' : 'खरीद पूर्ण व DBT भुगतान संपन्न')
                                : (currentLang === 'en' 
                                    ? `Wait time: approx ${booking.approxWaitTimeMinutes} mins (${booking.queuePosition} vehicles ahead)`
                                    : `प्रतीक्षा समय: लगभग ${booking.approxWaitTimeMinutes} मिनट (कतार में ${booking.queuePosition} आगे)`)}
                            </span>
                          </div>

                          <button
                            onClick={() => onSelectBooking(booking)}
                            className="px-3 py-1.5 bg-emerald-700 hover:bg-emerald-800 text-white font-medium rounded-lg text-xs flex items-center gap-1"
                          >
                            <FileText className="w-3.5 h-3.5" />
                            <span>{t.downloadPass}</span>
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8 text-slate-500">
                    <p className="text-sm">{t.noActiveBooking}</p>
                  </div>
                )}
              </div>
            </>
          ) : (
            <div className="bg-amber-50 border border-amber-200 rounded-2xl p-6 text-center">
              <p className="text-amber-900 font-semibold text-sm">
                {t.noRecordsForAadhaar}
              </p>
              <p className="text-xs text-amber-700 mt-1">
                {currentLang === 'en'
                  ? 'Switch to the Farmer Portal tab to register your Aadhaar and book your first mandi slot!'
                  : 'कृपया किसान पोर्टल में जाकर अपना आधार नंबर रजिस्टर करें और आलू/फसल का पहला स्लॉट बुक करें।'}
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
