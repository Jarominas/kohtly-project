export interface HeaderLink {
  readonly label: string;
  readonly href: string;
}

export const HEADER_LINKS: HeaderLink[] = [
  { label: 'Home', href: '/' },
  { label: 'Features', href: '/features' },
  { label: 'Pricing', href: '/pricing' },
] as const;
