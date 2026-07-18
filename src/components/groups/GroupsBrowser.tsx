import { motion } from 'framer-motion';
import type { AboutHighlight } from '../../data/about';
import { CURRENT_TERM_ID, findHonorMember, PLACEHOLDER_PHOTO } from '../../data/honor_members';

type GroupsBrowserProps = {
  group: AboutHighlight;
};

export default function GroupsBrowser({ group }: GroupsBrowserProps) {
  const leader = group.leaderSlug ? findHonorMember(CURRENT_TERM_ID, group.leaderSlug) : undefined;
  const deputyLeader = group.deputyLeaderSlug
    ? findHonorMember(CURRENT_TERM_ID, group.deputyLeaderSlug)
    : undefined;

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, ease: 'easeOut' }}
    >
      <div className="relative left-1/2 w-screen -translate-x-1/2">
        <img
          src={group.groupPhoto}
          alt={`${group.title}大合照`}
          className="h-80 w-full object-cover sm:h-[36rem]"
        />
      </div>

      <h1 className="mt-8 text-center text-3xl font-bold text-gray-900">{group.title}</h1>

      <dl className="mt-6 flex flex-wrap justify-center gap-10 text-center">
        <div className="flex flex-col items-center">
          <img
            src={leader?.photo ?? PLACEHOLDER_PHOTO}
            alt={leader?.name ?? '組長'}
            className="h-20 w-20 rounded-full border-2 border-gray-200 object-cover"
          />
          <dt className="mt-2 text-xs font-semibold uppercase tracking-widest text-gray-400">
            組長
          </dt>
          <dd className="mt-1 text-lg font-semibold text-gray-800">{leader?.name ?? '待補充'}</dd>
        </div>
        {deputyLeader && (
          <div className="flex flex-col items-center">
            <img
              src={deputyLeader.photo}
              alt={deputyLeader.name}
              className="h-20 w-20 rounded-full border-2 border-gray-200 object-cover"
            />
            <dt className="mt-2 text-xs font-semibold uppercase tracking-widest text-gray-400">
              副組長
            </dt>
            <dd className="mt-1 text-lg font-semibold text-gray-800">{deputyLeader.name}</dd>
          </div>
        )}
      </dl>

      <div className="mx-auto mt-10 max-w-2xl space-y-3 text-center leading-relaxed text-gray-600">
        {group.content.map((paragraph, i) => (
          <p key={i}>{paragraph}</p>
        ))}
      </div>

      {group.gallery.length > 0 && (
        <div className="relative left-1/2 mt-16 w-screen -translate-x-1/2">
          <h2 className="text-center text-xl font-bold text-gray-900">相簿</h2>
          <div className="mx-auto mt-6 grid max-w-6xl grid-cols-2 gap-4 px-6 sm:grid-cols-3">
            {group.gallery.map((src, i) => (
              <img
                key={i}
                src={src}
                alt={`${group.title}活動照片 ${i + 1}`}
                className="aspect-[4/3] w-full rounded-xl object-cover"
              />
            ))}
          </div>
        </div>
      )}
    </motion.div>
  );
}
