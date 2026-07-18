import {
  CURRENT_TERM_ID,
  getAllHonorMembers,
  type GroupRoleEntry,
  type HonorMemberWithTerm,
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
  /** 例如「前組長」「前副組長」「前活動長」，顯示在頭像右上角的小標籤 */
  cornerBadge?: string;
}

interface PoolMember {
  key: string;
  slug: string;
  name: string;
  photo: string;
  groups: MemberGroupId[];
  currentGroupRoles: GroupRoleEntry[];
  formerGroupRoles: GroupRoleEntry[];
  href?: string;
  title?: string;
  status?: MemberStatus;
  isExecutive: boolean;
}

export const ACTIVITY_LEAD_SLUG = 'events';

/**
 * honor_members.ts 是「每屆各自存一筆」，同一人做兩屆會有兩筆紀錄。
 * 這裡把同 slug 的紀錄合併成一筆：
 * - 基本資料（照片、姓名、title 等）用最新一筆，優先當前屆，否則用最後出現的那屆。
 * - 職位拆成「目前屆的職位」跟「過去屆曾經有過的職位」兩份，這樣換屆或卸任時，
 *   才能正確分辨「現在還是組長」跟「以前當過組長、現在不是了」，
 *   而不是用一個全域的 active/stepped_down 蓋過所有小組的顯示。
 */
function getExecutivePool(): PoolMember[] {
  const bySlug = new Map<string, HonorMemberWithTerm[]>();

  for (const entry of getAllHonorMembers()) {
    const list = bySlug.get(entry.slug) ?? [];
    list.push(entry);
    bySlug.set(entry.slug, list);
  }

  return Array.from(bySlug.values()).map((records) => {
    const current = records.find((record) => record.termId === CURRENT_TERM_ID);
    const everGraduated = records.some((record) => record.status === 'graduated');
    const latest = current ?? records[records.length - 1];

    const currentGroupRoles = current?.groupRoles ?? [];
    const formerGroupRoles = records
      .filter((record) => record.termId !== CURRENT_TERM_ID)
      .flatMap((record) => record.groupRoles ?? []);

    return {
      key: `exec-${latest.slug}`,
      slug: latest.slug,
      name: latest.name,
      photo: latest.photo,
      groups: latest.groups,
      currentGroupRoles,
      formerGroupRoles,
      href: `/special-thanks/${latest.termId}/${latest.slug}`,
      title: latest.titles.join('・'),
      status: everGraduated ? 'graduated' : current ? 'active' : 'stepped_down',
      isExecutive: true,
    };
  });
}

function getRegularPool(others: Member[]): PoolMember[] {
  return others.map((member) => ({
    key: `member-${member.slug}`,
    slug: member.slug,
    name: member.name,
    photo: member.photo,
    groups: member.groups,
    currentGroupRoles: [],
    formerGroupRoles: [],
    href: undefined,
    title: undefined,
    status: member.status,
    isExecutive: false,
  }));
}

function toEntry(member: PoolMember, groupId: MemberGroupId | null): GroupMemberEntry {
  if (groupId === null) {
    const isFormerActivityLead = member.slug === ACTIVITY_LEAD_SLUG && member.status !== 'active';
    return {
      key: member.key,
      slug: member.slug,
      name: member.name,
      photo: member.photo,
      href: member.href,
      title: member.title,
      status: member.status,
      isLeader: false,
      isDeputyLeader: false,
      isHighlighted: false,
      isExecutive: member.isExecutive,
      cornerBadge: isFormerActivityLead ? '前活動長' : undefined,
    };
  }

  const currentRole = member.currentGroupRoles.find((r) => r.groupId === groupId)?.role;
  const formerRole = member.formerGroupRoles.find((r) => r.groupId === groupId)?.role;

  const isLeader = currentRole === '組長';
  const isDeputyLeader = currentRole === '副組長';
  const cornerBadge = !currentRole && formerRole ? `前${formerRole}` : undefined;

  return {
    key: member.key,
    slug: member.slug,
    name: member.name,
    photo: member.photo,
    href: member.href,
    title: isLeader || isDeputyLeader ? member.title : undefined,
    status: member.status,
    isLeader,
    isDeputyLeader,
    isHighlighted: false,
    isExecutive: member.isExecutive,
    cornerBadge,
  };
}

/**
 * groupId 傳 null 代表沒分組的成員（groups 為空陣列）。
 * 組長／副組長只反映「目前屆」在這個小組的職位；卸任後仍會出現在名單中，
 * 但只有「這個人曾經在這個小組擔任過職位」才會標示「前組長」／「前副組長」，
 * 單純只是小組一般成員的話不會有任何職位相關的標示。
 */
export function getGroupMembers(others: Member[], groupId: MemberGroupId | null): GroupMemberEntry[] {
  const pool = [...getExecutivePool(), ...getRegularPool(others)];

  const filtered =
    groupId === null
      ? pool.filter((member) => member.groups.length === 0)
      : pool.filter((member) => member.groups.includes(groupId));

  const entries = filtered.map((member) => toEntry(member, groupId));

  return entries.sort((a, b) => {
    const rank = (entry: GroupMemberEntry) =>
      entry.isLeader ? 0 : entry.isDeputyLeader ? 1 : entry.cornerBadge ? 2 : 3;
    return rank(a) - rank(b);
  });
}

/**
 * 活動長是全社性質的角色（固定對應 honor_members.ts 裡 slug 為 'events' 的人），跟小組無關。
 * 只回傳「目前」的活動長；卸任後這裡改回傳 undefined（欄位變空），
 * 本人會改在一般成員名單裡出現，並在頭像右上角標示「前活動長」小標籤。
 */
export function getActivityLead(): GroupMemberEntry | undefined {
  const member = getExecutivePool().find((entry) => entry.slug === ACTIVITY_LEAD_SLUG);
  if (!member || member.status !== 'active') return undefined;

  return {
    key: member.key,
    slug: member.slug,
    name: member.name,
    photo: member.photo,
    href: member.href,
    title: member.title,
    status: member.status,
    isLeader: false,
    isDeputyLeader: false,
    isHighlighted: true,
    isExecutive: true,
  };
}
