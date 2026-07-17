// 之後會改串 CMS，目前先用這份 JSON 模擬內容。
export interface Announcement {
  slug: string;
  title: string;
  summary: string;
  content: string;
  coverImage: string;
  date: string;
  tag?: string;
}

const PLACEHOLDER_COVER = '/members/notfound.png';

export const announcements: Announcement[] = [
  {
    slug: 'welcome-new-semester',
    title: '新學期社課開跑！',
    summary: '本學期社課將於每週三晚上於活動中心舉行，歡迎新舊社員一起參加。',
    content:
      '本學期社課將於每週三晚上 18:30 於活動中心 302 教室舉行，內容涵蓋日語會話、動漫文化賞析與傳統文化體驗。\n\n歡迎不論是否有日文基礎的同學一起參加，第一堂課將進行社團介紹與破冰活動，現場也會有社課地圖與交通資訊發放。',
    coverImage: PLACEHOLDER_COVER,
    date: '2026-02-16',
    tag: '社課',
  },
  {
    slug: 'cultural-festival-recruit',
    title: '文化祭攤位招募志工中',
    summary: '一年一度的文化祭即將登場，我們正在招募佈置、表演與攤位志工。',
    content:
      '文化祭是我們每年最重要的活動之一，今年預計規劃和服體驗、茶道展示與動漫周邊攤位。\n\n無論你擅長美術佈置、活動主持，或單純想參與其中，都歡迎填寫報名表加入籌備團隊。',
    coverImage: PLACEHOLDER_COVER,
    date: '2026-03-02',
    tag: '活動',
  },
  {
    slug: 'exchange-with-sister-club',
    title: '與姊妹社團交流活動紀實',
    summary: '上個月與鄰近大學的日本文化社團進行了一場精彩的交流活動。',
    content:
      '交流活動中雙方社員分享了各自社團的年度活動規劃，並一同體驗了浴衣試穿與日式桌遊。\n\n活動尾聲雙方交換了紀念小物，也約定下學期將舉辦更大型的聯合活動，敬請期待後續消息。',
    coverImage: PLACEHOLDER_COVER,
    date: '2026-01-20',
    tag: '交流',
  },
  {
    slug: 'photo-contest',
    title: '社團攝影徵件開始收件',
    summary: '徵求社課、活動花絮與旅日照片，優選作品將刊登於社團年刊。',
    content:
      '即日起開放投稿，主題不限，只要與日本文化或社團生活相關即可參加。\n\n投稿方式與截止日期請見表單說明，優選作品除了刊登於年刊外，也會在期末成果展中展出。',
    coverImage: PLACEHOLDER_COVER,
    date: '2026-04-05',
    tag: '徵件',
  },
];
