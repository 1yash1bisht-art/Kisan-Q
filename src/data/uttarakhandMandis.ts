import { UttarakhandMandi } from '../types';

export const UTTARAKHAND_MANDIS: UttarakhandMandi[] = [
  {
    id: 'mandi-haldwani',
    name: {
      hi: 'हल्द्वानी कृषि उत्पादन मंडी (कुमाऊं मुख्य केंद्र)',
      en: 'Haldwani APMC Mandi (Kumaon Main Centre)',
      gar: 'हल्द्वानी कृषि मंडी (कुमाऊं प्रमुख केंद्र)'
    },
    district: {
      hi: 'नैनीताल',
      en: 'Nainital'
    },
    locationAddress: 'Bareilly Road, Subhash Nagar, Haldwani, Uttarakhand 263139',
    approxDistanceKm: 24,
    currentWaitTimeMinutes: 15,
    vehiclesInQueue: 2,
    dailyCapacityQuintals: 1500,
    bookedQuintals: 1080,
    activeGates: 4,
    potatoProcurementPricePerQtl: 1490,
    isBestRecommended: true,
    recommendationReason: {
      hi: '⭐ सर्वश्रेष्ठ मंडी: सबसे कम प्रतीक्षा (15 मिनट) व आलू की बेहतरीन सरकारी दर (₹1,490/क्विंटल)',
      en: '⭐ Best Recommended Mandi: Lowest wait time (15 mins) and high Potato procurement price (₹1,490/Qtl)',
      gar: '⭐ सबसे बढ़िया मंडी: कम इंतजार (15 मिनट) और आलू की ऊंची दर'
    },
    contactHelpline: '05946-220194 / 1800-180-1551',
    officerInCharge: 'श्री आर. एस. बिष्ट (Mandi Secretary)'
  },
  {
    id: 'mandi-dehradun',
    name: {
      hi: 'देहरादून निरंजनपुर मुख्य मंडी समिति',
      en: 'Dehradun Niranjanpur Main APMC Mandi',
      gar: 'देहरादून निरंजनपुर मंडी'
    },
    district: {
      hi: 'देहरादून',
      en: 'Dehradun'
    },
    locationAddress: 'Saharanpur Road, Niranjanpur, Majra, Dehradun 248001',
    approxDistanceKm: 14,
    currentWaitTimeMinutes: 30,
    vehiclesInQueue: 5,
    dailyCapacityQuintals: 900,
    bookedQuintals: 680,
    activeGates: 3,
    potatoProcurementPricePerQtl: 1510,
    isBestRecommended: true,
    recommendationReason: {
      hi: '⚡ आलू पर उच्चतम मूल्य (₹1,510/क्विंटल) व सुगम तौल कांटे',
      en: '⚡ Highest Potato Rate (₹1,510/Qtl) with automated electronic weighbridges',
      gar: '⚡ आलू का उच्चतम भाव (₹1,510/क्विंटल)'
    },
    contactHelpline: '0135-2623401',
    officerInCharge: 'श्रीमती अनीता जोशी (Chief Procurement Officer)'
  },
  {
    id: 'mandi-vikasnagar',
    name: {
      hi: 'विकासनगर कृषि मंडी (पहाड़ी आलू विशेष)',
      en: 'Vikasnagar APMC Mandi (Hill Potato Special)',
      gar: 'विकासनगर मंडी (पहाड़ी आलू खरीद)'
    },
    district: {
      hi: 'देहरादून',
      en: 'Dehradun'
    },
    locationAddress: 'Dakpathar Bypass Road, Vikasnagar 248198',
    approxDistanceKm: 32,
    currentWaitTimeMinutes: 20,
    vehiclesInQueue: 3,
    dailyCapacityQuintals: 600,
    bookedQuintals: 390,
    activeGates: 2,
    potatoProcurementPricePerQtl: 1525,
    isBestRecommended: true,
    recommendationReason: {
      hi: '🥔 चकराता व जौनसार पहाड़ी आलू हेतु विशेष प्रीमियम दर व खाली स्लॉट',
      en: '🥔 Special premium price for Jaunsar & Chakrata hill potatoes with open slots',
      gar: '🥔 पहाड़ी आलू खातिर विशेष बोनस व तुरन्त तौल'
    },
    contactHelpline: '01360-222115',
    officerInCharge: 'श्री वीरेंद्र सिंह चौहान (Mandi Inspector)'
  },
  {
    id: 'mandi-kashipur',
    name: {
      hi: 'काशीपुर नवीन गल्ला एवं सब्जी मंडी',
      en: 'Kashipur Navin APMC Mandi',
      gar: 'काशीपुर नवीन मंडी'
    },
    district: {
      hi: 'ऊधम सिंह नगर',
      en: 'Udham Singh Nagar'
    },
    locationAddress: 'Ramnagar Road, Kashipur, Udham Singh Nagar 244713',
    approxDistanceKm: 46,
    currentWaitTimeMinutes: 22,
    vehiclesInQueue: 3,
    dailyCapacityQuintals: 1400,
    bookedQuintals: 890,
    activeGates: 4,
    potatoProcurementPricePerQtl: 1450,
    recommendationReason: {
      hi: '🟢 विशाल भंडारण क्षमता (1,400 क्विंटल) एवं तेजी से अनलोडिंग',
      en: '🟢 Massive capacity (1,400 Quintals) and rapid mechanical unloading',
      gar: '🟢 बडी मंडी, कोई भीड़ नहीं'
    },
    contactHelpline: '05947-274880',
    officerInCharge: 'श्री मुकेश कुमार वर्मा (Senior Secretary)'
  },
  {
    id: 'mandi-haridwar',
    name: {
      hi: 'हरिद्वार ज्वालापुर कृषि उपज मंडी',
      en: 'Haridwar Jwalapur APMC Mandi',
      gar: 'हरिद्वार ज्वालापुर मंडी'
    },
    district: {
      hi: 'हरिद्वार',
      en: 'Haridwar'
    },
    locationAddress: 'Old Delhi Road, Jwalapur, Haridwar 249407',
    approxDistanceKm: 42,
    currentWaitTimeMinutes: 48,
    vehiclesInQueue: 9,
    dailyCapacityQuintals: 950,
    bookedQuintals: 870,
    activeGates: 3,
    potatoProcurementPricePerQtl: 1420,
    recommendationReason: {
      hi: '⚠️ उच्च आवक (भीड़ अधिक) - दोपहर बाद 2:00 PM का स्लॉट चुनें',
      en: '⚠️ Heavy arrivals right now - choose slot after 2:00 PM for faster entry',
      gar: '⚠️ थोड़ी भीड़ छ, दोपहर बाद का स्लॉट लेवा'
    },
    contactHelpline: '01334-227092',
    officerInCharge: 'श्री संजय नेगी (Yard Supervisor)'
  },
  {
    id: 'mandi-rudrapur',
    name: {
      hi: 'रुद्रपुर केंद्रीय कृषि मंडी समिति',
      en: 'Rudrapur Central APMC Mandi',
      gar: 'रुद्रपुर केंद्रीय मंडी'
    },
    district: {
      hi: 'ऊधम सिंह नगर',
      en: 'Udham Singh Nagar'
    },
    locationAddress: 'Kichha Road, Industrial Area, Rudrapur 263153',
    approxDistanceKm: 55,
    currentWaitTimeMinutes: 25,
    vehiclesInQueue: 4,
    dailyCapacityQuintals: 1200,
    bookedQuintals: 820,
    activeGates: 4,
    potatoProcurementPricePerQtl: 1440,
    recommendationReason: {
      hi: '🌾 प्रत्यक्ष बैंक भुगतान (DBT) 12 घंटे में निष्पादित',
      en: '🌾 Direct Bank Transfer (DBT) settled within 12 hours guaranteed',
      gar: '🌾 सीधो खाते मा रुप्या 12 घंटा मा'
    },
    contactHelpline: '05944-242331',
    officerInCharge: 'श्री कुलदीप सिंह संधू (Finance Officer)'
  },
  {
    id: 'mandi-rishikesh',
    name: {
      hi: 'ऋषिकेश मंडी समिति',
      en: 'Rishikesh APMC Mandi',
      gar: 'ऋषिकेश मंडी'
    },
    district: {
      hi: 'देहरादून',
      en: 'Dehradun'
    },
    locationAddress: 'Haridwar Bypass, Near Natraj Chowk, Rishikesh 249201',
    approxDistanceKm: 26,
    currentWaitTimeMinutes: 18,
    vehiclesInQueue: 2,
    dailyCapacityQuintals: 450,
    bookedQuintals: 280,
    activeGates: 2,
    potatoProcurementPricePerQtl: 1475,
    recommendationReason: {
      hi: '✨ टिहरी एवं पौड़ी के किसानों हेतु निकटतम सुलभ केंद्र',
      en: '✨ Nearest easily accessible point for Tehri & Pauri farmers',
      gar: '✨ पहाड़ का किसानु खातिर नजदीक केंद्र'
    },
    contactHelpline: '0135-2430155',
    officerInCharge: 'श्री महेश दत्त शर्मा (Mandi Inspector)'
  },
  {
    id: 'mandi-kotdwar',
    name: {
      hi: 'कोटद्वार कृषि मंडी (पौड़ी गढ़वाल)',
      en: 'Kotdwar APMC Mandi (Pauri Garhwal)',
      gar: 'कोटद्वार मंडी (पौड़ी गढ़वाल)'
    },
    district: {
      hi: 'पौड़ी गढ़वाल',
      en: 'Pauri Garhwal'
    },
    locationAddress: 'Najibabad Road, Gate No. 1, Kotdwar 246149',
    approxDistanceKm: 62,
    currentWaitTimeMinutes: 10,
    vehiclesInQueue: 1,
    dailyCapacityQuintals: 400,
    bookedQuintals: 210,
    activeGates: 2,
    potatoProcurementPricePerQtl: 1460,
    isBestRecommended: true,
    recommendationReason: {
      hi: '🏔️ गढ़वाल मंडल में सबसे न्यूनतम प्रतीक्षा (मात्र 10 मिनट) एवं सीधा टोकन',
      en: '🏔️ Lowest waiting time in Garhwal division (only 10 mins) with instant token entry',
      gar: '🏔️ सबसे कम टाइम - बस 10 मिनट मा काम'
    },
    contactHelpline: '01382-228390',
    officerInCharge: 'श्री हरीश चंद्र रावत (Assistant Director)'
  },
  {
    id: 'mandi-ramnagar',
    name: {
      hi: 'रामनगर नवीन मंडी समिति',
      en: 'Ramnagar Navin APMC Mandi',
      gar: 'रामनगर मंडी (नैनीताल)'
    },
    district: {
      hi: 'नैनीताल',
      en: 'Nainital'
    },
    locationAddress: 'Kashipur-Ramnagar Highway, Ramnagar 244715',
    approxDistanceKm: 38,
    currentWaitTimeMinutes: 16,
    vehiclesInQueue: 2,
    dailyCapacityQuintals: 500,
    bookedQuintals: 310,
    activeGates: 2,
    potatoProcurementPricePerQtl: 1435,
    recommendationReason: {
      hi: '🚚 छोटे वाहनों (पिकअप/छोटा हाथी) के लिए अलग समर्पित लेन',
      en: '🚚 Dedicated priority express bay for small pickups & mini-trucks',
      gar: '🚚 छोटा वाहनों खातिर अलग लेन'
    },
    contactHelpline: '05947-251210',
    officerInCharge: 'श्री पंकज बहुगुणा (Quality Assessor)'
  },
  {
    id: 'mandi-roorkee',
    name: {
      hi: 'रुड़की कृषि उपज उपमंडी',
      en: 'Roorkee APMC Sub-Mandi',
      gar: 'रुड़की उपमंडी (हरिद्वार)'
    },
    district: {
      hi: 'हरिद्वार',
      en: 'Haridwar'
    },
    locationAddress: 'Delhi-Dehradun Highway, Near Roorkee Cantt, Roorkee 247667',
    approxDistanceKm: 45,
    currentWaitTimeMinutes: 28,
    vehiclesInQueue: 4,
    dailyCapacityQuintals: 700,
    bookedQuintals: 510,
    activeGates: 3,
    potatoProcurementPricePerQtl: 1425,
    recommendationReason: {
      hi: '⚖️ 24x7 कम्प्यूटरीकृत धर्मकांटा व टोकन सत्यापन',
      en: '⚖️ 24x7 computerized weighbridge and instant QR token verification',
      gar: '⚖️ 24 घंटा चालू धर्मकांटा'
    },
    contactHelpline: '01332-264500',
    officerInCharge: 'श्री दीपेश सिंह (Weighbridge Master)'
  }
];
