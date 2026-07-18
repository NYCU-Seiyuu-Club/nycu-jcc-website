import { motion } from 'framer-motion';
import { ChevronDown } from 'lucide-react';

type HeroProps = {
  clubName: string;
};

export default function Hero({ clubName }: HeroProps) {
  const scrollToContent = () => {
    const target = document.getElementById('main-content');
    target?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="relative flex h-screen w-full flex-col items-center justify-center overflow-hidden">
      <div
        className="absolute inset-0 scale-110 bg-cover bg-center blur-md"
        style={{ backgroundImage: "url('/hero-bg.jpg')" }}
      />
      <div className="absolute inset-0 bg-black/40" />

      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
        className="relative z-10 px-6 text-center text-4xl font-bold tracking-wide text-white drop-shadow-lg sm:text-6xl"
      >
        {clubName}
      </motion.h1>

      <motion.a
        href="/about"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2, ease: 'easeOut' }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.96 }}
        className="relative z-10 mt-20 rounded-full border border-white/70 px-8 py-3 text-sm font-semibold tracking-widest text-white backdrop-blur-sm transition-colors hover:bg-white hover:text-gray-900 sm:text-base"
      >
        關於我們
      </motion.a>

      <motion.button
        type="button"
        aria-label="向下捲動"
        onClick={scrollToContent}
        className="absolute bottom-8 z-10 text-white"
        animate={{ y: [0, 12, 0] }}
        transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}
      >
        <ChevronDown size={40} />
      </motion.button>
    </section>
  );
}
