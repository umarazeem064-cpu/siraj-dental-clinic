import { useEffect, useState } from 'react';

interface PreloaderProps {
  clinicName: string;
}

export function Preloader({ clinicName }: PreloaderProps) {
  const [fading, setFading] = useState(false);
  const [removed, setRemoved] = useState(false);

  useEffect(() => {
    const fadeTimer = window.setTimeout(() => setFading(true), 320);
    const removeTimer = window.setTimeout(() => setRemoved(true), 680);
    return () => {
      window.clearTimeout(fadeTimer);
      window.clearTimeout(removeTimer);
    };
  }, []);

  if (removed) return null;

  return (
    <div
      aria-hidden="true"
      className={`fixed inset-0 z-50 flex flex-col items-center justify-center bg-slate-50 dark:bg-slate-950 transition-opacity duration-300 ease-out pointer-events-none ${
        fading ? 'opacity-0' : 'opacity-100'
      }`}
    >
      <div className="flex flex-col items-center gap-4">
        <div className="w-11 h-11 rounded-xl bg-teal-700 dark:bg-teal-500 flex items-center justify-center text-white shadow-sm">
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M7.5 4.5C5.6 4.5 4.2 6.1 4.4 8.2c.3 2.8 1.5 5.4 2.1 8.4.4 1.8 1.2 3.1 2.2 3.1.9 0 1.4-1.3 1.9-3 .4-1.3.9-2 1.4-2s1 .7 1.4 2c.5 1.7 1 3 1.9 3 1 0 1.8-1.3 2.2-3.1.6-3 1.8-5.6 2.1-8.4.2-2.1-1.2-3.7-3.1-3.7-1.4 0-2.5.7-3.5 1.3-.6.3-1.4.3-2 0-1-.6-2.1-1.3-3.5-1.3Z"
            />
          </svg>
        </div>
        <div className="text-center">
          <p className="font-display text-base font-semibold tracking-tight text-slate-900 dark:text-slate-100">
            {clinicName}
          </p>
          <div className="mt-2.5 w-32 h-0.5 bg-slate-200 dark:bg-slate-800 rounded-full overflow-hidden mx-auto">
            <div className="h-full w-1/2 bg-teal-700 dark:bg-teal-400 rounded-full animate-pulse" />
          </div>
        </div>
      </div>
    </div>
  );
}
