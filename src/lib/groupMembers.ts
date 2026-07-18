import {
  CURRENT_TERM_ID,
  getAllHonorMembers,
  type MemberGroupId,
  type MemberStatus,
} from '../data/honor_members';
import type { Member } from '../data/members';

export interface GroupMemberEntry {
  key: string;
  slug: string;
  name: string;
  photo: string;
  href?: string;
  title?: string;
  status?: MemberStatus;
  isLeader: boolean;
  isDeputyLeader: boolean;
  isHighlighted: boolean;
  isExecutive: boolean;
}

/**
 * groupId 傳 null 代表沒分組的成員（groups 為空陣列）。
 * 只取現任幹部（當前屆）的資料，一般社員則包含已畢業者（會標示畢業戳章）。
 */
export function getGroupMembers(
  others: Member[],
  groupId: MemberGroupId | null,
  leaderSlug?: string,
  deputyLeaderSlug?: string,
): GroupMemberEntry[] {
  const executives = getAllHonorMembers()
    .filter((member) => member.termId === CURRENT_TERM_ID)
    .map((member) => ({
      key: `exec-${member.slug}`,
      slug: member.slug,
      name: member.name,
      photo: member.photo,
      groups: member.groups,
      href: `/special-thanks/${member.termId}/${member.slug}`,
      title: member.titles.join('・') as string | undefined,
      status: member.status,
      isExecutive: true,
    }));

  const regulars = others.map((member) => ({
    key: `member-${member.slug}`,
    slug: member.slug,
    name: member.name,
    photo: member.photo,
    groups: member.groups,
    href: undefined as string | undefined,
    title: undefined as string | undefined,
    status: member.status,
    isExecutive: false,
  }));

  const pool = [...executives, ...regulars];

  const filtered =
    groupId === null
      ? pool.filter((member) => member.groups.length === 0)
      : pool.filter((member) => member.groups.includes(groupId));

  const entries: GroupMemberEntry[] = filtered.map((member) => {
    const isLeader = member.slug === leaderSlug;
    const isDeputyLeader = member.slug === deputyLeaderSlug;
    return {
      key: member.key,
      slug: member.slug,
      name: member.name,
      photo: member.photo,
      href: member.href,
      title: isLeader || isDeputyLeader || groupId === null ? member.title : undefined,
      status: member.status,
      isLeader,
      isDeputyLeader,
      isHighlighted: false,
      isExecutive: member.isExecutive,
    };
  });

  return entries.sort((a, b) => {
    const rank = (entry: GroupMemberEntry) => (entry.isLeader ? 0 : entry.isDeputyLeader ? 1 : 2);
    return rank(a) - rank(b);
  });
}
