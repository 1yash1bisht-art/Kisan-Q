import React, { useState, useEffect, useRef } from 'react';
import { 
  PhoneCall, 
  PhoneOff, 
  Volume2, 
  VolumeX, 
  Mic, 
  Hash, 
  Sparkles, 
  Check, 
  AlertCircle,
  HelpCircle
} from 'lucide-react';
import { Language, SlotBooking, UttarakhandMandi } from '../types';
import { TRANSLATIONS } from '../i18n/translations';

interface IVRModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentLang: Language;
  activeBooking?: SlotBooking;
  mandis: UttarakhandMandi[];
}

export const IVRModal: React.FC<IVRModalProps> = ({
  isOpen,
  onClose,
  currentLang,
  activeBooking,
  mandis
}) => {
  const t = TRANSLATIONS[currentLang];
  const [isCalling, setIsCalling] = useState(false);
  const [callDuration, setCallDuration] = useState(0);
  const [isMuted, setIsMuted] = useState(false);
  const [currentStep, setCurrentStep] = useState<'welcome' | 'token_status' | 'mandi_info' | 'quick_book' | 'officer_talk'>('welcome');
  const [ivrTranscript, setIvrTranscript] = useState<string>('');
  const [speechSupported, setSpeechSupported] = useState<boolean>(true);
  
  const timerRef = useRef<any>(null);

  useEffect(() => {
    if (typeof window !== 'undefined' && !('speechSynthesis' in window)) {
      setSpeechSupported(false);
    }
  }, []);

  useEffect(() => {
    if (isCalling) {
      timerRef.current = setInterval(() => {
        setCallDuration((prev) => prev + 1);
      }, 1000);
    } else {
      if (timerRef.current) clearInterval(timerRef.current);
      setCallDuration(0);
      if (typeof window !== 'undefined' && window.speechSynthesis) {
        window.speechSynthesis.cancel();
      }
    }
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
      if (typeof window !== 'undefined' && window.speechSynthesis) {
        window.speechSynthesis.cancel();
      }
    };
  }, [isCalling]);

  // Voice synthesis helper
  const speakText = (text: string) => {
    setIvrTranscript(text);
    if (isMuted || typeof window === 'undefined' || !window.speechSynthesis) return;

    try {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = currentLang === 'en' ? 'en-IN' : 'hi-IN';
      utterance.rate = 0.95; // slightly slower for rural farmers
      window.speechSynthesis.speak(utterance);
    } catch (e) {
      console.warn('Speech synthesis error', e);
    }
  };

  const startCall = () => {
    setIsCalling(true);
    setCurrentStep('welcome');
    const welcomeMsg = currentLang === 'en'
      ? 'Welcome to KisanQ Mandi Toll-Free Helpline 1800-180-1551. Press 1 to check your Token and Queue status. Press 2 for quick Potato slot booking. Press 3 for Uttarakhand Mandi live wait times and best Potato prices. Press 4 to connect with a Mandi Officer.'
      : 'किसानक्यू स्मार्ट मंडी टोल-फ्री हेल्पलाइन 1800-180-1551 में आपका स्वागत है। अपने टोकन और कतार की स्थिति जानने के लिए 1 दबाएं। आलू स्लॉट त्वरित बुकिंग के लिए 2 दबाएं। उत्तराखंड की मंडियों में प्रतीक्षा समय और ताजा आलू भाव जानने के लिए 3 दबाएं। मंडी अधिकारी से बात करने के लिए 4 दबाएं।';
    speakText(welcomeMsg);
  };

  const hangUp = () => {
    if (typeof window !== 'undefined' && window.speechSynthesis) {
      window.speechSynthesis.cancel();
    }
    setIsCalling(false);
    setIvrTranscript('');
    setCurrentStep('welcome');
  };

  const handleKeyPress = (digit: string) => {
    if (!isCalling) {
      startCall();
      return;
    }

    if (digit === '1') {
      setCurrentStep('token_status');
      if (activeBooking) {
        const msg = currentLang === 'en'
          ? `Your active token is ${activeBooking.tokenNumber} for ${activeBooking.mandiName}. Arrival window is ${activeBooking.estimatedArrivalWindow} at ${activeBooking.assignedGate}. Current status: ${activeBooking.queuePosition} vehicles ahead, approximate wait time is ${activeBooking.approxWaitTimeMinutes} minutes.`
          : `आपका सक्रिय टोकन ${activeBooking.tokenNumber}, ${activeBooking.mandiName} के लिए है। आगमन समय ${activeBooking.estimatedArrivalWindow}, गेट नंबर 2 पर है। वर्तमान में आपसे आगे ${activeBooking.queuePosition} गाड़ियां हैं और प्रतीक्षा समय लगभग ${activeBooking.approxWaitTimeMinutes} मिनट है।`;
        speakText(msg);
      } else {
        const msg = currentLang === 'en'
          ? 'No active token found for your mobile number. Press 2 to book a new procurement slot now.'
          : 'आपके मोबाइल नंबर पर कोई सक्रिय टोकन नहीं मिला। नया आलू स्लॉट बुक करने के लिए कृपया 2 दबाएं।';
        speakText(msg);
      }
    } else if (digit === '2') {
      setCurrentStep('quick_book');
      const msg = currentLang === 'en'
        ? 'Quick Slot Booking initiated. Your default slot for 40 quintals of Potato is reserved at Haldwani Mandi tomorrow morning at 09:00 AM. Token slip has been dispatched to your mobile via SMS.'
        : 'त्वरित स्लॉट बुकिंग प्रारंभ। कल सुबह 09:00 AM पर हल्द्वानी मंडी में 40 क्विंटल आलू हेतु आपका स्लॉट सुरक्षित कर लिया गया है। एसएमएस द्वारा टोकन विवरण आपके फोन पर भेज दिया गया है।';
      speakText(msg);
    } else if (digit === '3') {
      setCurrentStep('mandi_info');
      const bestMandi = mandis.find(m => m.isBestRecommended) || mandis[0];
      const msg = currentLang === 'en'
        ? `Best recommended mandi right now is ${bestMandi.name.en}. Current queue wait time is only ${bestMandi.currentWaitTimeMinutes} minutes, and Potato procurement price is ₹${bestMandi.potatoProcurementPricePerQtl} per quintal.`
        : `वर्तमान में सबसे उपयुक्त मंडी ${bestMandi.name.hi} है। यहां कतार में प्रतीक्षा केवल ${bestMandi.currentWaitTimeMinutes} मिनट है, और आलू का क्रय मूल्य ₹${bestMandi.potatoProcurementPricePerQtl} प्रति क्विंटल है।`;
      speakText(msg);
    } else if (digit === '4') {
      setCurrentStep('officer_talk');
      const msg = currentLang === 'en'
        ? 'Connecting your call to Mandi Duty Officer Shri R.S. Bisht. Please stay on the line...'
        : 'आपकी कॉल मंडी ड्यूटी अधिकारी श्री आर. एस. बिष्ट से जोड़ी जा रही है। कृपया लाइन पर बने रहें...';
      speakText(msg);
    } else if (digit === '0' || digit === '*') {
      setCurrentStep('welcome');
      const msg = currentLang === 'en'
        ? 'Main menu. Press 1 for token status, Press 2 for booking, Press 3 for mandi prices, Press 4 for officer support.'
        : 'मुख्य मेनू। टोकन स्थिति हेतु 1, नई बुकिंग हेतु 2, मंडी भाव हेतु 3, अधिकारी सहायता हेतु 4 दबाएं।';
      speakText(msg);
    }
  };

  const formatTime = (secs: number) => {
    const mins = Math.floor(secs / 60);
    const s = secs % 60;
    return `${mins.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl border border-slate-200 overflow-hidden">
        
        {/* Modal Top */}
        <div className="flex items-center justify-between pb-3 border-b border-slate-100">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-amber-500 flex items-center justify-center text-slate-950 font-black">
              <PhoneCall className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-extrabold text-slate-900 text-sm">
                {t.ivrTitle}
              </h3>
              <p className="text-[11px] text-emerald-700 font-mono font-bold">
                Toll-Free: 1800-180-1551 (24x7)
              </p>
            </div>
          </div>
          <button
            onClick={() => {
              hangUp();
              onClose();
            }}
            className="w-7 h-7 rounded-full bg-slate-100 text-slate-500 font-bold hover:bg-slate-200"
          >
            ✕
          </button>
        </div>

        {/* Call Screen Status */}
        <div className="mt-4 p-4 rounded-2xl bg-slate-900 text-white text-center relative overflow-hidden">
          <div className="text-xs text-slate-400 font-mono">
            {isCalling ? (
              <span className="text-emerald-400 flex items-center justify-center gap-1.5 font-bold">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
                <span>कॉल सक्रिय (Call Active) • {formatTime(callDuration)}</span>
              </span>
            ) : (
              <span>कॉल डिस्कनेक्टेड (Offline / Idle)</span>
            )}
          </div>

          <h4 className="text-xl font-mono font-black text-amber-400 mt-1">
            1800-180-1551
          </h4>
          <p className="text-[11px] text-slate-300 mt-0.5">
            DoCA / KisanQ Automated Voice Response
          </p>

          {/* Spoken Transcript Bubble */}
          {ivrTranscript && (
            <div className="mt-3 p-2.5 rounded-xl bg-slate-800/90 border border-slate-700 text-xs text-slate-200 text-left line-clamp-3">
              <span className="text-amber-400 font-bold block text-[10px] uppercase">
                🎙️ IVR आवाज (Voice Prompt):
              </span>
              "{ivrTranscript}"
            </div>
          )}

          {/* Voice mute toggle button */}
          <div className="mt-3 flex items-center justify-center gap-3">
            <button
              onClick={() => setIsMuted(!isMuted)}
              className="px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs flex items-center gap-1"
            >
              {isMuted ? <VolumeX className="w-3.5 h-3.5 text-rose-400" /> : <Volume2 className="w-3.5 h-3.5 text-emerald-400" />}
              <span>{isMuted ? 'आवाज म्यूट है' : 'आवाज चालू है'}</span>
            </button>
          </div>
        </div>

        {/* IVR Quick Action Keys Guide */}
        <div className="mt-3 p-2.5 bg-amber-50 rounded-xl border border-amber-200 text-[11px] text-amber-950 space-y-1">
          <div className="font-bold flex items-center justify-between">
            <span>मेनू विकल्प (Dial Pad Options):</span>
            <span className="text-slate-500 font-normal">की दबाएं</span>
          </div>
          <div className="grid grid-cols-2 gap-1 text-[10px]">
            <span className="bg-white/80 p-1 rounded font-medium">1: टोकन व कतार स्थिति</span>
            <span className="bg-white/80 p-1 rounded font-medium">2: त्वरित स्लॉट बुकिंग</span>
            <span className="bg-white/80 p-1 rounded font-medium">3: मंडी भाव व प्रतीक्षा</span>
            <span className="bg-white/80 p-1 rounded font-medium">4: अधिकारी सहायता</span>
          </div>
        </div>

        {/* Dial Pad Grid */}
        <div className="mt-4 grid grid-cols-3 gap-2.5">
          {['1', '2', '3', '4', '5', '6', '7', '8', '9', '*', '0', '#'].map((d) => (
            <button
              key={d}
              onClick={() => handleKeyPress(d)}
              className="py-3 rounded-xl bg-slate-100 hover:bg-emerald-50 active:bg-emerald-200 border border-slate-200 font-mono font-bold text-lg text-slate-800 transition-colors shadow-2xs"
            >
              {d}
            </button>
          ))}
        </div>

        {/* Call Controls: Dial / Hangup */}
        <div className="mt-4 pt-3 border-t border-slate-100 flex items-center gap-3">
          {!isCalling ? (
            <button
              id="ivr-call-start-btn"
              onClick={startCall}
              className="w-full py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl shadow-xs flex items-center justify-center gap-2 text-sm"
            >
              <PhoneCall className="w-4 h-4" />
              <span>{t.ivrSimulateCall}</span>
            </button>
          ) : (
            <button
              id="ivr-call-hangup-btn"
              onClick={hangUp}
              className="w-full py-3 bg-rose-600 hover:bg-rose-700 text-white font-bold rounded-xl shadow-xs flex items-center justify-center gap-2 text-sm"
            >
              <PhoneOff className="w-4 h-4" />
              <span>{t.ivrHangup}</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
