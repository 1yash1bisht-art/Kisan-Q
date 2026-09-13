import React from 'react';
import { 
  Printer, 
  CheckCircle, 
  ShieldCheck, 
  Tractor, 
  QrCode, 
  Clock, 
  MapPin, 
  X,
  Share2
} from 'lucide-react';
import { SlotBooking, Language } from '../types';
import { TRANSLATIONS } from '../i18n/translations';

interface TokenPassModalProps {
  booking: SlotBooking | null;
  onClose: () => void;
  currentLang: Language;
}

export const TokenPassModal: React.FC<TokenPassModalProps> = ({
  booking,
  onClose,
  currentLang
}) => {
  const t = TRANSLATIONS[currentLang];

  if (!booking) return null;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-white rounded-3xl max-w-lg w-full shadow-2xl border border-slate-200 overflow-hidden my-6">
        
        {/* Modal Top Bar */}
        <div className="p-4 bg-emerald-900 text-white flex items-center justify-between no-print">
          <div className="flex items-center gap-2">
            <Tractor className="w-5 h-5 text-emerald-300" />
            <span className="font-bold text-sm">
              {currentLang === 'en' ? 'Mandi Gate Pass & Token Slip' : 'मंडी गेट पास एवं डिजिटल टोकन रसीद'}
            </span>
          </div>
          <button
            onClick={onClose}
            className="w-7 h-7 rounded-full bg-emerald-800 text-white flex items-center justify-center font-bold hover:bg-emerald-700"
          >
            ✕
          </button>
        </div>

        {/* Printable Pass Content */}
        <div className="p-6 sm:p-8 text-slate-900 bg-white" id="printable-token-pass">
          
          {/* Government Emblem & Header */}
          <div className="text-center pb-4 border-b-2 border-slate-900/10">
            <div className="inline-flex items-center gap-2 text-xs font-bold text-emerald-800 uppercase tracking-wider mb-1">
              <span>DoCA • GOVT OF UTTARAKHAND</span>
            </div>
            <h2 className="text-2xl font-black text-slate-900 tracking-tight">
              KISANQ — SMART MANDI ENTRY PASS
            </h2>
            <p className="text-xs text-slate-500">
              Department of Consumer Affairs | APMC Mandi Board
            </p>
          </div>

          {/* Big Token Number Callout */}
          <div className="my-5 p-4 rounded-2xl bg-emerald-50 border-2 border-dashed border-emerald-600 text-center">
            <span className="text-xs font-bold text-emerald-800 uppercase tracking-wider block">
              {t.tokenNumberLabel}
            </span>
            <div className="text-3xl sm:text-4xl font-black font-mono text-emerald-950 tracking-wider my-1">
              {booking.tokenNumber}
            </div>
            <div className="flex items-center justify-center gap-2 text-xs font-bold text-emerald-800">
              <Clock className="w-3.5 h-3.5" />
              <span>अनुमानित आगमन: {booking.estimatedArrivalWindow}</span>
            </div>
          </div>

          {/* QR Code & Barcode Simulation */}
          <div className="flex items-center justify-between bg-slate-50 p-4 rounded-xl border border-slate-200 mb-5">
            <div className="flex items-center gap-3">
              <div className="w-16 h-16 bg-white p-1 rounded-lg border border-slate-300 flex items-center justify-center">
                <QrCode className="w-14 h-14 text-slate-900" />
              </div>
              <div>
                <span className="text-[11px] text-slate-500 block">गेट स्कैनर हेतु QR कोड</span>
                <span className="font-mono text-xs font-bold text-slate-800">{booking.assignedGate}</span>
                <p className="text-[10px] text-emerald-700 font-bold">✓ आधार से सत्यापित</p>
              </div>
            </div>
            <div className="text-right">
              <span className="text-[10px] text-slate-400 block uppercase">सुरक्षा मुहर</span>
              <span className="inline-block px-2 py-0.5 bg-emerald-100 text-emerald-900 font-bold text-[11px] rounded">
                APPROVED
              </span>
            </div>
          </div>

          {/* Data Fields Grid */}
          <div className="grid grid-cols-2 gap-3 text-xs border-t border-slate-200 pt-4">
            <div>
              <span className="text-slate-500 block text-[11px]">किसान का नाम:</span>
              <strong className="text-slate-900 text-sm">{booking.farmerName}</strong>
            </div>
            <div>
              <span className="text-slate-500 block text-[11px]">आधार नंबर:</span>
              <strong className="text-slate-900 text-sm font-mono">XXXX-{booking.farmerAadhaar.slice(-4)}</strong>
            </div>
            <div>
              <span className="text-slate-500 block text-[11px]">मंडी केंद्र:</span>
              <strong className="text-slate-900">{booking.mandiName}</strong>
            </div>
            <div>
              <span className="text-slate-500 block text-[11px]">दिनांक एवं समय:</span>
              <strong className="text-slate-900">{booking.scheduledDate} ({booking.timeSlot})</strong>
            </div>
            <div>
              <span className="text-slate-500 block text-[11px]">फसल एवं मात्रा:</span>
              <strong className="text-slate-900">{booking.quantityQuintals} क्विंटल आलू (Potato)</strong>
            </div>
            <div>
              <span className="text-slate-500 block text-[11px]">वाहन नंबर:</span>
              <strong className="text-slate-900 font-mono uppercase">{booking.vehiclePlateNumber}</strong>
            </div>
          </div>

          {/* Payment DBT note */}
          <div className="mt-5 p-3 rounded-xl bg-amber-50 border border-amber-200 text-[11px] text-amber-950">
            <strong>सूचना:</strong> तौल पूरा होने के पश्चात खरीद राशि सीधे आपके आधार-लिंक बैंक खाते में 12 से 24 घंटे के भीतर DBT द्वारा हस्तांतरित कर दी जाएगी।
          </div>
        </div>

        {/* Action Buttons */}
        <div className="p-4 bg-slate-50 border-t border-slate-200 flex items-center gap-3 no-print">
          <button
            onClick={onClose}
            className="flex-1 py-2.5 border border-slate-300 rounded-xl font-bold text-xs text-slate-700"
          >
            बंद करें (Close)
          </button>
          <button
            onClick={handlePrint}
            className="flex-1 py-2.5 bg-emerald-700 hover:bg-emerald-800 text-white rounded-xl font-bold text-xs flex items-center justify-center gap-2 shadow-xs"
          >
            <Printer className="w-4 h-4" />
            <span>{t.printPass}</span>
          </button>
        </div>
      </div>
    </div>
  );
};
