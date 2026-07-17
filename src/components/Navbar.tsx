import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';

const NAV_LINKS = [
  { href: '/members', label: 'Members' },
  { href: '/special-thanks', label: 'Special Thanks' },
  { href: '/about', label: 'About' },
  { href: '/blog', label: 'Blog' },
  { href: '/announce', label: 'Announce' },
];

type NavbarProps = {
  currentPath: string;
  variant: 'overlay' | 'solid';
};

const REVEAL_THRESHOLD = 60;

export default function Navbar({ currentPath, variant }: NavbarProps) {
  const [visible, setVisible] = useState(variant === 'solid');
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    if (variant !== 'overlay') return;

    const onScroll = () => setVisible(window.scrollY > REVEAL_THRESHOLD);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [variant]);

  const isActive = (href: string) =>
    href === '/' ? currentPath === '/' : currentPath.startsWith(href);

  return (
    <motion.nav
      initial={{ y: variant === 'overlay' ? -80 : 0, opacity: variant === 'overlay' ? 0 : 1 }}
      animate={{ y: visible ? 0 : -80, opacity: visible ? 1 : 0 }}
      transition={{ duration: 0.4, ease: 'easeOut' }}
      className="fixed inset-x-0 top-0 z-50 bg-white/90 backdrop-blur-md shadow-sm"
    >
      <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-3">
        <a href="/" className="flex items-center gap-2">
          <img src="/logo.webp" alt="社團 Logo" className="h-9 w-9 object-contain" />
          <span className="font-semibold text-gray-900">日本文化研究社</span>
        </a>

        <ul className="hidden items-center gap-8 md:flex">
          {NAV_LINKS.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className={`text-sm font-medium transition-colors ${
                  isActive(link.href)
                    ? 'text-gray-900'
                    : 'text-gray-500 hover:text-gray-900'
                }`}
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        <button
          type="button"
          aria-label="開啟選單"
          className="text-gray-900 md:hidden"
          onClick={() => setMenuOpen((open) => !open)}
        >
          {menuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      <AnimatePresence>
        {menuOpen && (
          <motion.ul
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="flex flex-col gap-1 overflow-hidden bg-white/95 px-6 pb-4 md:hidden"
          >
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  className={`block py-2 text-sm font-medium ${
                    isActive(link.href) ? 'text-gray-900' : 'text-gray-500'
                  }`}
                >
                  {link.label}
                </a>
              </li>
            ))}
          </motion.ul>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
