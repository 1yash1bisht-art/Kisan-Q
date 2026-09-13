import { MandiInfo } from '../types';

export const ALL_INDIA_MANDIS: MandiInfo[] = [
  // --- UTTARAKHAND ---
  {
    id: 'mandi-haldwani',
    state: { hi: 'उत्तराखंड', en: 'Uttarakhand', code: 'UK' },
    name: {
      hi: 'हल्द्वानी कृषि उत्पादन मंडी (कुमाऊं मुख्य केंद्र)',
      en: 'Haldwani APMC Mandi (Kumaon Hub)',
      pa: 'ਹਲਦਵਾਨੀ ਏ.ਪੀ.ਐਮ.ਸੀ. ਮੰਡੀ',
      mr: 'हल्दवानी एपीएमसी कृषी बाजार',
      gu: 'હલ્દવાની એપીએમસી માર્કેટ'
    },
    district: { hi: 'नैनीताल', en: 'Nainital' },
    locationAddress: 'Bareilly Road, Subhash Nagar, Haldwani, Uttarakhand 263139',
    approxDistanceKm: 24,
    currentWaitTimeMinutes: 15,
    vehiclesInQueue: 2,
    dailyCapacityQuintals: 1500,
    bookedQuintals: 1080,
    activeGates: 4,
    potatoProcurementPricePerQtl: 1490,
    cropPrices: {
      potato: 1490,
      wheat: 2275,
      paddy: 2320,
      tomato: 1850,
      pulses: 6800
    },
    specialtyCrops: ['potato', 'tomato', 'pulses'],
    isBestRecommended: true,
    recommendationReason: {
      hi: '⭐ कुमाऊं में सबसे कम प्रतीक्षा (15 मिनट) व आलू की बेहतरीन दर (₹1,490/क्विंटल)',
      en: '⭐ Best in Kumaon: Lowest wait time (15 mins) and high Potato rate (₹1,490/Qtl)'
    },
    contactHelpline: '05946-220194 / 1800-180-1551',
    officerInCharge: 'श्री आर. एस. बिष्ट (Mandi Secretary)'
  },
  {
    id: 'mandi-dehradun',
    state: { hi: 'उत्तराखंड', en: 'Uttarakhand', code: 'UK' },
    name: {
      hi: 'देहरादून निरंजनपुर मुख्य मंडी समिति',
      en: 'Dehradun Niranjanpur Main APMC Mandi',
      pa: 'ਦੇਹਰਾਦੂਨ ਨਿਰੰਜਨਪੁਰ ਮੁੱਖ ਮੰਡੀ'
    },
    district: { hi: 'देहरादून', en: 'Dehradun' },
    locationAddress: 'Saharanpur Road, Niranjanpur, Dehradun, Uttarakhand 248001',
    approxDistanceKm: 42,
    currentWaitTimeMinutes: 45,
    vehiclesInQueue: 8,
    dailyCapacityQuintals: 2200,
    bookedQuintals: 1890,
    activeGates: 5,
    potatoProcurementPricePerQtl: 1440,
    cropPrices: {
      potato: 1440,
      wheat: 2280,
      paddy: 2300,
      tomato: 1920,
      onion: 2150
    },
    specialtyCrops: ['potato', 'tomato', 'onion'],
    contactHelpline: '0135-2720455',
    officerInCharge: 'श्रीमती कविता नेगी (APMC Officer)'
  },
  {
    id: 'mandi-kashipur',
    state: { hi: 'उत्तराखंड', en: 'Uttarakhand', code: 'UK' },
    name: {
      hi: 'काशीपुर नवीन कृषि उत्पादन मंडी (तराई हब)',
      en: 'Kashipur Navin Mandi (Tarai Mega Hub)',
      pa: 'ਕਾਸ਼ੀਪੁਰ ਨਵੀਨ ਮੰਡੀ'
    },
    district: { hi: 'उधम सिंह नगर', en: 'Udham Singh Nagar' },
    locationAddress: 'Moradabad Road, Kashipur, Uttarakhand 244713',
    approxDistanceKm: 58,
    currentWaitTimeMinutes: 20,
    vehiclesInQueue: 3,
    dailyCapacityQuintals: 3000,
    bookedQuintals: 1650,
    activeGates: 6,
    potatoProcurementPricePerQtl: 1475,
    cropPrices: {
      potato: 1475,
      paddy: 2350,
      wheat: 2300,
      mustard: 5750
    },
    specialtyCrops: ['paddy', 'wheat', 'potato'],
    isBestRecommended: true,
    recommendationReason: {
      hi: '⭐ विशाल क्षमता (3000 क्विंटल), केवल 20 मिनट वेटिंग और धान/आलू की बंपर खरीद',
      en: '⭐ Mega Capacity (3000 Qtl), 20 min wait, and premium Paddy/Potato procurement'
    },
    contactHelpline: '05947-275123',
    officerInCharge: 'श्री हरजिंदर सिंह चीमा (Deputy Director)'
  },
  {
    id: 'mandi-haridwar',
    state: { hi: 'उत्तराखंड', en: 'Uttarakhand', code: 'UK' },
    name: {
      hi: 'हरिद्वार ज्वालापुर कृषि मंडी',
      en: 'Haridwar Jwalapur APMC Mandi'
    },
    district: { hi: 'हरिद्वार', en: 'Haridwar' },
    locationAddress: 'Delhi-Dehradun Highway, Jwalapur, Haridwar 249407',
    approxDistanceKm: 65,
    currentWaitTimeMinutes: 30,
    vehiclesInQueue: 5,
    dailyCapacityQuintals: 1600,
    bookedQuintals: 1200,
    activeGates: 4,
    potatoProcurementPricePerQtl: 1425,
    cropPrices: {
      potato: 1425,
      wheat: 2275,
      mustard: 5700
    },
    specialtyCrops: ['wheat', 'potato', 'mustard'],
    contactHelpline: '01334-227891',
    officerInCharge: 'श्री सुरेश चन्द्र जोशी'
  },

  // --- PUNJAB ---
  {
    id: 'mandi-khanna',
    state: { hi: 'पंजाब', en: 'Punjab', code: 'PB' },
    name: {
      hi: 'खन्ना अनाज मंडी (एशिया की सबसे बड़ी कृषि मंडी)',
      en: 'Khanna Grain Market (Asia\'s Largest APMC)',
      pa: 'ਖੰਨਾ ਅਨਾਜ ਮੰਡੀ (ਏਸ਼ੀਆ ਦੀ ਸਭ ਤੋਂ ਵੱਡੀ ਮੰਡੀ)'
    },
    district: { hi: 'लुधियाना', en: 'Ludhiana' },
    locationAddress: 'GT Road, Khanna, Ludhiana, Punjab 141401',
    approxDistanceKm: 195,
    currentWaitTimeMinutes: 25,
    vehiclesInQueue: 12,
    dailyCapacityQuintals: 8000,
    bookedQuintals: 5200,
    activeGates: 10,
    potatoProcurementPricePerQtl: 1520,
    cropPrices: {
      wheat: 2325,
      paddy: 2380,
      potato: 1520,
      mustard: 5800
    },
    specialtyCrops: ['wheat', 'paddy', 'potato'],
    isBestRecommended: true,
    recommendationReason: {
      hi: '⭐ एशिया की सबसे बड़ी मंडी: उच्चतम गेहूं (₹2,325) व धान दर, 10 गेटों पर हाई-स्पीड वेइब्रिज',
      en: '⭐ Asia\'s Largest APMC: Highest wheat MSP (₹2,325) and automated 10-gate electronic weighbridges'
    },
    contactHelpline: '01628-220042 / 1800-180-2022',
    officerInCharge: 'सरदार गुरमीत सिंह धालीवाल (Chairman APMC)'
  },
  {
    id: 'mandi-jalandhar',
    state: { hi: 'पंजाब', en: 'Punjab', code: 'PB' },
    name: {
      hi: 'जालंधर मकसूदां आलू व सब्जी मंडी',
      en: 'Jalandhar Maqsudan Potato & Veg Mandi',
      pa: 'ਜਲੰਧਰ ਮਕਸੂਦਾਂ ਆਲੂ ਮੰਡੀ'
    },
    district: { hi: 'जालंधर', en: 'Jalandhar' },
    locationAddress: 'Maqsudan Bypass, Jalandhar, Punjab 144008',
    approxDistanceKm: 240,
    currentWaitTimeMinutes: 18,
    vehiclesInQueue: 4,
    dailyCapacityQuintals: 4500,
    bookedQuintals: 3100,
    activeGates: 6,
    potatoProcurementPricePerQtl: 1540,
    cropPrices: {
      potato: 1540,
      wheat: 2275,
      tomato: 1800
    },
    specialtyCrops: ['potato', 'tomato'],
    isBestRecommended: true,
    recommendationReason: {
      hi: '⭐ पंजाब की शीर्ष आलू मंडी: ₹1,540/क्विंटल उच्चतम आलू दर और बीज प्रमाणीकरण सुविधा',
      en: '⭐ Punjab\'s Top Potato Hub: Highest rate ₹1,540/Qtl and certified seed procurement'
    },
    contactHelpline: '0181-2280311',
    officerInCharge: 'श्री बलविंदर सिंह कंग'
  },

  // --- UTTAR PRADESH ---
  {
    id: 'mandi-agra',
    state: { hi: 'उत्तर प्रदेश', en: 'Uttar Pradesh', code: 'UP' },
    name: {
      hi: 'आगरा फतेहाबाद रोड नवीन मंडी (भारत की आलू राजधानी)',
      en: 'Agra Fatehabad Road Mandi (Potato Capital of India)'
    },
    district: { hi: 'आगरा', en: 'Agra' },
    locationAddress: 'Fatehabad Road, Shamsabad, Agra, Uttar Pradesh 282001',
    approxDistanceKm: 280,
    currentWaitTimeMinutes: 30,
    vehiclesInQueue: 14,
    dailyCapacityQuintals: 7500,
    bookedQuintals: 5800,
    activeGates: 8,
    potatoProcurementPricePerQtl: 1510,
    cropPrices: {
      potato: 1510,
      mustard: 5820,
      wheat: 2275
    },
    specialtyCrops: ['potato', 'mustard'],
    isBestRecommended: true,
    recommendationReason: {
      hi: '⭐ देश की सबसे बड़ी आलू मंडी: 50+ कोल्ड स्टोरेज कनेक्टिविटी, सीधी DBT पेमेंट ₹1,510/क्विंटल',
      en: '⭐ Potato Capital of India: 50+ Cold-store tie-ups and direct DBT at ₹1,510/Qtl'
    },
    contactHelpline: '0562-2234011',
    officerInCharge: 'श्री अखिलेश कुमार यादव (APMC Secretary)'
  },
  {
    id: 'mandi-kanpur',
    state: { hi: 'उत्तर प्रदेश', en: 'Uttar Pradesh', code: 'UP' },
    name: {
      hi: 'कानपुर चकेरी कृषि उत्पादन मंडी समिति',
      en: 'Kanpur Chakeri APMC Mega Mandi'
    },
    district: { hi: 'कानपुर नगर', en: 'Kanpur' },
    locationAddress: 'NH-19, Chakeri, Kanpur, Uttar Pradesh 208007',
    approxDistanceKm: 390,
    currentWaitTimeMinutes: 22,
    vehiclesInQueue: 6,
    dailyCapacityQuintals: 5000,
    bookedQuintals: 3400,
    activeGates: 6,
    potatoProcurementPricePerQtl: 1460,
    cropPrices: {
      wheat: 2290,
      potato: 1460,
      mustard: 5780,
      pulses: 7100
    },
    specialtyCrops: ['wheat', 'pulses', 'mustard'],
    contactHelpline: '0512-2401882',
    officerInCharge: 'श्रीमती रीता सचान'
  },
  {
    id: 'mandi-azadpur-delhi',
    state: { hi: 'दिल्ली (एनसीआर)', en: 'Delhi (NCR)', code: 'DL' },
    name: {
      hi: 'आजादपुर मुख्य कृषि मंडी (एशिया की सबसे बड़ी फल व सब्जी मंडी)',
      en: 'Azadpur APMC (Asia\'s Premier Fruit & Veg Market)'
    },
    district: { hi: 'उत्तर दिल्ली', en: 'North Delhi' },
    locationAddress: 'Azadpur, New Delhi 110033',
    approxDistanceKm: 215,
    currentWaitTimeMinutes: 50,
    vehiclesInQueue: 28,
    dailyCapacityQuintals: 12000,
    bookedQuintals: 9800,
    activeGates: 12,
    potatoProcurementPricePerQtl: 1530,
    cropPrices: {
      potato: 1530,
      tomato: 2100,
      onion: 2350,
      apple: 7800,
      wheat: 2310
    },
    specialtyCrops: ['potato', 'onion', 'tomato', 'apple'],
    isBestRecommended: true,
    recommendationReason: {
      hi: '⭐ राष्ट्रीय राजधानी में सर्वाधिक मांग व तत्काल नकद/DBT भुगतान (12,000 क्विंटल दैनिक क्षमता)',
      en: '⭐ Highest volume & instant bank settlement in NCR hub (12,000 Qtl daily capacity)'
    },
    contactHelpline: '011-27691850 / 1800-11-2233',
    officerInCharge: 'श्री पी. के. शर्मा (Director Operations)'
  },

  // --- MAHARASHTRA ---
  {
    id: 'mandi-lasalgaon',
    state: { hi: 'महाराष्ट्र', en: 'Maharashtra', code: 'MH' },
    name: {
      hi: 'लासलगाव कृषी उत्पन्न बाजार समिती (आशियातील सर्वात मोठी कांदा बाजारपेठ)',
      en: 'Lasalgaon APMC (Asia\'s Biggest Onion Market)',
      mr: 'लासलगाव कृषी उत्पन्न बाजार समिती (कांदा मुख्य केंद्र)'
    },
    district: { hi: 'नाशिक', en: 'Nashik' },
    locationAddress: 'Station Road, Lasalgaon, Nashik, Maharashtra 422306',
    approxDistanceKm: 1250,
    currentWaitTimeMinutes: 20,
    vehiclesInQueue: 7,
    dailyCapacityQuintals: 8500,
    bookedQuintals: 6200,
    activeGates: 8,
    potatoProcurementPricePerQtl: 1480,
    cropPrices: {
      onion: 2480,
      potato: 1480,
      wheat: 2280,
      tomato: 1950
    },
    specialtyCrops: ['onion', 'tomato', 'potato'],
    isBestRecommended: true,
    recommendationReason: {
      hi: '⭐ प्याज का विश्व प्रसिद्ध केंद्र (₹2,480/क्विंटल) व कम्प्यूटरीकृत निविदा प्रणाली',
      en: '⭐ World famous Onion Capital (₹2,480/Qtl) with automated e-auction and quick slot pass'
    },
    contactHelpline: '02550-266023',
    officerInCharge: 'श्री बाळासाहेब पाटील (सभापती APMC)'
  },
  {
    id: 'mandi-vashi',
    state: { hi: 'महाराष्ट्र', en: 'Maharashtra', code: 'MH' },
    name: {
      hi: 'नवी मुंबई वाशी एपीएमसी आंतरराष्ट्रीय मार्केट',
      en: 'Navi Mumbai Vashi APMC Terminal Market',
      mr: 'वाशी कृषी उत्पन्न बाजार समिती नवी मुंबई'
    },
    district: { hi: 'ठाणे / नवी मुंबई', en: 'Navi Mumbai' },
    locationAddress: 'Sector 19, Vashi, Navi Mumbai, Maharashtra 400703',
    approxDistanceKm: 1380,
    currentWaitTimeMinutes: 35,
    vehiclesInQueue: 18,
    dailyCapacityQuintals: 15000,
    bookedQuintals: 11200,
    activeGates: 14,
    potatoProcurementPricePerQtl: 1560,
    cropPrices: {
      potato: 1560,
      onion: 2520,
      paddy: 2450,
      apple: 8200,
      pulses: 7300
    },
    specialtyCrops: ['potato', 'onion', 'pulses', 'apple'],
    isBestRecommended: true,
    recommendationReason: {
      hi: '⭐ मेट्रोपॉलिटन प्रीमियम भाव: आलू ₹1,560/क्विंटल व प्याज ₹2,520/क्विंटल',
      en: '⭐ Metropolitan Premium Rates: Potato ₹1,560/Qtl & Onion ₹2,520/Qtl'
    },
    contactHelpline: '022-27881000',
    officerInCharge: 'डॉ. संजय कदम (सचिव)'
  },

  // --- GUJARAT ---
  {
    id: 'mandi-unjha',
    state: { hi: 'गुजरात', en: 'Gujarat', code: 'GJ' },
    name: {
      hi: 'ऊँझा कृषि उपज मंडी (विश्व का सबसे बड़ा मसाला व जीरा हब)',
      en: 'Unjha APMC (World\'s Largest Cumin & Spice Market)',
      gu: 'ઊંઝા એપીએમસી માર્કેટ યાર્ડ (વિશ્વનું સૌથી મોટું જીરું કેન્દ્ર)'
    },
    district: { hi: 'मेहसाणा', en: 'Mehsana' },
    locationAddress: 'Market Yard, Unjha, Gujarat 384170',
    approxDistanceKm: 890,
    currentWaitTimeMinutes: 15,
    vehiclesInQueue: 4,
    dailyCapacityQuintals: 6000,
    bookedQuintals: 3800,
    activeGates: 8,
    potatoProcurementPricePerQtl: 1470,
    cropPrices: {
      spices: 24500, // Cumin/Jeera
      mustard: 5900,
      wheat: 2310,
      potato: 1470
    },
    specialtyCrops: ['spices', 'mustard', 'wheat'],
    isBestRecommended: true,
    recommendationReason: {
      hi: '⭐ वैश्विक मसाला केंद्र: जीरा (₹24,500) व सरसों (₹5,900) का रिकॉर्ड भाव, सुपरफास्ट ई-टोकन',
      en: '⭐ Global Spice Hub: Record Jeera (₹24,500) & Mustard (₹5,900) with fast electronic token entry'
    },
    contactHelpline: '02767-254201',
    officerInCharge: 'શ્રી દિનેશભાઈ પટેલ (સેક્રેટરી)'
  },

  // --- MADHYA PRADESH ---
  {
    id: 'mandi-neemuch',
    state: { hi: 'मध्य प्रदेश', en: 'Madhya Pradesh', code: 'MP' },
    name: {
      hi: 'नीमच कृषि उपज मंडी (मध्य भारत का प्रमुख तिलहन व गेहूं केंद्र)',
      en: 'Neemuch APMC (Central India Oilseed & Wheat Hub)'
    },
    district: { hi: 'नीमच', en: 'Neemuch' },
    locationAddress: 'Mandi Road, Neemuch, Madhya Pradesh 458441',
    approxDistanceKm: 760,
    currentWaitTimeMinutes: 18,
    vehiclesInQueue: 5,
    dailyCapacityQuintals: 5500,
    bookedQuintals: 3700,
    activeGates: 6,
    potatoProcurementPricePerQtl: 1450,
    cropPrices: {
      mustard: 5880,
      wheat: 2320,
      pulses: 7200,
      potato: 1450
    },
    specialtyCrops: ['mustard', 'wheat', 'pulses'],
    isBestRecommended: true,
    recommendationReason: {
      hi: '⭐ सरसों (₹5,880) और गेहूं (₹2,320) की उच्च सरकारी दर व जीरो लाइन वेटिंग',
      en: '⭐ High Mustard (₹5,880) & Wheat rates with rapid gate processing'
    },
    contactHelpline: '07423-220033',
    officerInCharge: 'श्री विक्रम सिंह तोमर'
  },
  {
    id: 'mandi-indore',
    state: { hi: 'मध्य प्रदेश', en: 'Madhya Pradesh', code: 'MP' },
    name: {
      hi: 'इंदौर चोइथराम कृषि उपज मंडी समिति',
      en: 'Indore Choithram APMC Mega Mandi'
    },
    district: { hi: 'इंदौर', en: 'Indore' },
    locationAddress: 'Choithram Hospital Square, Indore, MP 452014',
    approxDistanceKm: 850,
    currentWaitTimeMinutes: 25,
    vehiclesInQueue: 9,
    dailyCapacityQuintals: 7000,
    bookedQuintals: 5100,
    activeGates: 8,
    potatoProcurementPricePerQtl: 1515,
    cropPrices: {
      potato: 1515,
      wheat: 2305,
      onion: 2410,
      tomato: 1890
    },
    specialtyCrops: ['potato', 'wheat', 'onion'],
    contactHelpline: '0731-2480211',
    officerInCharge: 'श्री राजेश मंडलोई'
  },

  // --- HARYANA ---
  {
    id: 'mandi-karnal',
    state: { hi: 'हरियाणा', en: 'Haryana', code: 'HR' },
    name: {
      hi: 'करनाल नई अनाज मंडी (बासमती चावल का अंतरराष्ट्रीय हब)',
      en: 'Karnal New Grain Market (International Basmati Hub)',
      pa: 'ਕਰਨਾਲ ਨਵੀਂ ਅਨਾਜ ਮੰਡੀ (ਬਾਸਮਤੀ ਚਾਵਲ ਕੇਂਦਰ)'
    },
    district: { hi: 'करनाल', en: 'Karnal' },
    locationAddress: 'Sector 4, GT Road, Karnal, Haryana 132001',
    approxDistanceKm: 140,
    currentWaitTimeMinutes: 22,
    vehiclesInQueue: 6,
    dailyCapacityQuintals: 6500,
    bookedQuintals: 4600,
    activeGates: 8,
    potatoProcurementPricePerQtl: 1485,
    cropPrices: {
      paddy: 2420,
      wheat: 2315,
      potato: 1485,
      mustard: 5780
    },
    specialtyCrops: ['paddy', 'wheat', 'potato'],
    isBestRecommended: true,
    recommendationReason: {
      hi: '⭐ बासमती धान (₹2,420) का अंतरराष्ट्रीय हब, 48 घंटे में गारंटीड बैंक DBT',
      en: '⭐ Basmati Paddy (₹2,420) export hub with 48-hr guaranteed Direct Bank Transfer'
    },
    contactHelpline: '0184-2251034',
    officerInCharge: 'श्री धर्मवीर सिंह हुड्डा'
  },

  // --- RAJASTHAN ---
  {
    id: 'mandi-kota',
    state: { hi: 'राजस्थान', en: 'Rajasthan', code: 'RJ' },
    name: {
      hi: 'कोटा भामाशाह कृषि उपज मंडी (हाड़ौती प्रमुख केंद्र)',
      en: 'Kota Bhamashah APMC Grain Mandi'
    },
    district: { hi: 'कोटा', en: 'Kota' },
    locationAddress: 'Anantpura, Kota, Rajasthan 324005',
    approxDistanceKm: 610,
    currentWaitTimeMinutes: 20,
    vehiclesInQueue: 5,
    dailyCapacityQuintals: 5800,
    bookedQuintals: 3900,
    activeGates: 7,
    potatoProcurementPricePerQtl: 1450,
    cropPrices: {
      wheat: 2310,
      mustard: 5850,
      pulses: 7150,
      potato: 1450
    },
    specialtyCrops: ['wheat', 'mustard', 'pulses'],
    contactHelpline: '0744-2500122',
    officerInCharge: 'श्री महावीर प्रसाद मीणा'
  },

  // --- ANDHRA PRADESH / TELANGANA ---
  {
    id: 'mandi-guntur',
    state: { hi: 'आंध्र प्रदेश', en: 'Andhra Pradesh', code: 'AP' },
    name: {
      hi: 'गुंटूर मिर्ची यार्ड (एशिया का सबसे बड़ा मिर्च व मसाला बाजार)',
      en: 'Guntur Mirchi Yard (Asia\'s Premier Chilli & Spice Market)',
      te: 'గుంటూరు మిర్చి యార్డ్ మార్కెట్'
    },
    district: { hi: 'गुंटूर', en: 'Guntur' },
    locationAddress: 'Old Madras Road, Guntur, Andhra Pradesh 522001',
    approxDistanceKm: 1850,
    currentWaitTimeMinutes: 25,
    vehiclesInQueue: 11,
    dailyCapacityQuintals: 10000,
    bookedQuintals: 7400,
    activeGates: 10,
    potatoProcurementPricePerQtl: 1490,
    cropPrices: {
      spices: 18500, // Mirchi / Chilli
      paddy: 2380,
      pulses: 7400,
      potato: 1490
    },
    specialtyCrops: ['spices', 'paddy', 'pulses'],
    isBestRecommended: true,
    recommendationReason: {
      hi: '⭐ एशिया का सबसे बड़ा मिर्च मार्केट, ई-नाम (e-NAM) डिजिटल नीलामी और तुरंत पेमेंट',
      en: '⭐ Asia\'s Largest Chilli & Spice Market with e-NAM digital fast clearance'
    },
    contactHelpline: '0863-2224500',
    officerInCharge: 'శ్రీ కె. శ్రీనివాస రావు (Secretary)'
  },

  // --- KARNATAKA ---
  {
    id: 'mandi-yeshwanthpur',
    state: { hi: 'कर्नाटक', en: 'Karnataka', code: 'KA' },
    name: {
      hi: 'यशवंतपुर एपीएमसी मंडी (दक्षिण भारत का मुख्य केंद्र)',
      en: 'Yeshwanthpur APMC Mega Yard Bengaluru',
      kn: 'ಯಶವಂತಪುರ ಎಪಿಎಂಸಿ ಕೃಷಿ ಮಾರುಕಟ್ಟೆ ಬೆಂಗಳೂರು'
    },
    district: { hi: 'बेंगलुरु', en: 'Bengaluru' },
    locationAddress: 'APMC Yard, Yeshwanthpur, Bengaluru, Karnataka 560022',
    approxDistanceKm: 2100,
    currentWaitTimeMinutes: 30,
    vehiclesInQueue: 14,
    dailyCapacityQuintals: 9000,
    bookedQuintals: 6800,
    activeGates: 10,
    potatoProcurementPricePerQtl: 1550,
    cropPrices: {
      potato: 1550,
      onion: 2490,
      tomato: 2050,
      paddy: 2390
    },
    specialtyCrops: ['potato', 'onion', 'tomato'],
    isBestRecommended: true,
    recommendationReason: {
      hi: '⭐ दक्षिण भारत में आलू (₹1,550) व प्याज का सबसे बड़ा टर्मिनल मार्केट',
      en: '⭐ Premier South India Terminal Market for Potato (₹1,550) & Onion'
    },
    contactHelpline: '080-23371900',
    officerInCharge: 'ಶ್ರೀ ಎಂ. ಶಿವಕುಮಾರ್'
  },

  // --- HIMACHAL PRADESH ---
  {
    id: 'mandi-solan',
    state: { hi: 'हिमाचल प्रदेश', en: 'Himachal Pradesh', code: 'HP' },
    name: {
      hi: 'सोलन सब्जी व फल मंडी (लाल सोने का शहर - टमाटर व सेब हब)',
      en: 'Solan APMC (City of Red Gold - Tomato & Apple Hub)'
    },
    district: { hi: 'सोलन', en: 'Solan' },
    locationAddress: 'Bypass Road, Solan, Himachal Pradesh 173212',
    approxDistanceKm: 180,
    currentWaitTimeMinutes: 15,
    vehiclesInQueue: 3,
    dailyCapacityQuintals: 2500,
    bookedQuintals: 1450,
    activeGates: 4,
    potatoProcurementPricePerQtl: 1500,
    cropPrices: {
      tomato: 2250,
      apple: 8500,
      potato: 1500
    },
    specialtyCrops: ['tomato', 'apple', 'potato'],
    isBestRecommended: true,
    recommendationReason: {
      hi: '⭐ टमाटर (₹2,250) और पहाड़ी आलू (₹1,500) का प्रीमियम मार्केट, मात्र 15 मिनट वेटिंग',
      en: '⭐ Premium mountain Tomato (₹2,250) & Potato (₹1,500) hub with 15-min wait time'
    },
    contactHelpline: '01792-223841',
    officerInCharge: 'श्री कुलदीप ठाकुर'
  },

  // --- WEST BENGAL ---
  {
    id: 'mandi-siliguri',
    state: { hi: 'पश्चिम बंगाल', en: 'West Bengal', code: 'WB' },
    name: {
      hi: 'सिलीगुड़ी रेगुलेटेड मार्केट (पूर्वोत्तर भारत का मुख्य प्रवेश द्वार)',
      en: 'Siliguri Regulated Market (Gateway to North-East)',
      bn: 'শিলিগুড়ি নিয়ন্ত্রিত বাজার (উত্তর-পূর্ব ভারতের প্রবেশদ্বার)'
    },
    district: { hi: 'दार्जिलिंग / जलपाईगुड़ी', en: 'Darjeeling' },
    locationAddress: 'Sevoke Road, Siliguri, West Bengal 734001',
    approxDistanceKm: 980,
    currentWaitTimeMinutes: 28,
    vehiclesInQueue: 7,
    dailyCapacityQuintals: 4200,
    bookedQuintals: 2900,
    activeGates: 5,
    potatoProcurementPricePerQtl: 1475,
    cropPrices: {
      paddy: 2360,
      potato: 1475,
      tomato: 1900
    },
    specialtyCrops: ['paddy', 'potato', 'tomato'],
    contactHelpline: '0353-2541098',
    officerInCharge: 'শ্রী দেবাশীষ রায়'
  },

  // --- BIHAR ---
  {
    id: 'mandi-gulabbagh',
    state: { hi: 'बिहार', en: 'Bihar', code: 'BR' },
    name: {
      hi: 'गुलाबबाग कृषि उत्पादन मंडी (पूर्वी भारत का मक्का व आलू केंद्र)',
      en: 'Gulabbagh Mandi (East India Maize & Potato Centre)'
    },
    district: { hi: 'पूर्णिया', en: 'Purnia' },
    locationAddress: 'NH-31, Gulabbagh, Purnia, Bihar 854326',
    approxDistanceKm: 850,
    currentWaitTimeMinutes: 20,
    vehiclesInQueue: 5,
    dailyCapacityQuintals: 4800,
    bookedQuintals: 3100,
    activeGates: 6,
    potatoProcurementPricePerQtl: 1460,
    cropPrices: {
      paddy: 2340,
      wheat: 2280,
      potato: 1460
    },
    specialtyCrops: ['paddy', 'wheat', 'potato'],
    contactHelpline: '06454-242100',
    officerInCharge: 'श्री सुनील कुमार सिंह'
  }
];

// Provide UTTARAKHAND_MANDIS filtered view for backwards compatibility
export const UTTARAKHAND_MANDIS = ALL_INDIA_MANDIS.filter(
  m => m.state.code === 'UK'
);
