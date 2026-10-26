import heroMedicalCenter from '../assets/images/hero_medical_center_1792925315093.jpg';
import medicalFacilityExterior from '../assets/images/medical_facility_exterior_1792925315899.jpg';
import medicalTeamSpecialists from '../assets/images/medical_team_specialists_1792925316495.jpg';
import quickCareDoctor from '../assets/images/quick_care_doctor_1792925316267.jpg';

export interface Facility {
  id: string;
  name: string;
  type: 'General Hospital' | 'Trauma Center' | 'Urgent Care' | 'Diagnostic Center' | 'Pharmacy';
  address: string;
  city: string;
  phone: string;
  emergencyOpen: boolean;
  traumaLevel?: string;
  waitMinutes: number;
  openHours: string;
  bedOccupancy: string;
  specialties: string[];
  equipment: string[];
  rating: number;
  reviewCount: number;
  image: string;
}

export interface HelplineItem {
  id: string;
  name: string;
  number: string;
  category: 'Emergency' | 'Mental Health' | 'Poison & Toxic' | 'Pediatrics' | 'Senior' | 'Tele-Triage';
  availability: string;
  avgResponseSeconds: number;
  description: string;
  priority: 'CRITICAL' | 'HIGH' | 'ROUTINE';
}

export interface Doctor {
  id: string;
  name: string;
  role: string;
  specialty: string;
  credentials: string;
  experienceYears: number;
  hospital: string;
  availableToday: boolean;
  rating: number;
  consultationFee: string;
}

export interface UrgentCareClinic {
  id: string;
  name: string;
  location: string;
  currentWaitMin: number;
  patientsInQueue: number;
  openUntil: string;
  rapidTestsAvailable: boolean;
  xrayAvailable: boolean;
}

export const HELPLINE_DATA: HelplineItem[] = [
  {
    id: 'hl-1',
    name: '24/7 Acute Emergency & Ambulance Dispatch',
    number: '911 / 1-800-555-0911',
    category: 'Emergency',
    availability: '24 Hours / 7 Days',
    avgResponseSeconds: 4,
    description: 'Immediate paramedic dispatch, severe chest pain, stroke, major trauma, respiratory arrest, unconsciousness.',
    priority: 'CRITICAL',
  },
  {
    id: 'hl-2',
    name: 'MedFly On-Call Clinical Tele-Triage',
    number: '1-800-555-CARE (2273)',
    category: 'Tele-Triage',
    availability: '24 Hours / 7 Days',
    avgResponseSeconds: 18,
    description: 'Speak directly with a licensed registered nurse to determine whether you need ER, urgent care, or home treatment.',
    priority: 'HIGH',
  },
  {
    id: 'hl-3',
    name: 'National Poison Control Center',
    number: '1-800-222-1222',
    category: 'Poison & Toxic',
    availability: '24 Hours / 7 Days',
    avgResponseSeconds: 8,
    description: 'Immediate expert toxicology advice for chemical ingestion, medication overdoses, venomous bites, and household hazards.',
    priority: 'CRITICAL',
  },
  {
    id: 'hl-4',
    name: 'Pediatric Emergency Advice Line',
    number: '1-800-555-PEDS (7337)',
    category: 'Pediatrics',
    availability: '24 Hours / 7 Days',
    avgResponseSeconds: 15,
    description: 'Specialized pediatric nurses on duty for infant fever, respiratory distress, seizures, allergic reactions, and dehydration.',
    priority: 'HIGH',
  },
  {
    id: 'hl-5',
    name: 'Mental Health & Suicide Crisis Lifeline',
    number: '988 / 1-800-273-TALK',
    category: 'Mental Health',
    availability: '24 Hours / 7 Days',
    avgResponseSeconds: 12,
    description: 'Confidential psychological first aid, trauma de-escalation, suicide prevention, and immediate mobile crisis intervention.',
    priority: 'CRITICAL',
  },
  {
    id: 'hl-6',
    name: 'Senior & Geriatric Urgent Care Line',
    number: '1-800-555-ELDER',
    category: 'Senior',
    availability: '6:00 AM – 11:00 PM Daily',
    avgResponseSeconds: 25,
    description: 'Specialized support for falls, sudden confusion, polypharmacy interactions, and elder care coordination.',
    priority: 'ROUTINE',
  },
];

export const FACILITIES_DATA: Facility[] = [
  {
    id: 'fac-1',
    name: 'MedFly Metropolitan Medical Pavilion',
    type: 'Trauma Center',
    address: '740 Wellness Parkway, Central District',
    city: 'Metropolis',
    phone: '(555) 234-8000',
    emergencyOpen: true,
    traumaLevel: 'Level I Adult & Pediatric Trauma',
    waitMinutes: 14,
    openHours: '24/7 Open',
    bedOccupancy: '86% Capacity',
    specialties: ['Cardiothoracic Surgery', 'Neurosurgery', 'Comprehensive Stroke', 'Organ Transplant', 'Burn Unit'],
    equipment: ['3T MRI', 'Dual-Source 256 CT', 'Biplane Angiography', 'Da Vinci Xi Robotic Surgery'],
    rating: 4.9,
    reviewCount: 3120,
    image: medicalFacilityExterior,
  },
  {
    id: 'fac-2',
    name: 'MedFly Westside Regional Hospital',
    type: 'General Hospital',
    address: '1420 Evergreen Boulevard, Westside',
    city: 'Metropolis',
    phone: '(555) 890-4400',
    emergencyOpen: true,
    traumaLevel: 'Level II Trauma Center',
    waitMinutes: 22,
    openHours: '24/7 Open',
    bedOccupancy: '78% Capacity',
    specialties: ['Emergency Medicine', 'Orthopedics', 'Maternity & NICU', 'Oncology Care', 'General Surgery'],
    equipment: ['High-Field 1.5T MRI', '128-Slice CT', 'Digital 3D Mammography', 'Cardiac Catheterization'],
    rating: 4.8,
    reviewCount: 1940,
    image: heroMedicalCenter,
  },
  {
    id: 'fac-3',
    name: 'MedFly Harborview Urgent Care Center',
    type: 'Urgent Care',
    address: '280 Marina Drive, Suite 100',
    city: 'Bay District',
    phone: '(555) 432-1100',
    emergencyOpen: false,
    waitMinutes: 9,
    openHours: '7:00 AM – 11:00 PM Daily',
    bedOccupancy: 'Walk-ins Welcomed',
    specialties: ['Minor Fractures & Sprains', 'Laceration Suturing', 'Asthma & Bronchitis', 'IV Hydration', 'Infections'],
    equipment: ['Digital X-Ray', 'On-site Rapid PCR Lab', 'Ultrasound Imaging', 'EKG Station'],
    rating: 4.7,
    reviewCount: 880,
    image: quickCareDoctor,
  },
  {
    id: 'fac-4',
    name: 'Northgate Advanced Diagnostic & Imaging Institute',
    type: 'Diagnostic Center',
    address: '89 Northfield Avenue, Tech Corridor',
    city: 'Northfield',
    phone: '(555) 345-6700',
    emergencyOpen: false,
    waitMinutes: 5,
    openHours: '6:30 AM – 8:00 PM Mon-Sat',
    bedOccupancy: 'Scheduled & Stat Referrals',
    specialties: ['Cardiovascular MRI', 'PET/CT Oncology Imaging', 'Whole-Body DEXA', 'Targeted Biopsy'],
    equipment: ['PET-CT Scanner', 'Silent 3T MRI', 'Fluoroscopy', 'Echocardiography Suite'],
    rating: 4.9,
    reviewCount: 650,
    image: medicalTeamSpecialists,
  },
  {
    id: 'fac-5',
    name: 'MedFly Central 24/7 Clinical Pharmacy & Compounding',
    type: 'Pharmacy',
    address: '742 Wellness Parkway, Ground Floor Plaza',
    city: 'Metropolis',
    phone: '(555) 234-8099',
    emergencyOpen: true,
    waitMinutes: 6,
    openHours: '24 Hours / 365 Days',
    bedOccupancy: 'Continuous Drive-Thru & Counter',
    specialties: ['Stat Emergency Antibiotics', 'Specialty Biologics', 'Sterile Compounding', 'Vaccine Administration'],
    equipment: ['Automated Dispensing Robotics', 'Cold-Chain Biological Storage', 'Private Consult Pods'],
    rating: 4.8,
    reviewCount: 1420,
    image: heroMedicalCenter,
  },
  {
    id: 'fac-6',
    name: 'South Suburban Acute Emergency & Surgical Center',
    type: 'General Hospital',
    address: '5100 Southgate Way',
    city: 'South Valley',
    phone: '(555) 678-9100',
    emergencyOpen: true,
    traumaLevel: 'Level III Emergency Care',
    waitMinutes: 18,
    openHours: '24/7 Open',
    bedOccupancy: '71% Capacity',
    specialties: ['Emergency Trauma', 'General Laparoscopic Surgery', 'Digestive Health', 'Vascular Care'],
    equipment: ['64-Slice CT Scanner', 'Mobile C-Arm X-Ray', 'Endoscopy Suites', 'Intensive Care Monitor Units'],
    rating: 4.7,
    reviewCount: 970,
    image: medicalFacilityExterior,
  },
];

export const URGENT_CARE_LIST: UrgentCareClinic[] = [
  {
    id: 'uc-1',
    name: 'Harborview Walk-In & Urgent Care',
    location: '280 Marina Drive (2.1 miles away)',
    currentWaitMin: 8,
    patientsInQueue: 3,
    openUntil: '11:00 PM',
    rapidTestsAvailable: true,
    xrayAvailable: true,
  },
  {
    id: 'uc-2',
    name: 'Downtown Express Health Clinic',
    location: '115 Central Ave, 2nd Floor (0.8 miles away)',
    currentWaitMin: 15,
    patientsInQueue: 5,
    openUntil: '10:00 PM',
    rapidTestsAvailable: true,
    xrayAvailable: false,
  },
  {
    id: 'uc-3',
    name: 'Westside Pediatric & Family Urgent Care',
    location: '1420 Evergreen Blvd, Pavilion B (4.3 miles away)',
    currentWaitMin: 12,
    patientsInQueue: 4,
    openUntil: 'Midnight',
    rapidTestsAvailable: true,
    xrayAvailable: true,
  },
  {
    id: 'uc-4',
    name: 'Tech Corridor Urgent Care & Occupational Health',
    location: '92 Northfield Ave (6.2 miles away)',
    currentWaitMin: 5,
    patientsInQueue: 2,
    openUntil: '8:00 PM',
    rapidTestsAvailable: true,
    xrayAvailable: true,
  },
];

export const ON_CALL_DOCTORS: Doctor[] = [
  {
    id: 'doc-1',
    name: 'Dr. Sarah Jenkins, MD',
    role: 'Chief Tele-Triage Physician',
    specialty: 'Family & Emergency Medicine',
    credentials: 'Board Certified ABEM / ABFM (Johns Hopkins)',
    experienceYears: 16,
    hospital: 'Metropolitan Medical Pavilion',
    availableToday: true,
    rating: 4.96,
    consultationFee: '$0 Co-pay with Insurance / $45 Self-pay',
  },
  {
    id: 'doc-2',
    name: 'Dr. Marcus Vance, MD, FACS',
    role: 'Director of Acute Trauma Care',
    specialty: 'Trauma & Critical Care Surgery',
    credentials: 'Board Certified FACS (Mayo Clinic Fellow)',
    experienceYears: 21,
    hospital: 'Metropolitan Medical Pavilion',
    availableToday: true,
    rating: 4.98,
    consultationFee: 'Hospital In-Network',
  },
  {
    id: 'doc-3',
    name: 'Dr. Elena Rostova, MD, FAAP',
    role: 'Head of Pediatric Emergency',
    specialty: 'Pediatric Critical Care',
    credentials: 'Board Certified FAAP (Boston Children’s)',
    experienceYears: 14,
    hospital: 'Westside Regional Hospital',
    availableToday: true,
    rating: 4.95,
    consultationFee: '$0 Co-pay with Insurance / $40 Self-pay',
  },
  {
    id: 'doc-4',
    name: 'Dr. David Chen, MD, FACC',
    role: 'Chief of Cardiology & Stroke Intervention',
    specialty: 'Interventional Cardiology',
    credentials: 'Board Certified FACC (Cleveland Clinic)',
    experienceYears: 18,
    hospital: 'Metropolitan Medical Pavilion',
    availableToday: false,
    rating: 4.99,
    consultationFee: 'Specialist Referral',
  },
];

export interface SymptomAssessment {
  id: string;
  category: string;
  symptoms: string[];
  severityQuestion: string;
  options: {
    label: string;
    level: 'emergency' | 'urgent' | 'telehealth' | 'self-care';
    action: string;
    timeline: string;
    color: string;
  }[];
}

export const SYMPTOM_DATA: SymptomAssessment[] = [
  {
    id: 'sym-1',
    category: 'Chest, Heart & Breathing',
    symptoms: ['Chest tightness or crushing pain', 'Shortness of breath', 'Pain radiating to jaw or left arm', 'Rapid palpitations with dizziness'],
    severityQuestion: 'Are you experiencing persistent crushing chest pressure, breathing failure, or cold clammy sweat?',
    options: [
      {
        label: 'Yes — Crushing pressure / severe breathlessness',
        level: 'emergency',
        action: 'Call 911 immediately or go directly to the nearest Emergency Department.',
        timeline: 'IMMEDIATE DISPATCH',
        color: 'red',
      },
      {
        label: 'Moderate chest discomfort during movement, stable vitals',
        level: 'urgent',
        action: 'Report to MedFly Urgent Care or Emergency for immediate EKG and troponin blood evaluation.',
        timeline: 'Within 1 hour',
        color: 'amber',
      },
      {
        label: 'Mild palpitations after caffeine or anxiety, no pain',
        level: 'telehealth',
        action: 'Connect with an On-Call Telehealth Physician for virtual review and triage.',
        timeline: 'Within 15 minutes',
        color: 'blue',
      },
    ],
  },
  {
    id: 'sym-2',
    category: 'Head, Neurological & Vision',
    symptoms: ['Sudden severe "thunderclap" headache', 'Facial drooping or arm weakness', 'Slurred speech', 'High fever with stiff neck'],
    severityQuestion: 'Do you notice facial asymmetry, sudden weakness on one side, or slurred speech (FAST signs)?',
    options: [
      {
        label: 'Yes — Sudden weakness, facial drop, speech impairment',
        level: 'emergency',
        action: 'Suspected stroke (Code Stroke). Call 911 immediately. Note exact time symptoms began.',
        timeline: 'IMMEDIATE DISPATCH',
        color: 'red',
      },
      {
        label: 'Persistent intense migraine with light sensitivity, no motor loss',
        level: 'urgent',
        action: 'Visit Urgent Care for IV migraine cocktail and dark quiet room therapy.',
        timeline: 'Within 2 hours',
        color: 'amber',
      },
      {
        label: 'Tension headache or sinus pressure for 2 days',
        level: 'telehealth',
        action: 'Virtual consultation with Primary Care Doctor for prescription or OTC guidance.',
        timeline: 'Today',
        color: 'blue',
      },
    ],
  },
  {
    id: 'sym-3',
    category: 'Infections, Fever & Respiratory',
    symptoms: ['Fever above 102°F (38.9°C)', 'Persistent cough, sore throat', 'Wheezing, sinus congestion', 'Flu-like body aches'],
    severityQuestion: 'Is the patient an infant under 3 months with fever, or is there blue lips / struggling to breathe?',
    options: [
      {
        label: 'Infant with fever or adult with blue lips / severe wheeze',
        level: 'emergency',
        action: 'Immediate pediatric or adult Emergency intake required.',
        timeline: 'IMMEDIATE DISPATCH',
        color: 'red',
      },
      {
        label: 'Fever lasting >48h, productive green cough, throat pain',
        level: 'urgent',
        action: 'Walk into Urgent Care for rapid Strep / Flu / COVID / RSV swab and chest auscultation.',
        timeline: 'Within 3-4 hours',
        color: 'amber',
      },
      {
        label: 'Mild seasonal allergies, low fever, slight cough',
        level: 'self-care',
        action: 'Rest, oral hydration, acetaminophen/ibuprofen, and telehealth monitoring if worsening.',
        timeline: 'Monitor at home',
        color: 'emerald',
      },
    ],
  },
  {
    id: 'sym-4',
    category: 'Abdominal, Digestive & Acute Pain',
    symptoms: ['Sharp lower right quadrant pain', 'Inability to keep liquids down for 24h', 'Blood in stool or vomit', 'Severe cramping'],
    severityQuestion: 'Is the abdominal pain sudden, severe, localized to the right lower belly (suspected appendicitis)?',
    options: [
      {
        label: 'Severe right lower quadrant rebound tenderness or blood in vomit',
        level: 'emergency',
        action: 'Emergency Department evaluation needed for ultrasound/CT and surgical consult.',
        timeline: 'IMMEDIATE',
        color: 'red',
      },
      {
        label: 'Persistent vomiting / diarrhea with mild dehydration',
        level: 'urgent',
        action: 'Urgent Care for antiemetic medication, IV electrolyte hydration, and lab panel.',
        timeline: 'Within 2 hours',
        color: 'amber',
      },
      {
        label: 'Mild indigestion or stomach upset after meals',
        level: 'telehealth',
        action: 'Telehealth visit for dietary advice and acid reducer prescription.',
        timeline: 'Within 1-2 days',
        color: 'blue',
      },
    ],
  },
];

export const DEMO_PATIENT = {
  id: 'pt-8821',
  name: 'Sarah Miller',
  email: 'sarah.miller@patient.medflyhealth.org',
  dob: '1989-06-14',
  bloodType: 'O Positive',
  allergies: ['Penicillin', 'Sulfa Drugs'],
  insuranceProvider: 'BlueCross Comprehensive PPO',
  memberId: 'BCP-9832104-A',
  primaryHospital: 'MedFly Metropolitan Medical Pavilion',
  emergencyContact: 'David Miller (Spouse) - (555) 789-0144',
  activePrescriptions: [
    { name: 'Amoxicillin-Clavulanate 875mg', dosage: '1 tablet twice daily with food', remainingRefills: 2, rxNumber: 'RX-904128' },
    { name: 'Albuterol HFA Inhaler 90mcg', dosage: '1-2 puffs every 4-6 hours as needed', remainingRefills: 3, rxNumber: 'RX-771204' },
    { name: 'Lisinopril 10mg', dosage: '1 tablet every morning', remainingRefills: 4, rxNumber: 'RX-550921' },
  ],
  upcomingAppointments: [
    {
      id: 'apt-1',
      doctor: 'Dr. Sarah Jenkins, MD',
      specialty: 'Preventive Care Follow-up',
      date: 'Tomorrow, Oct 26, 2026',
      time: '10:30 AM',
      location: 'Metropolitan Pavilion, Suite 402',
      type: 'In-Person',
      status: 'Confirmed',
    },
    {
      id: 'apt-2',
      doctor: 'Dr. David Chen, MD',
      specialty: 'Routine Cardiology Check',
      date: 'Nov 12, 2026',
      time: '2:15 PM',
      location: 'Virtual Telehealth Video Suite',
      type: 'Telehealth',
      status: 'Scheduled',
    },
  ],
  recentLabReports: [
    { test: 'Comprehensive Metabolic Panel (CMP)', date: 'Oct 14, 2026', status: 'Normal / Verified by Dr. Jenkins', pdfAvailable: true },
    { test: 'Lipid Panel & Cholesterol Breakdown', date: 'Oct 14, 2026', status: 'Optimal (HDL: 62, LDL: 88)', pdfAvailable: true },
    { test: 'Complete Blood Count (CBC) with Differential', date: 'Sep 22, 2026', status: 'Normal In-Range', pdfAvailable: true },
  ],
};
