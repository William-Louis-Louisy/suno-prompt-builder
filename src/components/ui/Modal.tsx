'use client';

import * as React from 'react';
import { cn } from '@/lib/utils';
import { XIcon } from '@phosphor-icons/react';

type ModalProps = {
  open: boolean;
  title: string;
  onClose: () => void;
  children: React.ReactNode;
  labelledby?: string;
};

export default function Modal({ open, title, onClose, children, labelledby }: ModalProps) {
  if (!open) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby={labelledby}
      className={cn(
        'fixed inset-0 z-50 flex h-screen flex-col items-center justify-end',
        'bg-black/40 pt-6 backdrop-blur-sm md:justify-center',
      )}
      onMouseDown={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div
        className={cn(
          'border-foreground/10 bg-element w-full max-w-lg rounded-t-2xl border shadow-xl',
          'md:rounded-2xl',
        )}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="border-foreground/10 flex items-center justify-between border-b p-4">
          <h2 id={labelledby} className="text-foreground/95 text-sm font-semibold">
            {title}
          </h2>
          <button
            onClick={onClose}
            aria-label="Close"
            className={cn(
              'text-foreground/60 hover:bg-foreground/5 hover:text-foreground/80 rounded-xl p-2',
              'focus:ring-accent/40 focus:ring-2 focus:outline-none',
            )}
          >
            <XIcon size={18} />
          </button>
        </div>

        <div className="p-4">{children}</div>
      </div>
    </div>
  );
}
