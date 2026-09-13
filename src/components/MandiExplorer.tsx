import React, { useState, useMemo } from 'react';
import { 
  MapPin, 
  Clock, 
  Sparkles, 
  Phone, 
  ArrowRight, 
  CheckCircle2, 
  TrendingUp,
  Award,
  Zap,
  Layers,
  Search,
  Building2,
  Calendar
} from 'lucide-react';
import { MandiInfo, Language, CropType } from '../types';
import { TRANSLATIONS } from '../i18n/translations';

interface MandiExplorerProps {
  mandis: MandiInfo[];
  currentLang: Language;
  onSelectMandiForBooking: (mandiId: string) => void;
  onCallMandiHelpline: (phone: string, mandiName: string) => void;
}

const CROP_LABELS: Record<CropType, { hi: string; en: string; icon: string }> = {
  potato: { hi: 'आलू (Potato)', en: 'Potato', icon: '🥔' },
  wheat: { hi: 'गेहूं (Wheat)', en: 'Wheat', icon: '🌾' },
  paddy: { hi: 'धान/चावल (Paddy)', en: 'Paddy/Rice', icon: '🍚' },
  tomato: { hi: 'टमाटर (Tomato)', en: 'Tomato', icon: '🍅' },
  onion: { hi: 'प्याज (Onion)', en: 'Onion', icon: '🧅' },
  mustard: { hi: 'सरसों (Mustard)', en: 'Mustard', icon: '🌻' },
  apple: { hi: 'सेब (Apple)', en: 'Apple', icon: '🍎' },
  pulses: { hi: 'दालें (Pulses)', en: 'Pulses', icon: '🫘' },
  spices: { hi: 'मसाला/जीरा (Spices)', en: 'Spices/Cumin', icon: '🌶️' }
};

export const MandiExplorer: React.FC<MandiExplorerProps> = ({
  mandis,
  currentLang,
  onSelectMandiForBooking,
  onCallMandiHelpline
}) => {
  const t = TRANSLATIONS[currentLang] || TRANSLATIONS['hi'];
  const [selectedState, setSelectedState] = useState<string>('all');
  const [selectedCrop, setSelectedCrop] = useState<CropType | 'all'>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [sortBy, setSortBy] = useState<'recommended' | 'price' | 'wait' | 'distance'>('recommended');

  // Unique states extracted from data
  const statesList = useMemo(() => {
    const map = new Map<string, { code: string; nameEn: string; nameHi: string }>();
    mandis.forEach(m => {
      if (m.state && !map.has(m.state.code)) {
        map.set(m.state.code, {
          code: m.state.code,
          nameEn: m.state.en,
          nameHi: m.state.hi
        });
      }
    });
    return Array.from(map.values());
  }, [mandis]);

  // Helper to get effective price for current crop selection
  const getMandiPrice = (mandi: MandiInfo, crop: CropType | 'all'): number => {
    if (crop !== 'all' && mandi.cropPrices && mandi.cropPrices[crop]) {
      return mandi.cropPrices[crop]!;
    }
    return mandi.potatoProcurementPricePerQtl;
  };

  // Filtered and sorted Mandis
  const filteredMandis = useMemo(() => {
    let list = mandis.filter(m => {
      const matchState = selectedState === 'all' || m.state.code === selectedState;
      const matchCrop = selectedCrop === 'all' || (m.cropPrices && m.cropPrices[selectedCrop]) || (selectedCrop === 'potato');
      const q = searchQuery.toLowerCase();
      const matchSearch = 
        m.name.hi.toLowerCase().includes(q) ||
        m.name.en.toLowerCase().includes(q) ||
        m.state.en.toLowerCase().includes(q) ||
        m.state.hi.toLowerCase().includes(q) ||
        m.district.hi.toLowerCase().includes(q) ||
        m.district.en.toLowerCase().includes(q) ||
        m.locationAddress.toLowerCase().includes(q);
      return matchState && matchCrop && matchSearch;
    });

    if (sortBy === 'recommended') {
      list.sort((a, b) => {
        const scoreA = (a.isBestRecommended ? 50 : 0) - a.currentWaitTimeMinutes + (getMandiPrice(a, selectedCrop) / 100);
        const scoreB = (b.isBestRecommended ? 50 : 0) - b.currentWaitTimeMinutes + (getMandiPrice(b, selectedCrop) / 100);
        return scoreB - scoreA;
      });
    } else if (sortBy === 'price') {
      list.sort((a, b) => getMandiPrice(b, selectedCrop) - getMandiPrice(a, selectedCrop));
    } else if (sortBy === 'wait') {
      list.sort((a, b) => a.currentWaitTimeMinutes - b.currentWaitTimeMinutes);
    } else if (sortBy === 'distance') {
      list.sort((a, b) => a.approxDistanceKm - b.approxDistanceKm);
    }

    return list;
  }, [mandis, selectedState, selectedCrop, searchQuery, sortBy]);

  // Intelligent Best Mandi Recommendations
  const smartRecommendations = useMemo(() => {
    if (mandis.length === 0) return { bestOverall: null, highestPrice: null, lowestWait: null };

    // Pool of eligible mandis based on selected state if any
    const pool = selectedState === 'all' ? mandis : mandis.filter(m => m.state.code === selectedState);
    const activePool = pool.length > 0 ? pool : mandis;

    // 1. Highest Price Mandi
    const highestPrice = [...activePool].sort((a, b) => getMandiPrice(b, selectedCrop) - getMandiPrice(a, selectedCrop))[0];

    // 2. Lowest Wait Time Mandi
    const lowestWait = [...activePool].sort((a, b) => a.currentWaitTimeMinutes - b.currentWaitTimeMinutes)[0];

    // 3. Best Overall Mandi (Balanced high price, low wait, high capacity)
    const bestOverall = [...activePool].sort((a, b) => {
      const pA = getMandiPrice(a, selectedCrop);
      const pB = getMandiPrice(b, selectedCrop);
      const wA = a.currentWaitTimeMinutes;
      const wB = b.currentWaitTimeMinutes;
      // Balance price and wait time
      return (pB - wB * 10) - (pA - wA * 10);
    })[0];

    return { bestOverall, highestPrice, lowestWait };
  }, [mandis, selectedState, selectedCrop]);

  const getWaitColor = (mins: number) => {
    if (mins <= 20) return 'bg-emerald-50 text-emerald-800 border-emerald-300';
    if (mins <= 35) return 'bg-amber-50 text-amber-800 border-amber-300';
    return 'bg-rose-50 text-rose-800 border-rose-300';
  };

  const isEn = currentLang === 'en';

  const getMandiName = (mandi: MandiInfo) => {
    if (isEn) return mandi.name.en;
    if (currentLang === 'pa' && mandi.name.pa) return mandi.name.pa;
    if (currentLang === 'gu' && mandi.name.gu) return mandi.name.gu;
    if (currentLang === 'mr' && mandi.name.mr) return mandi.name.mr;
    return mandi.name.hi;
  };

  const getStateName = (mandi: MandiInfo) => {
    return isEn ? mandi.state.en : mandi.state.hi;
  };

  const getDistrictName = (mandi: MandiInfo) => {
    return isEn ? mandi.district.en : mandi.district.hi;
  };

  const getRecommendationText = (mandi: MandiInfo) => {
    if (isEn) return mandi.recommendationReason?.en || 'High procurement capacity and minimal congestion.';
    return mandi.recommendationReason?.hi || 'उच्चतम क्षमता एवं शून्य लाइन विलंब।';
  };

  return (
    <div className="max-w-7xl mx-auto py-6 px-3 sm:px-6 space-y-6">
      
      {/* Hero Header Banner */}
      <div className="bg-gradient-to-br from-emerald-900 via-teal-900 to-slate-900 text-white rounded-3xl p-6 sm:p-8 shadow-lg relative overflow-hidden">
        <div className="relative z-10 max-w-3xl">
          <div className="inline-flex items-center gap-1.5 bg-emerald-700/60 backdrop-blur-xs px-3 py-1 rounded-full text-xs font-semibold text-emerald-200 mb-3 border border-emerald-600/40">
            <Sparkles className="w-3.5 h-3.5 text-amber-300" />
            <span>{isEn ? 'National APMC E-Mandi Portal' : 'अखिल भारतीय ई-मंडी पोर्टल'}</span>
          </div>
          <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight">
            {t.mandiExplorerTitle}
          </h1>
          <p className="text-emerald-100/90 text-sm sm:text-base mt-2 leading-relaxed">
            {t.mandiExplorerSubtitle}
          </p>

          {/* Quick Metrics Bar */}
          <div className="mt-5 grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs sm:text-sm">
            <div className="bg-white/10 backdrop-blur-md p-3 rounded-2xl border border-white/10">
              <span className="text-emerald-200 block text-[11px]">{isEn ? 'Active States:' : 'सक्रिय राज्य:'}</span>
              <strong className="text-lg font-bold">{statesList.length} States</strong>
            </div>
            <div className="bg-white/10 backdrop-blur-md p-3 rounded-2xl border border-white/10">
              <span className="text-emerald-200 block text-[11px]">{isEn ? 'Major Mandis:' : 'कुल प्रमुख मंडियां:'}</span>
              <strong className="text-lg font-bold">{mandis.length} Mandis</strong>
            </div>
            <div className="bg-amber-400/20 backdrop-blur-md p-3 rounded-2xl border border-amber-400/30 text-amber-200">
              <span className="text-amber-200 block text-[11px]">{isEn ? 'Avg Wait Time:' : 'औसत प्रतीक्षा समय:'}</span>
              <strong className="text-lg font-bold text-amber-300">{isEn ? '~24 mins' : '~24 मिनट'}</strong>
            </div>
            <div className="bg-white/10 backdrop-blur-md p-3 rounded-2xl border border-white/10">
              <span className="text-emerald-200 block text-[11px]">{isEn ? 'Daily Capacity:' : 'दैनिक आवक क्षमता:'}</span>
              <strong className="text-lg font-bold">{isEn ? '75,000+ Qtl' : '75,000+ क्विंटल'}</strong>
            </div>
          </div>
        </div>
      </div>

      {/* --- SMART MANDI RECOMMENDATION ENGINE (सर्वश्रेष्ठ मंडी सुझाव) --- */}
      <div className="bg-gradient-to-r from-amber-50 via-emerald-50 to-teal-50 border border-emerald-200/80 rounded-3xl p-5 sm:p-7 shadow-xs">
        <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-2xl bg-amber-500 text-slate-950 flex items-center justify-center font-black shadow-xs">
              <Award className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg sm:text-xl font-bold text-slate-900 flex items-center gap-2">
                <span>{t.smartSuggesterTitle}</span>
              </h2>
              <p className="text-xs sm:text-sm text-slate-600">
                {t.smartSuggesterDesc}
              </p>
            </div>
          </div>

          <div className="text-xs bg-emerald-800 text-white font-bold px-3 py-1.5 rounded-full flex items-center gap-1.5 shadow-2xs">
            <Sparkles className="w-3.5 h-3.5 text-amber-300" />
            <span>{isEn ? 'AI Smart Suggestions' : 'AI संचालित सिफारिश'}</span>
          </div>
        </div>

        {/* 3 Smart Recommendation Highlight Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5 pt-1">
          {/* Card 1: Top Overall Recommendation */}
          {smartRecommendations.bestOverall && (
            <div className="bg-white rounded-2xl p-4 border-2 border-emerald-600 shadow-sm relative flex flex-col justify-between">
              <div>
                <div className="inline-flex items-center gap-1 bg-emerald-600 text-white text-[11px] font-extrabold px-2.5 py-0.5 rounded-full mb-2">
                  <Award className="w-3 h-3" />
                  <span>{t.overallBestBadge || (isEn ? '🏆 Top Recommended Mandi' : '🏆 सर्वश्रेष्ठ समग्र विकल्प')}</span>
                </div>
                <h3 className="font-bold text-slate-900 text-base leading-snug">
                  {getMandiName(smartRecommendations.bestOverall)}
                </h3>
                <p className="text-xs text-emerald-800 font-semibold mt-0.5 flex items-center gap-1">
                  <MapPin className="w-3 h-3" />
                  <span>{getStateName(smartRecommendations.bestOverall)} • {getDistrictName(smartRecommendations.bestOverall)}</span>
                </p>

                <div className="mt-3 grid grid-cols-2 gap-2 bg-emerald-50/60 p-2.5 rounded-xl border border-emerald-100 text-xs">
                  <div>
                    <span className="text-slate-500 block text-[10px]">{isEn ? 'Rate / Price:' : 'क्रय दर (Price):'}</span>
                    <strong className="text-emerald-700 font-black text-sm">
                      ₹{getMandiPrice(smartRecommendations.bestOverall, selectedCrop)} {isEn ? '/qtl' : '/क्विं'}
                    </strong>
                  </div>
                  <div>
                    <span className="text-slate-500 block text-[10px]">{isEn ? 'Wait Time:' : 'प्रतीक्षा (Wait Time):'}</span>
                    <strong className="text-slate-800 font-bold text-sm">
                      {smartRecommendations.bestOverall.currentWaitTimeMinutes} {isEn ? 'mins' : 'मिनट'}
                    </strong>
                  </div>
                </div>
                <p className="text-[11px] text-slate-600 mt-2 line-clamp-2">
                  {getRecommendationText(smartRecommendations.bestOverall)}
                </p>
              </div>

              <button
                onClick={() => onSelectMandiForBooking(smartRecommendations.bestOverall!.id)}
                className="mt-3.5 w-full py-2 px-3 bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs rounded-xl flex items-center justify-center gap-1.5 transition-colors cursor-pointer shadow-2xs"
              >
                <span>{t.bookAtThisMandi}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          )}

          {/* Card 2: Highest Price Mandi */}
          {smartRecommendations.highestPrice && (
            <div className="bg-white rounded-2xl p-4 border border-amber-300 shadow-sm relative flex flex-col justify-between">
              <div>
                <div className="inline-flex items-center gap-1 bg-amber-500 text-slate-950 text-[11px] font-black px-2.5 py-0.5 rounded-full mb-2">
                  <TrendingUp className="w-3 h-3" />
                  <span>{t.bestPriceBadge || (isEn ? '💰 Highest Rate' : '💰 सर्वाधिक भाव')}</span>
                </div>
                <h3 className="font-bold text-slate-900 text-base leading-snug">
                  {getMandiName(smartRecommendations.highestPrice)}
                </h3>
                <p className="text-xs text-amber-800 font-semibold mt-0.5 flex items-center gap-1">
                  <MapPin className="w-3 h-3" />
                  <span>{getStateName(smartRecommendations.highestPrice)} • {getDistrictName(smartRecommendations.highestPrice)}</span>
                </p>

                <div className="mt-3 grid grid-cols-2 gap-2 bg-amber-50/60 p-2.5 rounded-xl border border-amber-100 text-xs">
                  <div>
                    <span className="text-slate-500 block text-[10px]">{isEn ? 'Top MSP Rate:' : 'उच्चतम सरकारी दर:'}</span>
                    <strong className="text-amber-700 font-black text-sm">
                      ₹{getMandiPrice(smartRecommendations.highestPrice, selectedCrop)} {isEn ? '/qtl' : '/क्विं'}
                    </strong>
                  </div>
                  <div>
                    <span className="text-slate-500 block text-[10px]">{isEn ? 'Queue Status:' : 'कतार स्थिति:'}</span>
                    <strong className="text-slate-800 font-bold text-sm">
                      {smartRecommendations.highestPrice.vehiclesInQueue} {isEn ? 'Vehicles' : 'गाड़ियां'}
                    </strong>
                  </div>
                </div>
                <p className="text-[11px] text-slate-600 mt-2 line-clamp-2">
                  {getRecommendationText(smartRecommendations.highestPrice)}
                </p>
              </div>

              <button
                onClick={() => onSelectMandiForBooking(smartRecommendations.highestPrice!.id)}
                className="mt-3.5 w-full py-2 px-3 bg-amber-600 hover:bg-amber-700 text-white font-bold text-xs rounded-xl flex items-center justify-center gap-1.5 transition-colors cursor-pointer shadow-2xs"
              >
                <span>{t.bookAtThisMandi}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          )}

          {/* Card 3: Lowest Wait Time (Fastest Entry) */}
          {smartRecommendations.lowestWait && (
            <div className="bg-white rounded-2xl p-4 border border-teal-300 shadow-sm relative flex flex-col justify-between">
              <div>
                <div className="inline-flex items-center gap-1 bg-teal-600 text-white text-[11px] font-extrabold px-2.5 py-0.5 rounded-full mb-2">
                  <Zap className="w-3 h-3" />
                  <span>{t.lowestWaitBadge || (isEn ? '⚡ Shortest Queue' : '⚡ न्यूनतम कतार व वेटिंग')}</span>
                </div>
                <h3 className="font-bold text-slate-900 text-base leading-snug">
                  {getMandiName(smartRecommendations.lowestWait)}
                </h3>
                <p className="text-xs text-teal-800 font-semibold mt-0.5 flex items-center gap-1">
                  <MapPin className="w-3 h-3" />
                  <span>{getStateName(smartRecommendations.lowestWait)} • {getDistrictName(smartRecommendations.lowestWait)}</span>
                </p>

                <div className="mt-3 grid grid-cols-2 gap-2 bg-teal-50/60 p-2.5 rounded-xl border border-teal-100 text-xs">
                  <div>
                    <span className="text-slate-500 block text-[10px]">{isEn ? 'Wait Time:' : 'प्रतीक्षा समय:'}</span>
                    <strong className="text-teal-700 font-black text-sm">
                      {isEn ? `Only ${smartRecommendations.lowestWait.currentWaitTimeMinutes} mins` : `मात्र ${smartRecommendations.lowestWait.currentWaitTimeMinutes} मिनट`}
                    </strong>
                  </div>
                  <div>
                    <span className="text-slate-500 block text-[10px]">{isEn ? 'Active Weighbridges:' : 'सक्रिय कांटे:'}</span>
                    <strong className="text-slate-800 font-bold text-sm">
                      {smartRecommendations.lowestWait.activeGates} {isEn ? 'Gates' : 'गेट्स'}
                    </strong>
                  </div>
                </div>
                <p className="text-[11px] text-slate-600 mt-2 line-clamp-2">
                  {getRecommendationText(smartRecommendations.lowestWait)}
                </p>
              </div>

              <button
                onClick={() => onSelectMandiForBooking(smartRecommendations.lowestWait!.id)}
                className="mt-3.5 w-full py-2 px-3 bg-teal-700 hover:bg-teal-800 text-white font-bold text-xs rounded-xl flex items-center justify-center gap-1.5 transition-colors cursor-pointer shadow-2xs"
              >
                <span>{t.bookAtThisMandi}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          )}
        </div>
      </div>

      {/* --- FILTER & SEARCH CONTROLS --- */}
      <div className="bg-white rounded-3xl p-4 sm:p-5 border border-slate-200/80 shadow-xs space-y-4">
        
        {/* Search Bar & Sort Dropdown */}
        <div className="flex flex-col sm:flex-row items-center gap-3">
          <div className="relative flex-1 w-full">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={isEn ? "Search mandi name, state, district, or address..." : "मंडी का नाम, राज्य, जिला या शहर खोजें..."}
              className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-2xl text-xs sm:text-sm outline-none focus:border-emerald-500 focus:bg-white transition-all text-slate-800"
            />
          </div>

          <div className="flex items-center gap-2 w-full sm:w-auto">
            <span className="text-xs font-semibold text-slate-500 whitespace-nowrap hidden lg:inline">
              {t.sortByLabel}
            </span>
            <select
              value={sortBy}
              onChange={(e: any) => setSortBy(e.target.value)}
              className="flex-1 sm:flex-initial py-2.5 px-3 bg-slate-50 border border-slate-200 rounded-2xl text-xs sm:text-sm font-bold text-slate-800 outline-none cursor-pointer focus:border-emerald-500"
            >
              <option value="recommended">⭐ {t.sortRecommended}</option>
              <option value="price">💰 {t.sortPrice}</option>
              <option value="wait">⚡ {t.sortWait}</option>
              <option value="distance">📍 {t.sortDistance}</option>
            </select>
          </div>
        </div>

        {/* State Filter Pills */}
        <div className="pt-2 border-t border-slate-100">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-bold text-slate-700 flex items-center gap-1">
              <MapPin className="w-3.5 h-3.5 text-emerald-700" />
              <span>{t.filterByState}</span>
            </span>
            {selectedState !== 'all' && (
              <button 
                onClick={() => setSelectedState('all')}
                className="text-[11px] text-emerald-700 hover:underline font-semibold"
              >
                {isEn ? 'Show All States (Reset)' : 'सभी राज्य दिखाएं (Reset)'}
              </button>
            )}
          </div>
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1.5 scrollbar-none text-xs">
            <button
              onClick={() => setSelectedState('all')}
              className={`py-1.5 px-3 rounded-xl font-bold whitespace-nowrap transition-colors cursor-pointer ${
                selectedState === 'all'
                  ? 'bg-emerald-700 text-white shadow-2xs'
                  : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
              }`}
            >
              🇮🇳 {t.allStates}
            </button>
            {statesList.map((st) => (
              <button
                key={st.code}
                onClick={() => setSelectedState(st.code)}
                className={`py-1.5 px-3 rounded-xl font-bold whitespace-nowrap transition-colors cursor-pointer ${
                  selectedState === st.code
                    ? 'bg-emerald-700 text-white shadow-2xs'
                    : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
                }`}
              >
                {isEn ? `${st.nameEn} (${st.code})` : `${st.nameHi} (${st.code})`}
              </button>
            ))}
          </div>
        </div>

        {/* Crop Filter Pills */}
        <div className="pt-2 border-t border-slate-100">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-bold text-slate-700 flex items-center gap-1">
              <Layers className="w-3.5 h-3.5 text-emerald-700" />
              <span>{t.filterByCrop}</span>
            </span>
            {selectedCrop !== 'all' && (
              <button 
                onClick={() => setSelectedCrop('all')}
                className="text-[11px] text-emerald-700 hover:underline font-semibold"
              >
                {isEn ? 'All Crops (Reset)' : 'सभी फसलें (Reset)'}
              </button>
            )}
          </div>
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1.5 scrollbar-none text-xs">
            <button
              onClick={() => setSelectedCrop('all')}
              className={`py-1.5 px-3 rounded-xl font-bold whitespace-nowrap transition-colors cursor-pointer ${
                selectedCrop === 'all'
                  ? 'bg-emerald-900 text-white shadow-2xs'
                  : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
              }`}
            >
              🌾 {t.allCrops}
            </button>
            {(Object.keys(CROP_LABELS) as CropType[]).map((cropKey) => {
              const info = CROP_LABELS[cropKey];
              return (
                <button
                  key={cropKey}
                  onClick={() => setSelectedCrop(cropKey)}
                  className={`py-1.5 px-3 rounded-xl font-bold whitespace-nowrap transition-colors cursor-pointer ${
                    selectedCrop === cropKey
                      ? 'bg-emerald-900 text-white shadow-2xs'
                      : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
                  }`}
                >
                  {info.icon} {isEn ? info.en : info.hi}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* --- ALL MANDIS DIRECTORY GRID --- */}
      <div>
        <div className="flex items-center justify-between mb-3 px-1">
          <h3 className="font-extrabold text-slate-800 text-base flex items-center gap-2">
            <Building2 className="w-4 h-4 text-emerald-700" />
            <span>{isEn ? `Available Mandis Directory (${filteredMandis.length} Mandis)` : `उपलब्ध मंडियों की सूची (${filteredMandis.length} Mandis)`}</span>
          </h3>
          <span className="text-xs text-slate-500 font-medium">
            {isEn ? 'Live Queue Updates • DoCA APMC' : 'लाइव कतार अपडेट • DoCA'}
          </span>
        </div>

        {filteredMandis.length === 0 ? (
          <div className="bg-white rounded-3xl p-10 text-center border border-slate-200">
            <Building2 className="w-12 h-12 text-slate-300 mx-auto mb-3" />
            <p className="text-slate-600 font-bold text-sm">
              {isEn ? 'No mandis found matching your filter criteria.' : 'आपके चयन के अनुसार कोई मंडी नहीं मिली।'}
            </p>
            <button
              onClick={() => {
                setSelectedState('all');
                setSelectedCrop('all');
                setSearchQuery('');
              }}
              className="mt-3 py-2 px-4 bg-emerald-700 text-white text-xs font-bold rounded-xl"
            >
              {isEn ? 'Reset All Filters' : 'सभी फिल्टर हटाएं (Reset Filters)'}
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredMandis.map((mandi) => {
              const effectivePrice = getMandiPrice(mandi, selectedCrop);
              const capacityPercent = Math.min(
                100,
                Math.round((mandi.bookedQuintals / mandi.dailyCapacityQuintals) * 100)
              );

              return (
                <div
                  key={mandi.id}
                  id={`mandi-card-${mandi.id}`}
                  className="bg-white rounded-3xl p-5 border border-slate-200 hover:border-emerald-500 shadow-xs hover:shadow-md transition-all flex flex-col justify-between"
                >
                  <div>
                    {/* State Tag & Status */}
                    <div className="flex items-center justify-between gap-2 mb-2.5">
                      <span className="inline-flex items-center gap-1 bg-emerald-100 text-emerald-900 text-[11px] font-black px-2.5 py-0.5 rounded-full border border-emerald-200">
                        <MapPin className="w-3 h-3 text-emerald-700" />
                        <span>{getStateName(mandi)} ({mandi.state.code})</span>
                      </span>

                      <div className={`px-2 py-0.5 rounded-full text-[11px] font-bold border ${getWaitColor(mandi.currentWaitTimeMinutes)}`}>
                        {mandi.currentWaitTimeMinutes} {isEn ? 'mins wait' : 'मिनट वेटिंग'}
                      </div>
                    </div>

                    {/* Mandi Name */}
                    <h4 className="font-extrabold text-slate-900 text-base leading-snug">
                      {getMandiName(mandi)}
                    </h4>
                    <p className="text-xs text-slate-500 mt-1 flex items-center gap-1">
                      <Building2 className="w-3 h-3 text-slate-400 shrink-0" />
                      <span className="truncate">{mandi.locationAddress}</span>
                    </p>

                    {/* Live Crop Prices Chips */}
                    <div className="mt-3 bg-slate-50 p-2.5 rounded-2xl border border-slate-100">
                      <div className="flex items-center justify-between text-xs mb-1.5">
                        <span className="text-slate-600 font-medium">
                          {isEn ? 'Procurement Rates:' : 'सरकारी खरीद भाव (Rates):'}
                        </span>
                        <strong className="text-emerald-700 font-black text-sm">
                          ₹{effectivePrice} {isEn ? '/Quintal' : '/क्विंटल'}
                        </strong>
                      </div>

                      {/* Display multi-crop badges if available */}
                      {mandi.cropPrices && (
                        <div className="flex flex-wrap gap-1 mt-1">
                          {Object.entries(mandi.cropPrices).map(([crop, price]) => (
                            <span 
                              key={crop} 
                              className={`text-[10px] px-1.5 py-0.5 rounded font-mono font-bold ${
                                selectedCrop === crop 
                                  ? 'bg-emerald-700 text-white' 
                                  : 'bg-white text-slate-700 border border-slate-200'
                              }`}
                            >
                              {crop.toUpperCase()}: ₹{price}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>

                    {/* Queue and Gate Metrics */}
                    <div className="mt-3 grid grid-cols-3 gap-2 text-center text-xs">
                      <div className="bg-slate-50 p-2 rounded-xl border border-slate-100">
                        <span className="text-[10px] text-slate-500 block">{isEn ? 'Queue Line' : 'कतार वाहन'}</span>
                        <strong className="font-bold text-slate-800">{mandi.vehiclesInQueue} {isEn ? 'Vehicles' : 'वाहन'}</strong>
                      </div>
                      <div className="bg-slate-50 p-2 rounded-xl border border-slate-100">
                        <span className="text-[10px] text-slate-500 block">{isEn ? 'Weighbridges' : 'कांटे / गेट्स'}</span>
                        <strong className="font-bold text-slate-800">{mandi.activeGates} {isEn ? 'Gates' : 'गेट'}</strong>
                      </div>
                      <div className="bg-slate-50 p-2 rounded-xl border border-slate-100">
                        <span className="text-[10px] text-slate-500 block">{isEn ? 'Distance' : 'दूरी'}</span>
                        <strong className="font-bold text-slate-800">~{mandi.approxDistanceKm} KM</strong>
                      </div>
                    </div>

                    {/* Quota Progress Bar */}
                    <div className="mt-3">
                      <div className="flex items-center justify-between text-[11px] text-slate-600 mb-1">
                        <span>{isEn ? 'Daily Quota Used:' : 'दैनिक कोटा उपयोग:'}</span>
                        <span className="font-bold">{mandi.bookedQuintals} / {mandi.dailyCapacityQuintals} {isEn ? 'qtl' : 'क्विं'}</span>
                      </div>
                      <div className="w-full bg-slate-100 rounded-full h-1.5 overflow-hidden">
                        <div 
                          className={`h-full rounded-full ${
                            capacityPercent > 85 ? 'bg-rose-500' : capacityPercent > 60 ? 'bg-amber-500' : 'bg-emerald-600'
                          }`} 
                          style={{ width: `${capacityPercent}%` }}
                        />
                      </div>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="mt-4 pt-3 border-t border-slate-100 flex items-center gap-2">
                    <button
                      id={`book-mandi-btn-${mandi.id}`}
                      onClick={() => onSelectMandiForBooking(mandi.id)}
                      className="flex-1 py-2.5 px-3 bg-emerald-700 hover:bg-emerald-800 active:bg-emerald-900 text-white font-extrabold text-xs rounded-xl flex items-center justify-center gap-1.5 transition-colors cursor-pointer shadow-2xs"
                    >
                      <Calendar className="w-3.5 h-3.5" />
                      <span>{t.bookAtThisMandi}</span>
                    </button>

                    <button
                      id={`call-mandi-btn-${mandi.id}`}
                      onClick={() => onCallMandiHelpline(mandi.contactHelpline, getMandiName(mandi))}
                      title={`${isEn ? 'Helpline' : 'हेल्पलाइन'}: ${mandi.contactHelpline}`}
                      className="p-2.5 bg-slate-100 hover:bg-emerald-50 hover:text-emerald-800 text-slate-700 rounded-xl transition-colors cursor-pointer"
                    >
                      <Phone className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

    </div>
  );
};
