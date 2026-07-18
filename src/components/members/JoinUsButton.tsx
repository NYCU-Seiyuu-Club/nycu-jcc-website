import { motion } from 'framer-motion';
import { UserPlus } from 'lucide-react';
import { JOIN_US_URL } from '../../lib/constants';

export default function JoinUsButton() {
  return (
    <motion.div
      className="fixed bottom-10 right-10 z-50 h-20 w-20 sm:bottom-12 sm:right-12"
      initial={{ opacity: 0, scale: 0.4, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.4, type: 'spring', stiffness: 200, damping: 16 }}
    >
      <motion.span
        className="absolute inset-0 rounded-full bg-amber-400"
        animate={{ scale: [1, 1.4, 1], opacity: [0.45, 0, 0.45] }}
        transition={{ duration: 2.4, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.a
        href={JOIN_US_URL}
        whileHover={{ scale: 1.08, rotate: -3 }}
        whileTap={{ scale: 0.94 }}
        className="relative flex h-20 w-20 flex-col items-center justify-center gap-1 rounded-full bg-gradient-to-br from-amber-400 via-orange-400 to-rose-400 text-white shadow-lg shadow-orange-500/40 ring-4 ring-white"
      >
        <UserPlus className="h-6 w-6" strokeWidth={2.5} />
        <span className="text-xs font-bold leading-none tracking-wide">加入我們</span>
      </motion.a>
    </motion.div>
  );
}
