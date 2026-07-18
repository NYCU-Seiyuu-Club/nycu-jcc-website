// 之後會改串 CMS，目前先用這份 JSON 模擬內容。
export const aboutIntro =
  '國立陽明交通大學日本文化研究社成立於創社之初，致力於推廣日本流行文化、傳統文化與語言交流。我們相信文化沒有距離，透過社課、活動與交流，讓每一位對日本文化有興趣的人都能找到屬於自己的舞台。';

// 標語儲存庫：每次載入首頁會從中隨機挑一組顯示，之後可以直接在這裡新增更多版本。
export const aboutPoems: string[][] = [
  [
    '受夠了獨自追尋日本文化與動漫的漫長孤單嗎',
    '夠熱血的你快跟著我們一起深度探索日本魅力',
    '這裡有最有趣的日本地理歷史與流行趨勢分析',
    '群策群力讓我們把這份熱情傳遞到世界的角落',
    '聲勢壯大的日本文化社正熱烈期待著你的加入',
    '優雅的傳統藝術到最新流行情報我們通通都有',
    '廚藝與熱血交織的道地日本風情等你親身體驗',
    '了解更多資訊歡迎校內校外朋友直接私訊粉專',
  ],
];

export interface AboutHighlight {
  slug: string;
  title: string;
  description: string;
  content: string[];
  image: string;
  /** 分組大合照，用於 /groups 頁面 */
  groupPhoto: string;
  /** 活動相簿，用於 /groups 頁面 */
  gallery: string[];
  /** 對應 honor_members.ts 裡的 HonorMember slug */
  leaderSlug?: string;
  deputyLeaderSlug?: string;
}

const PLACEHOLDER_IMAGE = '/members/notfound.png';
const PLACEHOLDER_GALLERY = [PLACEHOLDER_IMAGE, PLACEHOLDER_IMAGE, PLACEHOLDER_IMAGE];

export const aboutHighlights: AboutHighlight[] = [
  {
    slug: 'utage',
    title: '打藝應援組',
    description: '推廣日本偶像應援文化，定期舉辦應援教學與觀賞會。',
    content: [
      '推廣日本偶像應援文化，定期舉辦應援教學與觀賞會。',
      '從應援色、應援棒動作到live觀賞禮儀，帶領新手一步步認識偶像文化的魅力。',
    ],
    image: PLACEHOLDER_IMAGE,
    groupPhoto: PLACEHOLDER_IMAGE,
    gallery: PLACEHOLDER_GALLERY,
    leaderSlug: 'group-cheer-leader',
  },
  {
    slug: 'popular',
    title: '流行文化組',
    description: '動漫、遊戲、J-Pop 都在這裡，一起追新番聊心得。',
    content: [
      '動漫、遊戲、J-Pop 都在這裡，一起追新番聊心得。',
      '每學期舉辦新番討論、遊戲交流與音樂分享會，是喜愛日本流行文化的社員最活躍的聚集地。',
    ],
    image: PLACEHOLDER_IMAGE,
    groupPhoto: PLACEHOLDER_IMAGE,
    gallery: PLACEHOLDER_GALLERY,
    leaderSlug: 'group-pop-culture-leader',
  },
  {
    slug: 'tradition',
    title: '傳統文化組',
    description: '茶道、和服、書道體驗，深入認識日本的傳統之美。',
    content: [
      '茶道、和服、書道體驗，深入認識日本的傳統之美。',
      '不定期邀請講師開設工作坊，讓社員能親手體驗日本傳統文化的細節與精神。',
    ],
    image: PLACEHOLDER_IMAGE,
    groupPhoto: PLACEHOLDER_IMAGE,
    gallery: PLACEHOLDER_GALLERY,
    leaderSlug: 'group-traditional-culture-leader',
  },
  {
    slug: 'geo',
    title: '史地考察組',
    description: '從歷史與地理角度認識日本，規劃主題小旅行與講座。',
    content: [
      '從歷史與地理角度認識日本，規劃主題小旅行與講座。',
      '透過主題講座與實地走訪，帶大家從不同角度理解日本的過去與現在。',
    ],
    image: PLACEHOLDER_IMAGE,
    groupPhoto: PLACEHOLDER_IMAGE,
    gallery: PLACEHOLDER_GALLERY,
    leaderSlug: 'vice-president',
  },
];

export interface SocialLink {
  label: 'X' | 'Instagram' | 'Facebook' | 'Contact';
  url: string;
}

export const socialLinks: SocialLink[] = [
  { label: 'X', url: 'https://x.com/nycu_jcc' },
  { label: 'Instagram', url: 'https://www.instagram.com/nycu.jcc/' },
  {
    label: 'Facebook',
    url: 'https://www.facebook.com/people/交大日本文化研究社/61591851335912/',
  },
  { label: 'Contact', url: 'mailto:nycu.seiyuu.club@gmail.com' },
];
