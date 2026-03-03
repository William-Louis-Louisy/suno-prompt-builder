'use client';

import Modal from './Modal';
import * as React from 'react';
import { cn } from '@/lib/utils';

type ConfirmModalProps = {
  open: boolean;
  title: string;
  description?: string;
  confirmText?: string;
  cancelText?: string;
  tone?: 'danger' | 'default';
  onConfirm: () => void;
  onCancel: () => void;
};

export default function ConfirmModal({
  open,
  title,
  description,
  confirmText = 'Confirm',
  cancelText = 'Cancel',
  tone = 'danger',
  onConfirm,
  onCancel,
}: ConfirmModalProps) {
  return (
    <Modal open={open} onClose={onCancel} labelledby="confirm-modal" title={title}>
      {description ? <p className="text-foreground/80 text-sm">{description}</p> : null}

      <div className="mt-6 flex justify-end gap-2">
        <button
          onClick={onCancel}
          className={cn(
            'border-foreground/10 bg-foreground/5 text-foreground/85 rounded-xl border px-4 py-2 text-sm',
            'hover:bg-foreground/10 focus:ring-accent/40 focus:ring-2 focus:outline-none',
          )}
        >
          {cancelText}
        </button>

        <button
          onClick={onConfirm}
          className={cn(
            'rounded-xl px-4 py-2 text-sm text-white',
            tone === 'danger' ? 'bg-red-600 hover:bg-red-700' : 'bg-accent hover:opacity-90',
            'focus:ring-accent/40 focus:ring-2 focus:outline-none',
          )}
        >
          {confirmText}
        </button>
      </div>
    </Modal>
  );
}
