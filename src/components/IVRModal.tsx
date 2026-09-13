import React, { useState, useEffect, useRef } from 'react';
import { 
  PhoneCall, 
  PhoneOff, 
  Volume2, 
  VolumeX, 
  RotateCcw, 
  CheckCircle2, 
  Sparkles,
  HelpCircle,
  Radio,
  Play
} from 'lucide-react';
import { Language, SlotBooking, MandiInfo } from '../types';
import { TRANSLATIONS } from '../i18n/translations';
import { playDtmfTone, playPhoneRing, unlockAudio } from '../utils/audio';
import { playIvrVoice, stopAllSpeech, warmupVoiceEngine } from '../utils/audioVoice';

interface IVRModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentLang: Language;
  onLanguageChange?: (lang: Language) => void;
  activeBooking: SlotBooking | null;
  mandis: MandiInfo[];
  onQuickBookSuccess?: (booking: SlotBooking) => void;
}

export const IVRModal: React.FC<IVRModalProps> = ({
  isOpen,
  onClose,
  currentLang,
  onLanguageChange,
  activeBooking,
  mandis
}) => {
  const t = TRANSLATIONS[currentLang] || TRANSLATIONS['hi'];
  const [isCalling, setIsCalling] = useState<boolean>(false);
  const [callDuration, setCallDuration] = useState<number>(0);
  const [currentStep, setCurrentStep] = useState<string>('welcome');
  const [ivrTranscript, setIvrTranscript] = useState<string>('');
  const [isSpeaking, setIsSpeaking] = useState<boolean>(false);
  const [isMuted, setIsMuted] = useState<boolean>(false);
  const [voiceEngine, setVoiceEngine] = useState<string>('HD Audio');

  const timerRef = useRef<any>(null);

  // Pre-warm voice engine on modal open and clean up on close
  useEffect(() => {
    if (isOpen) {
      warmupVoiceEngine();
    } else {
      hangUp();
    }
  }, [isOpen]);

  // Clean up on unmount
  useEffect(() => {
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
      stopAllSpeech();
    };
  }, []);

  // Track call duration
  useEffect(() => {
    if (isCalling) {
      setCallDuration(0);
      timerRef.current = setInterval(() => {
        setCallDuration(prev => prev + 1);
      }, 1000);
    } else {
      if (timerRef.current) clearInterval(timerRef.current);
      setCallDuration(0);
    }
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isCalling]);

  // Instant voice playback using high-performance speech engine
  const speakText = (text: string) => {
    setIvrTranscript(text);
    if (isMuted) return;

    playIvrVoice(text, currentLang, {
      onStart: () => {
        setIsSpeaking(true);
        setVoiceEngine('Smart Voice');
      },
      onEnd: () => setIsSpeaking(false),
      onError: () => setIsSpeaking(false),
      onAudioEngineUsed: () => setVoiceEngine('Smart Voice')
    }).catch(() => {
      setIsSpeaking(false);
    });
  };

  const getWelcomePrompt = (lang: Language) => {
    switch (lang) {
      case 'en':
        return 'Welcome to KisanQ All-India Mandi Toll-Free Helpline 1800-180-1551. Press 1 to check Token and live Queue status. Press 2 for Quick Slot Booking. Press 3 for Best Mandi recommendations and Highest Crop Prices across states. Press 4 to connect with a Mandi Duty Officer.';
      case 'pa':
        return 'ਕਿਸਾਨ ਕਿਊ ਟੋਲ-ਫ੍ਰੀ ਹੈਲਪਲਾਈਨ 1800-180-1551 ਤੇ ਤੁਹਾਡਾ ਸਵਾਗਤ ਹੈ। ਆਪਣੇ ਟੋਕਨ ਤੇ ਕਤਾਰ ਦੀ ਸਥਿਤੀ ਲਈ 1 ਦਬਾਓ। ਆਲੂ ਜਾਂ ਕਣਕ ਸਲਾਟ ਬੁਕਿੰਗ ਲਈ 2 ਦਬਾਓ। ਸਭ ਤੋਂ ਵਧੀਆ ਮੰਡੀਆਂ ਅਤੇ ਵੱਧ ਭਾਅ ਜਾਣਨ ਲਈ 3 ਦਬਾਓ। ਮੰਡੀ ਅਧਿਕਾਰੀ ਨਾਲ ਗੱਲ ਕਰਨ ਲਈ 4 ਦਬਾਓ।';
      case 'gu':
        return 'કિસાન ક્યૂ ટોલ-ફ્રી હેલ્પલાઇન 1800-180-1551 માં આપનું સ્વાગત છે. ટોકન અને કતાર સ્થિતિ માટે 1 દબાવો. નવી સ્લોટ બુકિંગ માટે 2 દબાવો. શ્રેષ્ઠ મંડી ભલામણ અને સૌથી વધુ બજાર ભાવ માટે 3 દબાવો. મંડી અધિકારી સાથે વાત કરવા માટે 4 દબાવો.';
      case 'mr':
        return 'किसान क्यू टोल-फ्री हेल्पलाइन 1800-180-1551 मध्ये आपले स्वागत आहे. आपले टोकन आणि रांगेची स्थिती जाणून घेण्यासाठी 1 दाबा. नवीन स्लॉट बुकिंगसाठी 2 दाबा. राज्यातील सर्वोत्तम बाजार समिती आणि उच्च दरांसाठी 3 दाबा. बाजार समिती अधिकाऱ्याशी बोलण्यासाठी 4 दाबा.';
      case 'bn':
        return 'কিসান কিউ টোল-ফ্রি হেল্পলাইন 1800-180-1551 এ আপনাকে স্বাগতম। টোকেন ও লাইনের স্থিতি জানতে 1 চাপুন। নতুন স্লট বুকিংয়ের জন্য 2 চাপুন। সেরা মান্ডি ও সর্বোচ্চ দর জানতে 3 চাপুন। কর্মকর্তার সাথে কথা বলতে 4 চাপুন।';
      case 'te':
        return 'కిసాన్ క్యూ టోల్-ఫ్రీ హెల్ప్‌లైన్ 1800-180-1551 కు స్వాగతం. మీ టోకెన్ మరియు క్యూ స్థితి కోసం 1 నొక్కండి. కొత్త స్లాట్ బుకింగ్ కోసం 2 నొక్కండి. ఉత్తమ మార్కెట్ మరియు అధిక ధరల కోసం 3 నొక్కండి. అధికారి సహాయం కోసం 4 నొక్కండి.';
      case 'ta':
        return 'கிசான் க்யூ இலவச உதவி எண் 1800-180-1551 க்கு நல்வரவு. டோக்கன் மற்றும் வரிசை நிலைக்கு 1 அழுத்தவும். புதிய முன்பதிவுக்கு 2 அழுத்தவும். அதிக விலை மற்றும் சிறந்த மண்டி அறிய 3 அழுத்தவும். அதிகாரி பேச 4 அழுத்தவும்.';
      case 'kn':
        return 'ಕಿಸಾನ್ ಕ್ಯೂ ಟೋಲ್-ಫ್ರೀ ಸಹಾಯವಾಣಿ 1800-180-1551 ಗೆ ಸ್ವಾಗತ. ನಿಮ್ಮ ಟೋಕನ್ ಮತ್ತು ಕ್ಯೂ ಸ್ಥಿತಿಗಾಗಿ 1 ಒತ್ತಿರಿ. ಹೊಸ ಸ್ಲಾಟ್ ಬುಕಿಂಗ್‌ಗಾಗಿ 2 ಒತ್ತಿರಿ. ಉತ್ತಮ ಮಾರುಕಟ್ಟೆ ಮತ್ತು ಗರಿಷ್ಠ ದರಗಳಿಗಾಗಿ 3 ಒತ್ತಿರಿ. ಅಧಿಕಾರಿಯೊಂದಿಗೆ ಮಾತನಾಡಲು 4 ಒತ್ತಿರಿ.';
      case 'or':
        return 'କିଷାନ କ୍ୟୁ ଟୋଲ-ଫ୍ରି ହେଲ୍ପଲାଇନ 1800-180-1551 ରେ ସ୍ୱାଗତ। ଟୋକନ ସ୍ଥିତି ପାଇଁ 1 ଦବାନ୍ତୁ। ନୂଆ ବୁକିଂ ପାଇଁ 2 ଦବାନ୍ତୁ। ସର୍ବାଧିକ ଦର ଓ ସର୍ବୋତ୍ତମ ମଣ୍ଡି ପାଇଁ 3 ଦବାନ୍ତୁ। ଅଧିକାରୀଙ୍କ ସହିତ କଥା ହେବା ପାଇଁ 4 ଦବାନ୍ତୁ।';
      case 'gar':
        return 'किसानक्यू टोल-फ्री फोन 1800-180-1551 मा स्वागत छ। टोकन और कतार देखण खातिर 1 दबावा। स्लॉट बुकिंग खातिर 2 दबावा। सबसे बढ़िया मंडी भाव खातिर 3 दबावा। अधिकारी जी से बात करण खातिर 4 दबावा।';
      case 'kum':
        return 'किसानक्यू टोल-फ्री फोन 1800-180-1551 में तुमरो स्वागत छ। टोकन व कतार देखण खातिर 1 दबावा। नया स्लॉट बुकिंग खातिर 2 दबावा। मंडियुक भाव खातिर 3 दबावा। अधिकारी ले बात करण खातिर 4 दबावा।';
      case 'ne':
        return 'किसानक्यु टोल-फ्री हेल्पलाइन 1800-180-1551 मा स्वागत छ। टोकन र लामको अवस्था बुझ्न 1 थिच्नुहोस्। नयाँ स्लट बुकिङका लागि 2 थिच्नुहोस्। मण्डी भाउ र समयका लागि 3 थिच्नुहोस्। मण्डी अधिकारीसँग कुरा गर्न 4 थिच्नुहोस्।';
      case 'hi':
      default:
        return 'किसानक्यू स्मार्ट मंडी टोल-फ्री हेल्पलाइन 1800-180-1551 में आपका स्वागत है। अपने टोकन और कतार की स्थिति जानने के लिए 1 दबाएं। स्लॉट त्वरित बुकिंग के लिए 2 दबाएं। सर्वश्रेष्ठ मंडी और सर्वाधिक ताजा भाव जानने के लिए 3 दबाएं। मंडी अधिकारी से बात करने के लिए 4 दबाएं।';
    }
  };

  const startCall = () => {
    unlockAudio();
    setIsCalling(true);
    setCurrentStep('welcome');
    playPhoneRing(0.35);

    const welcomeMsg = getWelcomePrompt(currentLang);
    setTimeout(() => {
      speakText(welcomeMsg);
    }, 380);
  };

  const hangUp = () => {
    stopAllSpeech();
    setIsCalling(false);
    setIvrTranscript('');
    setIsSpeaking(false);
    setCurrentStep('welcome');
  };

  const handleKeyPress = (digit: string) => {
    playDtmfTone(digit);
    unlockAudio();

    if (!isCalling) {
      startCall();
      return;
    }

    if (digit === '1') {
      setCurrentStep('token_status');
      if (activeBooking) {
        const msg = currentLang === 'en'
          ? `Your active token is ${activeBooking.tokenNumber} for ${activeBooking.mandiName}. Arrival window is ${activeBooking.estimatedArrivalWindow} at ${activeBooking.assignedGate}. Current status: ${activeBooking.queuePosition} vehicles ahead, approximate wait time is ${activeBooking.approxWaitTimeMinutes} minutes.`
          : `आपका सक्रिय टोकन ${activeBooking.tokenNumber}, ${activeBooking.mandiName} के लिए है। आगमन समय ${activeBooking.estimatedArrivalWindow}, ${activeBooking.assignedGate} पर है। वर्तमान में आपसे आगे ${activeBooking.queuePosition} गाड़ियां हैं और प्रतीक्षा समय लगभग ${activeBooking.approxWaitTimeMinutes} मिनट है।`;
        speakText(msg);
      } else {
        const msg = currentLang === 'en'
          ? 'No active token found for your registered number. Press 2 to reserve a new mandi slot right now.'
          : 'आपके पंजीकृत नंबर पर कोई सक्रिय टोकन नहीं मिला। नया मंडी स्लॉट बुक करने के लिए कृपया 2 दबाएं।';
        speakText(msg);
      }
    } else if (digit === '2') {
      setCurrentStep('quick_book');
      const msg = currentLang === 'en'
        ? 'Quick Slot Booking confirmed. Your arrival slot for 40 quintals is reserved tomorrow at 09:00 AM. Token pass and gate number have been sent to your phone via SMS.'
        : 'त्वरित स्लॉट बुकिंग स्वीकृत। कल सुबह 09:00 AM पर 40 क्विंटल उपज हेतु आपका स्लॉट सुरक्षित कर लिया गया है। एसएमएस द्वारा टोकन पास और गेट नंबर आपके फोन पर भेज दिया गया है।';
      speakText(msg);
    } else if (digit === '3') {
      setCurrentStep('mandi_info');
      const bestMandi = mandis.find(m => m.isBestRecommended) || mandis[0];
      const mandiTitle = currentLang === 'en' ? bestMandi.name.en : bestMandi.name.hi;
      const stateTitle = currentLang === 'en' ? bestMandi.state.en : bestMandi.state.hi;
      const msg = currentLang === 'en'
        ? `Top recommended mandi right now is ${mandiTitle} in ${stateTitle}. Current queue wait time is only ${bestMandi.currentWaitTimeMinutes} minutes, and procurement price is ₹${bestMandi.potatoProcurementPricePerQtl} per quintal.`
        : `वर्तमान में सबसे उपयुक्त मंडी ${mandiTitle} (${stateTitle}) है। यहां कतार में प्रतीक्षा केवल ${bestMandi.currentWaitTimeMinutes} मिनट है, और आलू का सरकारी भाव ₹${bestMandi.potatoProcurementPricePerQtl} प्रति क्विंटल है।`;
      speakText(msg);
    } else if (digit === '4') {
      setCurrentStep('officer_talk');
      const msg = currentLang === 'en'
        ? 'Connecting your call to Central APMC Duty Officer. Please stay on the line...'
        : 'आपकी कॉल मंडी ड्यूटी अधिकारी से जोड़ी जा रही है। कृपया लाइन पर बने रहें...';
      speakText(msg);
    } else if (digit === '0' || digit === '*') {
      setCurrentStep('welcome');
      const msg = currentLang === 'en'
        ? 'Main menu. Press 1 for token status, Press 2 for quick booking, Press 3 for mandi prices, Press 4 for officer support.'
        : 'मुख्य मेनू। टोकन स्थिति हेतु 1, नई बुकिंग हेतु 2, मंडी भाव हेतु 3, अधिकारी सहायता हेतु 4 दबाएं।';
      speakText(msg);
    } else {
      const msg = currentLang === 'en' 
        ? `You pressed key ${digit}. Please choose from options 1, 2, 3, or 4.` 
        : `आपने कीपैड पर ${digit} दबाया। कृपया 1, 2, 3, या 4 दबाएं।`;
      speakText(msg);
    }
  };

  const handleManualReplay = () => {
    unlockAudio();
    if (ivrTranscript) {
      speakText(ivrTranscript);
    } else {
      speakText(getWelcomePrompt(currentLang));
    }
  };

  const formatTime = (secs: number) => {
    const mins = Math.floor(secs / 60);
    const s = secs % 60;
    return `${mins.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  // Keypad keys localized cleanly without mixing
  const getKeypadKeys = () => {
    if (currentLang === 'en') {
      return [
        { num: '1', label: 'Token & Queue' },
        { num: '2', label: 'Quick Booking' },
        { num: '3', label: 'Rates & Best Pick' },
        { num: '4', label: 'Officer Support' },
        { num: '5', label: 'J K L' },
        { num: '6', label: 'M N O' },
        { num: '7', label: 'P Q R S' },
        { num: '8', label: 'T U V' },
        { num: '9', label: 'W X Y Z' },
        { num: '*', label: 'Menu' },
        { num: '0', label: 'Reset' },
        { num: '#', label: 'Help' }
      ];
    }
    return [
      { num: '1', label: 'कतार/टोकन स्थिति' },
      { num: '2', label: 'त्वरित स्लॉट बुकिंग' },
      { num: '3', label: 'मंडी भाव व सुझाव' },
      { num: '4', label: 'अधिकारी सहायता' },
      { num: '5', label: 'J K L' },
      { num: '6', label: 'M N O' },
      { num: '7', label: 'P Q R S' },
      { num: '8', label: 'T U V' },
      { num: '9', label: 'W X Y Z' },
      { num: '*', label: 'मुख्य मेनू' },
      { num: '0', label: 'रीसेट' },
      { num: '#', label: 'सहायता' }
    ];
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4 overflow-y-auto">
      <div className="bg-white rounded-3xl max-w-md w-full p-5 sm:p-6 shadow-2xl border border-slate-200 overflow-hidden my-auto">
        
        {/* Modal Top Bar */}
        <div className="flex items-center justify-between pb-3 border-b border-slate-100">
          <div className="flex items-center gap-2">
            <div className="w-9 h-9 rounded-xl bg-amber-500 flex items-center justify-center text-slate-950 font-black shadow-xs">
              <PhoneCall className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-extrabold text-slate-900 text-sm">
                {t.ivrTitle}
              </h3>
              <p className="text-[11px] text-emerald-700 font-mono font-bold flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                Toll-Free: 1800-180-1551 (24x7)
              </p>
            </div>
          </div>
          <button
            id="close-ivr-modal-btn"
            onClick={() => {
              hangUp();
              onClose();
            }}
            className="w-8 h-8 rounded-full bg-slate-100 text-slate-500 font-bold hover:bg-slate-200 flex items-center justify-center cursor-pointer transition-colors"
          >
            ✕
          </button>
        </div>

        {/* Call Screen Status & Visualizer */}
        <div className="mt-3 p-4 rounded-2xl bg-slate-900 text-white text-center relative overflow-hidden shadow-inner">
          <div className="text-xs font-mono">
            {isCalling ? (
              <span className="text-emerald-400 flex items-center justify-center gap-1.5 font-bold">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
                <span>
                  {currentLang === 'en' ? `Call Connected • ${formatTime(callDuration)}` : `कॉल सक्रिय • ${formatTime(callDuration)}`}
                </span>
              </span>
            ) : (
              <span className="text-slate-400">
                {currentLang === 'en' ? 'Helpline Line Ready • Press Call to Start' : 'लाइन तैयार है • कॉल शुरू करें'}
              </span>
            )}
          </div>

          <h4 className="text-2xl font-mono font-black text-amber-400 mt-1 tracking-wider">
            1800-180-1551
          </h4>

          {/* Voice Wave Animation */}
          {isCalling && (
            <div className="flex items-center justify-center gap-1 my-2 h-6">
              {[40, 80, 50, 95, 60, 100, 70, 45, 85, 30].map((h, i) => (
                <div
                  key={i}
                  className={`w-1 rounded-full transition-all duration-150 ${
                    isSpeaking 
                      ? 'bg-amber-400 animate-pulse' 
                      : 'bg-slate-700'
                  }`}
                  style={{ height: isSpeaking ? `${h}%` : '20%' }}
                />
              ))}
            </div>
          )}

          {/* Live Subtitle Transcript */}
          <div className="mt-2 min-h-[52px] max-h-[85px] overflow-y-auto p-2.5 rounded-xl bg-slate-950/80 border border-slate-800 text-[11px] sm:text-xs text-emerald-200 text-left leading-relaxed">
            {isCalling ? (
              ivrTranscript || (currentLang === 'en' ? 'Connecting to KisanQ Voice Assistant...' : 'कॉल कनेक्ट हो रही है... कृपया प्रतीक्षा करें')
            ) : (
              <span className="text-slate-400 italic">
                {currentLang === 'en' 
                  ? '📞 Dial toll-free 1800-180-1551 from any mobile or landline to check queue status and book mandi slots without internet.'
                  : '📞 बिना इंटरनेट साधारण कीपैड फोन से भी इस नंबर पर कॉल करके बुकिंग व कतार स्थिति जानी जा सकती है।'}
              </span>
            )}
          </div>

          {/* Audio Replay & Unmute Control */}
          {isCalling && (
            <div className="mt-2 flex items-center justify-between text-[11px]">
              <button
                id="replay-ivr-voice-btn"
                onClick={handleManualReplay}
                className="flex items-center gap-1 text-amber-300 hover:text-amber-200 font-bold bg-amber-500/20 px-2 py-1 rounded-md border border-amber-500/40 cursor-pointer"
              >
                <Play className="w-3 h-3 fill-amber-300" />
                <span>{currentLang === 'en' ? '🔊 Replay Voice Audio' : '🔊 आवाज फिर से सुनें'}</span>
              </button>

              <div className="flex items-center gap-2">
                <span className="text-[10px] text-emerald-400 font-mono">
                  {voiceEngine}
                </span>
                <button
                  onClick={() => setIsMuted(!isMuted)}
                  className="flex items-center gap-1 text-slate-300 hover:text-white px-2 py-1 rounded-md bg-slate-800 cursor-pointer"
                >
                  {isMuted ? <VolumeX className="w-3.5 h-3.5 text-rose-400" /> : <Volume2 className="w-3.5 h-3.5 text-emerald-400" />}
                  <span>
                    {isMuted 
                      ? (currentLang === 'en' ? 'Unmute' : 'अनम्यूट') 
                      : (currentLang === 'en' ? 'Mute' : 'म्यूट')}
                  </span>
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Language Quick Toggle */}
        <div className="mt-3 flex items-center justify-between px-1">
          <span className="text-xs font-semibold text-slate-600">
            {currentLang === 'en' ? 'Helpline Language:' : 'IVR भाषा:'}
          </span>
          <select
            value={currentLang}
            onChange={(e) => {
              const newLang = e.target.value as Language;
              onLanguageChange?.(newLang);
              if (isCalling) {
                setTimeout(() => speakText(getWelcomePrompt(newLang)), 100);
              }
            }}
            className="text-xs font-bold bg-slate-100 border border-slate-300 rounded-lg px-2 py-1 outline-none text-slate-800 cursor-pointer"
          >
            <option value="hi">🇮🇳 हिन्दी (Hindi)</option>
            <option value="en">🌐 English</option>
            <option value="pa">🌾 ਪੰਜਾਬੀ (Punjabi)</option>
            <option value="gu">🦁 ગુજરાતી (Gujarati)</option>
            <option value="mr">🚩 मराठी (Marathi)</option>
            <option value="bn">🌿 বাংলা (Bengali)</option>
            <option value="te">🌾 తెలుగు (Telugu)</option>
            <option value="ta">🏛️ தமிழ் (Tamil)</option>
            <option value="kn">🐘 ಕನ್ನಡ (Kannada)</option>
            <option value="or">🌊 ଓଡ଼ିଆ (Odia)</option>
            <option value="gar">⛰️ गढ़वाली (Garhwali)</option>
            <option value="kum">🏔️ कुमाऊँनी (Kumaoni)</option>
            <option value="ne">🏔️ नेपाली (Nepali)</option>
          </select>
        </div>

        {/* Telephone DTMF Keypad */}
        <div className="mt-3 grid grid-cols-3 gap-2">
          {getKeypadKeys().map((key) => (
            <button
              key={key.num}
              id={`ivr-key-${key.num}`}
              onClick={() => handleKeyPress(key.num)}
              className="py-2.5 px-1 bg-slate-50 hover:bg-emerald-50 active:bg-emerald-100 border border-slate-200 hover:border-emerald-400 rounded-xl flex flex-col items-center justify-center transition-all cursor-pointer shadow-2xs group"
            >
              <span className="text-base sm:text-lg font-black text-slate-800 group-hover:text-emerald-800">
                {key.num}
              </span>
              <span className="text-[9px] text-slate-500 truncate max-w-full px-1">
                {key.label}
              </span>
            </button>
          ))}
        </div>

        {/* Main Call Action Buttons */}
        <div className="mt-4 pt-3 border-t border-slate-100 flex items-center gap-2">
          {!isCalling ? (
            <button
              id="ivr-start-call-btn"
              onClick={startCall}
              className="flex-1 py-3 px-4 bg-emerald-600 hover:bg-emerald-700 active:bg-emerald-800 text-white font-extrabold rounded-2xl flex items-center justify-center gap-2 text-sm shadow-md shadow-emerald-700/20 cursor-pointer transition-colors"
            >
              <PhoneCall className="w-4 h-4 animate-bounce" />
              <span>{t.ivrSimulateCall}</span>
            </button>
          ) : (
            <button
              id="ivr-hangup-call-btn"
              onClick={hangUp}
              className="flex-1 py-3 px-4 bg-rose-600 hover:bg-rose-700 active:bg-rose-800 text-white font-extrabold rounded-2xl flex items-center justify-center gap-2 text-sm shadow-md shadow-rose-700/20 cursor-pointer transition-colors"
            >
              <PhoneOff className="w-4 h-4" />
              <span>{t.ivrHangup}</span>
            </button>
          )}

          <button
            id="ivr-guidance-btn"
            onClick={() => handleKeyPress('*')}
            title="Main Menu"
            className="py-3 px-3.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold rounded-2xl text-xs flex items-center gap-1 cursor-pointer transition-colors"
          >
            <RotateCcw className="w-4 h-4" />
            <span className="hidden sm:inline">
              {currentLang === 'en' ? 'Menu' : 'मेनू'}
            </span>
          </button>
        </div>

        {/* Helpful Footnote */}
        <p className="text-[10px] text-slate-500 text-center mt-2.5">
          {currentLang === 'en'
            ? '✓ Live HD Audio voice stream active. Tap "🔊 Replay Voice Audio" at any time to hear spoken responses.'
            : '✓ लाइव HD ऑडियो और वॉइस सक्रिय है। आवाज दोबारा सुनने के लिए "🔊 आवाज फिर से सुनें" बटन दबाएं।'}
        </p>
      </div>
    </div>
  );
};

