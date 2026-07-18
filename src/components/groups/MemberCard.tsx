import type { GroupMemberEntry } from '../../lib/groupMembers';

type MemberCardProps = {
  entry?: GroupMemberEntry;
};

export default function MemberCard({ entry }: MemberCardProps) {
  if (!entry) {
    return (
      <div className="flex flex-col items-center text-center">
        <div className="aspect-square w-full rounded-2xl border-2 border-dashed border-gray-200 bg-gray-50" />
      </div>
    );
  }

  const isGraduated = entry.status === 'graduated';
  const isOfficer = entry.isLeader || entry.isDeputyLeader || entry.isHighlighted || entry.isExecutive;
  const borderClass = isGraduated ? 'border-slate-400' : isOfficer ? 'border-amber-400' : 'border-gray-200';
  const card = (
    <div className="flex flex-col items-center text-center">
      <div
        className={`relative aspect-square w-full overflow-hidden rounded-2xl border-4 bg-gray-50 ${borderClass}`}
      >
        <img
          src={entry.photo}
          alt={entry.name}
          className="h-full w-full object-cover transition-transform group-hover:scale-105"
        />
        {isGraduated && (
          <div className="pointer-events-none absolute inset-0 flex items-center justify-center bg-black/30">
            <span className="rotate-[-20deg] rounded border-2 border-white px-2 py-0.5 text-sm font-bold uppercase tracking-widest text-white">
              畢業
            </span>
          </div>
        )}
        {entry.cornerBadge && (
          <span className="pointer-events-none absolute right-1 top-1 rounded-full bg-gray-900/70 px-2 py-0.5 text-[10px] font-semibold tracking-wide text-white">
            {entry.cornerBadge}
          </span>
        )}
      </div>
      <p className="mt-2 text-base font-semibold text-gray-800">{entry.name}</p>
      {entry.title && <p className="mt-0.5 text-sm text-gray-500">{entry.title}</p>}
    </div>
  );

  if (entry.href) {
    return (
      <a href={entry.href} className="group">
        {card}
      </a>
    );
  }

  return card;
}
