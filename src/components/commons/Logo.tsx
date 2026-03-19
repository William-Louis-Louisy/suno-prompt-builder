import React from 'react';
import Image from 'next/image';
import { Link } from '@/i18n/navigation';

export default function Logo() {
  return (
    <Link href={'/'} className="inline-flex items-center gap-2">
      <Image
        src="/images/logo_spb.png"
        alt="SunoPromptBuilder Logo"
        width={36}
        height={36}
        priority
      />
      <span className="from-accent to-accent-alt bg-linear-to-br bg-clip-text font-black text-transparent">
        SunoPromptBuilder
      </span>
    </Link>
  );
}
