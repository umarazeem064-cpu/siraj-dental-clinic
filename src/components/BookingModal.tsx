import { CheckCircle2, MessageCircle, X } from 'lucide-react';
import { CLINIC_INFO } from '../data/clinicData';
import type { TranslationBundle } from '../data/translations';

export interface BookingDetails {
  patientName: string;
  phone: string;
  treatmentTitle: string;
  preferredDate: string;
  timeSlot: string;
  symptoms: string;
}

interface BookingModalProps {
  booking: BookingDetails | null;
  onClose: () => void;
  t: TranslationBundle;
}

export function BookingModal({ booking, onClose, t }: BookingModalProps) {
  if (!booking) return null;

  const whatsappMessage = [
    `Assalam-o-Alaikum ${CLINIC_INFO.name}, I would like to confirm my dental appointment:`,
    `• Patient Name: ${booking.patientName}`,
    `• Phone / WhatsApp: ${booking.phone}`,
    `• Treatment: ${booking.treatmentTitle}`,
    `• Preferred Date: ${booking.preferredDate}`,
    `• Preferred Time: ${booking.timeSlot}`,
    `• Symptoms / Urgency: ${booking.symptoms}`,
  ].join('\n');

  const whatsappHref = `${CLINIC_INFO.whatsappBase}?text=${encodeURIComponent(whatsappMessage)}`;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-xs"
      role="dialog"
      aria-modal="true"
      aria-labelledby="booking-modal-title"
      onClick={onClose}
    >
      <div
        className="w-full max-w-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 md:p-8 shadow-xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-start justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-teal-50 dark:bg-teal-950/60 text-teal-700 dark:text-teal-400 flex items-center justify-center shrink-0">
              <CheckCircle2 className="w-6 h-6" />
            </div>
            <div>
              <h2
                id="booking-modal-title"
                className="font-display text-lg md:text-xl font-semibold text-slate-900 dark:text-slate-100"
              >
                {t.bookingSection.modalTitle}
              </h2>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                {CLINIC_INFO.name} · {CLINIC_INFO.city}
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close modal"
            className="p-2 rounded-lg text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-100 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <p className="mt-4 text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
          {t.bookingSection.modalSubtitle}
        </p>

        <div className="mt-5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-800 p-4 space-y-2.5 text-sm">
          <div className="flex justify-between gap-4">
            <span className="text-slate-500 dark:text-slate-400">{t.bookingSection.fullName}</span>
            <span className="font-medium text-slate-900 dark:text-slate-100 text-end">
              {booking.patientName}
            </span>
          </div>
          <div className="flex justify-between gap-4">
            <span className="text-slate-500 dark:text-slate-400">{t.bookingSection.phone}</span>
            <span className="font-medium text-slate-900 dark:text-slate-100 tabular-nums text-end">
              {booking.phone}
            </span>
          </div>
          <div className="flex justify-between gap-4">
            <span className="text-slate-500 dark:text-slate-400">{t.bookingSection.treatment}</span>
            <span className="font-medium text-slate-900 dark:text-slate-100 text-end">
              {booking.treatmentTitle}
            </span>
          </div>
          <div className="flex justify-between gap-4">
            <span className="text-slate-500 dark:text-slate-400">{t.bookingSection.date}</span>
            <span className="font-medium text-slate-900 dark:text-slate-100 tabular-nums text-end">
              {booking.preferredDate} · {booking.timeSlot}
            </span>
          </div>
          <div className="flex justify-between gap-4">
            <span className="text-slate-500 dark:text-slate-400">{t.bookingSection.symptoms}</span>
            <span className="font-medium text-teal-700 dark:text-teal-400 text-end">
              {booking.symptoms}
            </span>
          </div>
        </div>

        <div className="mt-6 flex flex-col sm:flex-row gap-3">
          <a
            href={whatsappHref}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 inline-flex items-center justify-center gap-2 px-5 py-3 text-sm font-semibold text-white bg-emerald-600 hover:bg-emerald-700 dark:bg-emerald-600 dark:hover:bg-emerald-500 rounded-xl transition-colors whitespace-nowrap"
          >
            <MessageCircle className="w-4 h-4 shrink-0" />
            <span>{t.bookingSection.sendWhatsapp}</span>
          </a>
          <button
            type="button"
            onClick={onClose}
            className="px-5 py-3 text-sm font-medium text-slate-700 dark:text-slate-200 bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 rounded-xl transition-colors whitespace-nowrap"
          >
            {t.bookingSection.closeBtn}
          </button>
        </div>
      </div>
    </div>
  );
}
