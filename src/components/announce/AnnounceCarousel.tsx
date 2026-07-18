import { useState, type WheelEvent } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import type { Announcement } from '../../data/announcements';

type AnnounceCarouselProps = {
  announcements: Announcement[];
};

export default function AnnounceCarousel({ announcements }: AnnounceCarouselProps) {
  const [index, setIndex] = useState(0);
  const count = announcements.length;
  const current = announcements[index];

  const goTo = (target: number) => setIndex(((target % count) + count) % count);
  const next = () => goTo(index + 1);
  const prev = () => goTo(index - 1);

  const handleWheel = (event: WheelEvent<HTMLDivElement>) => {
    if (!event.altKey) return;
    event.preventDefault();
    if (event.deltaY > 0 || event.deltaX > 0) next();
    else prev();
  };

  if (!current) return null;

  return (
    <div onWheel={handleWheel}>
      <div className="relative flex items-center justify-center gap-2 sm:gap-8">
        <button
          type="button"
          aria-label="上一則公告"
          onClick={prev}
          disabled={count < 2}
          className="rounded-full border-2 border-gray-300 p-2 text-gray-600 transition-colors hover:bg-gray-100 disabled:opacity-30 sm:p-3"
        >
          <ChevronLeft className="h-5 w-5 sm:h-7 sm:w-7" />
        </button>

        <div className="w-full max-w-4xl overflow-hidden">
          <AnimatePresence mode="wait">
            <motion.a
              key={current.slug}
              href={`/announce/${current.slug}`}
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -40 }}
              transition={{ duration: 0.3, ease: 'easeOut' }}
              className="group block overflow-hidden rounded-2xl border border-gray-200 shadow-sm transition-shadow hover:shadow-lg"
            >
              <div className="overflow-hidden">
                <img
                  src={current.coverImage}
                  alt={current.title}
                  className="h-64 w-full object-cover transition-transform duration-300 group-hover:scale-105 sm:h-96"
                />
              </div>
              <div className="p-5 sm:p-6">
                <div className="flex items-center gap-3 text-xs text-gray-400">
                  <span>{current.date}</span>
                  {current.tag && (
                    <span className="rounded-full bg-gray-100 px-2 py-0.5 font-medium text-gray-500">
                      {current.tag}
                    </span>
                  )}
                </div>
                <h3 className="mt-2 text-xl font-semibold text-gray-900 sm:text-2xl">
                  {current.title}
                </h3>
                <p className="mt-2 text-sm text-gray-600 sm:text-base">{current.summary}</p>
              </div>
            </motion.a>
          </AnimatePresence>
        </div>

        <button
          type="button"
          aria-label="下一則公告"
          onClick={next}
          disabled={count < 2}
          className="rounded-full border-2 border-gray-300 p-2 text-gray-600 transition-colors hover:bg-gray-100 disabled:opacity-30 sm:p-3"
        >
          <ChevronRight className="h-5 w-5 sm:h-7 sm:w-7" />
        </button>
      </div>

      {count > 1 && (
        <div className="mt-6 flex justify-center gap-2">
          {announcements.map((item, i) => (
            <button
              key={item.slug}
              type="button"
              aria-label={`前往第 ${i + 1} 則公告`}
              onClick={() => goTo(i)}
              className={`h-2.5 rounded-full transition-all ${
                i === index ? 'w-6 bg-gray-900' : 'w-2.5 bg-gray-300 hover:bg-gray-400'
              }`}
            />
          ))}
        </div>
      )}
    </div>
  );
}
