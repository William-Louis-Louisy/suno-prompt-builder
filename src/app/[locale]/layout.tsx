import '@/app/globals.css';
import type { Metadata } from 'next';
import Providers from '../providers';
import { hasLocale } from 'next-intl';
import { notFound } from 'next/navigation';
import { routing } from '../../i18n/routing';
import { Inter, Hanken_Grotesk } from 'next/font/google';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
});
const hankenGrotesk = Hanken_Grotesk({
  subsets: ['latin'],
  variable: '--font-hanken-grotesk',
});

export const metadata: Metadata = {
  title: 'SunoPromptBuilder',
  description:
    'SunoPromptBuilder is a tool designed to help you create and manage prompts for Suno. It provides an intuitive interface for crafting effective prompts.',
};

export default async function LocaleLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}>) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  let messages;
  try {
    messages = (await import(`@/messages/${locale}.json`)).default;
  } catch (error) {
    notFound();
    console.error(error);
  }

  return (
    <html lang={locale} suppressHydrationWarning>
      <body className={`antialiased ${inter.variable} ${hankenGrotesk.variable}`}>
        <Providers locale={locale} messages={messages}>
          {children}
        </Providers>
      </body>
    </html>
  );
}
