import React, { useState, useEffect } from 'react';
import { 
  Language, 
  UserRole, 
  FarmerProfile, 
  OfficerProfile, 
  SlotBooking, 
  SMSAlert, 
  QueueStage 
} from './types';
import { UTTARAKHAND_MANDIS } from './data/uttarakhandMandis';
import { 
  INITIAL_FARMERS, 
  INITIAL_OFFICERS, 
  INITIAL_BOOKINGS, 
  INITIAL_SMS_ALERTS 
} from './data/mockData';
import { TRANSLATIONS } from './i18n/translations';

// Components
import { Navbar } from './components/Navbar';
import { MandiExplorer } from './components/MandiExplorer';
import { FarmerPortal } from './components/FarmerPortal';
import { OfficerPortal } from './components/OfficerPortal';
import { AadhaarQuickLookup } from './components/AadhaarQuickLookup';
import { IVRModal } from './components/IVRModal';
import { SMSNotificationCenter } from './components/SMSNotificationCenter';
import { TokenPassModal } from './components/TokenPassModal';

export default function App() {
  // Localization & Mode State
  const [currentLang, setCurrentLang] = useState<Language>(() => {
    return (localStorage.getItem('kisanq_lang') as Language) || 'hi';
  });

  const [activeRole, setActiveRole] = useState<UserRole>('farmer');
  const [activeTab, setActiveTab] = useState<string>('mandis');
  const [lowDataMode, setLowDataMode] = useState<boolean>(() => {
    return localStorage.getItem('kisanq_low_data') === 'true';
  });

  // User Accounts State
  const [farmers, setFarmers] = useState<FarmerProfile[]>(() => {
    const saved = localStorage.getItem('kisanq_farmers');
    return saved ? JSON.parse(saved) : INITIAL_FARMERS;
  });

  const [currentFarmer, setCurrentFarmer] = useState<FarmerProfile | null>(() => {
    const saved = localStorage.getItem('kisanq_current_farmer');
    return saved ? JSON.parse(saved) : INITIAL_FARMERS[0];
  });

  const [officers, setOfficers] = useState<OfficerProfile[]>(() => {
    const saved = localStorage.getItem('kisanq_officers');
    return saved ? JSON.parse(saved) : INITIAL_OFFICERS;
  });

  const [currentOfficer, setCurrentOfficer] = useState<OfficerProfile | null>(() => {
    const saved = localStorage.getItem('kisanq_current_officer');
    return saved ? JSON.parse(saved) : null;
  });

  // Mandis & Bookings State
  const [mandis, setMandis] = useState(UTTARAKHAND_MANDIS);
  const [bookings, setBookings] = useState<SlotBooking[]>(() => {
    const saved = localStorage.getItem('kisanq_bookings');
    return saved ? JSON.parse(saved) : INITIAL_BOOKINGS;
  });

  const [smsList, setSmsList] = useState<SMSAlert[]>(() => {
    const saved = localStorage.getItem('kisanq_sms');
    return saved ? JSON.parse(saved) : INITIAL_SMS_ALERTS;
  });

  // Modals & Navigation Helpers
  const [isIVROpen, setIsIVROpen] = useState(false);
  const [isSMSOpen, setIsSMSOpen] = useState(false);
  const [selectedBookingForPass, setSelectedBookingForPass] = useState<SlotBooking | null>(null);
  const [preselectedMandiId, setPreselectedMandiId] = useState<string>('mandi-haldwani');

  // Persistence Effects
  useEffect(() => {
    localStorage.setItem('kisanq_lang', currentLang);
  }, [currentLang]);

  useEffect(() => {
    localStorage.setItem('kisanq_low_data', lowDataMode.toString());
    if (lowDataMode) {
      document.body.classList.add('low-data-mode');
    } else {
      document.body.classList.remove('low-data-mode');
    }
  }, [lowDataMode]);

  useEffect(() => {
    localStorage.setItem('kisanq_farmers', JSON.stringify(farmers));
  }, [farmers]);

  useEffect(() => {
    if (currentFarmer) {
      localStorage.setItem('kisanq_current_farmer', JSON.stringify(currentFarmer));
    } else {
      localStorage.removeItem('kisanq_current_farmer');
    }
  }, [currentFarmer]);

  useEffect(() => {
    localStorage.setItem('kisanq_officers', JSON.stringify(officers));
  }, [officers]);

  useEffect(() => {
    if (currentOfficer) {
      localStorage.setItem('kisanq_current_officer', JSON.stringify(currentOfficer));
    } else {
      localStorage.removeItem('kisanq_current_officer');
    }
  }, [currentOfficer]);

  useEffect(() => {
    localStorage.setItem('kisanq_bookings', JSON.stringify(bookings));
  }, [bookings]);

  useEffect(() => {
    localStorage.setItem('kisanq_sms', JSON.stringify(smsList));
  }, [smsList]);

  // Actions
  const handleSelectMandiForBooking = (mandiId: string) => {
    setPreselectedMandiId(mandiId);
    setActiveRole('farmer');
    setActiveTab('farmer');
  };

  const handleCallMandiHelpline = (_phone: string, _mandiName: string) => {
    setIsIVROpen(true);
  };

  const handleBookSlot = (newBookingData: Omit<SlotBooking, 'id' | 'tokenNumber' | 'createdAt' | 'currentStage' | 'queuePosition' | 'approxWaitTimeMinutes'>) => {
    const randomTokenSuffix = Math.floor(1000 + Math.random() * 9000);
    const tokenNumber = `KQ-UK-${randomTokenSuffix}`;

    const newBooking: SlotBooking = {
      ...newBookingData,
      id: `booking-${Date.now()}`,
      tokenNumber,
      currentStage: 'slot_booked',
      queuePosition: Math.floor(2 + Math.random() * 4),
      approxWaitTimeMinutes: 20,
      createdAt: new Date().toISOString()
    };

    setBookings(prev => [newBooking, ...prev]);

    // Dispatch instant SMS confirmation
    const newSMS: SMSAlert = {
      id: `sms-${Date.now()}`,
      recipientMobile: newBooking.farmerMobile,
      tokenNumber: newBooking.tokenNumber,
      messageText: {
        hi: `किसानक्यू: प्रिय ${newBooking.farmerName}, आपका टोकन #${newBooking.tokenNumber} ${newBooking.mandiName} के लिए कन्फर्म हुआ। स्लॉट: ${newBooking.scheduledDate} (${newBooking.timeSlot})। गेट: ${newBooking.assignedGate}।`,
        en: `KisanQ: Dear ${newBooking.farmerName}, token #${newBooking.tokenNumber} confirmed for ${newBooking.mandiName}. Slot: ${newBooking.scheduledDate} (${newBooking.timeSlot}) at ${newBooking.assignedGate}.`,
        gar: `किसानक्यू: प्रिय ${newBooking.farmerName}, तुमरो टोकन #${newBooking.tokenNumber} ${newBooking.mandiName} खातिर पक्का ह्वेगे। स्लॉट: ${newBooking.scheduledDate}। गेट: ${newBooking.assignedGate}।`
      },
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      status: 'delivered',
      category: 'booking'
    };

    setSmsList(prev => [newSMS, ...prev]);
    setSelectedBookingForPass(newBooking);
  };

  const handleUpdateBookingStage = (
    bookingId: string, 
    nextStage: QueueStage, 
    extraData?: {
      actualWeight?: number;
      qualityGrade?: 'A' | 'B' | 'C';
      totalPayable?: number;
      delayMinutes?: number;
    }
  ) => {
    setBookings(prev => prev.map(b => {
      if (b.id !== bookingId) return b;

      const updated: SlotBooking = {
        ...b,
        currentStage: nextStage,
        actualWeightQuintals: extraData?.actualWeight ?? b.actualWeightQuintals,
        qualityGrade: extraData?.qualityGrade ?? b.qualityGrade,
        totalPayableAmount: extraData?.totalPayable ?? b.totalPayableAmount,
        delayMinutes: extraData?.delayMinutes ?? b.delayMinutes,
        paymentRefNumber: nextStage === 'payment_settled' ? `DBT-GOI-UK-${Date.now().toString().slice(-6)}` : b.paymentRefNumber,
        paymentSettledAt: nextStage === 'payment_settled' ? new Date().toISOString() : b.paymentSettledAt,
        queuePosition: nextStage === 'payment_settled' ? 0 : Math.max(0, b.queuePosition - 1),
        approxWaitTimeMinutes: nextStage === 'payment_settled' ? 0 : Math.max(0, b.approxWaitTimeMinutes - 10)
      };

      // Auto-trigger corresponding SMS alert for the farmer
      let smsContent = { hi: '', en: '', gar: '' };
      if (nextStage === 'gate_arrived') {
        smsContent = {
          hi: `किसानक्यू अलर्ट: आपका वाहन मंडी गेट पर पहुंच चुका है। टोकन #${updated.tokenNumber} - कृपया धर्मकांटा लेन 2 पर आगे बढ़ें।`,
          en: `KisanQ Alert: Vehicle arrived at gate for token #${updated.tokenNumber}. Please proceed to Weighbridge Bay 2.`,
          gar: `किसानक्यू: तुमरी गाड़ी गेट पर पूंचगे। टोकन #${updated.tokenNumber} - तौल कांटा लेन 2 पर जावा।`
        };
      } else if (nextStage === 'weighing_quality') {
        smsContent = {
          hi: `किसानक्यू तौल पर्ची: टोकन #${updated.tokenNumber} का तौल ${updated.actualWeightQuintals} क्विंटल (Grade ${updated.qualityGrade}) दर्ज किया गया। कुल देय राशि: ₹${updated.totalPayableAmount?.toLocaleString()}।`,
          en: `KisanQ Weighing Slip: Token #${updated.tokenNumber} weight verified as ${updated.actualWeightQuintals} Qtl (Grade ${updated.qualityGrade}). Total Payable: ₹${updated.totalPayableAmount?.toLocaleString()}.`,
          gar: `किसानक्यू तौल रसीद: टोकन #${updated.tokenNumber} को वजन ${updated.actualWeightQuintals} क्विंटल दर्ज ह्वेगे। रुपया: ₹${updated.totalPayableAmount?.toLocaleString()}।`
        };
      } else if (nextStage === 'procurement_approved') {
        smsContent = {
          hi: `किसानक्यू खरीद स्वीकृति: टोकन #${updated.tokenNumber} की खरीद DoCA अधिकारी द्वारा स्वीकृत कर ली गई है। DBT भुगतान प्रक्रियाधीन है।`,
          en: `KisanQ Approval: Procurement approved by Mandi Officer for token #${updated.tokenNumber}. DBT payment being processed.`,
          gar: `किसानक्यू: खरीद मंजूर ह्वेगे। बैंक मा पैसा भेजण की तैयारी छ।`
        };
      } else if (nextStage === 'payment_settled') {
        smsContent = {
          hi: `किसानक्यू DBT बैंक क्रेडिट: बधाई हो! ₹${updated.totalPayableAmount?.toLocaleString()} आपके आधार-लिंक खाते में जमा कर दिए गए हैं। Ref: ${updated.paymentRefNumber}।`,
          en: `KisanQ DBT Credit: Congrats! ₹${updated.totalPayableAmount?.toLocaleString()} credited to your Aadhaar-linked Bank A/C. Ref: ${updated.paymentRefNumber}.`,
          gar: `किसानक्यू DBT: बधाई! तुमरा बैंक खाता मा ₹${updated.totalPayableAmount?.toLocaleString()} जमा ह्वेगे। Ref: ${updated.paymentRefNumber}।`
        };
      }

      if (smsContent.hi) {
        const stageSMS: SMSAlert = {
          id: `sms-${Date.now()}`,
          recipientMobile: updated.farmerMobile,
          tokenNumber: updated.tokenNumber,
          messageText: smsContent,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          status: 'delivered',
          category: nextStage === 'payment_settled' ? 'payment' : 'queue_turn'
        };
        setSmsList(prevSMS => [stageSMS, ...prevSMS]);
      }

      return updated;
    }));
  };

  const handleBroadcastSMS = (messageText: string) => {
    const broadcastSMS: SMSAlert = {
      id: `sms-bcast-${Date.now()}`,
      recipientMobile: 'सभी पंजीकृत किसान (All Farmers)',
      tokenNumber: 'BROADCAST',
      messageText: {
        hi: `मंडी सूचना: ${messageText}`,
        en: `Mandi Notification: ${messageText}`,
        gar: `मंडी सूचना: ${messageText}`
      },
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      status: 'delivered',
      category: 'rebalance'
    };
    setSmsList(prev => [broadcastSMS, ...prev]);
  };

  const handleTriggerTestSMS = (type: 'booking' | 'queue' | 'payment') => {
    let msg = { hi: '', en: '', gar: '' };
    if (type === 'booking') {
      msg = {
        hi: 'किसानक्यू: आपका आलू खरीद स्लॉट 15 सितम्बर सुबह 10:00 AM देहरादून मंडी हेतु सुरक्षित है। टोकन #KQ-UK-9041।',
        en: 'KisanQ: Your potato procurement slot for 15 Sep 10:00 AM at Dehradun Mandi is confirmed. Token #KQ-UK-9041.',
        gar: 'किसानक्यू: तुमरो आलू स्लॉट 15 सितम्बर 10:00 AM देहरादून मंडी खातिर पक्का छ। टोकन #KQ-UK-9041।'
      };
    } else if (type === 'queue') {
      msg = {
        hi: 'किसानक्यू कतार अलर्ट: मंडी गेट 2 पर आपकी बारी आने वाली है (केवल 1 गाड़ी आगे है)। कृपया वजन कांटे पर पहुंचे।',
        en: 'KisanQ Queue Alert: Your turn approaching at Gate 2 (only 1 vehicle ahead). Please move towards weighbridge.',
        gar: 'किसानक्यू: गेट 2 पर तुमरी बारी औण वाली छ। कांटा पर आवा।'
      };
    } else {
      msg = {
        hi: 'किसानक्यू DBT क्रेडिट: ₹68,500 की राशि आपके बैंक खाते (A/C ending 4891) में सफलतापूर्वक जमा कर दी गई है।',
        en: 'KisanQ DBT Alert: ₹68,500 credited successfully to your Aadhaar-linked bank account (A/C ending 4891).',
        gar: 'किसानक्यू: ₹68,500 तुमरा बैंक खाता मा जमा ह्वेगे।'
      };
    }

    const testItem: SMSAlert = {
      id: `sms-test-${Date.now()}`,
      recipientMobile: currentFarmer ? currentFarmer.mobileNumber : '9876543210',
      tokenNumber: 'KQ-UK-DEMO',
      messageText: msg,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      status: 'delivered',
      category: type === 'payment' ? 'payment' : type === 'queue' ? 'queue_turn' : 'booking'
    };
    setSmsList(prev => [testItem, ...prev]);
  };

  const activeFarmerBooking = currentFarmer 
    ? bookings.find(b => b.farmerAadhaar === currentFarmer.aadhaarNumber && b.currentStage !== 'payment_settled') || bookings.find(b => b.farmerAadhaar === currentFarmer.aadhaarNumber)
    : undefined;

  const t = TRANSLATIONS[currentLang];

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col selection:bg-emerald-100 selection:text-emerald-900">
      
      {/* Top Navigation */}
      <Navbar
        currentLang={currentLang}
        onLanguageChange={setCurrentLang}
        activeRole={activeRole}
        onRoleChange={(role) => {
          setActiveRole(role);
          setActiveTab(role === 'farmer' ? 'farmer' : 'officer');
        }}
        lowDataMode={lowDataMode}
        onToggleLowData={() => setLowDataMode(!lowDataMode)}
        currentFarmer={currentFarmer}
        currentOfficer={currentOfficer}
        onFarmerLogout={() => {
          setCurrentFarmer(null);
          setActiveTab('farmer');
        }}
        onOfficerLogout={() => {
          setCurrentOfficer(null);
          setActiveTab('officer');
        }}
        activeTab={activeTab}
        onTabChange={setActiveTab}
        onOpenIVR={() => setIsIVROpen(true)}
        onOpenSMS={() => setIsSMSOpen(true)}
        unreadSMSCount={smsList.length}
      />

      {/* Main View Area */}
      <main className="flex-1">
        {/* Mandi Explorer View */}
        {activeTab === 'mandis' && (
          <MandiExplorer
            mandis={mandis}
            currentLang={currentLang}
            onSelectMandiForBooking={handleSelectMandiForBooking}
            onCallMandiHelpline={handleCallMandiHelpline}
          />
        )}

        {/* Farmer Portal View (Registration, Profile Info, Potato Booking, 5-Stage Tracker) */}
        {activeTab === 'farmer' && (
          <FarmerPortal
            currentLang={currentLang}
            currentFarmer={currentFarmer}
            onFarmerLogin={(farmer) => {
              setCurrentFarmer(farmer);
              if (!farmers.some(f => f.aadhaarNumber === farmer.aadhaarNumber)) {
                setFarmers(prev => [...prev, farmer]);
              }
            }}
            onFarmerRegister={(farmer) => {
              setFarmers(prev => [...prev, farmer]);
              setCurrentFarmer(farmer);
            }}
            onFarmerLogout={() => setCurrentFarmer(null)}
            mandis={mandis}
            farmerBookings={currentFarmer ? bookings.filter(b => b.farmerAadhaar === currentFarmer.aadhaarNumber) : []}
            onBookSlot={handleBookSlot}
            preselectedMandiId={preselectedMandiId}
            onSelectBookingForPass={setSelectedBookingForPass}
            onOpenIVR={() => setIsIVROpen(true)}
          />
        )}

        {/* Mandi Officer Portal View (Dedicated Officer Registration, Live Queue caller, Weighing, DBT) */}
        {activeTab === 'officer' && (
          <OfficerPortal
            currentLang={currentLang}
            currentOfficer={currentOfficer}
            onOfficerLogin={(officer) => {
              setCurrentOfficer(officer);
              if (!officers.some(o => o.employeeId === officer.employeeId)) {
                setOfficers(prev => [...prev, officer]);
              }
            }}
            onOfficerRegister={(officer) => {
              setOfficers(prev => [...prev, officer]);
              setCurrentOfficer(officer);
            }}
            onOfficerLogout={() => setCurrentOfficer(null)}
            mandis={mandis}
            allBookings={bookings}
            onUpdateBookingStage={handleUpdateBookingStage}
            onBroadcastSMS={handleBroadcastSMS}
          />
        )}

        {/* Aadhaar Quick Search View */}
        {activeTab === 'aadhaar-search' && (
          <AadhaarQuickLookup
            currentLang={currentLang}
            farmers={farmers}
            bookings={bookings}
            onSelectBooking={setSelectedBookingForPass}
            onLoginAsFarmer={(farmer) => {
              setCurrentFarmer(farmer);
              setActiveRole('farmer');
              setActiveTab('farmer');
            }}
          />
        )}
      </main>

      {/* Floating Low-Connectivity Fast Dial / IVR bar on mobile */}
      <div className="fixed bottom-4 right-4 z-30 flex items-center gap-2 no-print">
        <button
          onClick={() => setIsIVROpen(true)}
          className="flex items-center gap-2 bg-amber-500 hover:bg-amber-600 text-slate-950 font-black px-4 py-3 rounded-full shadow-lg shadow-amber-500/30 transition-all transform active:scale-95"
        >
          <span className="w-2.5 h-2.5 rounded-full bg-slate-950 animate-ping"></span>
          <span className="text-xs sm:text-sm">IVR: 1800-180-1551</span>
        </button>
      </div>

      {/* Footer */}
      <footer className="bg-slate-900 text-slate-400 py-8 px-4 border-t border-slate-800 text-xs no-print">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            <p className="font-bold text-slate-200">
              {currentLang === 'en' ? 'KisanQ — Smart Slot Booking & Queue Platform' : 'किसान क्यू (KisanQ) — स्मार्ट स्लॉट बुकिंग एवं लाइव मंडी कतार'}
            </p>
            <p className="text-slate-400 text-[11px] mt-0.5">
              Ministry of Consumer Affairs, Food & Public Distribution | Department of Consumer Affairs (DoCA)
            </p>
            <p className="text-slate-500 text-[10px] mt-0.5">
              Smart India Hackathon 2026 • Problem Statement ID 26032 • Uttarakhand APMC Mandi Board
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-4 text-slate-400 text-[11px]">
            <span>टोल-फ्री: 1800-180-1551</span>
            <span>•</span>
            <span>2G/3G लो-डाटा ऑप्टिमाइज़्ड</span>
            <span>•</span>
            <span>e-NAM & DBT सक्षम</span>
          </div>
        </div>
      </footer>

      {/* IVR Interactive Modal */}
      <IVRModal
        isOpen={isIVROpen}
        onClose={() => setIsIVROpen(false)}
        currentLang={currentLang}
        activeBooking={activeFarmerBooking}
        mandis={mandis}
      />

      {/* Multilingual SMS Alerts Center Modal */}
      <SMSNotificationCenter
        isOpen={isSMSOpen}
        onClose={() => setIsSMSOpen(false)}
        currentLang={currentLang}
        smsList={smsList}
        onTriggerTestSMS={handleTriggerTestSMS}
      />

      {/* Printable Digital Token Pass Modal */}
      <TokenPassModal
        booking={selectedBookingForPass}
        onClose={() => setSelectedBookingForPass(null)}
        currentLang={currentLang}
      />
    </div>
  );
}
