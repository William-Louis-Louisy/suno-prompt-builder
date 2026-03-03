import { Disclosure, DisclosurePanel, DisclosureButton } from '@headlessui/react';
import Image from 'next/image';
import { cn } from '@/lib/utils';
import Logo from '../commons/Logo';
import { useTranslations } from 'next-intl';
import ThemeToggle from '../commons/ThemeToggle';
import LocaleSwitch from '../commons/LocaleSwitch';
import { Link, usePathname } from '@/i18n/navigation';
import { useSession, signOut } from 'next-auth/react';
import { ListIcon, XIcon } from '@phosphor-icons/react';
import MaxWidthWrapper from '../commons/MaxWidthWrapper';
import { navigationLinks } from '@/lib/navigation';

export default function Header() {
  const pathname = usePathname();
  const { data: session } = useSession();
  const t = useTranslations('Header');

  const filteredLinks = navigationLinks.filter((link) => link.header);

  const isLinkActive = (pathname: string, url: string) => {
    if (url === '/') return pathname === '/';
    return pathname === url || pathname.startsWith(`${url}/`);
  };

  return (
    <Disclosure as="nav" className={'bg-background fixed inset-x-0 top-0 z-50'}>
      {/* Header */}
      <MaxWidthWrapper>
        <header className="h-header flex items-center justify-between">
          <div className="flex">
            <Logo />
          </div>
          {/* Navigation */}
          <div className="flex w-full justify-end">
            <div className="hidden items-center justify-center lg:ml-6 lg:grid lg:grid-cols-2">
              {/** Here goes the navigation links */}
              {filteredLinks.map((link) => {
                const active = isLinkActive(pathname, link.url);
                const isExternal = link.url.startsWith('https');

                return (
                  <Link
                    key={link.tradKey}
                    target={isExternal ? '_blank' : '_self'}
                    rel={isExternal ? 'noopener noreferrer' : undefined}
                    href={link.url}
                    className={cn(
                      'font-hanken-grotesk flex h-16 items-center justify-center border-b-2 px-6 duration-200',
                      active
                        ? 'text-accent border-accent font-bold'
                        : 'text-foreground/60 hover:text-foreground/80 hover:border-foreground/20 border-transparent font-medium',
                    )}
                  >
                    {t(`navigation.${link.tradKey}`)}
                  </Link>
                );
              })}
            </div>
          </div>

          {/* Lang & Theme */}
          <div className="hidden sm:ml-6 sm:flex sm:items-center sm:gap-4">
            <ThemeToggle />
            <LocaleSwitch />

            {/* DropDown */}
            {/* {session ? (
              <Menu as="div" className="relative">
                <div>
                  <MenuButton className="relative cursor-pointer flex rounded-full text-sm focus:outline-none border border-transparent hover:border-element duration-150">
                    <span className="absolute -inset-1.5" />
                    <span className="sr-only">{t("openUserMenu")}</span>
                    <Image
                      alt="avatar"
                      src={
                        session?.user.image
                          ? session.user.image
                          : "/no-avatar.webp"
                      }
                      width={36}
                      height={36}
                      className="rounded-full"
                    />
                  </MenuButton>
                </div>
                <MenuItems
                  transition
                  className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-element py-1 shadow-lg ring-0 transition focus:outline-none data-[closed]:scale-95 data-[closed]:transform data-[closed]:opacity-0 data-[enter]:duration-200 data-[leave]:duration-75 data-[enter]:ease-out data-[leave]:ease-in"
                >
                  {session.user?.role === "ADMIN" && (
                    <MenuItem>
                      <Link
                        href="/admin"
                        className="block px-4 py-2 text-sm data-[focus]:bg-alternative data-[focus]:text-background"
                      >
                        Admin
                      </Link>
                    </MenuItem>
                  )}

                  <MenuItem>
                    <button
                      className="cursor-pointer flex items-center gap-2 w-full px-4 pt-2.5 pb-2 text-sm data-[focus]:bg-alternative data-[focus]:text-background"
                      onClick={() => signOut()}
                    >
                      <SignOut size={20} weight="bold" />
                      <span className="hidden md:flex">{t("logout")}</span>
                    </button>
                  </MenuItem>
                </MenuItems>
              </Menu>
            ) : (
              <button
                className="cursor-pointer text-background bg-alternative hover:bg-foreground duration-150 px-4 py-2 rounded-md"
                onClick={() => signIn("google")}
              >
                <SignIn className="flex md:hidden" size={20} weight="bold" />
                <span className="hidden md:flex">{t("login")}</span>
              </button>
            )} */}
          </div>

          {/* Mobile Menu Button */}
          <div className="-mr-2 flex items-center sm:hidden">
            <DisclosureButton className="group relative inline-flex items-center justify-center rounded-md p-2 focus:outline-none">
              <span className="absolute -inset-0.5" />
              <span className="sr-only">{t('openMainMenu')}</span>
              <ListIcon aria-hidden="true" className="block h-6 w-6 group-data-open:hidden" />
              <XIcon aria-hidden="true" className="hidden h-6 w-6 group-data-open:block" />
            </DisclosureButton>
          </div>
        </header>
      </MaxWidthWrapper>

      {/* Mobile Menu */}
      <DisclosurePanel className="h-page bg-background sm:hidden">
        <div className="h-full space-y-1">
          <div className="flex h-full flex-col items-center justify-center">
            <div className="absolute right-4 bottom-4 inline-flex items-center gap-4">
              <ThemeToggle />
              <LocaleSwitch />
            </div>
            {/** Here goes the navigation links wrapped in DisclosureButton */}
            <>
              {navigationLinks.map((link) => (
                <DisclosureButton
                  as={Link}
                  key={link.tradKey}
                  href={link.url}
                  className={cn(
                    'py-6 text-center text-xl',
                    pathname === link.url
                      ? 'text-accent font-bold'
                      : 'text-foreground/60 font-medium',
                  )}
                >
                  {t(`navigation.${link.tradKey}`)}
                </DisclosureButton>
              ))}
            </>
          </div>
        </div>
        {/* <div className="border-alternative border-t pt-4 pb-3">
          <div className="flex items-center px-4">
            <div className="shrink-0">
              <Image
                alt="avatar"
                src={session?.user.image ? session.user.image : '/no-avatar.webp'}
                width={36}
                height={36}
                className="rounded-full"
              />
            </div>
            <div className="ml-3">
              <div className="text-base font-medium text-gray-800">{session?.user.name}</div>
              <div className="text-sm font-medium text-gray-500">{session?.user.email}</div>
            </div>
          </div>
          <div className="mt-3 space-y-1">
            <DisclosureButton
              className="block px-4 py-2 text-base font-medium"
              onClick={() => signOut()}
            >
              {t('logout')}
            </DisclosureButton>
          </div>
        </div> */}
      </DisclosurePanel>
    </Disclosure>
  );
}
