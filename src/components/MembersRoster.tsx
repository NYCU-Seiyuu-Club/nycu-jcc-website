import { useMemo, useState } from 'react';
import { MEMBER_GROUPS, type MemberGroup, type MemberWithTerm } from '../data/members';

const ALL_FILTER = 'all';

type MembersRosterProps = {
  members: MemberWithTerm[];
};

function sortMembers(members: MemberWithTerm[]): MemberWithTerm[] {
  return [...members].sort((a, b) => {
    const statusScore = (m: MemberWithTerm) => (m.status === 'alumni' ? 1 : 0);
    if (statusScore(a) !== statusScore(b)) return statusScore(a) - statusScore(b);

    const groupScore = (m: MemberWithTerm) => (m.group ? 1 : 0);
    if (groupScore(a) !== groupScore(b)) return groupScore(a) - groupScore(b);

    return 0;
  });
}

export default function MembersRoster({ members }: MembersRosterProps) {
  const [filter, setFilter] = useState<typeof ALL_FILTER | MemberGroup>(ALL_FILTER);

  const visibleMembers = useMemo(() => {
    const filtered =
      filter === ALL_FILTER ? members : members.filter((member) => member.group === filter);
    return sortMembers(filtered);
  }, [members, filter]);

  return (
    <div>
      <div className="flex flex-wrap justify-center gap-2">
        <button
          type="button"
          onClick={() => setFilter(ALL_FILTER)}
          className={`rounded-full px-4 py-1.5 text-sm font-medium transition-colors ${
            filter === ALL_FILTER
              ? 'bg-gray-900 text-white'
              : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
          }`}
        >
          全部
        </button>
        {MEMBER_GROUPS.map((group) => (
          <button
            key={group}
            type="button"
            onClick={() => setFilter(group)}
            className={`rounded-full px-4 py-1.5 text-sm font-medium transition-colors ${
              filter === group
                ? 'bg-gray-900 text-white'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            {group}
          </button>
        ))}
      </div>

      <div className="mt-8 grid grid-cols-[repeat(auto-fill,minmax(140px,1fr))] gap-4 sm:gap-6">
        {visibleMembers.map((member) => {
          const isAlumni = member.status === 'alumni';
          const isExecutive = member.titles.length > 0;
          const borderClass = isAlumni
            ? 'border-slate-400'
            : isExecutive
              ? 'border-amber-400'
              : 'border-gray-200';

          return (
            <a
              key={`${member.termId}-${member.slug}`}
              href={`/special-thanks/${member.termId}/${member.slug}`}
              className="group flex flex-col items-center text-center"
            >
              <div
                className={`relative aspect-square w-full overflow-hidden rounded-2xl border-4 bg-gray-50 ${borderClass}`}
              >
                <img
                  src={member.photo}
                  alt={member.name}
                  className="h-full w-full object-cover transition-transform group-hover:scale-105"
                />
                {isAlumni && (
                  <div className="pointer-events-none absolute inset-0 flex items-center justify-center bg-black/30">
                    <span className="rotate-[-20deg] rounded border-2 border-white px-2 py-0.5 text-sm font-bold uppercase tracking-widest text-white">
                      畢業
                    </span>
                  </div>
                )}
              </div>
              <p className="mt-2 text-sm font-semibold text-gray-800">{member.name}</p>
              <p className="text-xs text-gray-500">
                {member.titles.length > 0 ? member.titles.join('・') : '社員'}
              </p>
            </a>
          );
        })}
      </div>

      {visibleMembers.length === 0 && (
        <p className="mt-8 text-center text-gray-400">目前沒有成員資料。</p>
      )}
    </div>
  );
}
