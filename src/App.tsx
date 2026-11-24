import { useEffect, useMemo, useState, type FormEvent } from 'react';
import {
  ArrowUpRight,
  Calendar,
  Clock,
  Globe,
  MapPin,
  Menu,
  MessageCircle,
  Moon,
  Phone,
  ShieldCheck,
  Star,
  Sun,
  X,
} from 'lucide-react';
import { BookingModal, type BookingDetails } from './components/BookingModal';
import { Preloader } from './components/Preloader';
import { PrivacyPolicyModal } from './components/PrivacyPolicyModal';
import { ResilientImage } from './components/ResilientImage';
import {
  CLINIC_INFO,
  CLINIC_SCHEDULE,
  PATIENT_REVIEWS,
  TIME_SLOTS,
  TREATMENT_CATEGORIES,
  TREATMENTS,
} from './data/clinicData';
import {
  CURRENCIES,
  formatFee,
  TRANSLATIONS,
  type CurrencyCode,
  type LanguageCode,
} from './data/translations';

export default function App() {
  const [darkMode, setDarkMode] = useState(false);
  const [language, setLanguage] = useState<LanguageCode>('en');
  const [currency, setCurrency] = useState<CurrencyCode>('PKR');
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [privacyOpen, setPrivacyOpen] = useState(false);

  // Booking form state
  const todayIso = useMemo(() => new Date().toISOString().split('T')[0], []);
  const [patientName, setPatientName] = useState('');
  const [phone, setPhone] = useState('');
  const [selectedTreatmentId, setSelectedTreatmentId] = useState(TREATMENTS[0].id);
  const [preferredDate, setPreferredDate] = useState(todayIso);
  const [timeSlot, setTimeSlot] = useState(TIME_SLOTS[0]);
  const [symptomLevel, setSymptomLevel] = useState<'routine' | 'mild' | 'urgent'>('routine');
  const [formError, setFormError] = useState<string | null>(null);
  const [confirmedBooking, setConfirmedBooking] = useState<BookingDetails | null>(null);

  const t = TRANSLATIONS[language];

  useEffect(() => {
    const root = document.documentElement;
    if (darkMode) {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
  }, [darkMode]);

  useEffect(() => {
    document.documentElement.dir = t.dir;
    document.documentElement.lang = language;
  }, [language, t.dir]);

  const filteredTreatments = useMemo(() => {
    if (activeCategory === 'all') return TREATMENTS;
    return TREATMENTS.filter((item) => item.category === activeCategory);
  }, [activeCategory]);

  const handleSelectTreatmentForBooking = (treatmentId: string) => {
    setSelectedTreatmentId(treatmentId);
    const bookingEl = document.getElementById('book-appointment');
    if (bookingEl) {
      bookingEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const handleBookingSubmit = (e: FormEvent) => {
    e.preventDefault();
    setFormError(null);

    const trimmedName = patientName.trim();
    const cleanedPhone = phone.replace(/[^\d+]/g, '');

    if (trimmedName.length < 2) {
      setFormError('Please enter the patient full name.');
      return;
    }
    if (cleanedPhone.length < 10) {
      setFormError('Please enter a valid phone or WhatsApp number (at least 10 digits).');
      return;
    }
    if (!preferredDate) {
      setFormError('Please select a preferred consultation date.');
      return;
    }

    const treatmentObj =
      TREATMENTS.find((item) => item.id === selectedTreatmentId) || TREATMENTS[0];

    setConfirmedBooking({
      patientName: trimmedName,
      phone: phone.trim(),
      treatmentTitle: treatmentObj.title[language],
      preferredDate,
      timeSlot,
      symptoms: t.bookingSection.symptomsOptions[symptomLevel],
    });
  };

  return (
    <div
      dir={t.dir}
      className="min-h-screen bg-slate-50 text-slate-900 dark:bg-slate-950 dark:text-slate-100 transition-colors duration-200"
    >
      <Preloader clinicName={t.clinicName} />

      {/* Top Navigation Bar (Strict 3-Zone Contract) */}
      <header className="sticky top-0 z-40 h-16 bg-white/95 dark:bg-slate-950/95 backdrop-blur-md border-b border-slate-200 dark:border-slate-800">
        <div className="max-w-7xl mx-auto h-full px-4 sm:px-6 lg:px-8 flex items-center justify-between gap-8">
          {/* Zone 1: Single-line Brand Wordmark */}
          <a
            href="#home"
            className="inline-flex items-center gap-2.5 font-display text-lg font-bold tracking-tight text-slate-900 dark:text-slate-100 whitespace-nowrap shrink-0"
          >
            <span className="w-8 h-8 rounded-lg bg-teal-700 dark:bg-teal-500 text-white flex items-center justify-center shrink-0">
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.9"
                className="w-4 h-4"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M7.5 4.5C5.6 4.5 4.2 6.1 4.4 8.2c.3 2.8 1.5 5.4 2.1 8.4.4 1.8 1.2 3.1 2.2 3.1.9 0 1.4-1.3 1.9-3 .4-1.3.9-2 1.4-2s1 .7 1.4 2c.5 1.7 1 3 1.9 3 1 0 1.8-1.3 2.2-3.1.6-3 1.8-5.6 2.1-8.4.2-2.1-1.2-3.7-3.1-3.7-1.4 0-2.5.7-3.5 1.3-.6.3-1.4.3-2 0-1-.6-2.1-1.3-3.5-1.3Z"
                />
              </svg>
            </span>
            <span>{t.clinicName}</span>
          </a>

          {/* Zone 2: 5 Concise Single-Line Nav Links */}
          <nav
            aria-label="Primary Navigation"
            className="hidden md:flex items-center gap-6 text-sm font-medium text-slate-600 dark:text-slate-300"
          >
            <a
              href="#home"
              className="hover:text-teal-700 dark:hover:text-teal-400 hover:underline underline-offset-4 transition-colors whitespace-nowrap shrink-0"
            >
              {t.nav.home}
            </a>
            <a
              href="#treatments"
              className="hover:text-teal-700 dark:hover:text-teal-400 hover:underline underline-offset-4 transition-colors whitespace-nowrap shrink-0"
            >
              {t.nav.treatments}
            </a>
            <a
              href="#dentist"
              className="hover:text-teal-700 dark:hover:text-teal-400 hover:underline underline-offset-4 transition-colors whitespace-nowrap shrink-0"
            >
              {t.nav.dentist}
            </a>
            <a
              href="#smile-gallery"
              className="hover:text-teal-700 dark:hover:text-teal-400 hover:underline underline-offset-4 transition-colors whitespace-nowrap shrink-0"
            >
              {t.nav.gallery}
            </a>
            <a
              href="#reviews"
              className="hover:text-teal-700 dark:hover:text-teal-400 hover:underline underline-offset-4 transition-colors whitespace-nowrap shrink-0"
            >
              {t.nav.reviews}
            </a>
          </nav>

          {/* Zone 3: 1 Primary Action + Mobile Drawer Toggle */}
          <div className="flex items-center gap-3 shrink-0">
            <a
              href="#book-appointment"
              className="px-4 py-2 text-xs sm:text-sm font-semibold text-white bg-teal-700 hover:bg-teal-800 dark:bg-teal-600 dark:hover:bg-teal-500 rounded-lg transition-colors whitespace-nowrap shrink-0"
            >
              {t.nav.bookVisit}
            </a>
            <button
              type="button"
              onClick={() => setMobileMenuOpen((prev) => !prev)}
              aria-label="Toggle navigation menu"
              aria-expanded={mobileMenuOpen}
              className="md:hidden p-2 rounded-lg text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Nav Drawer */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 px-4 py-4 space-y-2 shadow-lg">
            {[
              { href: '#home', label: t.nav.home },
              { href: '#treatments', label: t.nav.treatments },
              { href: '#dentist', label: t.nav.dentist },
              { href: '#smile-gallery', label: t.nav.gallery },
              { href: '#reviews', label: t.nav.reviews },
            ].map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="block py-2.5 px-3 rounded-lg text-sm font-medium text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800"
              >
                {link.label}
              </a>
            ))}
          </div>
        )}
      </header>

      {/* Global Utility Toolbar (Language, Currency, Theme, Quick Call/WhatsApp) */}
      <div className="border-b border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/70">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2.5 flex flex-wrap items-center justify-between gap-3 text-xs">
          <div className="flex flex-wrap items-center gap-4 text-slate-600 dark:text-slate-300">
            <a
              href={CLINIC_INFO.telHref}
              className="inline-flex items-center gap-1.5 font-medium hover:text-teal-700 dark:hover:text-teal-400 transition-colors whitespace-nowrap"
            >
              <Phone className="w-3.5 h-3.5 text-teal-700 dark:text-teal-400" />
              <span className="tabular-nums">{CLINIC_INFO.phoneDisplay}</span>
            </a>
            <span className="text-slate-300 dark:text-slate-700" aria-hidden="true">
              |
            </span>
            <a
              href={CLINIC_INFO.whatsappDirectHref}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 font-medium text-emerald-700 dark:text-emerald-400 hover:underline whitespace-nowrap"
            >
              <MessageCircle className="w-3.5 h-3.5" />
              <span>{t.controls.whatsapp}</span>
            </a>
          </div>

          <div className="flex flex-wrap items-center gap-2.5">
            {/* Multi-Language Dropdown */}
            <label className="inline-flex items-center gap-1.5 text-slate-600 dark:text-slate-300">
              <Globe className="w-3.5 h-3.5 text-slate-400" aria-hidden="true" />
              <span className="sr-only">{t.controls.language}</span>
              <select
                value={language}
                onChange={(e) => setLanguage(e.target.value as LanguageCode)}
                aria-label={t.controls.language}
                className="bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-100 border border-slate-200 dark:border-slate-700 rounded-md px-2 py-1 text-xs font-medium focus:outline-none focus:ring-2 focus:ring-teal-600"
              >
                <option value="en">English</option>
                <option value="ur">اردو (Urdu)</option>
                <option value="ar">العربية (Arabic)</option>
              </select>
            </label>

            {/* Multi-Currency Switcher */}
            <label className="inline-flex items-center gap-1.5 text-slate-600 dark:text-slate-300">
              <span className="sr-only">{t.controls.currency}</span>
              <select
                value={currency}
                onChange={(e) => setCurrency(e.target.value as CurrencyCode)}
                aria-label={t.controls.currency}
                className="bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-100 border border-slate-200 dark:border-slate-700 rounded-md px-2 py-1 text-xs font-medium tabular-nums focus:outline-none focus:ring-2 focus:ring-teal-600"
              >
                {Object.values(CURRENCIES).map((c) => (
                  <option key={c.code} value={c.code}>
                    {c.label}
                  </option>
                ))}
              </select>
            </label>

            {/* Light / Dark Mode Switch */}
            <button
              type="button"
              onClick={() => setDarkMode((prev) => !prev)}
              aria-label={darkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
              className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md border border-slate-200 dark:border-slate-700 bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors font-medium whitespace-nowrap"
            >
              {darkMode ? (
                <>
                  <Sun className="w-3.5 h-3.5 text-amber-400" />
                  <span>{t.controls.themeLight}</span>
                </>
              ) : (
                <>
                  <Moon className="w-3.5 h-3.5 text-slate-600" />
                  <span>{t.controls.themeDark}</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>

      <main>
        {/* HERO SECTION */}
        <section id="home" className="py-12 md:py-16 lg:py-20 border-b border-slate-200 dark:border-slate-800">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-stretch">
              <div className="lg:col-span-6 flex flex-col justify-center">
                <p className="text-xs sm:text-sm font-medium text-teal-700 dark:text-teal-400">
                  {t.hero.locationLine}
                </p>

                <h1
                  className="mt-3 font-display font-bold tracking-tight text-slate-900 dark:text-white text-balance max-w-2xl"
                  style={{ fontSize: 'clamp(2.15rem, 3.8vw, 3.35rem)', lineHeight: 1.12 }}
                >
                  {t.hero.headline}
                </h1>

                <p className="mt-5 text-base sm:text-lg text-slate-600 dark:text-slate-300 leading-relaxed max-w-xl">
                  {t.hero.subheadline}
                </p>

                <p className="mt-4 text-xs sm:text-sm font-medium text-slate-500 dark:text-slate-400 tabular-nums">
                  {t.hero.trustLine}
                </p>

                <div className="mt-8 flex flex-wrap items-center gap-3.5">
                  <a
                    href="#book-appointment"
                    className="inline-flex items-center justify-center gap-2 px-6 py-3.5 text-sm font-semibold text-white bg-teal-700 hover:bg-teal-800 dark:bg-teal-600 dark:hover:bg-teal-500 rounded-xl transition-colors whitespace-nowrap"
                  >
                    <Calendar className="w-4 h-4 shrink-0" />
                    <span>{t.hero.ctaBook}</span>
                  </a>

                  <a
                    href={CLINIC_INFO.whatsappDirectHref}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2 px-5 py-3.5 text-sm font-semibold text-slate-800 dark:text-slate-100 bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 hover:border-emerald-600 dark:hover:border-emerald-500 rounded-xl transition-colors whitespace-nowrap"
                  >
                    <MessageCircle className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
                    <span>{t.hero.ctaWhatsapp}</span>
                  </a>
                </div>
              </div>

              <div className="lg:col-span-6">
                <div className="h-72 sm:h-96 lg:h-full min-h-[340px] rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm">
                  <ResilientImage
                    src={CLINIC_INFO.images.hero}
                    alt="Modern treatment chair and sterile dental suite at Siraj Dental Clinic, Quetta"
                    fallbackTitle="Siraj Dental Clinic — Clinical Suite"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            </div>

            {/* Full-Width Key Practice Info Strip Below Hero Split */}
            <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-4 pt-8 border-t border-slate-200 dark:border-slate-800">
              <div className="p-5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  {t.hero.consultationLabel}
                </p>
                <p className="mt-1.5 font-display text-xl font-semibold text-slate-900 dark:text-slate-100 tabular-nums">
                  {formatFee(CLINIC_INFO.consultationFeePkr, currency)}
                </p>
                <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
                  {CLINIC_INFO.leadDoctor} · BDS, C-Implant, C-Ortho
                </p>
              </div>

              <div className="p-5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
                <p className="text-xs text-slate-500 dark:text-slate-400">{t.hero.hoursLabel}</p>
                <p className="mt-1.5 font-display text-xl font-semibold text-slate-900 dark:text-slate-100 tabular-nums">
                  {t.hero.hoursValue}
                </p>
                <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
                  Emergency dental support by prior call
                </p>
              </div>

              <div className="p-5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 flex items-center justify-between gap-4">
                <div>
                  <p className="text-xs text-slate-500 dark:text-slate-400">Google Maps Verified</p>
                  <p className="mt-1.5 font-display text-base font-semibold text-slate-900 dark:text-slate-100">
                    {CLINIC_INFO.shortAddress}
                  </p>
                  <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
                    Near Airport Road, Quetta
                  </p>
                </div>
                <a
                  href={CLINIC_INFO.googleMapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Open Siraj Dental Clinic on Google Maps"
                  className="p-2.5 rounded-lg bg-slate-100 dark:bg-slate-800 text-teal-700 dark:text-teal-400 hover:bg-teal-50 dark:hover:bg-teal-950/60 transition-colors shrink-0"
                >
                  <ArrowUpRight className="w-5 h-5" />
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* 01. FILTERABLE DENTAL TREATMENTS & SERVICES */}
        <section id="treatments" className="py-16 lg:py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
              <div className="max-w-2xl">
                <p className="text-sm font-medium text-teal-700 dark:text-teal-400">
                  {t.treatmentsSection.kicker}
                </p>
                <h2 className="mt-2 font-display text-2xl sm:text-3xl font-bold tracking-tight text-slate-900 dark:text-white text-balance">
                  {t.treatmentsSection.title}
                </h2>
                <p className="mt-2.5 text-sm sm:text-base text-slate-600 dark:text-slate-300">
                  {t.treatmentsSection.subtitle}
                </p>
              </div>

              {/* Functional Category Filter Tabs */}
              <div
                role="tablist"
                aria-label="Filter dental treatments"
                className="flex flex-wrap items-center gap-1.5 p-1.5 bg-slate-200/70 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl"
              >
                {TREATMENT_CATEGORIES.map((cat) => {
                  const active = activeCategory === cat.id;
                  return (
                    <button
                      key={cat.id}
                      type="button"
                      role="tab"
                      aria-selected={active}
                      onClick={() => setActiveCategory(cat.id)}
                      className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors whitespace-nowrap shrink-0 ${
                        active
                          ? 'bg-white dark:bg-slate-800 text-slate-900 dark:text-white shadow-xs'
                          : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100'
                      }`}
                    >
                      {cat.label[language]}
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="mt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredTreatments.map((item) => (
                <article
                  key={item.id}
                  className="flex flex-col bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl overflow-hidden transition-colors"
                >
                  <div className="aspect-[4/3] w-full overflow-hidden bg-slate-100 dark:bg-slate-800">
                    <ResilientImage
                      src={item.image}
                      alt={item.title[language]}
                      fallbackTitle={item.title[language]}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  <div className="p-6 flex flex-col flex-1">
                    <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400 tabular-nums">
                      <span>{item.categoryLabel[language]}</span>
                      <span aria-hidden="true">·</span>
                      <span>{item.duration}</span>
                    </div>

                    <h3 className="mt-2 font-display text-lg font-semibold text-slate-900 dark:text-slate-100 leading-snug">
                      {item.title[language]}
                    </h3>

                    <p className="mt-2.5 text-sm text-slate-600 dark:text-slate-300 leading-relaxed flex-1">
                      {item.description[language]}
                    </p>

                    <div className="mt-5 pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between gap-4">
                      <div>
                        <span className="block text-xs text-slate-500 dark:text-slate-400">
                          {t.treatmentsSection.startingFrom}
                        </span>
                        <span className="font-display text-base font-semibold text-slate-900 dark:text-white tabular-nums">
                          {formatFee(item.startingPkr, currency)}
                        </span>
                      </div>

                      <button
                        type="button"
                        onClick={() => handleSelectTreatmentForBooking(item.id)}
                        className="px-4 py-2 text-xs font-semibold text-teal-700 dark:text-teal-300 bg-teal-50 hover:bg-teal-100 dark:bg-teal-950/70 dark:hover:bg-teal-900/70 rounded-lg transition-colors whitespace-nowrap shrink-0"
                      >
                        {t.treatmentsSection.bookTreatment}
                      </button>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* 02 & 03. DENTAL SPECIALIST & STERILIZATION STANDARDS */}
        <section
          id="dentist"
          className="py-16 lg:py-20 bg-white dark:bg-slate-900/50 border-y border-slate-200 dark:border-slate-800"
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
            {/* Specialist Profile */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-stretch">
              <div className="lg:col-span-5">
                <div className="h-80 sm:h-96 lg:h-full min-h-[360px] rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-800 bg-slate-100 dark:bg-slate-800">
                  <ResilientImage
                    src={CLINIC_INFO.images.doctor}
                    alt={`${CLINIC_INFO.leadDoctor} in clinical dental suite`}
                    fallbackTitle={CLINIC_INFO.leadDoctor}
                    className="w-full h-full object-cover object-top"
                  />
                </div>
              </div>

              <div className="lg:col-span-7 flex flex-col justify-center">
                <p className="text-sm font-medium text-teal-700 dark:text-teal-400">
                  {t.specialistSection.kicker}
                </p>
                <h2 className="mt-2 font-display text-2xl sm:text-3xl font-bold tracking-tight text-slate-900 dark:text-white">
                  {t.specialistSection.title}
                </h2>
                <p className="mt-2 text-sm font-medium text-slate-600 dark:text-slate-300">
                  {t.specialistSection.subtitle}
                </p>

                <div className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-4 py-5 border-y border-slate-200 dark:border-slate-800">
                  <div>
                    <span className="block text-xs text-slate-500 dark:text-slate-400">
                      {t.specialistSection.experienceLabel}
                    </span>
                    <span className="mt-1 block font-display text-lg font-semibold text-slate-900 dark:text-slate-100 tabular-nums">
                      {t.specialistSection.experienceValue}
                    </span>
                  </div>
                  <div>
                    <span className="block text-xs text-slate-500 dark:text-slate-400">
                      {t.specialistSection.consultationFeeLabel}
                    </span>
                    <span className="mt-1 block font-display text-lg font-semibold text-slate-900 dark:text-slate-100 tabular-nums">
                      {formatFee(CLINIC_INFO.consultationFeePkr, currency)}
                    </span>
                  </div>
                  <div>
                    <span className="block text-xs text-slate-500 dark:text-slate-400">
                      {t.specialistSection.qualificationLabel}
                    </span>
                    <span className="mt-1 block text-sm font-semibold text-slate-900 dark:text-slate-100">
                      Implantology & Orthodontics
                    </span>
                  </div>
                </div>

                <h3 className="mt-6 font-display text-lg font-semibold text-slate-900 dark:text-slate-100">
                  {t.specialistSection.philosophyTitle}
                </h3>
                <p className="mt-2 text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed max-w-2xl">
                  {t.specialistSection.philosophyCopy}
                </p>

                <div className="mt-7">
                  <a
                    href="#book-appointment"
                    className="inline-flex items-center gap-2 px-5 py-3 text-sm font-semibold text-white bg-teal-700 hover:bg-teal-800 dark:bg-teal-600 dark:hover:bg-teal-500 rounded-xl transition-colors whitespace-nowrap"
                  >
                    <Calendar className="w-4 h-4 shrink-0" />
                    <span>{t.specialistSection.bookWithDoctor}</span>
                  </a>
                </div>
              </div>
            </div>

            {/* Sterilization & Safety Strip */}
            <div className="pt-12 border-t border-slate-200 dark:border-slate-800 grid grid-cols-1 lg:grid-cols-12 gap-10 items-stretch">
              <div className="lg:col-span-6 flex flex-col justify-center">
                <p className="text-sm font-medium text-teal-700 dark:text-teal-400">
                  {t.sterilizationSection.kicker}
                </p>
                <h2 className="mt-2 font-display text-2xl sm:text-3xl font-bold tracking-tight text-slate-900 dark:text-white text-balance">
                  {t.sterilizationSection.title}
                </h2>
                <p className="mt-2.5 text-sm sm:text-base text-slate-600 dark:text-slate-300">
                  {t.sterilizationSection.subtitle}
                </p>

                <div className="mt-6 divide-y divide-slate-200 dark:divide-slate-800">
                  {t.sterilizationSection.standards.map((std, idx) => (
                    <div key={std.title} className="py-4 first:pt-0 last:pb-0">
                      <div className="flex items-start gap-3">
                        <ShieldCheck className="w-5 h-5 text-teal-700 dark:text-teal-400 mt-0.5 shrink-0" />
                        <div>
                          <h3 className="text-sm sm:text-base font-semibold text-slate-900 dark:text-slate-100">
                            0{idx + 1}. {std.title}
                          </h3>
                          <p className="mt-1 text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                            {std.desc}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="lg:col-span-6">
                <div className="h-72 sm:h-96 lg:h-full min-h-[320px] rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-800 bg-slate-100 dark:bg-slate-800">
                  <ResilientImage
                    src={CLINIC_INFO.images.sterilization}
                    alt="Autoclave sterilization and sterile clinical instrument bay"
                    fallbackTitle="Class-B Autoclave Sterilization"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 04. SMILE GALLERY */}
        <section id="smile-gallery" className="py-16 lg:py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-2xl">
              <p className="text-sm font-medium text-teal-700 dark:text-teal-400">
                {t.gallerySection.kicker}
              </p>
              <h2 className="mt-2 font-display text-2xl sm:text-3xl font-bold tracking-tight text-slate-900 dark:text-white text-balance">
                {t.gallerySection.title}
              </h2>
              <p className="mt-2.5 text-sm sm:text-base text-slate-600 dark:text-slate-300">
                {t.gallerySection.subtitle}
              </p>
            </div>

            <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl overflow-hidden">
                <div className="aspect-[4/3] overflow-hidden bg-slate-100 dark:bg-slate-800">
                  <ResilientImage
                    src={CLINIC_INFO.images.smileOne}
                    alt="Natural bright cosmetic smile result after LED whitening and enamel shaping"
                    fallbackTitle="Cosmetic Smile Whitening"
                    className="w-full h-full object-cover object-top"
                  />
                </div>
                <div className="p-6">
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    Cosmetic Whitening & Enamel Polishing · Single Session
                  </p>
                  <h3 className="mt-1.5 font-display text-lg font-semibold text-slate-900 dark:text-slate-100">
                    Natural Shade Elevation Without Sensitivity
                  </h3>
                  <p className="mt-2 text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                    Balanced 3-shade brightness enhancement preserving natural tooth translucency and healthy gingival contours.
                  </p>
                </div>
              </div>

              <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl overflow-hidden">
                <div className="aspect-[4/3] overflow-hidden bg-slate-100 dark:bg-slate-800">
                  <ResilientImage
                    src={CLINIC_INFO.images.smileTwo}
                    alt="Aligned confident smile following orthodontic clear aligner treatment"
                    fallbackTitle="Clear Aligner Orthodontics"
                    className="w-full h-full object-cover object-top"
                  />
                </div>
                <div className="p-6">
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    Clear Aligners & Occlusal Balance · 6–9 Months
                  </p>
                  <h3 className="mt-1.5 font-display text-lg font-semibold text-slate-900 dark:text-slate-100">
                    Discreet Arch Alignment & Bite Harmony
                  </h3>
                  <p className="mt-2 text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                    Progressive transparent aligner trays mapped digitally for predictable crowding correction and long-term retention.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 05. INTERACTIVE APPOINTMENT BOOKING */}
        <section
          id="book-appointment"
          className="py-16 lg:py-20 bg-white dark:bg-slate-900/50 border-y border-slate-200 dark:border-slate-800"
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
              <div className="lg:col-span-5">
                <p className="text-sm font-medium text-teal-700 dark:text-teal-400">
                  {t.bookingSection.kicker}
                </p>
                <h2 className="mt-2 font-display text-2xl sm:text-3xl font-bold tracking-tight text-slate-900 dark:text-white text-balance">
                  {t.bookingSection.title}
                </h2>
                <p className="mt-3 text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed">
                  {t.bookingSection.subtitle}
                </p>

                <div className="mt-8 space-y-4 text-sm">
                  <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 flex items-start gap-3">
                    <Phone className="w-4 h-4 text-teal-700 dark:text-teal-400 mt-0.5 shrink-0" />
                    <div>
                      <span className="block text-xs text-slate-500 dark:text-slate-400">
                        Direct Clinic Call & WhatsApp
                      </span>
                      <a
                        href={CLINIC_INFO.telHref}
                        className="mt-0.5 inline-block font-semibold text-slate-900 dark:text-slate-100 hover:text-teal-700 dark:hover:text-teal-400 tabular-nums"
                      >
                        {CLINIC_INFO.phoneDisplay}
                      </a>
                    </div>
                  </div>

                  <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 flex items-start gap-3">
                    <Clock className="w-4 h-4 text-teal-700 dark:text-teal-400 mt-0.5 shrink-0" />
                    <div>
                      <span className="block text-xs text-slate-500 dark:text-slate-400">
                        {t.hero.hoursLabel}
                      </span>
                      <span className="mt-0.5 block font-semibold text-slate-900 dark:text-slate-100 tabular-nums">
                        {CLINIC_INFO.hoursSummary}
                      </span>
                    </div>
                  </div>

                  <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 flex items-start gap-3">
                    <MapPin className="w-4 h-4 text-teal-700 dark:text-teal-400 mt-0.5 shrink-0" />
                    <div>
                      <span className="block text-xs text-slate-500 dark:text-slate-400">
                        {t.footer.addressLabel}
                      </span>
                      <span className="mt-0.5 block font-medium text-slate-800 dark:text-slate-200">
                        {CLINIC_INFO.address}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="lg:col-span-7">
                <form
                  onSubmit={handleBookingSubmit}
                  className="p-6 sm:p-8 rounded-2xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-5"
                >
                  {formError && (
                    <div
                      role="alert"
                      className="p-3.5 rounded-xl bg-rose-50 dark:bg-rose-950/60 border border-rose-200 dark:border-rose-800 text-sm text-rose-800 dark:text-rose-200"
                    >
                      {formError}
                    </div>
                  )}

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label
                        htmlFor="booking-name"
                        className="block text-xs font-semibold text-slate-700 dark:text-slate-200 mb-1.5"
                      >
                        {t.bookingSection.fullName}
                      </label>
                      <input
                        id="booking-name"
                        type="text"
                        required
                        value={patientName}
                        onChange={(e) => setPatientName(e.target.value)}
                        placeholder={t.bookingSection.fullNamePlaceholder}
                        className="w-full px-3.5 py-2.5 text-sm rounded-xl bg-white dark:bg-slate-950 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-slate-100 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-teal-600"
                      />
                    </div>

                    <div>
                      <label
                        htmlFor="booking-phone"
                        className="block text-xs font-semibold text-slate-700 dark:text-slate-200 mb-1.5"
                      >
                        {t.bookingSection.phone}
                      </label>
                      <input
                        id="booking-phone"
                        type="tel"
                        required
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder={t.bookingSection.phonePlaceholder}
                        className="w-full px-3.5 py-2.5 text-sm rounded-xl bg-white dark:bg-slate-950 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-slate-100 placeholder:text-slate-400 tabular-nums focus:outline-none focus:ring-2 focus:ring-teal-600"
                      />
                    </div>
                  </div>

                  <div>
                    <label
                      htmlFor="booking-treatment"
                      className="block text-xs font-semibold text-slate-700 dark:text-slate-200 mb-1.5"
                    >
                      {t.bookingSection.treatment}
                    </label>
                    <select
                      id="booking-treatment"
                      value={selectedTreatmentId}
                      onChange={(e) => setSelectedTreatmentId(e.target.value)}
                      className="w-full px-3.5 py-2.5 text-sm rounded-xl bg-white dark:bg-slate-950 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-teal-600"
                    >
                      {TREATMENTS.map((item) => (
                        <option key={item.id} value={item.id}>
                          {item.title[language]} ({formatFee(item.startingPkr, currency)})
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label
                        htmlFor="booking-date"
                        className="block text-xs font-semibold text-slate-700 dark:text-slate-200 mb-1.5"
                      >
                        {t.bookingSection.date}
                      </label>
                      <input
                        id="booking-date"
                        type="date"
                        required
                        min={todayIso}
                        value={preferredDate}
                        onChange={(e) => setPreferredDate(e.target.value)}
                        className="w-full px-3.5 py-2.5 text-sm rounded-xl bg-white dark:bg-slate-950 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-slate-100 tabular-nums focus:outline-none focus:ring-2 focus:ring-teal-600"
                      />
                    </div>

                    <div>
                      <label
                        htmlFor="booking-slot"
                        className="block text-xs font-semibold text-slate-700 dark:text-slate-200 mb-1.5"
                      >
                        {t.bookingSection.timeSlot}
                      </label>
                      <select
                        id="booking-slot"
                        value={timeSlot}
                        onChange={(e) => setTimeSlot(e.target.value)}
                        className="w-full px-3.5 py-2.5 text-sm rounded-xl bg-white dark:bg-slate-950 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-slate-100 tabular-nums focus:outline-none focus:ring-2 focus:ring-teal-600"
                      >
                        {TIME_SLOTS.map((slot) => (
                          <option key={slot} value={slot}>
                            {slot}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div>
                    <span className="block text-xs font-semibold text-slate-700 dark:text-slate-200 mb-2">
                      {t.bookingSection.symptoms}
                    </span>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                      {(
                        [
                          { id: 'routine', label: t.bookingSection.symptomsOptions.routine },
                          { id: 'mild', label: t.bookingSection.symptomsOptions.mild },
                          { id: 'urgent', label: t.bookingSection.symptomsOptions.urgent },
                        ] as const
                      ).map((opt) => {
                        const selected = symptomLevel === opt.id;
                        return (
                          <button
                            key={opt.id}
                            type="button"
                            onClick={() => setSymptomLevel(opt.id)}
                            className={`px-3.5 py-2.5 text-xs font-medium rounded-xl border transition-colors text-center ${
                              selected
                                ? 'bg-teal-700 dark:bg-teal-600 text-white border-teal-700 dark:border-teal-600'
                                : 'bg-white dark:bg-slate-950 text-slate-700 dark:text-slate-300 border-slate-300 dark:border-slate-700 hover:border-teal-600'
                            }`}
                          >
                            {opt.label}
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  <div className="pt-2">
                    <button
                      type="submit"
                      className="w-full px-6 py-3.5 text-sm font-semibold text-white bg-teal-700 hover:bg-teal-800 dark:bg-teal-600 dark:hover:bg-teal-500 rounded-xl transition-colors"
                    >
                      {t.bookingSection.submitBtn}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </section>

        {/* 06. VERIFIED PATIENT REVIEWS, TIMINGS & EMBEDDED GOOGLE MAP */}
        <section id="reviews" className="py-16 lg:py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
              <div className="max-w-2xl">
                <p className="text-sm font-medium text-teal-700 dark:text-teal-400">
                  {t.reviewsSection.kicker}
                </p>
                <h2 className="mt-2 font-display text-2xl sm:text-3xl font-bold tracking-tight text-slate-900 dark:text-white text-balance">
                  {t.reviewsSection.title}
                </h2>
                <p className="mt-2.5 text-sm sm:text-base text-slate-600 dark:text-slate-300">
                  {t.reviewsSection.subtitle}
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-6 py-3 px-5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 tabular-nums">
                <div>
                  <span className="block text-xs text-slate-500 dark:text-slate-400">
                    {t.reviewsSection.ratingLabel}
                  </span>
                  <span className="font-display text-xl font-bold text-slate-900 dark:text-white inline-flex items-center gap-1.5">
                    {CLINIC_INFO.rating} / 5.0
                    <Star className="w-4 h-4 fill-amber-400 text-amber-400" aria-hidden="true" />
                  </span>
                </div>
                <div className="h-8 w-px bg-slate-200 dark:bg-slate-800" aria-hidden="true" />
                <div>
                  <span className="block text-xs text-slate-500 dark:text-slate-400">
                    {t.reviewsSection.satisfactionLabel}
                  </span>
                  <span className="font-display text-xl font-bold text-slate-900 dark:text-white">
                    {CLINIC_INFO.satisfaction}
                  </span>
                </div>
                <div className="h-8 w-px bg-slate-200 dark:bg-slate-800" aria-hidden="true" />
                <div>
                  <span className="block text-xs text-slate-500 dark:text-slate-400">
                    {t.reviewsSection.waitTimeLabel}
                  </span>
                  <span className="font-display text-xl font-bold text-slate-900 dark:text-white">
                    {CLINIC_INFO.avgWaitTime}
                  </span>
                </div>
              </div>
            </div>

            {/* Verified Patient Testimonials */}
            <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-6">
              {PATIENT_REVIEWS.map((review) => (
                <article
                  key={review.id}
                  className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center gap-1 text-amber-400" aria-label={`${review.rating} out of 5 stars`}>
                      {Array.from({ length: review.rating }).map((_, idx) => (
                        <Star key={idx} className="w-4 h-4 fill-current" />
                      ))}
                    </div>
                    <p className="mt-4 text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
                      “{review.quote}”
                    </p>
                  </div>

                  <div className="mt-6 pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full overflow-hidden bg-slate-200 dark:bg-slate-800 shrink-0">
                      <ResilientImage
                        src={review.avatar}
                        alt={review.name}
                        fallbackTitle={review.name}
                        className="w-full h-full object-cover object-top"
                      />
                    </div>
                    <div className="min-w-0">
                      <p className="text-sm font-semibold text-slate-900 dark:text-slate-100 truncate">
                        {review.name}
                      </p>
                      <p className="text-xs text-slate-500 dark:text-slate-400 truncate">
                        {review.treatment} · {review.dateLabel}
                      </p>
                    </div>
                  </div>
                </article>
              ))}
            </div>

            {/* Clinic Timings Table & Embedded Google Map */}
            <div className="mt-12 grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
              <div className="lg:col-span-5 p-6 sm:p-8 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 flex flex-col justify-between">
                <div>
                  <h3 className="font-display text-xl font-semibold text-slate-900 dark:text-slate-100">
                    {t.reviewsSection.timingsTitle}
                  </h3>
                  <p className="mt-1.5 text-sm text-slate-600 dark:text-slate-300">
                    {CLINIC_INFO.address}
                  </p>

                  <div className="mt-6 divide-y divide-slate-200 dark:divide-slate-800 text-sm">
                    {CLINIC_SCHEDULE.map((row) => (
                      <div
                        key={row.day.en}
                        className="py-3.5 flex items-center justify-between gap-4"
                      >
                        <div>
                          <span className="font-medium text-slate-900 dark:text-slate-100 block">
                            {row.day[language]}
                          </span>
                          <span className="text-xs text-slate-500 dark:text-slate-400">
                            {row.note[language]}
                          </span>
                        </div>
                        <span className="font-medium text-slate-700 dark:text-slate-200 tabular-nums text-end">
                          {row.hours}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="mt-6 pt-5 border-t border-slate-200 dark:border-slate-800 flex flex-wrap gap-3">
                  <a
                    href={CLINIC_INFO.googleMapsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-2.5 text-sm font-semibold text-white bg-teal-700 hover:bg-teal-800 dark:bg-teal-600 dark:hover:bg-teal-500 rounded-xl transition-colors whitespace-nowrap"
                  >
                    <MapPin className="w-4 h-4 shrink-0" />
                    <span>{t.reviewsSection.directionsBtn}</span>
                  </a>
                </div>
              </div>

              <div className="lg:col-span-7 rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 flex flex-col min-h-[360px]">
                <iframe
                  title="Siraj Dental Clinic Quetta Google Maps Location"
                  src={CLINIC_INFO.googleMapsEmbedUrl}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="w-full flex-1 min-h-[320px] border-0"
                />
                <div className="px-5 py-3.5 bg-slate-50 dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800 flex flex-wrap items-center justify-between gap-3 text-xs">
                  <span className="text-slate-600 dark:text-slate-300 font-medium">
                    Google Maps Listing: {CLINIC_INFO.mapsListingTitle} ({CLINIC_INFO.coordinates.lat}, {CLINIC_INFO.coordinates.lng})
                  </span>
                  <a
                    href={CLINIC_INFO.googleMapsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 font-semibold text-teal-700 dark:text-teal-400 hover:underline whitespace-nowrap"
                  >
                    <span>{t.reviewsSection.openMapsBtn}</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* QUIET FOOTER */}
      <footer className="bg-white dark:bg-slate-950 border-t border-slate-200 dark:border-slate-800 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pb-8 border-b border-slate-200 dark:border-slate-800">
            <div>
              <p className="font-display text-lg font-bold text-slate-900 dark:text-white">
                {t.clinicName}
              </p>
              <p className="mt-2 text-sm text-slate-600 dark:text-slate-400 leading-relaxed max-w-sm">
                {t.footer.tagline}
              </p>
            </div>

            <div>
              <p className="text-xs font-semibold text-slate-900 dark:text-slate-100">
                {t.footer.addressLabel}
              </p>
              <p className="mt-2 text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                {CLINIC_INFO.address}
              </p>
              <a
                href={CLINIC_INFO.googleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-2 inline-flex items-center gap-1 text-xs font-medium text-teal-700 dark:text-teal-400 hover:underline"
              >
                <span>{t.reviewsSection.directionsBtn}</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </a>
            </div>

            <div>
              <p className="text-xs font-semibold text-slate-900 dark:text-slate-100">
                {t.footer.contactLabel}
              </p>
              <div className="mt-2 space-y-1.5 text-sm">
                <div>
                  <a
                    href={CLINIC_INFO.telHref}
                    className="text-slate-700 dark:text-slate-300 hover:text-teal-700 dark:hover:text-teal-400 font-medium tabular-nums"
                  >
                    {CLINIC_INFO.phoneDisplay}
                  </a>
                </div>
                <div>
                  <a
                    href={CLINIC_INFO.whatsappDirectHref}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-emerald-700 dark:text-emerald-400 hover:underline font-medium"
                  >
                    WhatsApp Appointment Desk
                  </a>
                </div>
                <p className="text-xs text-slate-500 dark:text-slate-400 tabular-nums">
                  Booking Helplines: {CLINIC_INFO.helplines}
                </p>
              </div>
            </div>
          </div>

          <div className="pt-6 flex flex-wrap items-center justify-between gap-4 text-xs text-slate-500 dark:text-slate-400">
            <p>
              © {new Date().getFullYear()} {CLINIC_INFO.name}. {t.footer.rights}
            </p>
            <div className="flex items-center gap-5">
              <button
                type="button"
                onClick={() => setPrivacyOpen(true)}
                className="hover:text-slate-900 dark:hover:text-slate-200 underline underline-offset-2 transition-colors"
              >
                {t.footer.privacyPolicy}
              </button>
              <span>{t.footer.credit}</span>
            </div>
          </div>
        </div>
      </footer>

      <BookingModal
        booking={confirmedBooking}
        onClose={() => setConfirmedBooking(null)}
        t={t}
      />

      <PrivacyPolicyModal
        isOpen={privacyOpen}
        onClose={() => setPrivacyOpen(false)}
      />
    </div>
  );
}
