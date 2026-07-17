export interface SnsLink {
  label: string;
  url: string;
}

export interface Oshi {
  name: string;
  subtitle?: string;
  photo: string;
}

export const MEMBER_GROUPS = ['打藝應援組', '流行文化組', '傳統文化組', '史地考察組'] as const;
export type MemberGroup = (typeof MEMBER_GROUPS)[number];

export interface Member {
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
  certifications?: string;
  sns?: SnsLink[];
  oshi?: Oshi;
  accentColor?: string;
  /** 所屬小組，沒填代表沒分組 */
  group?: MemberGroup;
  /** 在校現任或已畢業/已卸任，預設 active */
  status?: 'active' | 'alumni';
}

export const DEFAULT_ACCENT_COLOR = '#eab308';

export interface MemberTerm {
  id: string;
  label: string;
  members: Member[];
}

export type MemberWithTerm = Member & { termId: string };

const PLACEHOLDER_PHOTO = '/members/notfound.png';
const PLACEHOLDER_TEXT = '待補充';

export const memberTerms: MemberTerm[] = [
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
        accentColor: '#995aff',
        photo: '/members/senba.png',
        description: '社團創始人。任內推動多場日本文化交流活動，深化與姊妹社團的合作關係。',
        hometown: '御台場',
        birthday: '12月28日',
        bloodType: 'A',
        height: '179 cm',
        hobbies: '看動漫、彈吉他',
        specialSkill: '沒有',
        certifications: '',
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
        group: '史地考察組',
        photo: PLACEHOLDER_PHOTO,
        description: PLACEHOLDER_TEXT,
        hometown: PLACEHOLDER_TEXT,
        birthday: PLACEHOLDER_TEXT,
        bloodType: PLACEHOLDER_TEXT,
        height: PLACEHOLDER_TEXT,
        hobbies: PLACEHOLDER_TEXT,
        specialSkill: PLACEHOLDER_TEXT,
        certifications: PLACEHOLDER_TEXT,
      },
      {
        slug: 'treasurer',
        name: '非洲人',
        titles: ['總務'],
        photo: PLACEHOLDER_PHOTO,
        description: PLACEHOLDER_TEXT,
        hometown: PLACEHOLDER_TEXT,
        birthday: PLACEHOLDER_TEXT,
        bloodType: PLACEHOLDER_TEXT,
        height: PLACEHOLDER_TEXT,
        hobbies: PLACEHOLDER_TEXT,
        specialSkill: PLACEHOLDER_TEXT,
        certifications: PLACEHOLDER_TEXT,
      },
      {
        slug: 'events',
        name: '撒咖那',
        titles: ['活動'],
        photo: PLACEHOLDER_PHOTO,
        description: PLACEHOLDER_TEXT,
        hometown: PLACEHOLDER_TEXT,
        birthday: PLACEHOLDER_TEXT,
        bloodType: PLACEHOLDER_TEXT,
        height: PLACEHOLDER_TEXT,
        hobbies: PLACEHOLDER_TEXT,
        specialSkill: PLACEHOLDER_TEXT,
        certifications: PLACEHOLDER_TEXT,
      },
      {
        slug: 'pr',
        name: '193',
        titles: ['公關'],
        photo: PLACEHOLDER_PHOTO,
        description: PLACEHOLDER_TEXT,
        hometown: PLACEHOLDER_TEXT,
        birthday: PLACEHOLDER_TEXT,
        bloodType: PLACEHOLDER_TEXT,
        height: PLACEHOLDER_TEXT,
        hobbies: PLACEHOLDER_TEXT,
        specialSkill: PLACEHOLDER_TEXT,
        certifications: PLACEHOLDER_TEXT,
      },
      {
        slug: 'group-cheer-leader',
        name: '天適',
        titles: ['打藝應援組組長'],
        group: '打藝應援組',
        photo: PLACEHOLDER_PHOTO,
        description: PLACEHOLDER_TEXT,
        hometown: PLACEHOLDER_TEXT,
        birthday: PLACEHOLDER_TEXT,
        bloodType: PLACEHOLDER_TEXT,
        height: PLACEHOLDER_TEXT,
        hobbies: PLACEHOLDER_TEXT,
        specialSkill: PLACEHOLDER_TEXT,
        certifications: PLACEHOLDER_TEXT,
      },
      {
        slug: 'group-pop-culture-leader',
        name: '銀葉',
        titles: ['流行文化組組長'],
        group: '流行文化組',
        photo: PLACEHOLDER_PHOTO,
        description: PLACEHOLDER_TEXT,
        hometown: PLACEHOLDER_TEXT,
        birthday: PLACEHOLDER_TEXT,
        bloodType: PLACEHOLDER_TEXT,
        height: PLACEHOLDER_TEXT,
        hobbies: PLACEHOLDER_TEXT,
        specialSkill: PLACEHOLDER_TEXT,
        certifications: PLACEHOLDER_TEXT,
      },
      {
        slug: 'group-traditional-culture-leader',
        name: '阿冬',
        titles: ['傳統文化組組長'],
        group: '傳統文化組',
        photo: PLACEHOLDER_PHOTO,
        description: PLACEHOLDER_TEXT,
        hometown: PLACEHOLDER_TEXT,
        birthday: PLACEHOLDER_TEXT,
        bloodType: PLACEHOLDER_TEXT,
        height: PLACEHOLDER_TEXT,
        hobbies: PLACEHOLDER_TEXT,
        specialSkill: PLACEHOLDER_TEXT,
        certifications: PLACEHOLDER_TEXT,
      },
      {
        slug: 'member-01',
        name: '待補充',
        titles: [],
        group: '打藝應援組',
        photo: PLACEHOLDER_PHOTO,
        description: PLACEHOLDER_TEXT,
      },
      {
        slug: 'member-02',
        name: '待補充',
        titles: [],
        photo: PLACEHOLDER_PHOTO,
        description: PLACEHOLDER_TEXT,
      },
      {
        slug: 'alumni-01',
        name: '待補充',
        titles: ['第 0 屆社長'],
        status: 'alumni',
        photo: PLACEHOLDER_PHOTO,
        description: PLACEHOLDER_TEXT,
      },
    ],
  },
];

export function getTerm(termId: string): MemberTerm | undefined {
  return memberTerms.find((term) => term.id === termId);
}

export function findMember(termId: string, slug: string): Member | undefined {
  return getTerm(termId)?.members.find((member) => member.slug === slug);
}

export function attachTermId(term: MemberTerm): MemberWithTerm[] {
  return term.members.map((member) => ({ ...member, termId: term.id }));
}

export function getAllMembers(): MemberWithTerm[] {
  return memberTerms.flatMap(attachTermId);
}
