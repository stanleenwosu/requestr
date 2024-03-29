import { NbMenuItem } from '@nebular/theme';
import { UserRoles } from "./users";

export class AppMenu extends NbMenuItem {
  role: UserRoles[]
}

export const MENU_ITEMS: AppMenu[] = [
  {
    title: 'Dashboard',
    icon: 'activity-outline',
    link: '/dashboard',
    home: true,
    role: [UserRoles.ADMIN, UserRoles.SUPER, UserRoles.STAFF, UserRoles.VENDOR]
  },
  {
    title: 'Notifications',
    icon: 'bell-outline',
    link: '/notifications',
    home: true,
    role: [UserRoles.ADMIN, UserRoles.SUPER, UserRoles.STAFF, UserRoles.VENDOR]
  },
  {
    title: 'Awaiting Requests',
    icon: 'clock-outline',
    link: '/requests/awaiting-requests',
    home: true,
    role: [UserRoles.ADMIN, UserRoles.SUPER]
  },
  {
    title: 'Requests',
    icon: 'flag-outline',
    link: '/requests/overview',
    home: true,
    role: [UserRoles.STAFF, UserRoles.SUPER]
  },
  {
    title: 'RFQ',
    icon: 'shopping-bag-outline',
    link: '/orders',
    home: true,
    role: [UserRoles.ADMIN, UserRoles.STAFF, UserRoles.SUPER, UserRoles.VENDOR]
  },
  {
    title: 'Bids',
    icon: 'collapse-outline',
    link: '/bids',
    home: true,
    role: [UserRoles.VENDOR]
  },

  /* {
    title: 'Deliveries',
    icon: 'car-outline',
    link: '/deliveries',
    home: true,
  },
  {
    title: 'Invoices',
    icon: 'book-outline',
    link: '/invoices',
    home: true,
  },
  {
    title: 'Payments',
    icon: 'credit-card-outline',
    link: '/payments',
    home: true,
  },
  {
    title: 'Budgets',
    icon: 'checkmark-square-outline',
    link: '/approvals',
    home: true,
  }, */
  {
    title: 'Suppliers',
    icon: 'car-outline',
    link: '/suppliers',
    home: true,
    role: [UserRoles.ADMIN, UserRoles.SUPER]
  },
  {
    title: 'Departments',
    icon: 'people-outline',
    link: '/departments',
    home: true,
    role: [UserRoles.ADMIN, UserRoles.SUPER]
  },
  {
    title: 'Procurement Team',
    icon: 'person-done-outline',
    link: '/procurements',
    home: true,
    role: [UserRoles.SUPER]
  },
  {
    title: 'Staffs',
    icon: 'people-outline',
    link: '/employees',
    home: true,
    role: [UserRoles.SUPER, UserRoles.ADMIN]
  },
  {
    title: 'Support',
    icon: 'question-mark-circle-outline',
    link: '',
    home: true,
    role: [UserRoles.ADMIN, UserRoles.SUPER, UserRoles.STAFF, UserRoles.VENDOR]
  }
];
