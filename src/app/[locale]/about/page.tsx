import React from 'react';
import { useTranslations } from 'next-intl';
import HowAbout from '@/components/about-page/HowAbout';
import HeroAbout from '@/components/about-page/HeroAbout';
import WhatAbout from '@/components/about-page/WhatAbout';

export default function AboutPage() {
  const t = useTranslations('AboutPage');
  return (
    <div>
      <HeroAbout />
      <WhatAbout />
      <HowAbout />
      <div className="mt-8 sm:mt-16">
        <img
          alt=""
          src="https://ucarecdn.com/3b67998d-f214-49e9-97b7-a409a766db4c/-/format/auto/-/quality/smart/"
          className="aspect-5/2 w-full object-cover"
        />
      </div>
    </div>
  );
}
