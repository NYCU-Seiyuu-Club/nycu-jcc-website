import type { ComponentType } from 'react';
import { InstagramLogoIcon } from '@radix-ui/react-icons';
import { Mail } from 'lucide-react';
import { FacebookIcon, XIcon } from '../icons/SocialIcons';
import type { SocialLink } from '../../data/about';

const SOCIAL_ICONS: Record<SocialLink['label'], ComponentType<{ className?: string }>> = {
  X: XIcon,
  Instagram: InstagramLogoIcon,
  Facebook: FacebookIcon,
  Contact: Mail,
};

type SocialLinksProps = {
  links: SocialLink[];
  variant?: 'light' | 'dark';
};

export default function SocialLinks({ links, variant = 'light' }: SocialLinksProps) {
  const iconClass =
    variant === 'dark'
      ? 'bg-white/10 text-gray-300 hover:bg-white hover:text-gray-900'
      : 'bg-gray-100 text-gray-600 hover:bg-gray-900 hover:text-white';

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
            className={`flex h-11 w-11 items-center justify-center rounded-full transition-colors ${iconClass}`}
          >
            <Icon className="h-5 w-5" />
          </a>
        );
      })}
    </div>
  );
}
