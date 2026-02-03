// Patient Types
export interface Patient {
  id: string;
  aNumber: string; // ICE A-Number (e.g., A# 098-765-432)
  firstName: string;
  lastName: string;
  dateOfBirth: string;
  gender: 'M' | 'F' | 'Other';
  photo?: string;

  // Detention-specific fields
  housingUnit: string;
  bedAssignment: string;
  custodyLevel: 'Minimum' | 'Low' | 'Medium' | 'High' | 'Maximum';
  facilityName: string;
  admissionDate: string;

  // Medical info
  allergies: string[];
  activeProblems: string[];
  medications: Medication[];

  // Status
  medicalHold: boolean;
  transferClearance: boolean;
}

export interface Medication {
  id: string;
  name: string;
  dosage: string;
  frequency: string;
  route: string;
  startDate: string;
  endDate?: string;
  prescriber: string;
  isControlled: boolean;
  kop: boolean; // Keep on Person
  dot: boolean; // Direct Observed Therapy
}

// Facility Types
export interface Facility {
  id: string;
  name: string;
  type: 'IPC' | 'SPC' | 'IGSA' | 'CDF';
  address: string;
  city: string;
  state: string;
  census: number;
  capacity: number;
}

// User/Provider Types
export interface User {
  id: string;
  firstName: string;
  lastName: string;
  role: 'Physician' | 'Nurse' | 'Pharmacist' | 'Admin' | 'MedicalOfficer';
  title: string;
  facility: string;
  npi?: string;
  deaNumber?: string;
}

// Order Types
export interface Order {
  id: string;
  patientId: string;
  type: 'Medication' | 'Lab' | 'Imaging' | 'Referral' | 'Procedure';
  status: 'Pending' | 'Active' | 'Completed' | 'Cancelled' | 'On Hold';
  priority: 'Routine' | 'Urgent' | 'STAT';
  orderedBy: string;
  orderedDate: string;
  details: string;
}

// Referral Types
export interface Referral {
  id: string;
  patientId: string;
  specialty: string;
  urgencyLevel: 'Routine' | 'Urgent' | 'Emergent';
  clinicalIndication: string;
  status: 'Pending' | 'Approved' | 'Scheduled' | 'Completed' | 'Denied';
  requestDate: string;
  provider?: string;
  scheduledDate?: string;
  transportRequired: boolean;
  escortRequired: boolean;
  telemedicineEligible: boolean;
}

// MAR Types
export interface MAREntry {
  id: string;
  patientId: string;
  medicationId: string;
  scheduledTime: string;
  administeredTime?: string;
  status: 'Scheduled' | 'Given' | 'Refused' | 'Held' | 'Not Given';
  administeredBy?: string;
  witnessedBy?: string;
  refusalReason?: string;
  notes?: string;
}

// Claims Types
export interface Claim {
  id: string;
  patientId: string;
  providerId: string;
  serviceDate: string;
  cptCodes: string[];
  icdCodes: string[];
  totalAmount: number;
  status: 'Draft' | 'Submitted' | 'In Review' | 'Approved' | 'Denied' | 'Paid';
  submissionDate?: string;
  paidDate?: string;
  paidAmount?: number;
}

// Support Ticket Types
export interface SupportTicket {
  id: string;
  title: string;
  description: string;
  priority: 'Low' | 'Medium' | 'High' | 'Critical';
  status: 'Open' | 'In Progress' | 'Resolved' | 'Closed';
  category: string;
  createdBy: string;
  createdDate: string;
  assignedTo?: string;
  tier: 'I' | 'II' | 'III';
  slaDeadline: string;
}

// Training/LMS Types
export interface TrainingCourse {
  id: string;
  title: string;
  module: string;
  role: string[];
  duration: number; // in minutes
  status: 'Not Started' | 'In Progress' | 'Completed';
  completionDate?: string;
  certificationRequired: boolean;
  dueDate?: string;
}

// AI Features Types
export interface AIScreeningResult {
  id: string;
  patientId: string;
  type: 'TB' | 'MentalHealth' | 'Deterioration';
  confidence: number;
  recommendation: string;
  flagged: boolean;
  reviewedBy?: string;
  reviewedDate?: string;
}

// Module Status for Integration Dashboard
export interface ModuleStatus {
  name: string;
  status: 'Online' | 'Offline' | 'Degraded';
  lastUpdated: string;
  version: string;
}

// Activity Feed Item
export interface ActivityItem {
  id: string;
  type: 'Clinical' | 'Admin' | 'System';
  action: string;
  user: string;
  timestamp: string;
  details?: string;
}

// Navigation Types
export type ModuleType =
  | 'EHR'
  | 'Pharmacy'
  | 'MAR'
  | 'Dental'
  | 'Referrals'
  | 'Utilization'
  | 'Claims'
  | 'Payment'
  | 'Dashboard'
  | 'Facilities'
  | 'Support'
  | 'Training';
