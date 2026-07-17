// 之後會改串 CMS，目前先用這份 JSON 模擬內容。
export const aboutIntro =
  '國立陽明交通大學日本文化研究社成立於創社之初，致力於推廣日本流行文化、傳統文化與語言交流。我們相信文化沒有距離，透過社課、活動與交流，讓每一位對日本文化有興趣的人都能找到屬於自己的舞台。';

export interface AboutHighlight {
  title: string;
  description: string;
  image: string;
}

const PLACEHOLDER_IMAGE = '/members/notfound.png';

export const aboutHighlights: AboutHighlight[] = [
  {
    title: '打藝應援組',
    description: '推廣日本偶像應援文化，定期舉辦應援教學與觀賞會。',
    image: PLACEHOLDER_IMAGE,
  },
  {
    title: '流行文化組',
    description: '動漫、遊戲、J-Pop 都在這裡，一起追新番聊心得。',
    image: PLACEHOLDER_IMAGE,
  },
  {
    title: '傳統文化組',
    description: '茶道、和服、書道體驗，深入認識日本的傳統之美。',
    image: PLACEHOLDER_IMAGE,
  },
  {
    title: '史地考察組',
    description: '從歷史與地理角度認識日本，規劃主題小旅行與講座。',
    image: PLACEHOLDER_IMAGE,
  },
];

export interface SocialLink {
  label: 'X' | 'Instagram' | 'Facebook';
  url: string;
}

// TODO: 換成正式的社群媒體連結
export const socialLinks: SocialLink[] = [
  { label: 'X', url: '#' },
  { label: 'Instagram', url: '#' },
  { label: 'Facebook', url: '#' },
];
