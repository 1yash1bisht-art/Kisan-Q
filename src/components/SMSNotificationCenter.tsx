import React from 'react';
import { 
  MessageSquare, 
  CheckCheck, 
  Clock, 
  Smartphone, 
  Send, 
  Sparkles, 
  Bell,
  X
} from 'lucide-react';
import { SMSAlert, Language } from '../types';
import { TRANSLATIONS } from '../i18n/translations';

interface SMSNotificationCenterProps {
  isOpen: boolean;
  onClose: () => void;
  currentLang: Language;
  smsList: SMSAlert[];
  onTriggerTestSMS: (type: 'booking' | 'queue' | 'payment') => void;
}

export const SMSNotificationCenter: React.FC<SMSNotificationCenterProps> = ({
  isOpen,
  onClose,
  currentLang,
  smsList,
  onTriggerTestSMS
}) => {
  const t = TRANSLATIONS[currentLang];

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl max-w-md w-full shadow-2xl border border-slate-200 overflow-hidden flex flex-col max-h-[90vh]">
        
        {/* Header */}
        <div className="p-4 bg-emerald-800 text-white flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-emerald-700 flex items-center justify-center">
              <Smartphone className="w-4 h-4 text-emerald-200" />
            </div>
            <div>
              <h3 className="font-bold text-sm">
                {t.smsTitle}
              </h3>
              <p className="text-[11px] text-emerald-200">
                {t.simulatedPhone} (2G / Feature Phone SMS)
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-7 h-7 rounded-full bg-emerald-900 text-white flex items-center justify-center font-bold hover:bg-emerald-950"
          >
            ✕
          </button>
        </div>

        {/* Quick Test Trigger Buttons */}
        <div className="p-3 bg-slate-50 border-b border-slate-200 text-xs">
          <span className="text-slate-500 font-bold block text-[11px] mb-1.5">
            त्वरित परीक्षण (Trigger Demo SMS):
          </span>
          <div className="flex flex-wrap gap-1.5">
            <button
              onClick={() => onTriggerTestSMS('booking')}
              className="px-2.5 py-1 bg-white border border-slate-200 hover:bg-emerald-50 text-slate-800 font-medium rounded-md text-[11px]"
            >
              + स्लॉट बुकिंग SMS
            </button>
            <button
              onClick={() => onTriggerTestSMS('queue')}
              className="px-2.5 py-1 bg-white border border-slate-200 hover:bg-amber-50 text-slate-800 font-medium rounded-md text-[11px]"
            >
              + कतार अलर्ट SMS
            </button>
            <button
              onClick={() => onTriggerTestSMS('payment')}
              className="px-2.5 py-1 bg-white border border-slate-200 hover:bg-teal-50 text-slate-800 font-medium rounded-md text-[11px]"
            >
              + DBT बैंक क्रेडिट SMS
            </button>
          </div>
        </div>

        {/* SMS List */}
        <div className="p-4 space-y-3 overflow-y-auto flex-1 bg-slate-100/60">
          {smsList.length > 0 ? (
            smsList.map((sms) => {
              const text = sms.messageText[currentLang] || sms.messageText.hi;
              return (
                <div
                  key={sms.id}
                  className="p-3 rounded-2xl bg-white border border-slate-200 shadow-2xs text-xs space-y-1.5 relative"
                >
                  <div className="flex items-center justify-between text-[10px] text-slate-400">
                    <span className="font-mono font-bold text-emerald-800 bg-emerald-50 px-1.5 py-0.5 rounded">
                      VK-KISANQ
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      <span>{sms.timestamp}</span>
                    </span>
                  </div>

                  <p className="text-slate-800 font-medium leading-relaxed">
                    {text}
                  </p>

                  <div className="flex items-center justify-between pt-1 border-t border-slate-50 text-[10px]">
                    <span className="text-slate-500 font-mono">
                      To: +91 {sms.recipientMobile}
                    </span>
                    <span className="text-emerald-700 font-bold flex items-center gap-0.5">
                      <CheckCheck className="w-3 h-3" />
                      <span>डिलिवर्ड (Delivered)</span>
                    </span>
                  </div>
                </div>
              );
            })
          ) : (
            <div className="text-center py-8 text-slate-400 text-xs">
              <MessageSquare className="w-8 h-8 mx-auto mb-2 opacity-50" />
              <p>कोई नया संदेश नहीं (Inbox empty)</p>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-3 bg-slate-50 border-t border-slate-200 text-center text-[11px] text-slate-500">
          DoCA / Smart India Hackathon SMS Gateway • Free for Farmers
        </div>
      </div>
    </div>
  );
};
