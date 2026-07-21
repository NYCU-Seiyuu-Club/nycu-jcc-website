// 之後會改串 CMS，目前先用這份 JSON 模擬內容。
import { aboutHighlights } from './about';

export interface JournalEntry {
  slug: string;
  title: string;
  summary: string;
  content: string;
  coverImage: string;
  date: string;
  /** 內容種類，例如：社課、活動、交流 */
  category: string;
  /** 負責分組，不填代表不特別歸屬某組（全部） */
  group?: string;
}

const PLACEHOLDER_COVER = '/members/notfound.png';

const [UTAGE] = aboutHighlights.map((group) => group.title);

export const journalEntries: JournalEntry[] = [
  {
    slug: 'test-journal-entry',
    title: '（測試）迎新烤肉活動紀實',
    summary: '這是一篇測試用的活動日誌，之後會替換成真正的活動紀錄與照片。',
    content:
      '這是測試內容第一段，用來確認活動日誌的排版與分類篩選功能是否正常運作。\n\n這是測試內容第二段，之後會補上實際的活動照片與心得分享。',
    coverImage: PLACEHOLDER_COVER,
    date: '2026-05-10',
    category: '活動',
    group: UTAGE,
  },
  {
    slug: 'test-journal-entry-2',
    title: '（測試）社課花絮：日語會話初體驗',
    summary: '這是第二篇測試用的活動日誌，用來確認同時有多個分類與分組時的篩選效果。',
    content:
      '這是測試內容第一段，這篇沒有特定分組，代表全部分組都適用。\n\n這是測試內容第二段，之後會補上實際的社課花絮內容。',
    coverImage: PLACEHOLDER_COVER,
    date: '2026-05-18',
    category: '社課',
  },
];
