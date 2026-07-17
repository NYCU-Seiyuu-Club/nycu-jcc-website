import type { ComponentType } from 'react';
import { InstagramLogoIcon } from '@radix-ui/react-icons';
import { FacebookIcon, XIcon } from './icons/SocialIcons';
import type { SocialLink } from '../data/about';

const SOCIAL_ICONS: Record<SocialLink['label'], ComponentType<{ className?: string }>> = {
  X: XIcon,
  Instagram: InstagramLogoIcon,
  Facebook: FacebookIcon,
};

type SocialLinksProps = {
  links: SocialLink[];
};

export default function SocialLinks({ links }: SocialLinksProps) {
  return (
    <div className="flex justify-center gap-4">
      {links.map((link) => {
        const Icon = SOCIAL_ICONS[link.label];
        return (
          <a
            key={link.label}
            href={link.url}
            target="_blank"
            rel="noreferrer"
            aria-label={link.label}
            className="flex h-11 w-11 items-center justify-center rounded-full bg-gray-100 text-gray-600 transition-colors hover:bg-gray-900 hover:text-white"
          >
            <Icon className="h-5 w-5" />
          </a>
        );
      })}
    </div>
  );
}
