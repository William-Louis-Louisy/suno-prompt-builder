import { useTranslations } from 'next-intl';
import React from 'react';
import HeroGrid from './HeroGrid';
import HeroBlob from './HeroBlob';

export default function HeroAbout() {
  const t = useTranslations('AboutPage.hero');
  return (
    <div className="relative">
      <HeroGrid />
      <HeroBlob />
      <div className="overflow-hidden">
        <div className="mx-auto px-6 pt-36 pb-32 sm:pt-60 lg:px-8 lg:pt-32">
          <div className="mx-auto max-w-2xl gap-x-14 overflow-hidden lg:mx-0 lg:flex lg:max-w-none lg:items-center">
            {/* Content */}
            <div className="w-full max-w-xl lg:shrink-0 xl:max-w-2xl">
              <h1 className="text-foreground text-4xl font-bold tracking-tight sm:text-6xl">
                {t('title')}
              </h1>
              <p className="text-foreground/90 relative mt-6 text-lg leading-8 sm:max-w-md lg:max-w-none">
                {t('subtitle')}
              </p>
            </div>

            {/* Image grid */}
            <div className="mt-14 flex justify-end gap-8 sm:-mt-44 sm:justify-start sm:pl-20 lg:mt-0 lg:pl-0">
              <div className="ml-auto w-44 flex-none space-y-8 pt-32 sm:ml-0 sm:pt-80 lg:order-last lg:pt-36 xl:order-0 xl:pt-80">
                <div className="relative">
                  <img
                    alt=""
                    src="https://ucarecdn.com/9141bd32-8c75-4fd2-ba01-bcf896bfe248/-/format/auto/-/quality/smart/"
                    className="aspect-2/3 w-full rounded-xl bg-gray-900/5 object-cover shadow-lg"
                  />
                  <div className="pointer-events-none absolute inset-0 rounded-xl ring-1 ring-gray-900/10 ring-inset" />
                </div>
              </div>
              <div className="mr-auto w-44 flex-none space-y-8 sm:mr-0 sm:pt-52 lg:pt-36">
                <div className="relative">
                  <img
                    alt=""
                    src="https://ucarecdn.com/3aec9de0-0e25-4f28-8eae-a11f1b418c4a/-/format/auto/-/quality/smart/"
                    className="aspect-2/3 w-full rounded-xl bg-gray-900/5 object-cover shadow-lg"
                  />
                  <div className="pointer-events-none absolute inset-0 rounded-xl ring-1 ring-gray-900/10 ring-inset" />
                </div>
                <div className="relative">
                  <img
                    alt=""
                    src="https://ucarecdn.com/0f8cb04f-f381-4246-b0cb-0eda4318039f/-/format/auto/-/quality/smart/"
                    className="aspect-2/3 w-full rounded-xl bg-gray-900/5 object-cover shadow-lg"
                  />
                  <div className="pointer-events-none absolute inset-0 rounded-xl ring-1 ring-gray-900/10 ring-inset" />
                </div>
              </div>
              <div className="w-44 flex-none space-y-8 pt-32 sm:pt-0">
                <div className="relative">
                  <img
                    alt=""
                    src="https://ucarecdn.com/2e44470a-fb2d-4523-971c-c64ab6cbb740/-/format/auto/-/quality/smart/"
                    className="aspect-2/3 w-full rounded-xl bg-gray-900/5 object-cover shadow-lg"
                  />
                  <div className="pointer-events-none absolute inset-0 rounded-xl ring-1 ring-gray-900/10 ring-inset" />
                </div>
                <div className="relative">
                  <img
                    alt=""
                    src="https://ucarecdn.com/294f8bc4-5c0e-4fe2-8c75-352339a05ccd/-/format/auto/-/quality/smart/"
                    className="aspect-2/3 w-full rounded-xl bg-gray-900/5 object-cover shadow-lg"
                  />
                  <div className="pointer-events-none absolute inset-0 rounded-xl ring-1 ring-gray-900/10 ring-inset" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
