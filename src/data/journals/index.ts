import { aboutHighlights } from '../about';
import { parseMarkdownFile } from '../../lib/loadMarkdownEntries';

const rawFiles = import.meta.glob('/src/data/journals/*.md', {
  eager: true,
  query: '?raw',
  import: 'default',
}) as Record<string, string>;

export interface JournalEntry {
  slug: string;
  title: string;
  summary: string;
  content: string;
  coverImage: string;
  date: string;
  category: string;
  group?: string;
}

const PLACEHOLDER_COVER = '/members/notfound.png';

const GROUP_CODE_TO_TITLE: Record<string, string> = Object.fromEntries(
  aboutHighlights.map((group) => [group.slug.toUpperCase(), group.title]),
);

function resolveGroup(code?: string): string | undefined {
  if (!code || code.toUpperCase() === 'NONE') return undefined;
  return GROUP_CODE_TO_TITLE[code.toUpperCase()];
}

function toDateString(value?: string): string {
  const d = value ? new Date(value) : new Date();
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${y}-${m}-${day}`;
}

export const journalEntries: JournalEntry[] = Object.values(rawFiles)
  .map(parseMarkdownFile)
  .map(({ frontmatter, content }) => ({
    slug: frontmatter.slug,
    title: frontmatter.title,
    summary: frontmatter.summary ?? '',
    content,
    coverImage: frontmatter.coverImage || PLACEHOLDER_COVER,
    date: toDateString(frontmatter.date),
    category: frontmatter.category ?? '',
    group: resolveGroup(frontmatter.group),
  }));
