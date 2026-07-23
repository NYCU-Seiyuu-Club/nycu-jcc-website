export interface SnsLink {
  label: string;
  url: string;
}

export interface Oshi {
  name: string;
  subtitle?: string;
  photo: string;
}

export type MemberGroupId = 'utage' | 'popular' | 'tradition' | 'geo';

export const MEMBER_GROUPS: { id: MemberGroupId; label: string }[] = [
  { id: 'utage', label: '打藝應援組' },
  { id: 'popular', label: '流行文化組' },
  { id: 'tradition', label: '傳統文化組' },
  { id: 'geo', label: '史地考察組' },
];

export type GroupRole = '組長' | '副組長';

export interface GroupRoleEntry {
  groupId: MemberGroupId;
  role: GroupRole;
}

/**
 * active：在校現任
 * graduated：已畢業離校
 * stepped_down：仍在校，但已卸下幹部/組長職位（不是離校，只是不再任職）
 */
export type MemberStatus = 'active' | 'graduated' | 'stepped_down';

export interface HonorMember {
  slug: string;
  name: string;
  titles: string[];
  photo: string;
  description: string;
  hometown?: string;
  birthday?: string;
  bloodType?: string;
  height?: string;
  hobbies?: string;
  specialSkill?: string;
  sns?: SnsLink[];
  oshi?: Oshi;
  accentColor?: string;
  groups: MemberGroupId[];
  groupRoles?: GroupRoleEntry[];
  status?: MemberStatus;
}

export const DEFAULT_ACCENT_COLOR = '#eab308';

export interface HonorMemberTerm {
  id: string;
  label: string;
  members: HonorMember[];
}

export type HonorMemberWithTerm = HonorMember & { termId: string };

export const PLACEHOLDER_PHOTO = '/members/notfound.png';
const PLACEHOLDER_TEXT = '???';

/** 目前所在的屆別，換屆時改這個就好，非當前屆的成員會自動標記為卸任 */
export const CURRENT_TERM_ID = '1st';

export const honorMemberTerms: HonorMemberTerm[] = [
  // {
  //   id: '2nd',
  //   label: '第 2 屆',
  //   members: [
  //   ],
  // },
  {
    id: '1st',
    label: '第 1 屆',
    members: [
      {
        slug: 'president',
        name: '千羽',
        titles: ['社長'],
        groups: [],
        accentColor: '#995aff',
        photo: '/members/senba.png',
        description: '社團創始人。任內推動多場日本文化交流活動，深化與姊妹社團的合作關係。社團創始人。任內推動多場日本文化交流活動，深化與姊妹社團的合作關係。社團創始人。任內推動多場日本文化交流活動，深化與姊妹社團的合作關係。',
        hometown: '御台場',
        birthday: '12月28日',
        bloodType: '紅色的',
        height: '1.58 個提摩',
        hobbies: '看動漫',
        specialSkill: '一年去台場十次',
        sns: [
          { label: 'Website', url: 'https://tokihato.com' },
          { label: 'X', url: 'https://x.com/senba1000m3' },
          { label: 'Instagram', url: 'https://instagram.com/senba1000m3' },
          { label: 'BiliBili', url: 'https://space.bilibili.com/439267021' },
          { label: 'Discord', url: 'senba1000m3' },
        ],
        oshi: {
          name: '指出毬亞',
          subtitle: 'WITHLINE',
          photo: '/members/chyun.png',
        },
      },
      {
        slug: 'vice-president',
        name: '企鵝',
        titles: ['副社長', '史地考察組組長'],
        groups: ['geo'],
        accentColor: DEFAULT_ACCENT_COLOR,
        groupRoles: [{ groupId: 'geo', role: '組長' }],
        photo: '/members/penguin.webp',
        description: PLACEHOLDER_TEXT,
        hometown: PLACEHOLDER_TEXT,
        birthday: PLACEHOLDER_TEXT,
        bloodType: PLACEHOLDER_TEXT,
        height: PLACEHOLDER_TEXT,
        hobbies: PLACEHOLDER_TEXT,
        specialSkill: PLACEHOLDER_TEXT,
        sns: [
          { label: 'None', url: '' },
        ],
      },
      {
        slug: 'treasurer',
        name: '非洲人',
        titles: ['總務'],
        groups: [],
        accentColor: DEFAULT_ACCENT_COLOR,
        photo: '/members/african.webp',
        description: PLACEHOLDER_TEXT,
        hometown: PLACEHOLDER_TEXT,
        birthday: PLACEHOLDER_TEXT,
        bloodType: PLACEHOLDER_TEXT,
        height: PLACEHOLDER_TEXT,
        hobbies: PLACEHOLDER_TEXT,
        specialSkill: PLACEHOLDER_TEXT,
        sns: [
          { label: 'None', url: '' },
        ],
      },
      {
        slug: 'events',
        name: '撒咖那',
        titles: ['活動'],
        groups: ['utage'],
        accentColor: DEFAULT_ACCENT_COLOR,
        photo: '/members/sakana.webp',
        description: PLACEHOLDER_TEXT,
        hometown: PLACEHOLDER_TEXT,
        birthday: PLACEHOLDER_TEXT,
        bloodType: PLACEHOLDER_TEXT,
        height: PLACEHOLDER_TEXT,
        hobbies: PLACEHOLDER_TEXT,
        specialSkill: PLACEHOLDER_TEXT,
        sns: [
          { label: 'None', url: '' },
        ],
      },
      {
        slug: 'pr',
        name: '193',
        titles: ['公關'],
        groups: [],
        accentColor: DEFAULT_ACCENT_COLOR,
        photo: PLACEHOLDER_PHOTO,
        description: PLACEHOLDER_TEXT,
        hometown: PLACEHOLDER_TEXT,
        birthday: PLACEHOLDER_TEXT,
        bloodType: PLACEHOLDER_TEXT,
        height: PLACEHOLDER_TEXT,
        hobbies: PLACEHOLDER_TEXT,
        specialSkill: PLACEHOLDER_TEXT,
        sns: [
          { label: 'None', url: '' },
        ],
      },
      {
        slug: 'group-cheer-leader',
        name: '天適',
        titles: ['打藝應援組組長'],
        groups: ['utage'],
        groupRoles: [{ groupId: 'utage', role: '組長' }],
        photo: '/members/tenki.jpg',
        description: '怎麼會有木谷嘎阿(困惑)',
        hometown: '葛飾区',
        birthday: '暫不透漏',
        bloodType: '我有權保持緘默',
        height: '好問題',
        hobbies: '卡片戰鬥先導者',
        specialSkill: '讓對方出他想要的判定',
        sns: [
          { label: 'None', url: '' },
        ],
        oshi: {
          name: '木谷高明',
          subtitle: 'KIDANI',
          photo: '/members/kidani.jpg',
        },
      },
      {
        slug: 'group-pop-culture-leader',
        name: '銀葉',
        titles: ['流行文化組組長'],
        groups: ['popular', 'utage'],
        groupRoles: [{ groupId: 'popular', role: '組長' }],
        photo: '/members/silver.png',
        description: '我被鬼頭明里指到了。',
        hometown: '名古屋',
        birthday: PLACEHOLDER_TEXT,
        bloodType: PLACEHOLDER_TEXT,
        height: '130cm / 500kg',
        hobbies: '逛二手店找聲優周邊',
        specialSkill: '在沙發上睡著',
        sns: [
          { label: 'None', url: '' },
        ],
        oshi: {
          name: '鬼頭明里',
          subtitle: 'Raccoon Dog',
          photo: '/members/akarin.png',
        },
      },
      {
        slug: 'group-traditional-culture-leader',
        name: '阿冬',
        titles: ['傳統文化組組長'],
        groups: ['tradition'],
        groupRoles: [{ groupId: 'tradition', role: '組長' }],
        photo: PLACEHOLDER_PHOTO,
        description: PLACEHOLDER_TEXT,
        hometown: PLACEHOLDER_TEXT,
        birthday: PLACEHOLDER_TEXT,
        bloodType: PLACEHOLDER_TEXT,
        height: PLACEHOLDER_TEXT,
        hobbies: PLACEHOLDER_TEXT,
        specialSkill: PLACEHOLDER_TEXT,
        sns: [
          { label: 'None', url: '' },
        ],
      },
      {
        slug: 'teacher',
        name: 'かなりあ',
        titles: ['大王奶龍（社師）'],
        groups: [],
        photo: '/members/canaria.png',
        description: PLACEHOLDER_TEXT,
        hometown: PLACEHOLDER_TEXT,
        birthday: PLACEHOLDER_TEXT,
        bloodType: '奶龍',
        height: PLACEHOLDER_TEXT,
        hobbies: PLACEHOLDER_TEXT,
        specialSkill: PLACEHOLDER_TEXT,
        sns: [
          { label: 'None', url: '' },
        ],
      },
    ],
  },
];

export function getHonorTerm(termId: string): HonorMemberTerm | undefined {
  return honorMemberTerms.find((term) => term.id === termId);
}

export function findHonorMember(termId: string, slug: string): HonorMember | undefined {
  return getHonorTerm(termId)?.members.find((member) => member.slug === slug);
}

export function attachHonorTermId(term: HonorMemberTerm): HonorMemberWithTerm[] {
  return term.members.map((member) => ({
    ...member,
    termId: term.id,
    status: member.status ?? (term.id === CURRENT_TERM_ID ? 'active' : 'stepped_down'),
  }));
}

export function getAllHonorMembers(): HonorMemberWithTerm[] {
  return honorMemberTerms.flatMap(attachHonorTermId);
}
