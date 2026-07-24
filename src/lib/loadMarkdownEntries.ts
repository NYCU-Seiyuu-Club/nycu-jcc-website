export interface MarkdownEntry {
  frontmatter: Record<string, string>;
  content: string;
}

function parseFrontmatter(yamlBlock: string): Record<string, string> {
  const result: Record<string, string> = {};
  for (const line of yamlBlock.split(/\r?\n/)) {
    const match = line.match(/^([A-Za-z0-9_]+):\s?(.*)$/);
    if (!match) continue;
    const [, key, rawValue] = match;
    const trimmed = rawValue.trim();
    const isQuoted =
      (trimmed.startsWith('"') && trimmed.endsWith('"')) ||
      (trimmed.startsWith("'") && trimmed.endsWith("'"));
    result[key] = isQuoted ? trimmed.slice(1, -1) : trimmed;
  }
  return result;
}

/** 把一份 CMS 產生的 .md 檔內容拆成 frontmatter 跟內文 */
export function parseMarkdownFile(raw: string): MarkdownEntry {
  const match = raw.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n?([\s\S]*)$/);
  if (!match) return { frontmatter: {}, content: raw.trim() };
  return { frontmatter: parseFrontmatter(match[1]), content: match[2].trim() };
}
