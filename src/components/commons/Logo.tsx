import React from 'react';
import Image from 'next/image';
import { Link } from '@/i18n/navigation';

export default function Logo() {
  return (
    <Link href={'/'} className="inline-flex items-center gap-2">
      <Image src="/logo_spb.png" alt="SunoPromptBuilder Logo" width={36} height={36} />
      <span className="from-accent bg-linear-to-br to-[#ff4433] bg-clip-text font-black text-transparent">
        SunoPromptBuilder
      </span>
    </Link>
  );
}
