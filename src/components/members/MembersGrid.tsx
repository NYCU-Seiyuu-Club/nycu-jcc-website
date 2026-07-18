import { useMemo, useState } from 'react';
import { MEMBER_GROUPS, type MemberGroupId, type MemberStatus, type HonorMemberTerm } from '../../data/honor_members';
import { mergeHonorMembersBySlug } from '../../lib/honorMembersView';
import type { Member } from '../../data/members';

const ALL_FILTER = 'all';

type GridEntry = {
  key: string;
  slug: string;
  name: string;
  photo: string;
  groups: MemberGroupId[];
  status?: MemberStatus;
  isExecutive: boolean;
  href?: string;
  titleLines: string[];
};

type MembersGridProps = {
  terms: HonorMemberTerm[];
  others: Member[];
};

const STATUS_LABEL: Record<'graduated' | 'stepped_down', string> = {
  graduated: '畢業',
  stepped_down: '卸任',
};

function getTermLabel(terms: HonorMemberTerm[], termId: string): string {
  return terms.find((term) => term.id === termId)?.label ?? termId;
}

function sortEntries(entries: GridEntry[]): GridEntry[] {
  return [...entries].sort((a, b) => {
    const statusScore = (e: GridEntry) => (e.status === 'graduated' ? 1 : 0);
    if (statusScore(a) !== statusScore(b)) return statusScore(a) - statusScore(b);

    const groupScore = (e: GridEntry) => (e.groups.length > 0 ? 1 : 0);
    if (groupScore(a) !== groupScore(b)) return groupScore(a) - groupScore(b);

    return 0;
  });
}

export default function MembersGrid({ terms, others }: MembersGridProps) {
  const [filter, setFilter] = useState<typeof ALL_FILTER | MemberGroupId>(ALL_FILTER);

  const allEntries = useMemo<GridEntry[]>(() => {
    const executiveEntries: GridEntry[] = mergeHonorMembersBySlug(terms).map((member) => ({
      key: `exec-${member.slug}`,
      slug: member.slug,
      name: member.name,
      photo: member.photo,
      groups: member.groups,
      status: member.status,
      isExecutive: true,
      href: `/special-thanks/${member.termId}/${member.slug}`,
      titleLines: [...member.termEntries]
        .reverse()
        .map((entry) => `${getTermLabel(terms, entry.termId)}　${entry.titles.join('・')}`),
    }));

    const otherEntries: GridEntry[] = others.map((member) => ({
      key: `member-${member.slug}`,
      slug: member.slug,
      name: member.name,
      photo: member.photo,
      groups: member.groups,
      status: member.status,
      isExecutive: false,
      titleLines: ['社員'],
    }));

    return [...executiveEntries, ...otherEntries];
  }, [terms, others]);

  const visibleEntries = useMemo(() => {
    const filtered =
      filter === ALL_FILTER
        ? allEntries
        : allEntries.filter((entry) => entry.groups.includes(filter));
    return sortEntries(filtered);
  }, [allEntries, filter]);

  const ungroupedEntries = useMemo(
    () => visibleEntries.filter((entry) => entry.groups.length === 0),
    [visibleEntries],
  );

  const renderCard = (entry: GridEntry) => {
    const isGraduated = entry.status === 'graduated';
    const isSteppedDown = entry.status === 'stepped_down';
    const borderClass = isGraduated
      ? 'border-slate-400'
      : entry.isExecutive
        ? 'border-amber-400'
        : 'border-gray-200';

    const card = (
      <>
        <div
          className={`relative aspect-square w-full overflow-hidden rounded-2xl border-4 bg-gray-50 ${borderClass}`}
        >
          <img
            src={entry.photo}
            alt={entry.name}
            className={`h-full w-full object-cover ${entry.isExecutive ? 'transition-transform group-hover:scale-105' : ''}`}
          />
          {isGraduated && (
            <div className="pointer-events-none absolute inset-0 flex items-center justify-center bg-black/30">
              <span className="rotate-[-20deg] rounded border-2 border-white px-2 py-0.5 text-sm font-bold uppercase tracking-widest text-white">
                {STATUS_LABEL.graduated}
              </span>
            </div>
          )}
          {isSteppedDown && (
            <span className="pointer-events-none absolute right-1 top-1 rounded-full bg-gray-900/70 px-2 py-0.5 text-[10px] font-semibold tracking-wide text-white">
              {STATUS_LABEL.stepped_down}
            </span>
          )}
        </div>
        <p className="mt-2 text-sm font-semibold text-gray-800">{entry.name}</p>
        <div className="text-xs text-gray-500 mt-1">
          {entry.titleLines.map((line, i) => (
            <p key={i}>{line}</p>
          ))}
        </div>
      </>
    );

    if (entry.isExecutive && entry.href) {
      return (
        <a
          key={entry.key}
          href={entry.href}
          className="group flex flex-col items-center text-center"
        >
          {card}
        </a>
      );
    }

    return (
      <div key={entry.key} className="flex flex-col items-center text-center">
        {card}
      </div>
    );
  };

  const renderGrid = (entries: GridEntry[]) => (
    <div className="grid grid-cols-[repeat(auto-fill,minmax(140px,1fr))] gap-4 sm:gap-6">
      {entries.map(renderCard)}
    </div>
  );

  return (
    <div>
      <div className="flex flex-wrap justify-center gap-2 mb-10">
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
            key={group.id}
            type="button"
            onClick={() => setFilter(group.id)}
            className={`rounded-full px-4 py-1.5 text-sm font-medium transition-colors ${
              filter === group.id
                ? 'bg-gray-900 text-white'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            {group.label}
          </button>
        ))}
      </div>

      {filter === ALL_FILTER ? (
        <div className="mt-8 space-y-16">
          {ungroupedEntries.length > 0 && renderGrid(ungroupedEntries)}

          {MEMBER_GROUPS.map((group) => {
            const groupEntries = visibleEntries.filter((entry) =>
              entry.groups.includes(group.id),
            );
            if (groupEntries.length === 0) return null;

            return (
              <section key={group.id}>
                <h2 className="mb-4 text-3xl font-bold text-gray-900">{group.label}</h2>
                {renderGrid(groupEntries)}
              </section>
            );
          })}
        </div>
      ) : (
        <div className="mt-8">{renderGrid(visibleEntries)}</div>
      )}

      {visibleEntries.length === 0 && (
        <p className="mt-8 text-center text-gray-400">目前沒有成員資料。</p>
      )}
    </div>
  );
}
