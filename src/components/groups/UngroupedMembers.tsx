import type { Member } from '../../data/members';
import { getGroupMembers } from '../../lib/groupMembers';
import MemberCard from './MemberCard';

type UngroupedMembersProps = {
  members: Member[];
};

export default function UngroupedMembers({ members }: UngroupedMembersProps) {
  const entries = getGroupMembers(members, null);

  return (
    <div>
      <h1 className="text-center text-3xl font-bold text-gray-900">其他</h1>
      <p className="mt-2 text-center text-gray-500">尚未加入特定分組的幹部與社員</p>

      <div className="mt-10 grid grid-cols-[repeat(auto-fill,minmax(140px,1fr))] gap-4 sm:gap-6">
        {entries.map((entry) => (
          <MemberCard key={entry.key} entry={entry} />
        ))}
      </div>

      {entries.length === 0 && (
        <p className="mt-8 text-center text-gray-400">目前沒有未分組的成員。</p>
      )}
    </div>
  );
}
