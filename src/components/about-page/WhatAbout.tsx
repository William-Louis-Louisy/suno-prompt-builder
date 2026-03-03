import React from 'react';
import { useTranslations } from 'next-intl';

export default function WhatAbout() {
  const t = useTranslations('AboutPage.sections.what');
  return (
    <div className="mx-auto -mt-12 max-w-7xl px-6 sm:mt-0 lg:px-8 xl:-mt-8">
      <div className="mx-auto max-w-2xl lg:mx-0 lg:max-w-none">
        <h2 className="text-foreground text-2xl font-bold tracking-tight md:text-4xl">
          {t('title')}
        </h2>
        <div className="mt-5 flex flex-col gap-x-8 gap-y-20 lg:flex-row">
          <div className="lg:w-full lg:flex-auto">
            <p className="text-foreground/90 text-lg leading-8">{t('p1')}</p>
            <div className="text-foreground/70 mt-5 text-base leading-7">
              <p className="text-foreground/90 text-lg leading-8">{t('p2')}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
