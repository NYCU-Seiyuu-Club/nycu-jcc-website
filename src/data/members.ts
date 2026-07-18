import { PLACEHOLDER_PHOTO, type MemberGroupId, type MemberStatus } from './honor_members';

export interface Member {
  slug: string;
  name: string;
  photo: string;
  groups: MemberGroupId[];
  status?: MemberStatus;
}

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
