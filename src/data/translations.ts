export type LanguageCode = 'en' | 'ur' | 'ar';
export type CurrencyCode = 'PKR' | 'USD' | 'GBP' | 'AED';

export interface CurrencyConfig {
  code: CurrencyCode;
  symbol: string;
  rateFromPKR: number;
  label: string;
}

export const CURRENCIES: Record<CurrencyCode, CurrencyConfig> = {
  PKR: { code: 'PKR', symbol: '₨', rateFromPKR: 1, label: 'PKR ₨' },
  USD: { code: 'USD', symbol: '$', rateFromPKR: 1 / 278, label: 'USD $' },
  GBP: { code: 'GBP', symbol: '£', rateFromPKR: 1 / 352, label: 'GBP £' },
  AED: { code: 'AED', symbol: 'د.إ', rateFromPKR: 1 / 75.7, label: 'AED د.إ' },
};

export function formatFee(pkrAmount: number, currency: CurrencyCode): string {
  const cfg = CURRENCIES[currency];
  if (currency === 'PKR') {
    return `${cfg.symbol} ${pkrAmount.toLocaleString('en-US')}`;
  }
  const converted = Math.max(1, Math.round(pkrAmount * cfg.rateFromPKR));
  return `${cfg.symbol}${converted.toLocaleString('en-US')}`;
}

export interface TranslationBundle {
  dir: 'ltr' | 'rtl';
  clinicName: string;
  nav: {
    home: string;
    treatments: string;
    dentist: string;
    gallery: string;
    reviews: string;
    bookVisit: string;
  };
  controls: {
    language: string;
    currency: string;
    themeLight: string;
    themeDark: string;
    callClinic: string;
    whatsapp: string;
  };
  hero: {
    locationLine: string;
    headline: string;
    subheadline: string;
    trustLine: string;
    ctaBook: string;
    ctaWhatsapp: string;
    consultationLabel: string;
    hoursLabel: string;
    hoursValue: string;
  };
  treatmentsSection: {
    kicker: string;
    title: string;
    subtitle: string;
    allFilter: string;
    startingFrom: string;
    bookTreatment: string;
  };
  specialistSection: {
    kicker: string;
    title: string;
    subtitle: string;
    experienceLabel: string;
    experienceValue: string;
    qualificationLabel: string;
    consultationFeeLabel: string;
    philosophyTitle: string;
    philosophyCopy: string;
    bookWithDoctor: string;
  };
  sterilizationSection: {
    kicker: string;
    title: string;
    subtitle: string;
    standards: { title: string; desc: string }[];
  };
  gallerySection: {
    kicker: string;
    title: string;
    subtitle: string;
  };
  bookingSection: {
    kicker: string;
    title: string;
    subtitle: string;
    fullName: string;
    fullNamePlaceholder: string;
    phone: string;
    phonePlaceholder: string;
    treatment: string;
    date: string;
    timeSlot: string;
    symptoms: string;
    submitBtn: string;
    modalTitle: string;
    modalSubtitle: string;
    sendWhatsapp: string;
    closeBtn: string;
    symptomsOptions: {
      routine: string;
      mild: string;
      urgent: string;
    };
  };
  reviewsSection: {
    kicker: string;
    title: string;
    subtitle: string;
    ratingLabel: string;
    satisfactionLabel: string;
    waitTimeLabel: string;
    timingsTitle: string;
    directionsBtn: string;
    openMapsBtn: string;
  };
  footer: {
    tagline: string;
    addressLabel: string;
    contactLabel: string;
    privacyPolicy: string;
    rights: string;
    credit: string;
  };
}

export const TRANSLATIONS: Record<LanguageCode, TranslationBundle> = {
  en: {
    dir: 'ltr',
    clinicName: 'Siraj Dental Clinic',
    nav: {
      home: 'Home',
      treatments: 'Treatments',
      dentist: 'Dentist',
      gallery: 'Smile Gallery',
      reviews: 'Reviews',
      bookVisit: 'Book Visit',
    },
    controls: {
      language: 'Language',
      currency: 'Currency',
      themeLight: 'Light',
      themeDark: 'Dark',
      callClinic: 'Call Clinic',
      whatsapp: 'WhatsApp',
    },
    hero: {
      locationLine: 'Alam Khan Chowk, Killi Shaboo · Quetta, Pakistan',
      headline: 'Gentle, painless dental care for confident smiles in Quetta.',
      subheadline:
        'Modern cosmetic dentistry, digital diagnostics, implants, and family oral care led by Dr. Dawood Kakar in a calm, spotless clinical setting near Airport Road.',
      trustLine: '4.9/5 Verified Patient Rating · 100% Satisfaction · 0 Min Avg Wait Time',
      ctaBook: 'Book Dental Appointment',
      ctaWhatsapp: 'Chat on WhatsApp',
      consultationLabel: 'In-Clinic Consultation',
      hoursLabel: 'Evening Hours (Mon–Sat)',
      hoursValue: '05:00 PM – 09:30 PM',
    },
    treatmentsSection: {
      kicker: '01. Clinical & Cosmetic Services',
      title: 'Comprehensive Dental Treatments',
      subtitle:
        'Transparent procedures, clear duration estimates, and gentle anesthesia protocols tailored to every patient.',
      allFilter: 'All Treatments',
      startingFrom: 'Starting from',
      bookTreatment: 'Book This Treatment',
    },
    specialistSection: {
      kicker: '02. Meet Your Dental Surgeon',
      title: 'Dr. Dawood Kakar',
      subtitle: 'BDS (Ziauddin Medical University, Karachi) · RDS · C-Implant · C-Ortho & Facial Aesthetic',
      experienceLabel: 'Clinical Experience',
      experienceValue: '6+ Years',
      qualificationLabel: 'Specializations',
      consultationFeeLabel: 'Consultation Fee',
      philosophyTitle: 'Calm, Evidence-Based Dentistry Without Fear',
      philosophyCopy:
        'Every visit begins with an unhurried digital assessment and clear explanation of your options. Whether you need routine ultrasonic cleaning, painless endodontic therapy, or full smile rehabilitation, Dr. Dawood Kakar prioritizes comfort, enamel preservation, and lasting clinical outcomes.',
      bookWithDoctor: 'Schedule With Dr. Dawood',
    },
    sterilizationSection: {
      kicker: '03. Clinical Safety & Precision',
      title: 'Hospital-Grade Sterilization & Digital Diagnostics',
      subtitle:
        'We uphold strict international infection-control protocols before every single patient appointment.',
      standards: [
        {
          title: '100% Class-B Autoclave Sterilization',
          desc: 'All handpieces and surgical instruments undergo ultrasonic enzymatic cleaning and vacuum autoclave sterilization in sealed, single-patient pouches.',
        },
        {
          title: 'Painless Comfort Anesthesia',
          desc: 'Topical numbing gels, buffered micro-needles, and gentle delivery techniques eliminate sharp discomfort during root canals, fillings, and extractions.',
        },
        {
          title: 'Low-Dose Digital X-Ray & OPG Safety',
          desc: 'High-definition digital imaging provides instant root and jaw visualization with up to 80% lower radiation exposure compared to conventional film.',
        },
      ],
    },
    gallerySection: {
      kicker: '04. Smile Showcase',
      title: 'Natural Aesthetics, Built to Last',
      subtitle:
        'Balanced tooth proportions, healthy gum symmetry, and conservative cosmetic restorations crafted for everyday confidence.',
    },
    bookingSection: {
      kicker: '05. Instant Scheduling',
      title: 'Book Your Dental Visit',
      subtitle:
        'Reserve your preferred consultation slot at Siraj Dental Clinic, Quetta. Receive instant confirmation and send your booking directly via WhatsApp.',
      fullName: 'Patient Full Name',
      fullNamePlaceholder: 'e.g., Muhammad Tariq',
      phone: 'Phone / WhatsApp Number',
      phonePlaceholder: 'e.g., 0301 3792052',
      treatment: 'Select Dental Treatment',
      date: 'Preferred Date',
      timeSlot: 'Preferred Time Slot',
      symptoms: 'Symptoms / Pain Level',
      submitBtn: 'Confirm Appointment',
      modalTitle: 'Appointment Request Ready',
      modalSubtitle:
        'Your visit details are confirmed locally. Send this summary to Siraj Dental Clinic on WhatsApp for immediate front-desk slot confirmation.',
      sendWhatsapp: 'Send Appointment on WhatsApp',
      closeBtn: 'Done',
      symptomsOptions: {
        routine: 'Routine Checkup',
        mild: 'Mild Discomfort',
        urgent: 'Urgent Toothache',
      },
    },
    reviewsSection: {
      kicker: '06. Patient Trust & Location',
      title: 'Verified Patient Reviews & Clinic Hours',
      subtitle:
        'Trusted by families across Alam Khan Chowk, Killi Shaboo, and Airport Road, Quetta.',
      ratingLabel: 'Verified Rating',
      satisfactionLabel: 'Patient Satisfaction',
      waitTimeLabel: 'Average Wait Time',
      timingsTitle: 'Weekly Consultation Schedule',
      directionsBtn: 'Get Directions on Google Maps',
      openMapsBtn: 'Open Listing',
    },
    footer: {
      tagline: 'Compassionate, sterile, and modern dental & cosmetic care in the heart of Quetta.',
      addressLabel: 'Clinic Address',
      contactLabel: 'Appointments & WhatsApp',
      privacyPolicy: 'Privacy Policy',
      rights: 'All rights reserved.',
      credit: 'Designed for Siraj Dental Clinic, Quetta',
    },
  },
  ur: {
    dir: 'rtl',
    clinicName: 'سراج ڈینٹل کلینک',
    nav: {
      home: 'ہوم',
      treatments: 'علاج',
      dentist: 'ڈاکٹر',
      gallery: 'اسمائل گیلری',
      reviews: 'ریویوز',
      bookVisit: 'اپائنٹمنٹ بک کریں',
    },
    controls: {
      language: 'زبان',
      currency: 'کرنسی',
      themeLight: 'لائٹ',
      themeDark: 'ڈارک',
      callClinic: 'کال کریں',
      whatsapp: 'واٹس ایپ',
    },
    hero: {
      locationLine: 'عالم خان چوک، کلی شبو · کوئٹہ، پاکستان',
      headline: 'کوئٹہ میں پراعتماد مسکراہٹ کے لیے نرم اور بے درد دندان سازی۔',
      subheadline:
        'ایئرپورٹ روڈ کے قریب ڈاکٹر داؤد کاکڑ کی زیر نگرانی جدید کاسمیٹک ڈینٹسٹری، ڈیجیٹل تشخیص، امپلانٹس اور فیملی ڈینٹل کیئر۔',
      trustLine: '4.9/5 مصدقہ مریضوں کی درجہ بندی · 100% اطمینان · 0 منٹ اوسط انتظار',
      ctaBook: 'ڈینٹل اپائنٹمنٹ بک کریں',
      ctaWhatsapp: 'واٹس ایپ پر رابطہ کریں',
      consultationLabel: 'کلینک مشاورت فیس',
      hoursLabel: 'شام کے اوقات (پیر تا ہفتہ)',
      hoursValue: '05:00 PM – 09:30 PM',
    },
    treatmentsSection: {
      kicker: '01. طبی اور کاسمیٹک خدمات',
      title: 'مکمل ڈینٹل علاج اور سروسز',
      subtitle: 'ہر مریض کے لیے شفاف طریقہ کار، واضح دورانیہ اور آرام دہ بے درد علاج۔',
      allFilter: 'تمام علاج',
      startingFrom: 'ابتدائی فیس',
      bookTreatment: 'یہ علاج بک کریں',
    },
    specialistSection: {
      kicker: '02. اپنے ڈینٹل سرجن سے ملیں',
      title: 'ڈاکٹر داؤد کاکڑ',
      subtitle: 'BDS (ضیاءالدین میڈیکل یونیورسٹی، کراچی) · RDS · C-Implant · C-Ortho',
      experienceLabel: 'کلینیکل تجربہ',
      experienceValue: '6+ سال',
      qualificationLabel: 'تخصصات',
      consultationFeeLabel: 'مشاورت فیس',
      philosophyTitle: 'بغیر خوف کے پرسکون اور معیاری علاج',
      philosophyCopy:
        'ہر معائنے کا آغاز مکمل ڈیجیٹل جانچ اور واضح رہنمائی سے ہوتا ہے۔ چاہے اسکیلنگ ہو، بے درد روٹ کینال ہو یا امپلانٹس، ڈاکٹر داؤد کاکڑ مریض کے آرام اور محفوظ نتائج کو ترجیح دیتے ہیں۔',
      bookWithDoctor: 'ڈاکٹر داؤد سے وقت لیں',
    },
    sterilizationSection: {
      kicker: '03. کلینیکل حفاظت اور معیار',
      title: 'ہسپتال کے معیار کی اسٹرلائزیشن اور ڈیجیٹل ایکسرے',
      subtitle: 'ہر مریض کے علاج سے قبل جراثیم سے پاک آلات اور عالمی حفاظتی اصولوں پر سختی سے عمل کیا جاتا ہے۔',
      standards: [
        {
          title: '100% کلاس-بی آٹوکلیو اسٹرلائزیشن',
          desc: 'تمام آلات الٹراسونک صفائی کے بعد سیل شدہ پیکٹس میں آٹوکلیو مشین سے جراثیم سے پاک کیے جاتے ہیں۔',
        },
        {
          title: 'بے درد اینستھیزیا',
          desc: 'جدید نمبنگ جیل اور باریک سرنجوں کے ذریعے روٹ کینال اور دانت نکالنے کے عمل کو پرسکون بنایا جاتا ہے۔',
        },
        {
          title: 'ڈیجیٹل ایکسرے اور OPG حفاظت',
          desc: 'کم تابکاری والے ڈیجیٹل ایکسرے دانتوں کی جڑوں اور جبڑے کی فوری اور درست تصویر فراہم کرتے ہیں۔',
        },
      ],
    },
    gallerySection: {
      kicker: '04. اسمائل شوکیس',
      title: 'قدرتی اور پائیدار مسکراہٹ',
      subtitle: 'متوازن دانت، صحت مند مسوڑھے اور قدرتی کاسمیٹک بحالی۔',
    },
    bookingSection: {
      kicker: '05. فوری بکنگ',
      title: 'اپنی اپائنٹمنٹ بک کریں',
      subtitle: 'سراج ڈینٹل کلینک کوئٹہ میں اپنی پسند کا وقت منتخب کریں اور واٹس ایپ کے ذریعے تصدیق بھیجیں۔',
      fullName: 'مریض کا پورا نام',
      fullNamePlaceholder: 'مثلاً محمد طارق',
      phone: 'فون / واٹس ایپ نمبر',
      phonePlaceholder: '0301 3792052',
      treatment: 'علاج منتخب کریں',
      date: 'مطلوبہ تاریخ',
      timeSlot: 'مطلوبہ وقت',
      symptoms: 'علامات / درد کی نوعیت',
      submitBtn: 'اپائنٹمنٹ کی تصدیق کریں',
      modalTitle: 'اپائنٹمنٹ کی تفصیلات تیار ہیں',
      modalSubtitle: 'فوری تصدیق کے لیے نیچے دیے گئے بٹن پر کلک کر کے تفصیلات کلینک کے واٹس ایپ پر بھیجیں۔',
      sendWhatsapp: 'واٹس ایپ پر اپائنٹمنٹ بھیجیں',
      closeBtn: 'بند کریں',
      symptomsOptions: {
        routine: 'معمول کا چیک اپ',
        mild: 'ہلکی تکلیف',
        urgent: 'فوری دانت درد',
      },
    },
    reviewsSection: {
      kicker: '06. مریضوں کا اعتماد اور پتہ',
      title: 'مصدقہ مریضوں کے تاثرات اور کلینک کے اوقات',
      subtitle: 'عالم خان چوک، کلی شبو اور ایئرپورٹ روڈ کوئٹہ کے خاندانوں کا قابلِ اعتماد مرکز۔',
      ratingLabel: 'مصدقہ ریٹنگ',
      satisfactionLabel: 'مریضوں کا اطمینان',
      waitTimeLabel: 'اوسط انتظار',
      timingsTitle: 'ہفتہ وار کلینک اوقات',
      directionsBtn: 'گوگل میپس پر راستہ دیکھیں',
      openMapsBtn: 'لسٹنگ کھولیں',
    },
    footer: {
      tagline: 'کوئٹہ میں محفوظ، جراثیم سے پاک اور جدید دندان سازی کا مرکز۔',
      addressLabel: 'کلینک کا پتہ',
      contactLabel: 'اپائنٹمنٹس اور واٹس ایپ',
      privacyPolicy: 'پرائیویسی پالیسی',
      rights: 'جملہ حقوق محفوظ ہیں۔',
      credit: 'سراج ڈینٹل کلینک کوئٹہ',
    },
  },
  ar: {
    dir: 'rtl',
    clinicName: 'عيادة سراج للأسنان',
    nav: {
      home: 'الرئيسية',
      treatments: 'العلاجات',
      dentist: 'الطبيب',
      gallery: 'معرض الابتسامة',
      reviews: 'التقييمات',
      bookVisit: 'احجز موعداً',
    },
    controls: {
      language: 'اللغة',
      currency: 'العملة',
      themeLight: 'نهاري',
      themeDark: 'ليلي',
      callClinic: 'اتصل بالعيادة',
      whatsapp: 'واتساب',
    },
    hero: {
      locationLine: 'عالم خان تشوك، كيلي شابو · كويتا، باكستان',
      headline: 'رعاية أسنان لطيفة وبدون ألم لابتسامة واثقة في كويتا.',
      subheadline:
        'طب الأسنان التجميلي الحديث، التشخيص الرقمي، زراعة الأسنان، ورعاية الأسرة بإشراف الدكتور داود كاكر في بيئة طبية معقمة وهادئة.',
      trustLine: 'تقييم 4.9/5 من المرضى · رضا 100% · وقت انتظار 0 دقيقة',
      ctaBook: 'احجز موعد أسنان',
      ctaWhatsapp: 'تواصل عبر واتساب',
      consultationLabel: 'رسوم الاستشارة',
      hoursLabel: 'ساعات المساء (الإثنين–السبت)',
      hoursValue: '05:00 PM – 09:30 PM',
    },
    treatmentsSection: {
      kicker: '01. الخدمات العلاجية والتجميلية',
      title: 'علاجات الأسنان الشاملة',
      subtitle: 'إجراءات واضحة، مدة علاج محددة، وتخدير مريح مخصص لكل مريض.',
      allFilter: 'جميع العلاجات',
      startingFrom: 'تبدأ من',
      bookTreatment: 'احجز هذا العلاج',
    },
    specialistSection: {
      kicker: '02. تعرف على طبيب الأسنان',
      title: 'د. داود كاكر',
      subtitle: 'بكالوريوس طب وجراحة الأسنان (جامعة ضياء الدين، كراتشي) · زراعة وتقويم وتجميل الأسنان',
      experienceLabel: 'الخبرة السريرية',
      experienceValue: '6+ سنوات',
      qualificationLabel: 'التخصصات',
      consultationFeeLabel: 'رسوم الاستشارة',
      philosophyTitle: 'طب أسنان هادئ ومبني على الأدلة بدون قلق',
      philosophyCopy:
        'تبدأ كل زيارة بتقييم رقمي دقيق وشرح واضح للخيارات العلاجية. سواء كنت بحاجة إلى تنظيف روتيني، علاج جذور بدون ألم، أو زراعة أسنان، يضع د. داود كاكر راحتك وسلامة أسنانك أولاً.',
      bookWithDoctor: 'احجز مع د. داود',
    },
    sterilizationSection: {
      kicker: '03. السلامة والدقة الطبية',
      title: 'تعقيم بمعايير المستشفيات وأشعة رقمية',
      subtitle: 'نطبق بروتوكولات مكافحة العدوى الدولية الصارمة قبل كل موعد مريض.',
      standards: [
        {
          title: 'تعقيم أوتوكلاف الفئة B بنسبة 100%',
          desc: 'تخضع جميع الأدوات للتنظيف بالموجات فوق الصوتية ثم التعقيم الحراري بالبخار في عبوات مغلقة لكل مريض.',
        },
        {
          title: 'تخدير مريح بدون ألم',
          desc: 'استخدام جل التخدير الموضعي والتقنيات اللطيفة لإزالة أي انزعاج أثناء علاج الجذور والخلع.',
        },
        {
          title: 'أشعة سينية رقمية منخفضة الإشعاع',
          desc: 'تصوير رقمي عالي الدقة يوضح الجذور والفك فوراً بإشعاع أقل بنسبة تصل إلى 80%.',
        },
      ],
    },
    gallerySection: {
      kicker: '04. معرض الابتسامة',
      title: 'جماليات طبيعية تدوم طويلاً',
      subtitle: 'تناسق متوازن للأسنان وصحة اللثة بلمسة تجميلية محافظة.',
    },
    bookingSection: {
      kicker: '05. الحجز الفوري',
      title: 'احجز زيارتك لعيادة الأسنان',
      subtitle: 'اختر الموعد المناسب في عيادة سراج للأسنان في كويتا وأرسل تفاصيل الحجز مباشرة عبر واتساب.',
      fullName: 'الاسم الكامل للمريض',
      fullNamePlaceholder: 'مثال: محمد طارق',
      phone: 'رقم الهاتف / واتساب',
      phonePlaceholder: '0301 3792052',
      treatment: 'اختر العلاج المطلوب',
      date: 'التاريخ المفضل',
      timeSlot: 'الفترة الزمنية المفضلة',
      symptoms: 'الأعراض / مستوى الألم',
      submitBtn: 'تأكيد الموعد',
      modalTitle: 'طلب الموعد جاهز',
      modalSubtitle: 'تم تسجيل تفاصيل زيارتك. أرسل الملخص عبر واتساب لتأكيد الموعد فوراً مع العيادة.',
      sendWhatsapp: 'إرسال الموعد عبر واتساب',
      closeBtn: 'تم',
      symptomsOptions: {
        routine: 'فحص روتيني',
        mild: 'انزعاج خفيف',
        urgent: 'ألم أسنان عاجل',
      },
    },
    reviewsSection: {
      kicker: '06. ثقة المرضى والموقع',
      title: 'تقييمات المرضى الموثقة وساعات العمل',
      subtitle: 'موثوق من قبل العائلات في عالم خان تشوك وكيلي شابو وطريق المطار في كويتا.',
      ratingLabel: 'التقييم الموثق',
      satisfactionLabel: 'رضا المرضى',
      waitTimeLabel: 'متوسط الانتظار',
      timingsTitle: 'جدول المواعيد الأسبوعي',
      directionsBtn: 'احصل على الاتجاهات عبر خرائط جوجل',
      openMapsBtn: 'فتح الموقع',
    },
    footer: {
      tagline: 'رعاية أسنان حديثة ومعقمة ورحيمة في قلب كويتا.',
      addressLabel: 'عنوان العيادة',
      contactLabel: 'المواعيد وواتساب',
      privacyPolicy: 'سياسة الخصوصية',
      rights: 'جميع الحقوق محفوظة.',
      credit: 'عيادة سراج للأسنان · كويتا',
    },
  },
};
