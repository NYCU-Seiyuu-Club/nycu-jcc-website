import { motion } from 'framer-motion';
import { UserPlus } from 'lucide-react';
import { JOIN_US_URL } from '../lib/constants';

export default function HomeJoinUs() {
  return (
    <motion.section
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className="relative overflow-hidden bg-gradient-to-br from-amber-400 via-orange-400 to-rose-400 px-6 py-20 text-center text-white"
    >
      <div className="mx-auto max-w-2xl">
        <h2 className="text-3xl font-bold sm:text-4xl">加入我們</h2>
        <p className="mt-4 text-base text-white/90 sm:text-lg">
          不論你是日文初學者、動漫迷，還是想認識新朋友，都歡迎加入日本文化研究社，一起探索日本文化的各種面貌。
        </p>
        <motion.a
          href={JOIN_US_URL}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.96 }}
          className="mt-8 inline-flex items-center gap-2 rounded-full bg-white px-8 py-3 font-semibold text-orange-600 shadow-lg transition-shadow hover:shadow-xl"
        >
          <UserPlus className="h-5 w-5" />
          立即加入
        </motion.a>
      </div>
    </motion.section>
  );
}
