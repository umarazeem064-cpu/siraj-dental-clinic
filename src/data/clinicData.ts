export interface TreatmentItem {
  id: string;
  category: 'hygiene' | 'cosmetic' | 'orthodontics' | 'restorative';
  categoryLabel: { en: string; ur: string; ar: string };
  title: { en: string; ur: string; ar: string };
  description: { en: string; ur: string; ar: string };
  duration: string;
  startingPkr: number;
  image: string;
}

export interface PatientReview {
  id: string;
  name: string;
  treatment: string;
  dateLabel: string;
  rating: number;
  quote: string;
  avatar: string;
}

export interface ClinicScheduleRow {
  day: { en: string; ur: string; ar: string };
  hours: string;
  note: { en: string; ur: string; ar: string };
}

export const CLINIC_INFO = {
  name: 'Siraj Dental Clinic',
  mapsListingTitle: 'Siraj dental clinic',
  leadDoctor: 'Dr. Dawood Kakar',
  qualifications: 'BDS (Ziauddin Medical University, Karachi), RDS, C-Implant, C-Ortho & Facial Aesthetic',
  experienceYears: '6+ Years Experience',
  consultationFeePkr: 1000,
  phoneDisplay: '+92 301 3792052',
  telHref: 'tel:+923013792052',
  whatsappBase: 'https://wa.me/923013792052',
  whatsappDirectHref:
    'https://wa.me/923013792052?text=Assalam-o-Alaikum%20Siraj%20Dental%20Clinic%2C%20I%20would%20like%20to%20book%20a%20dental%20consultation.',
  helplines: '042-34500888 · 042-32377001',
  address: 'Alam Khan Chowk, Killi Shaboo, near Airport Road, Quetta, Balochistan, Pakistan',
  shortAddress: 'Alam Khan Chowk, Killi Shaboo, Quetta',
  city: 'Quetta',
  coordinates: { lat: 30.2319086, lng: 66.9956364 },
  googleMapsUrl: 'https://maps.app.goo.gl/uzH3NE2FV7hepo1p6',
  googleMapsEmbedUrl:
    'https://www.google.com/maps?q=Siraj+dental+clinic+Quetta&ll=30.2319086,66.9956364&z=16&output=embed',
  hoursSummary: 'Mon–Sat: 05:00 PM – 09:30 PM',
  rating: '4.9',
  satisfaction: '100%',
  avgWaitTime: '0 min',
  images: {
    hero: '/src/assets/images/hero_dental_suite.jpg',
    doctor: '/src/assets/images/dentist_dawood.jpg',
    sterilization: '/src/assets/images/clinic_sterilization.jpg',
    smileOne: '/src/assets/images/smile_gallery_one.jpg',
    smileTwo: '/src/assets/images/smile_gallery_two.jpg',
  },
};

export const TREATMENT_CATEGORIES = [
  { id: 'all', label: { en: 'All Treatments', ur: 'تمام علاج', ar: 'جميع العلاجات' } },
  { id: 'hygiene', label: { en: 'Preventive & Hygiene', ur: 'صفائی اور بچاؤ', ar: 'الوقاية والتنظيف' } },
  { id: 'cosmetic', label: { en: 'Cosmetic & Smile', ur: 'کاسمیٹک اسمائل', ar: 'التجميل والابتسامة' } },
  { id: 'orthodontics', label: { en: 'Orthodontics', ur: 'بریسز اور الائنرز', ar: 'تقويم الأسنان' } },
  { id: 'restorative', label: { en: 'Implants & Endodontics', ur: 'امپلانٹس اور روٹ کینال', ar: 'الزراعة وعلاج الجذور' } },
] as const;

export const TREATMENTS: TreatmentItem[] = [
  {
    id: 'scaling-polishing',
    category: 'hygiene',
    categoryLabel: { en: 'Preventive & Hygiene', ur: 'صفائی اور حفاظت', ar: 'الوقاية والتنظيف' },
    title: {
      en: 'Scaling & Polishing (Teeth Cleaning)',
      ur: 'اسکیلنگ اور پالشنگ (دانتوں کی صفائی)',
      ar: 'تنظيف وتلميع الأسنان بالموجات',
    },
    description: {
      en: 'Gentle ultrasonic plaque and tartar removal followed by smooth enamel polishing to stop gum bleeding and freshen breath.',
      ur: 'الٹراسونک طریقے سے میل اور ٹارٹر کی صفائی اور مسوڑھوں کی صحت کے لیے ہموار پالشنگ۔',
      ar: 'إزالة الجير والبلاك بلطف بالموجات فوق الصوتية مع تلميع المينا لصحة اللثة وانتعاش النفس.',
    },
    duration: '30–40 min',
    startingPkr: 3500,
    image: '/src/assets/images/treatment_scaling.jpg',
  },
  {
    id: 'teeth-whitening',
    category: 'cosmetic',
    categoryLabel: { en: 'Cosmetic & Smile', ur: 'کاسمیٹک اسمائل', ar: 'تجميل الأسنان' },
    title: {
      en: 'Teeth Whitening & Smile Makeover',
      ur: 'دانتوں کی سفیدی اور اسمائل میک اوور',
      ar: 'تبييض الأسنان وتصميم الابتسامة',
    },
    description: {
      en: 'Sensitivity-safe LED whitening and conservative aesthetic veneers designed to brighten stained enamel naturally in a single visit.',
      ur: 'حساسیت سے محفوظ ایل ای ڈی وائٹننگ اور قدرتی چمک کے لیے جدید اسمائل میک اوور۔',
      ar: 'تبييض آمن بتقنية LED وقشور تجميلية محافظة تمنحك ابتسامة مشرقة بدون حساسية.',
    },
    duration: '45–60 min',
    startingPkr: 15000,
    image: '/src/assets/images/treatment_whitening.jpg',
  },
  {
    id: 'braces-aligners',
    category: 'orthodontics',
    categoryLabel: { en: 'Orthodontics', ur: 'آرتھوڈونٹکس', ar: 'تقويم الأسنان' },
    title: {
      en: 'Braces & Clear Aligners',
      ur: 'بریسز اور کلیئر الائنرز',
      ar: 'التقويم المعدني والشفاف',
    },
    description: {
      en: 'Custom transparent aligners as well as ceramic and metal braces for balanced bite alignment without interrupting daily confidence.',
      ur: 'ٹیڑھے دانتوں کی درستگی کے لیے شفاف الائنرز اور جدید سیرامک و میٹل بریسز۔',
      ar: 'مقومات شفافة مخصصة بالإضافة إلى التقويم الخزفي والمعدني لتناسق الأسنان والعضة.',
    },
    duration: 'Monthly visits',
    startingPkr: 45000,
    image: '/src/assets/images/treatment_aligners.jpg',
  },
  {
    id: 'dental-implants',
    category: 'restorative',
    categoryLabel: { en: 'Implants & Crowns', ur: 'امپلانٹس اور کراؤنز', ar: 'الزراعة والتيجان' },
    title: {
      en: 'Dental Implants & Zirconia Crowns',
      ur: 'ڈینٹل امپلانٹس اور زرکونیا کراؤنز',
      ar: 'زراعة الأسنان وتيجان الزيركونيا',
    },
    description: {
      en: 'Biocompatible titanium tooth replacements and lifelike porcelain-fused or zirconia crowns engineered for natural chewing strength.',
      ur: 'غائب دانتوں کے لیے مضبوط ٹائٹینیم امپلانٹس اور قدرتی رنگ کے زرکونیا کراؤنز اور برجز۔',
      ar: 'زراعات تيتانيوم متوافقة حيوياً وتيجان وجسور زيركونيا طبيعية لاستعادة قوة المضغ.',
    },
    duration: '60–90 min',
    startingPkr: 55000,
    image: '/src/assets/images/treatment_implants.jpg',
  },
  {
    id: 'root-canal',
    category: 'restorative',
    categoryLabel: { en: 'Endodontics', ur: 'اینڈوڈونٹکس', ar: 'علاج الجذور' },
    title: {
      en: 'Painless Root Canal Treatment (RCT)',
      ur: 'بے درد روٹ کینال علاج (RCT)',
      ar: 'علاج عصب الأسنان بدون ألم',
    },
    description: {
      en: 'Digital apex-located root canal therapy with buffered local anesthesia to relieve severe toothache and save your natural tooth.',
      ur: 'بے درد اینستھیزیا اور جدید ڈیجیٹل طریقے سے دانت کی جڑ کا محفوظ علاج تاکہ قدرتی دانت بچ سکے۔',
      ar: 'علاج جذور دقيق بتخدير موضعي مريح لتسكين الألم الحاد والحفاظ على السن الطبيعي.',
    },
    duration: '45–60 min',
    startingPkr: 8000,
    image: '/src/assets/images/treatment_rootcanal.jpg',
  },
  {
    id: 'wisdom-pediatric',
    category: 'hygiene',
    categoryLabel: { en: 'Surgery & Family Care', ur: 'سرجری اور بچوں کا علاج', ar: 'الجراحة وطب الأطفال' },
    title: {
      en: 'Wisdom Tooth Extraction & Pediatric Care',
      ur: 'عقل داڑھ نکالنا اور بچوں کی دندان سازی',
      ar: 'خلع ضرس العقل ورعاية أسنان الأطفال',
    },
    description: {
      en: 'Atraumatic impacted wisdom tooth removal alongside gentle fluoride care, cavity prevention, and calm checkups for children.',
      ur: 'بغیر تکلیف عقل داڑھ کی سرجری اور بچوں کے لیے دوستانہ ماحول میں دانتوں کا مکمل چیک اپ۔',
      ar: 'خلع لطيف لضرس العقل المطمور إلى جانب رعاية وقائية هادئة وحشوات آمنة للأطفال.',
    },
    duration: '30–50 min',
    startingPkr: 4000,
    image: '/src/assets/images/treatment_pediatric.jpg',
  },
];

export const PATIENT_REVIEWS: PatientReview[] = [
  {
    id: 'rev-1',
    name: 'Tariq Mahmood',
    treatment: 'Wisdom Tooth Checkup',
    dateLabel: 'Verified Patient · Marham',
    rating: 5,
    quote:
      'I visited for a check-up on my wisdom teeth and had a very positive experience. Dr. Dawood provided valuable suggestions for maintaining my dental health. His consultation fee is affordable, and he is friendly and cooperative throughout.',
    avatar: '/src/assets/images/avatar_patient_one.jpg',
  },
  {
    id: 'rev-2',
    name: 'Ayesha Baloch',
    treatment: 'Painless Root Canal & Crown',
    dateLabel: 'Verified Patient · Quetta',
    rating: 5,
    quote:
      'I am completely satisfied with the doctor and treatment. Great experience, spotless clinic environment, polite staff, and zero pain during the entire root canal session.',
    avatar: '/src/assets/images/avatar_patient_two.jpg',
  },
  {
    id: 'rev-3',
    name: 'Hamza Khan',
    treatment: 'Scaling & Polishing',
    dateLabel: 'Verified Patient · Airport Road',
    rating: 5,
    quote:
      'Clear diagnosis, punctual evening appointment at Alam Khan Chowk with zero waiting time, and thorough sterilization. Easily one of the cleanest dental clinics in Quetta.',
    avatar: '/src/assets/images/avatar_patient_three.jpg',
  },
];

export const CLINIC_SCHEDULE: ClinicScheduleRow[] = [
  {
    day: { en: 'Monday – Thursday', ur: 'پیر تا جمعرات', ar: 'الإثنين – الخميس' },
    hours: '05:00 PM – 09:30 PM',
    note: { en: 'Evening Clinic', ur: 'شام کلینک', ar: 'عيادة مسائية' },
  },
  {
    day: { en: 'Friday', ur: 'جمعہ', ar: 'الجمعة' },
    hours: '05:00 PM – 09:30 PM',
    note: { en: 'Evening Clinic', ur: 'شام کلینک', ar: 'عيادة مسائية' },
  },
  {
    day: { en: 'Saturday', ur: 'ہفتہ', ar: 'السبت' },
    hours: '05:00 PM – 09:30 PM',
    note: { en: 'Evening Clinic', ur: 'شام کلینک', ar: 'عيادة مسائية' },
  },
  {
    day: { en: 'Sunday', ur: 'اتوار', ar: 'الأحد' },
    hours: 'On-Call Emergency',
    note: { en: 'By Appointment', ur: 'صرف ہنگامی صورت میں', ar: 'للحالات الطارئة فقط' },
  },
];

export const TIME_SLOTS = [
  '05:00 PM – 05:45 PM',
  '06:00 PM – 06:45 PM',
  '07:00 PM – 07:45 PM',
  '08:00 PM – 08:45 PM',
  '09:00 PM – 09:30 PM',
  'Urgent / Emergency Call',
];
