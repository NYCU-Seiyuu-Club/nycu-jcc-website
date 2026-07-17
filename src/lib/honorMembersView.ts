import {
  attachHonorTermId,
  CURRENT_TERM_ID,
  type HonorMemberTerm,
  type HonorMemberWithTerm,
} from '../data/honor_members';

export interface HonorMemberTermEntry {
  termId: string;
  titles: string[];
}

/**
 * 同一個人可能橫跨多屆（例如這屆卸任、下屆又當了別的幹部）。
 * honor_members.ts 的資料還是「每屆各自一筆」，這裡把同一個 slug 的多筆紀錄合併成一張卡片，
 * 只要其中一屆是當前屆就視為現任，其餘屆別的職稱依序列出。
 */
export interface MergedHonorMember extends HonorMemberWithTerm {
  termEntries: HonorMemberTermEntry[];
}

export function mergeHonorMembersBySlug(terms: HonorMemberTerm[]): MergedHonorMember[] {
  const flat = terms.flatMap(attachHonorTermId);

  const bySlug = new Map<string, HonorMemberWithTerm[]>();
  for (const entry of flat) {
    const list = bySlug.get(entry.slug) ?? [];
    list.push(entry);
    bySlug.set(entry.slug, list);
  }

  return Array.from(bySlug.values()).map((entries) => {
    const primary = entries[0];
    const isGraduated = entries.some((entry) => entry.status === 'graduated');
    const isActive = entries.some((entry) => entry.termId === CURRENT_TERM_ID);

    return {
      ...primary,
      status: isGraduated ? 'graduated' : isActive ? 'active' : 'stepped_down',
      termEntries: entries.map((entry) => ({ termId: entry.termId, titles: entry.titles })),
    };
  });
}
