// 之後會改串 CMS，目前先用這份 JSON 模擬內容。
export interface ExternalLink {
  title: string;
  description: string;
  url: string;
  /** 顯示用的網域名稱，不用即時解析網址，避免佔位連結（#）出錯 */
  domain: string;
}

/** 用 WordPress mShots 產生目標網站的即時預覽截圖，不需要 API key */
export function getSitePreview(url: string, width = 800) {
  return `https://s.wordpress.com/mshots/v1/${encodeURIComponent(url)}?w=${width}`;
}

export const convenientLinks: ExternalLink[] = [
  {
    title: '演唱會指南',
    description: '整理演唱會相關資訊與應援知識的網站，方便大家事前準備與查詢。',
    url: 'https://live.nycu.cc/',
    domain: 'live.nycu.cc',
  },
  {
    title: 'LL-Fans',
    description: '整理聲優與偶像相關粉絲資訊的網站。',
    url: 'https://ll-fans.jp/data',
    domain: 'll-fans.jp',
  },
  {
    title: '國立陽明交通大學課外活動組',
    description: '學校社團與課外活動相關資訊、活動場地借用與社團輔導資源。',
    url: 'https://www.nycu.edu.tw/osa/ch/app/data/list?module=nycu0014&id=3550',
    domain: 'nycu.edu.tw',
  },
];

export const selfMadeTools: ExternalLink[] = [
  {
    title: 'CD 碟盤理論分析',
    description: '分析 CD 碟盤理論用的自製小工具。',
    url: 'https://tda.canaria.cc/',
    domain: 'tda.canaria.cc',
  },
  {
    title: '指出毬亞倒數計時網站',
    description: '自製的倒數計時網站。',
    url: 'https://maria.nycu.cc/',
    domain: 'maria.nycu.cc',
  },
];

export const friendClubs: ExternalLink[] = [
  {
    title: '動畫社',
    description: '國立陽明交通大學動畫研究社，與我們長期交流合作的友情社團。',
    url: 'https://anime.nycu.cc',
    domain: 'anime.nycu.cc',
  },
  {
    title: '虛擬偶像社',
    description: '國立陽明交通大學虛擬偶像研究社，與我們長期交流合作的友情社團。',
    url: 'https://nycu.moe',
    domain: 'nycu.moe',
  },
];
