import { cn } from '@/lib/utils';
import { CheckIcon, CopyIcon } from '@phosphor-icons/react';
import { useTranslations } from 'next-intl';

export default function ExportBlock({
  title,
  text,
  onCopy,
  copied,
}: {
  title: string;
  text: string;
  onCopy: () => void;
  copied: boolean;
}) {
  const t = useTranslations('ExportBlock');
  const disabled = text.trim().length === 0;

  const textValue = text || 'Empty.';

  return (
    <div className="border-foreground/10 bg-element rounded-2xl border p-3">
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-foreground/90 text-xs font-semibold">{title}</p>
          <p className="text-foreground/50 mt-1 text-[11px]">{t('ready')}</p>
        </div>

        <button
          type="button"
          onClick={onCopy}
          disabled={disabled}
          className={cn(
            'border-foreground/10 inline-flex items-center gap-2 rounded-xl border px-3 py-2 text-xs',
            disabled
              ? 'bg-foreground/5 text-foreground/35 cursor-not-allowed opacity-60'
              : 'bg-foreground/5 text-foreground/80 hover:bg-foreground/10',
            'focus:ring-accent/40 focus:ring-2 focus:outline-none',
          )}
        >
          {copied ? (
            <>
              <CheckIcon size={16} weight="bold" className="text-accent" /> {t('copied')}
            </>
          ) : (
            <>
              <CopyIcon size={16} /> {t('copy')}
            </>
          )}
        </button>
      </div>

      <textarea
        readOnly
        value={textValue}
        rows={8}
        className={cn(
          'border-foreground/10 bg-background/40 mt-3 max-h-55 w-full overflow-auto rounded-xl border p-3',
          'text-foreground/85 font-mono text-[12px] leading-5',
        )}
      ></textarea>
    </div>
  );
}
