'use client';

import { useState } from 'react';
import { Flag } from 'lucide-react';
import { ApiError } from '@/lib/apiClient';
import { REPORT_REASONS, type ReportReason } from '@/lib/reportApi';

interface ReportButtonProps {
  onReport: (reason: ReportReason) => Promise<void>;
  label?: string;
}

export function ReportButton({ onReport, label = 'Denunciar' }: ReportButtonProps) {
  const [open, setOpen] = useState(false);
  const [status, setStatus] = useState<'idle' | 'sending' | 'done'>('idle');
  const [error, setError] = useState<string | null>(null);

  const handlePick = (reason: ReportReason) => {
    setStatus('sending');
    setError(null);

    onReport(reason)
      .then(() => {
        setStatus('done');
        setOpen(false);
      })
      .catch((err) => {
        setStatus('idle');
        setError(
          err instanceof ApiError && err.status === 409
            ? 'Você já denunciou isso.'
            : 'Não foi possível enviar a denúncia.'
        );
      });
  };

  if (status === 'done') {
    return <span className="text-xs text-neutral-500">Denúncia enviada</span>;
  }

  return (
    <div className="relative inline-block">
      <button
        type="button"
        onClick={() => setOpen((prev) => !prev)}
        className="flex items-center gap-1 text-neutral-400 hover:text-orange-400 transition-colors text-xs"
      >
        <Flag className="w-3.5 h-3.5" />
        {label}
      </button>

      {open && (
        <div className="absolute z-10 mt-2 right-0 bg-neutral-900 border border-neutral-700 rounded-xl p-2 shadow-xl w-44">
          {REPORT_REASONS.map((r) => (
            <button
              key={r.value}
              type="button"
              onClick={() => handlePick(r.value)}
              disabled={status === 'sending'}
              className="block w-full text-left px-3 py-2 rounded-lg text-sm text-neutral-300 hover:bg-neutral-800 disabled:opacity-50 transition-colors"
            >
              {r.label}
            </button>
          ))}
        </div>
      )}

      {error && (
        <p className="absolute top-full mt-1 right-0 text-xs text-red-400 whitespace-nowrap">{error}</p>
      )}
    </div>
  );
}
