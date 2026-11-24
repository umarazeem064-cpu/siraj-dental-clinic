import { X } from 'lucide-react';
import { CLINIC_INFO } from '../data/clinicData';

interface PrivacyPolicyModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function PrivacyPolicyModal({ isOpen, onClose }: PrivacyPolicyModalProps) {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-xs"
      role="dialog"
      aria-modal="true"
      aria-labelledby="privacy-modal-title"
      onClick={onClose}
    >
      <div
        className="w-full max-w-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 md:p-8 shadow-xl text-slate-800 dark:text-slate-200 max-h-[85vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-start justify-between gap-4 pb-4 border-b border-slate-200 dark:border-slate-800">
          <div>
            <h2 id="privacy-modal-title" className="font-display text-xl font-semibold text-slate-900 dark:text-slate-100">
              Patient Privacy & Appointment Policy
            </h2>
            <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
              {CLINIC_INFO.name} · {CLINIC_INFO.shortAddress}
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close privacy policy"
            className="p-2 rounded-lg text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-100 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="mt-5 space-y-4 text-sm leading-relaxed text-slate-600 dark:text-slate-300">
          <div>
            <h3 className="font-semibold text-slate-900 dark:text-slate-100">1. Appointment Information</h3>
            <p className="mt-1">
              Details entered in the appointment form (patient name, phone number, selected dental procedure, preferred date/time, and symptom notes) are formatted directly in your browser so you can send your booking request to our front desk via WhatsApp.
            </p>
          </div>

          <div>
            <h3 className="font-semibold text-slate-900 dark:text-slate-100">2. Clinical Confidentiality</h3>
            <p className="mt-1">
              All clinical records, digital dental radiographs, and consultation histories at {CLINIC_INFO.name} are maintained under strict medical confidentiality by {CLINIC_INFO.leadDoctor} and authorized clinical staff.
            </p>
          </div>

          <div>
            <h3 className="font-semibold text-slate-900 dark:text-slate-100">3. Direct Communication</h3>
            <p className="mt-1">
              When you choose to message us on WhatsApp ({CLINIC_INFO.phoneDisplay}) or call our clinic line, standard WhatsApp or telecom carrier terms apply. We never share patient contact numbers with third-party marketers.
            </p>
          </div>

          <div>
            <h3 className="font-semibold text-slate-900 dark:text-slate-100">4. Questions or Updates</h3>
            <p className="mt-1">
              To update or confirm your appointment record, contact {CLINIC_INFO.name} directly at{' '}
              <a href={CLINIC_INFO.telHref} className="text-teal-700 dark:text-teal-400 underline font-medium">
                {CLINIC_INFO.phoneDisplay}
              </a>{' '}
              during clinic hours ({CLINIC_INFO.hoursSummary}).
            </p>
          </div>
        </div>

        <div className="mt-6 pt-4 border-t border-slate-200 dark:border-slate-800 flex justify-end">
          <button
            type="button"
            onClick={onClose}
            className="px-5 py-2.5 text-sm font-medium text-white bg-teal-700 hover:bg-teal-800 dark:bg-teal-600 dark:hover:bg-teal-500 rounded-lg transition-colors whitespace-nowrap"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
