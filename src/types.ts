export type Language = 'hi' | 'en' | 'gar' | 'kum' | 'pa' | 'ne';

export type UserRole = 'farmer' | 'officer';

export type CropType = 
  | 'potato' 
  | 'wheat' 
  | 'paddy' 
  | 'tomato' 
  | 'mustard' 
  | 'apple' 
  | 'pulses';

export type QueueStage = 
  | 'slot_booked'
  | 'gate_arrived'
  | 'weighing_quality'
  | 'procurement_approved'
  | 'payment_settled';

export interface UttarakhandMandi {
  id: string;
  name: {
    hi: string;
    en: string;
    gar: string;
    kum?: string;
    pa?: string;
    ne?: string;
    [key: string]: string | undefined;
  };
  district: {
    hi: string;
    en: string;
    [key: string]: string | undefined;
  };
  locationAddress: string;
  approxDistanceKm: number;
  currentWaitTimeMinutes: number;
  vehiclesInQueue: number;
  dailyCapacityQuintals: number;
  bookedQuintals: number;
  activeGates: number;
  potatoProcurementPricePerQtl: number;
  isBestRecommended?: boolean;
  recommendationReason?: {
    hi: string;
    en: string;
    gar: string;
    kum?: string;
    pa?: string;
    ne?: string;
    [key: string]: string | undefined;
  };
  contactHelpline: string;
  officerInCharge: string;
}

export interface FarmerProfile {
  id: string;
  aadhaarNumber: string; // 12 digits formatted
  name: string;
  mobileNumber: string;
  district: string;
  village: string;
  landSizeAcres: number;
  primaryCrop: CropType;
  bankAccountLast4: string;
  ifscCode: string;
  kisanCreditCardNo?: string;
  registeredAt: string;
  isAadhaarVerified: boolean;
}

export interface OfficerProfile {
  id: string;
  employeeId: string;
  name: string;
  designation: string;
  assignedMandiId: string;
  mobileNumber: string;
  department: string;
}

export interface SlotBooking {
  id: string;
  tokenNumber: string; // e.g. "KQ-UK-8492"
  farmerAadhaar: string;
  farmerName: string;
  farmerMobile: string;
  mandiId: string;
  mandiName: string;
  crop: CropType;
  variety?: string;
  quantityQuintals: number;
  vehicleType: 'tractor' | 'pickup' | 'truck' | 'cart';
  vehiclePlateNumber: string;
  scheduledDate: string;
  timeSlot: string; // e.g. "09:00 AM - 11:00 AM"
  estimatedArrivalWindow: string; // e.g. "09:15 AM - 09:45 AM"
  assignedGate: string; // e.g. "Gate No. 2"
  currentStage: QueueStage;
  queuePosition: number;
  approxWaitTimeMinutes: number;
  createdAt: string;
  // Inspection & payment data
  actualWeightQuintals?: number;
  qualityGrade?: 'A' | 'B' | 'C';
  totalPayableAmount?: number;
  paymentRefNumber?: string;
  paymentSettledAt?: string;
  // Rebalancing info
  delayMinutes?: number;
  rebalancedNotice?: string;
}

export interface SMSAlert {
  id: string;
  recipientMobile: string;
  tokenNumber: string;
  messageText: {
    hi: string;
    en: string;
    gar: string;
    kum?: string;
    pa?: string;
    ne?: string;
    [key: string]: string | undefined;
  };
  timestamp: string;
  status: 'delivered' | 'sent';
  category: 'booking' | 'queue_turn' | 'weighing' | 'payment' | 'rebalance';
}
