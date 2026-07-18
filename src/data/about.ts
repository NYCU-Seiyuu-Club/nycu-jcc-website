
export const aboutIntro =
  '我們是一起熱衷於日本文化因而聚集起來的同好！\n交大日研擁有豐富的日本文化社課，\n從古典日本文化賞析到宅系打藝教學都有，\n社內學長姐亦擁有豐富赴日交換經驗。\n歡迎對日本各式文化有興趣的你加入社團！';

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

export interface AboutFaq {
  question: string;
  answer: string;
}

export const aboutFaqs: AboutFaq[] = [
  {
    question: '需要會日文才能加入嗎？',
    answer: '完全不需要！社課會從基礎開始帶，不管是零基礎還是已經會日文的人都歡迎加入。',
  },
  {
    question: '社課大概多久一次？在哪裡上課？',
    answer: '每週都有固定社課，實際時間與地點會在開學初公告，另外也會不定期舉辦校外活動與交流。',
  },
  {
    question: '一定要參加過交換才能加入嗎？',
    answer: '不用，社團成員大部分都沒交換過，反而很歡迎想了解交換經驗的人來跟學長姐聊聊。',
  },
  {
    question: '可以只參加喜歡的分組活動嗎？',
    answer: '可以，加入社團後可以自由選擇想參與的分組，也能同時參加多個分組的活動。',
  },
];

export interface AboutHighlight {
  slug: string;
  title: string;
  description: string;
  content: string[];
  image: string;
  groupPhoto: string;
  gallery: string[];
  accentColor: string;
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
    accentColor: '#00aabb',
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
    accentColor: '#3498db',
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
    accentColor: '#8b81c3',
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
    accentColor: '#e0b5d3',
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
