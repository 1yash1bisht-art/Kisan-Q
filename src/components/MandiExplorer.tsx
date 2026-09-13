import React, { useState, useMemo } from 'react';
import { 
  MapPin, 
  Clock, 
  BarChart3, 
  Sparkles, 
  Phone, 
  ArrowRight, 
  Filter, 
  CheckCircle, 
  AlertTriangle,
  Car,
  Layers,
  Search
} from 'lucide-react';
import { UttarakhandMandi, Language } from '../types';
import { TRANSLATIONS } from '../i18n/translations';

interface MandiExplorerProps {
  mandis: UttarakhandMandi[];
  currentLang: Language;
  onSelectMandiForBooking: (mandiId: string) => void;
  onCallMandiHelpline: (phone: string, mandiName: string) => void;
}

export const MandiExplorer: React.FC<MandiExplorerProps> = ({
  mandis,
  currentLang,
  onSelectMandiForBooking,
  onCallMandiHelpline
}) => {
  const t = TRANSLATIONS[currentLang];
  const [selectedDistrict, setSelectedDistrict] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [sortBy, setSortBy] = useState<'recommended' | 'distance' | 'wait' | 'price'>('recommended');

  const districts = useMemo(() => {
    const list = Array.from(new Set(mandis.map(m => m.district.en)));
    return ['all', ...list];
  }, [mandis]);

  const filteredMandis = useMemo(() => {
    let list = mandis.filter(m => {
      const matchDist = selectedDistrict === 'all' || m.district.en === selectedDistrict;
      const q = searchQuery.toLowerCase();
      const matchSearch = 
        m.name.hi.toLowerCase().includes(q) ||
        m.name.en.toLowerCase().includes(q) ||
        m.locationAddress.toLowerCase().includes(q) ||
        m.district.hi.toLowerCase().includes(q) ||
        m.district.en.toLowerCase().includes(q);
      return matchDist && matchSearch;
    });

    if (sortBy === 'recommended') {
      list.sort((a, b) => (b.isBestRecommended ? 1 : 0) - (a.isBestRecommended ? 1 : 0) || a.currentWaitTimeMinutes - b.currentWaitTimeMinutes);
    } else if (sortBy === 'distance') {
      list.sort((a, b) => a.approxDistanceKm - b.approxDistanceKm);
    } else if (sortBy === 'wait') {
      list.sort((a, b) => a.currentWaitTimeMinutes - b.currentWaitTimeMinutes);
    } else if (sortBy === 'price') {
      list.sort((a, b) => b.potatoProcurementPricePerQtl - a.potatoProcurementPricePerQtl);
    }

    return list;
  }, [mandis, selectedDistrict, searchQuery, sortBy]);

  const getWaitTimeColor = (mins: number) => {
    if (mins <= 20) return 'bg-emerald-50 text-emerald-800 border-emerald-300';
    if (mins <= 35) return 'bg-amber-50 text-amber-800 border-amber-300';
    return 'bg-rose-50 text-rose-800 border-rose-300';
  };

  return (
    <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6">
      {/* Top Banner */}
      <div className="bg-gradient-to-br from-emerald-900 via-emerald-800 to-teal-950 text-white rounded-3xl p-6 sm:p-8 shadow-md relative overflow-hidden">
        <div className="relative z-10 max-w-3xl">
          <div className="inline-flex items-center gap-1.5 bg-emerald-700/70 backdrop-blur-xs px-3 py-1 rounded-full text-xs font-semibold text-emerald-200 mb-3">
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            <span>उत्तराखंड कृषि उपज विपणन बोर्ड (UK Mandi Board)</span>
          </div>
          <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight">
            {t.mandiExplorerTitle}
          </h1>
          <p className="text-emerald-100/90 text-sm sm:text-base mt-2 leading-relaxed">
            {t.mandiExplorerSubtitle}
          </p>

          {/* Quick Stat Pill */}
          <div className="mt-5 flex flex-wrap items-center gap-3 text-xs sm:text-sm">
            <div className="bg-white/10 backdrop-blur-md px-3.5 py-2 rounded-xl border border-white/10">
              <span className="text-emerald-200 block text-[11px]">कुल सक्रिय मंडियां:</span>
              <strong className="text-lg font-bold">{mandis.length} Mandis (Uttarakhand)</strong>
            </div>
            <div className="bg-amber-400/20 backdrop-blur-md px-3.5 py-2 rounded-xl border border-amber-400/30 text-amber-200">
              <span className="text-amber-200 block text-[11px]">आलू सरकारी खरीद दर (Potato MSP):</span>
              <strong className="text-lg font-bold text-amber-300">₹1,420 - ₹1,525 / क्विंटल</strong>
            </div>
            <div className="bg-white/10 backdrop-blur-md px-3.5 py-2 rounded-xl border border-white/10">
              <span className="text-emerald-200 block text-[11px]">न्यूनतम कतार प्रतीक्षा:</span>
              <strong className="text-lg font-bold text-emerald-300">10-15 मिनट (हल्द्वानी / कोटद्वार)</strong>
            </div>
          </div>
        </div>
      </div>

      {/* Filter & Search Bar */}
      <div className="mt-6 bg-white p-4 rounded-2xl border border-slate-200 shadow-xs flex flex-col md:flex-row gap-4 items-center justify-between">
        
        {/* District Filter Chips */}
        <div className="flex items-center gap-2 w-full md:w-auto overflow-x-auto pb-1">
          <Filter className="w-4 h-4 text-slate-400 shrink-0" />
          <span className="text-xs font-bold text-slate-600 shrink-0">
            {t.filterDistrict}:
          </span>
          {districts.map((d) => (
            <button
              key={d}
              onClick={() => setSelectedDistrict(d)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all shrink-0 ${
                selectedDistrict === d
                  ? 'bg-emerald-700 text-white shadow-xs'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              {d === 'all' ? t.allDistricts : d}
            </button>
          ))}
        </div>

        {/* Search & Sort */}
        <div className="flex flex-col sm:flex-row items-center gap-3 w-full md:w-auto">
          <div className="relative w-full sm:w-64">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={t.searchMandi}
              className="w-full pl-8 pr-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs outline-none focus:border-emerald-600"
            />
            <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-3" />
          </div>

          <select
            value={sortBy}
            onChange={(e: any) => setSortBy(e.target.value)}
            className="w-full sm:w-auto px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs font-medium text-slate-700 outline-none"
          >
            <option value="recommended">⭐ {currentLang === 'en' ? 'Best Recommended' : 'सर्वश्रेष्ठ अनुशंसित'}</option>
            <option value="distance">📍 {currentLang === 'en' ? 'Shortest Distance' : 'न्यूनतम दूरी'}</option>
            <option value="wait">⏱️ {currentLang === 'en' ? 'Least Wait Time' : 'कम प्रतीक्षा समय'}</option>
            <option value="price">🥔 {currentLang === 'en' ? 'Highest Potato Rate' : 'उच्चतम आलू भाव'}</option>
          </select>
        </div>
      </div>

      {/* Mandi Cards Grid */}
      <div className="mt-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredMandis.map((mandi) => {
          const capPercent = Math.round((mandi.bookedQuintals / mandi.dailyCapacityQuintals) * 100);
          const mandiName = mandi.name[currentLang] || mandi.name.hi;
          const recReason = mandi.recommendationReason ? (mandi.recommendationReason[currentLang] || mandi.recommendationReason.hi) : null;

          return (
            <div
              key={mandi.id}
              className={`rounded-2xl border transition-all flex flex-col justify-between overflow-hidden bg-white shadow-xs hover:shadow-md ${
                mandi.isBestRecommended 
                  ? 'border-emerald-500 ring-2 ring-emerald-500/20' 
                  : 'border-slate-200'
              }`}
            >
              {/* Card Header */}
              <div className="p-5">
                {/* Top badges */}
                <div className="flex items-center justify-between gap-2 mb-2">
                  <span className="text-[11px] font-bold px-2 py-0.5 rounded-md bg-slate-100 text-slate-700 flex items-center gap-1">
                    <MapPin className="w-3 h-3 text-emerald-600" />
                    <span>{mandi.district[currentLang === 'en' ? 'en' : 'hi']}</span>
                  </span>

                  {mandi.isBestRecommended && (
                    <span className="text-[11px] font-black px-2.5 py-0.5 rounded-md bg-amber-400 text-amber-950 flex items-center gap-1 shadow-2xs">
                      <Sparkles className="w-3 h-3" />
                      <span>{t.bestMandiBadge}</span>
                    </span>
                  )}
                </div>

                <h3 className="font-bold text-slate-950 text-lg line-clamp-2 leading-snug">
                  {mandiName}
                </h3>
                
                <p className="text-xs text-slate-500 mt-1 line-clamp-1">
                  {mandi.locationAddress}
                </p>

                {/* Recommendation Reason Callout */}
                {recReason && (
                  <div className="mt-3 p-2.5 rounded-xl bg-emerald-50/70 border border-emerald-200 text-emerald-950 text-xs font-medium">
                    {recReason}
                  </div>
                )}

                {/* Key Metrics Grid */}
                <div className="mt-4 pt-4 border-t border-slate-100 grid grid-cols-2 gap-3 text-xs">
                  {/* Distance */}
                  <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-100">
                    <span className="text-slate-500 block text-[11px]">{t.approxDistance}</span>
                    <div className="flex items-baseline gap-1 mt-0.5">
                      <strong className="text-base font-extrabold text-slate-900">
                        {mandi.approxDistanceKm}
                      </strong>
                      <span className="text-slate-500">km</span>
                    </div>
                  </div>

                  {/* Wait Time */}
                  <div className={`p-2.5 rounded-xl border ${getWaitTimeColor(mandi.currentWaitTimeMinutes)}`}>
                    <span className="block text-[11px] font-semibold">{t.currentWait}</span>
                    <div className="flex items-baseline gap-1 mt-0.5">
                      <Clock className="w-3.5 h-3.5" />
                      <strong className="text-base font-extrabold">
                        {mandi.currentWaitTimeMinutes}
                      </strong>
                      <span>min ({mandi.vehiclesInQueue} {t.vehiclesWaiting})</span>
                    </div>
                  </div>
                </div>

                {/* Potato Procurement Rate Spotlight */}
                <div className="mt-3 p-3 rounded-xl bg-amber-50 border border-amber-200/80 flex items-center justify-between">
                  <div>
                    <span className="text-[11px] font-bold text-amber-900 block">
                      🥔 {t.potatoRate}
                    </span>
                    <span className="text-[10px] text-amber-800">
                      {currentLang === 'en' ? 'Spot buying rate' : 'सरकारी क्रय मूल्य'}
                    </span>
                  </div>
                  <div className="text-right">
                    <span className="text-xl font-black text-amber-950 font-mono">
                      ₹{mandi.potatoProcurementPricePerQtl}
                    </span>
                    <span className="text-[11px] text-amber-800 font-medium ml-1">
                      {t.perQuintal}
                    </span>
                  </div>
                </div>

                {/* Daily Capacity Bar */}
                <div className="mt-4">
                  <div className="flex items-center justify-between text-[11px] text-slate-600 mb-1">
                    <span>{t.capacityUsed}:</span>
                    <span className="font-bold text-slate-900">
                      {mandi.bookedQuintals} / {mandi.dailyCapacityQuintals} Qtl ({capPercent}%)
                    </span>
                  </div>
                  <div className="w-full h-2 rounded-full bg-slate-100 overflow-hidden">
                    <div
                      className={`h-full rounded-full transition-all ${
                        capPercent > 85 ? 'bg-rose-500' : capPercent > 65 ? 'bg-amber-500' : 'bg-emerald-600'
                      }`}
                      style={{ width: `${Math.min(capPercent, 100)}%` }}
                    />
                  </div>
                  <div className="flex items-center justify-between text-[10px] text-slate-400 mt-1">
                    <span>{mandi.activeGates} {t.activeGates}</span>
                    <span>{mandi.dailyCapacityQuintals - mandi.bookedQuintals} Qtl {currentLang === 'en' ? 'left' : 'शेष'}</span>
                  </div>
                </div>
              </div>

              {/* Card Footer Actions */}
              <div className="p-4 bg-slate-50 border-t border-slate-100 flex items-center gap-2">
                <button
                  id={`book-mandi-${mandi.id}`}
                  onClick={() => onSelectMandiForBooking(mandi.id)}
                  className="flex-1 py-2.5 px-3 bg-emerald-700 hover:bg-emerald-800 text-white font-bold rounded-xl text-xs sm:text-sm flex items-center justify-center gap-1.5 shadow-xs transition-colors"
                >
                  <span>{t.bookAtThisMandi}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>

                <button
                  id={`call-mandi-${mandi.id}`}
                  onClick={() => onCallMandiHelpline(mandi.contactHelpline, mandiName)}
                  title={t.callMandi}
                  className="p-2.5 bg-white hover:bg-slate-100 border border-slate-200 text-slate-700 rounded-xl transition-colors"
                >
                  <Phone className="w-4 h-4 text-emerald-700" />
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
