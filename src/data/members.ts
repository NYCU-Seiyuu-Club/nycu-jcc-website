import { PLACEHOLDER_PHOTO, type MemberGroupId, type MemberStatus } from './honor_members';

export interface Member {
  slug: string;
  name: string;
  photo: string;
  /** 可同時屬於多個小組，空陣列代表沒分組 */
  groups: MemberGroupId[];
  status?: MemberStatus;
}

// TODO: 換成實際社員名單與照片。photo 對應的圖片請放到 public/members/ 底下。
export const members: Member[] = [
  {
    slug: 'member-01',
    name: '待補充',
    photo: PLACEHOLDER_PHOTO,
    groups: ['utage'],
  },
  {
    slug: 'member-03',
    name: '待補充',
    photo: PLACEHOLDER_PHOTO,
    groups: ['popular'],
  },
  {
    slug: 'member-04',
    name: '待補充',
    photo: PLACEHOLDER_PHOTO,
    groups: ['tradition'],
  },
  {
    slug: 'member-05',
    name: '待補充',
    photo: PLACEHOLDER_PHOTO,
    groups: ['geo'],
  },
  {
    slug: 'member-02',
    name: '待補充',
    photo: PLACEHOLDER_PHOTO,
    groups: [],
  },
  {
    slug: 'alumni-01',
    name: '待補充',
    photo: PLACEHOLDER_PHOTO,
    groups: [],
    status: 'graduated',
  },
];
