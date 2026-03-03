import React from 'react';
import { useTranslations } from 'next-intl';

export default function HowAbout() {
  const t = useTranslations('AboutPage.sections.how');
  const steps = [
    t('steps.buildStructure'),
    t('steps.writeLyrics'),
    t('steps.addTags'),
    t('steps.copyExports'),
  ];
  return (
    <div className="mx-auto mt-8 max-w-7xl px-6 sm:mt-16 lg:px-8">
      <div className="mx-auto max-w-2xl lg:mx-0">
        <h2 className="text-foreground text-2xl font-bold tracking-tight md:text-4xl">
          {t('title')}
        </h2>
      </div>
      <dl className="mx-auto mt-5 grid max-w-2xl grid-cols-1 gap-8 text-base leading-7 sm:grid-cols-2 lg:mx-0 lg:max-w-none lg:grid-cols-4">
        {steps.map((step) => (
          <div key={step} className="border-foreground/10 rounded-lg border px-4 py-8">
            <dt className="text-foreground/90">{step}</dt>
          </div>
        ))}
      </dl>
    </div>
  );
}
