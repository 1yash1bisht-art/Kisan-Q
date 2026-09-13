import { FarmerProfile, OfficerProfile, SlotBooking, SMSAlert } from '../types';

export const CROPS_CONFIG = [
  {
    id: 'potato',
    name: {
      hi: 'आलू (Potato)',
      en: 'Potato (आलू)',
      gar: 'आलू (Pahari Potato)'
    },
    defaultMspPerQtl: 1480,
    unit: 'Quintal',
    badge: '🥔 Top Demand',
    varieties: ['Kufri Jyoti (कुफरी ज्योति)', 'Kufri Chipsona', 'Pahari Red Potato (लाल आलू)', 'Chandramukhi']
  },
  {
    id: 'wheat',
    name: {
      hi: 'गेहूं (Wheat)',
      en: 'Wheat (गेहूं)',
      gar: 'ग्यूं (Wheat)'
    },
    defaultMspPerQtl: 2275,
    unit: 'Quintal',
    badge: '🌾 Govt MSP',
    varieties: ['HD 2967', 'PBW 550', 'Sharbati Local']
  },
  {
    id: 'paddy',
    name: {
      hi: 'धान (Paddy / Rice)',
      en: 'Paddy / Rice (धान)',
      gar: 'धान (Basmati / Local)',
    },
    defaultMspPerQtl: 2320,
    unit: 'Quintal',
    badge: '🍚 Active Slot',
    varieties: ['Dehraduni Basmati', 'PR 126', 'Govind Bhog']
  },
  {
    id: 'tomato',
    name: {
      hi: 'टमाटर (Tomato)',
      en: 'Tomato (टमाटर)',
      gar: 'टमाटर'
    },
    defaultMspPerQtl: 1850,
    unit: 'Quintal',
    badge: '🍅 Fresh Batch',
    varieties: ['Himsona', 'Abhinav', 'Desi Local']
  },
  {
    id: 'apple',
    name: {
      hi: 'सेब (Apple)',
      en: 'Apple (सेब)',
      gar: 'सेब (Pahari Seb)'
    },
    defaultMspPerQtl: 5200,
    unit: 'Quintal',
    badge: '🍎 Hill Produce',
    varieties: ['Royal Delicious', 'Red Delicious', 'Golden Delicious']
  },
  {
    id: 'pulses',
    name: {
      hi: 'दालें - गहत / भट्ट / राजमा (Hill Pulses)',
      en: 'Hill Pulses (Gahat / Bhatt / Rajma)',
      gar: 'गहत / भट्ट / राजमा'
    },
    defaultMspPerQtl: 7400,
    unit: 'Quintal',
    badge: '🏔️ Organic Hill',
    varieties: ['Munsyari Rajma', 'Uttarakhand Gahat', 'Black Soybean (Bhatt)']
  }
];

export const INITIAL_FARMERS: FarmerProfile[] = [
  {
    id: 'farmer-1',
    aadhaarNumber: '583491207412',
    name: 'रमेश सिंह नेगी (Ramesh Singh Negi)',
    mobileNumber: '9876543210',
    district: 'देहरादून',
    village: 'सहारनपुर रोड, डोईवाला (Doiwala)',
    landSizeAcres: 4.5,
    primaryCrop: 'potato',
    bankAccountLast4: '4891',
    ifscCode: 'SBIN0001234',
    kisanCreditCardNo: 'KCC-UK-2024-991',
    registeredAt: '2026-08-10',
    isAadhaarVerified: true
  },
  {
    id: 'farmer-2',
    aadhaarNumber: '876543219012',
    name: 'बलबीर सिंह रावत (Balbeer Singh Rawat)',
    mobileNumber: '9412098765',
    district: 'नैनीताल',
    village: 'हल्दूचौड़, हल्द्वानी (Halduchaur)',
    landSizeAcres: 6.0,
    primaryCrop: 'potato',
    bankAccountLast4: '8820',
    ifscCode: 'PUNB0182700',
    kisanCreditCardNo: 'KCC-UK-2025-412',
    registeredAt: '2026-08-15',
    isAadhaarVerified: true
  }
];

export const INITIAL_OFFICERS: OfficerProfile[] = [
  {
    id: 'officer-1',
    employeeId: 'DOCA-UK-8491',
    name: 'श्री आर. एस. बिष्ट (R.S. Bisht)',
    designation: 'वरिष्ठ मंडी सचिव (Senior Mandi Secretary)',
    assignedMandiId: 'mandi-haldwani',
    mobileNumber: '9837012345',
    department: 'Department of Consumer Affairs (DoCA), Uttarakhand'
  },
  {
    id: 'officer-2',
    employeeId: 'DOCA-UK-3920',
    name: 'श्रीमती अनीता जोशी (Anita Joshi)',
    designation: 'मुख्य खरीद अधिकारी (Chief Procurement Officer)',
    assignedMandiId: 'mandi-dehradun',
    mobileNumber: '9411122334',
    department: 'DoCA Uttarakhand APMC Board'
  }
];

export const INITIAL_BOOKINGS: SlotBooking[] = [
  {
    id: 'book-101',
    tokenNumber: 'KQ-UK-7821',
    farmerAadhaar: '583491207412',
    farmerName: 'रमेश सिंह नेगी',
    farmerMobile: '9876543210',
    mandiId: 'mandi-dehradun',
    mandiName: 'देहरादून निरंजनपुर मुख्य मंडी समिति',
    crop: 'potato',
    variety: 'Kufri Jyoti (कुफरी ज्योति)',
    quantityQuintals: 45,
    vehicleType: 'tractor',
    vehiclePlateNumber: 'UK 07 AA 4491',
    scheduledDate: '2026-09-14',
    timeSlot: '09:00 AM - 11:00 AM',
    estimatedArrivalWindow: '09:15 AM - 09:45 AM',
    assignedGate: 'गेट नं. 2 (Gate No. 2)',
    currentStage: 'gate_arrived',
    queuePosition: 2,
    approxWaitTimeMinutes: 18,
    createdAt: '2026-09-13T08:30:00Z',
    delayMinutes: 0
  },
  {
    id: 'book-102',
    tokenNumber: 'KQ-UK-6519',
    farmerAadhaar: '876543219012',
    farmerName: 'बलबीर सिंह रावत',
    farmerMobile: '9412098765',
    mandiId: 'mandi-haldwani',
    mandiName: 'हल्द्वानी कृषि उत्पादन मंडी (कुमाऊं)',
    crop: 'potato',
    variety: 'Pahari Red Potato (लाल आलू)',
    quantityQuintals: 60,
    vehicleType: 'pickup',
    vehiclePlateNumber: 'UK 04 CA 1290',
    scheduledDate: '2026-09-13',
    timeSlot: '08:00 AM - 10:00 AM',
    estimatedArrivalWindow: '08:20 AM - 08:50 AM',
    assignedGate: 'गेट नं. 1 (Gate No. 1)',
    currentStage: 'payment_settled',
    queuePosition: 0,
    approxWaitTimeMinutes: 0,
    createdAt: '2026-09-12T14:15:00Z',
    actualWeightQuintals: 60.5,
    qualityGrade: 'A',
    totalPayableAmount: 90145,
    paymentRefNumber: 'DBT-GOI-UK-20260913-9941',
    paymentSettledAt: '2026-09-13T10:45:00Z'
  }
];

export const INITIAL_SMS_ALERTS: SMSAlert[] = [
  {
    id: 'sms-1',
    recipientMobile: '9876543210',
    tokenNumber: 'KQ-UK-7821',
    messageText: {
      hi: 'किसानक्यू: प्रिय रमेश सिंह, टोकन #KQ-7821 देहरादून मंडी (गेट 2) पर कन्फर्म है। आपकी बारी में 2 गाड़ियां आगे हैं। अनुमानित समय 18 मिनट।',
      en: 'KisanQ: Dear Ramesh Singh, Token #KQ-7821 is confirmed at Dehradun Mandi (Gate 2). 2 vehicles ahead. Est wait time: 18 mins.',
      gar: 'किसानक्यू: रमेश जी, तुमरो टोकन #KQ-7821 देहरादून मंडी गेट 2 पर छ। 2 गाड़ी आगे छिन, 18 मिनट मा तुमरी बारी छ।',
      kum: 'किसानक्यू: रमेश जी, तुमरो टोकन #KQ-7821 देहरादून मंडी गेट 2 पर छ। 2 गाड़ियन पाछ तुमरो नंबर छ, 18 मिनट में पहुंचि जावा।',
      pa: 'ਕਿਸਾਨ ਕਿਊ: ਪਿਆਰੇ ਰਮੇਸ਼ ਸਿੰਘ, ਟੋਕਨ #KQ-7821 ਦੇਹਰਾਦੂਨ ਮੰਡੀ (ਗੇਟ 2) ਤੇ ਪੁਸ਼ਟੀ ਕੀਤੀ ਗਈ ਹੈ। ਤੁਹਾਡੇ ਅੱਗੇ 2 ਗੱਡੀਆਂ ਹਨ। ਅੰਦਾਜ਼ਨ ਸਮਾਂ 18 ਮਿੰਟ।',
      ne: 'किसानक्यु: प्रिय रमेश सिंह, टोकन #KQ-7821 देहरादून मण्डी (गेट २) मा पुष्टि भएको छ। तपाईंभन्दा अगाडि २ गाडी छन्। अनुमानित समय १८ मिनेट।'
    },
    timestamp: '11:15 AM',
    status: 'delivered',
    category: 'queue_turn'
  },
  {
    id: 'sms-2',
    recipientMobile: '9412098765',
    tokenNumber: 'KQ-UK-6519',
    messageText: {
      hi: 'किसानक्यू DBT भुगतान: बधाई हो! हल्द्वानी मंडी में 60.5 क्विंटल आलू की खरीद के ₹90,145 आपके खाते (A/C ..8820) में जमा कर दिए गए हैं। Ref: DBT-GOI-UK-9941',
      en: 'KisanQ DBT Alert: Congrats! ₹90,145 for 60.5 Qtl Potato at Haldwani Mandi credited to A/C ending 8820. Ref: DBT-GOI-UK-9941',
      gar: 'किसानक्यू: बधाई! हल्द्वानी मंडी मा 60.5 क्विंटल आलू का ₹90,145 बैंक खाता मा जमा होगे। Ref: DBT-GOI-UK-9941',
      kum: 'किसानक्यू DBT भुगतान: बधाई! हल्द्वानी मंडी में 60.5 क्विंटल आलूक ₹90,145 तुमर बैंक खाता में जमा भइ गे। Ref: DBT-GOI-UK-9941',
      pa: 'ਕਿਸਾਨ ਕਿਊ DBT ਅਲਰਟ: ਵਧਾਈ ਹੋਵੇ! ਹਲਦਵਾਨੀ ਮੰਡੀ ਵਿੱਚ 60.5 ਕੁਇੰਟਲ ਆਲੂ ਦੀ ਖਰੀਦ ਦੇ ₹90,145 ਤੁਹਾਡੇ ਬੈਂਕ ਖਾਤੇ (A/C ..8820) ਵਿੱਚ ਜਮ੍ਹਾ ਹੋ ਗਏ ਹਨ। Ref: DBT-GOI-UK-9941',
      ne: 'किसानक्यु DBT भुक्तानी: बधाई छ! हल्द्वानी मण्डीमा ६०.५ क्विन्टल आलुको ₹९०,१४५ तपाईंको खातामा जम्मा भयो। Ref: DBT-GOI-UK-9941'
    },
    timestamp: '10:46 AM',
    status: 'delivered',
    category: 'payment'
  }
];
