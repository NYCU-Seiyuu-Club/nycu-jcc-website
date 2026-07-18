import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, Menu, X } from 'lucide-react';
import { aboutHighlights } from '../data/about';

type NavLink = {
  href: string;
  label: string;
  children?: { href: string; label: string }[];
};

const NAV_LINKS: NavLink[] = [
  { href: '/about', label: 'About' },
  {
    href: '/groups',
    label: 'Groups',
    children: aboutHighlights.map((group) => ({
      href: `/groups/${group.slug}`,
      label: group.title,
    })),
  },
  { href: '/announce', label: 'Announce' },
  { href: '/members', label: 'Members' },
  { href: '/special-thanks', label: 'Special Thanks' },
  { href: '/blog', label: 'Blog' },
];

type NavbarProps = {
  currentPath: string;
  variant: 'overlay' | 'solid';
};

const REVEAL_THRESHOLD = 60;

export default function Navbar({ currentPath, variant }: NavbarProps) {
  const [visible, setVisible] = useState(variant === 'solid');
  const [menuOpen, setMenuOpen] = useState(false);
  const [mobileGroupsOpen, setMobileGroupsOpen] = useState(false);

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
          {NAV_LINKS.map((link) =>
            link.children ? (
              <li key={link.href} className="group relative">
                <a
                  href={link.href}
                  className={`flex items-center gap-1 text-sm font-medium transition-colors ${
                    isActive(link.href) ? 'text-gray-900' : 'text-gray-500 hover:text-gray-900'
                  }`}
                >
                  {link.label}
                  <ChevronDown className="h-3.5 w-3.5" />
                </a>

                <ul className="invisible absolute left-1/2 top-full -translate-x-1/2 pt-3 opacity-0 transition-all duration-150 group-hover:visible group-hover:opacity-100">
                  <div className="flex flex-col gap-1 rounded-xl border border-gray-100 bg-white p-2 shadow-lg">
                    {link.children.map((child) => (
                      <li key={child.href}>
                        <a
                          href={child.href}
                          className={`block whitespace-nowrap rounded-lg px-4 py-2 text-sm font-medium transition-colors ${
                            isActive(child.href)
                              ? 'bg-gray-100 text-gray-900'
                              : 'text-gray-500 hover:bg-gray-100 hover:text-gray-900'
                          }`}
                        >
                          {child.label}
                        </a>
                      </li>
                    ))}
                  </div>
                </ul>
              </li>
            ) : (
              <li key={link.href}>
                <a
                  href={link.href}
                  className={`text-sm font-medium transition-colors ${
                    isActive(link.href) ? 'text-gray-900' : 'text-gray-500 hover:text-gray-900'
                  }`}
                >
                  {link.label}
                </a>
              </li>
            ),
          )}
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
            {NAV_LINKS.map((link) =>
              link.children ? (
                <li key={link.href}>
                  <button
                    type="button"
                    onClick={() => setMobileGroupsOpen((open) => !open)}
                    className={`flex w-full items-center justify-between py-2 text-sm font-medium ${
                      isActive(link.href) ? 'text-gray-900' : 'text-gray-500'
                    }`}
                  >
                    {link.label}
                    <ChevronDown
                      className={`h-4 w-4 transition-transform ${mobileGroupsOpen ? 'rotate-180' : ''}`}
                    />
                  </button>
                  <AnimatePresence>
                    {mobileGroupsOpen && (
                      <motion.ul
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        className="flex flex-col gap-1 overflow-hidden pl-4"
                      >
                        {link.children.map((child) => (
                          <li key={child.href}>
                            <a
                              href={child.href}
                              className={`block py-2 text-sm font-medium ${
                                isActive(child.href) ? 'text-gray-900' : 'text-gray-500'
                              }`}
                            >
                              {child.label}
                            </a>
                          </li>
                        ))}
                      </motion.ul>
                    )}
                  </AnimatePresence>
                </li>
              ) : (
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
              ),
            )}
          </motion.ul>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
