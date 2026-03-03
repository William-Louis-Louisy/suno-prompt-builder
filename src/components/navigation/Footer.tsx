import React from 'react';
import Link from 'next/link';
import { useTranslations } from 'next-intl';
import { footerLinks } from '@/lib/navigation';

export default function Footer() {
  const t = useTranslations('FooterNavigation');
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-background">
      <div className="mx-auto max-w-7xl overflow-hidden px-6 py-8 sm:py-8 lg:px-8">
        <div className="flex justify-center space-x-10">
          {footerLinks.map((item) => {
            const isExternal = item.url.startsWith('https');

            return (
              <div key={item.tradKey} className="pb-6">
                <Link
                  href={item.url}
                  target={isExternal ? '_blank' : '_self'}
                  rel={isExternal ? 'noopener noreferrer' : undefined}
                  className="text-foreground/70 hover:text-foreground text-sm leading-6"
                >
                  {t(item.tradKey)}
                </Link>
              </div>
            );
          })}
        </div>
        <p className="text-foreground/70 mt-8 text-center text-xs leading-5">
          {currentYear} Made by{' '}
          <Link
            href="https://williamlouislouisy.com"
            target="_blank"
            className="duration-200 hover:font-semibold"
          >
            William Louis-Louisy
          </Link>
          .
        </p>
      </div>
    </footer>
  );
}
