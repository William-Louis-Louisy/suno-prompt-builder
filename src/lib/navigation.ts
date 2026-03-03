interface INavigationLink {
  tradKey: string;
  url: string;
  header?: boolean;
}
export const navigationLinks: INavigationLink[] = [
  { tradKey: 'home', url: '/', header: false },
  { tradKey: 'about', url: '/about', header: true },
  { tradKey: 'suno', url: 'https://suno.com/', header: true },
];

export const footerLinks: INavigationLink[] = [
  { tradKey: 'about', url: '/about' },
  { tradKey: 'suno', url: 'https://suno.com/' },
  { tradKey: 'wiki', url: 'https://sunoaiwiki.com/' },
];
