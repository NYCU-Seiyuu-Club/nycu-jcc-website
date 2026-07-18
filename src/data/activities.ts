// 之後會改串 CMS，目前先用這份 JSON 模擬內容。
export interface Activity {
  slug: string;
  title: string;
  description: string;
  image: string;
}

const PLACEHOLDER_IMAGE = '/members/notfound.png';

export const activities: Activity[] = [
  {
    slug: 'travel-tips',
    title: '日本旅遊秘訣',
    description: '分享自助旅行規劃、交通與住宿眉角，帶你少走冤枉路，玩得更深入。',
    image: PLACEHOLDER_IMAGE,
  },
  {
    slug: 'otaku-cheer',
    title: '宅系打藝教學',
    description: '應援棒、應援色、live 動作一次學會，讓你自信站上 live 現場。',
    image: PLACEHOLDER_IMAGE,
  },
  {
    slug: 'history-geo',
    title: '日本歷史/地理研究',
    description: '從歷史事件到地理特色，用講座與討論帶你認識更完整的日本。',
    image: PLACEHOLDER_IMAGE,
  },
  {
    slug: 'exchange-guide',
    title: '日本交換指導',
    description: '交換申請流程、選校心得、生活適應經驗分享，助你順利踏上交換之旅。',
    image: PLACEHOLDER_IMAGE,
  },
];
