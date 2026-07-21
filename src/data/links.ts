// 之後會改串 CMS，目前先用這份 JSON 模擬內容。
export interface ExternalLink {
  title: string;
  description: string;
  url: string;
  /** 顯示用的網域名稱，不用即時解析網址，避免佔位連結（#）出錯 */
  domain: string;
  image: string;
}

const PLACEHOLDER_IMAGE = '/members/notfound.png';

// TODO: 換成實際的合作社團／相關網站連結與簡介。
export const convenientLinks: ExternalLink[] = [
  {
    title: '姊妹社團網站',
    description: '與我們長期交流合作的姊妹社團，歡迎前往認識他們的社課與活動。',
    url: '#',
    domain: 'example.com',
    image: PLACEHOLDER_IMAGE,
  },
  {
    title: '國立陽明交通大學課外活動組',
    description: '學校社團與課外活動相關資訊、活動場地借用與社團輔導資源。',
    url: '#',
    domain: 'nycu.edu.tw',
    image: PLACEHOLDER_IMAGE,
  },
];

// TODO: 換成實際的自製小工具連結與簡介。
export const selfMadeTools: ExternalLink[] = [
  {
    title: '社課簽到工具',
    description: '社課現場快速簽到用的小工具，掃碼即可完成報到。',
    url: '#',
    domain: 'tools.jcc.nycu.cc',
    image: PLACEHOLDER_IMAGE,
  },
];
