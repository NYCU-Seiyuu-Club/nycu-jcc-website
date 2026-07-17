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
    <section className="relative flex h-screen w-full items-center justify-center overflow-hidden">
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
