import { FollowUpStatus } from '../types';

export const FollowUpStatusChipConfig = {
  [FollowUpStatus.scheduled]: {
    label: 'Scheduled',
    bgColor: '#516C6E',
  },
  [FollowUpStatus.sent]: {
    label: 'Sent',
    bgColor: '#20A665',
  },
  [FollowUpStatus.pending]: {
    label: 'Scheduled',
    bgColor: '#20A665',
  },
  [FollowUpStatus.created]: {
    label: 'Scheduled',
    bgColor: '#20A665',
  },
};
