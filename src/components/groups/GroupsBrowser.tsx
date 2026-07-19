import { motion } from 'framer-motion';
import type { AboutHighlight } from '../../data/about';
import type { Member } from '../../data/members';
import type { MemberGroupId } from '../../data/honor_members';
import { ACTIVITY_LEAD_SLUG, getActivityLead, getGroupMembers } from '../../lib/groupMembers';
import MemberCard from './MemberCard';

type GroupsBrowserProps = {
  group: AboutHighlight;
  members: Member[];
};

export default function GroupsBrowser({ group, members }: GroupsBrowserProps) {
  const activityLeadEntry = getActivityLead();

  const entries = getGroupMembers(members, group.slug as MemberGroupId)
    .filter((entry) => !(entry.slug === ACTIVITY_LEAD_SLUG && activityLeadEntry))
    .map((entry) =>
      entry.slug === ACTIVITY_LEAD_SLUG && !activityLeadEntry
        ? { ...entry, cornerBadge: entry.cornerBadge ?? '前活動長' }
        : entry,
    );

  const leaderEntry = entries.find((entry) => entry.isLeader);
  const deputyEntry = entries.find((entry) => entry.isDeputyLeader);
  const regularEntries = entries.filter((entry) => !entry.isLeader && !entry.isDeputyLeader);

  const officerSlots = [
    { label: '活動長', entry: activityLeadEntry, optional: false },
    { label: '小組組長', entry: leaderEntry, optional: false },
    { label: '副組長', entry: deputyEntry, optional: true },
  ].filter((slot) => slot.entry || !slot.optional);

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
      <div
        className="mx-auto mt-3 h-1.5 w-28 rounded-full"
        style={{ backgroundColor: group.accentColor }}
      />

      <div
        className="mx-auto mt-6 max-w-2xl space-y-3 rounded-2xl p-6 text-center text-lg leading-relaxed text-gray-600"
        style={{ backgroundColor: `${group.accentColor}40` }}
      >
        {group.content.map((paragraph, i) => (
          <p key={i}>{paragraph}</p>
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-60px' }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
        className="mt-20"
      >
        <div className="mx-auto flex max-w-5xl flex-wrap justify-center gap-10 sm:gap-16">
          {officerSlots.map(({ label, entry }) => (
            <div key={label} className="w-48 sm:w-1/4">
              <p className="mb-3 text-center text-xl font-semibold uppercase tracking-widest text-gray-900">
                {label}
              </p>
              <MemberCard entry={entry} />
            </div>
          ))}
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-60px' }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
        className="relative left-1/2 mt-20 w-screen -translate-x-1/2 py-14"
        style={{ backgroundColor: `${group.accentColor}40` }}
      >
        <h2 className="text-center text-2xl font-bold text-gray-900">小組成員</h2>
        <div className="mx-auto mt-6 grid max-w-6xl grid-cols-[repeat(auto-fill,minmax(140px,1fr))] gap-4 px-6 sm:gap-6">
          {regularEntries.map((entry) => (
            <MemberCard key={entry.key} entry={entry} />
          ))}
        </div>
        {regularEntries.length === 0 && (
          <p className="mt-6 text-center text-gray-400">目前沒有其他成員資料。</p>
        )}

        {group.gallery.length > 0 && (
          <div className="mx-auto mt-14 max-w-6xl border-t-2 border-gray-300 px-6 pt-14">
            <h2 className="text-center text-2xl font-bold text-gray-900">相簿</h2>
            <div className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-3">
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
    </motion.div>
  );
}
