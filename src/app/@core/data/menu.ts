import { NbMenuItem } from '@nebular/theme';

export const MENU_ITEMS: NbMenuItem[] = [
  {
    title: 'Dashboard',
    icon: 'home-outline',
    link: '/dashboard',
    home: true,
  },
  {
    title: 'Requests',
    icon: 'flag-outline',
    link: '/requests',
    home: true,
  },
  {
    title: 'Approvals',
    icon: 'checkmark-square-outline',
    link: '/approvals',
    home: true,
  },
  {
    title: 'Users',
    icon: 'people-outline',
    link: '/users',
    home: true,
  },
  {
    title: 'Support',
    icon: 'question-mark-circle-outline',
    link: '/dashboard',
    home: true,
  },
  {
    title: 'Log out',
    icon: 'log-out-outline',
    link: '/auth',
    home: true,
  }
];
