import { NbMenuItem } from '@nebular/theme';
import { UserRoles } from "./users";

export class AppMenu extends NbMenuItem {
  role: UserRoles[]
}

export const MENU_ITEMS: AppMenu[] = [
  {
    title: 'Dashboard',
    icon: 'home-outline',
    link: '/dashboard',
    home: true,
    role: [UserRoles.ADMIN, UserRoles.SUPER, UserRoles.STAFF, UserRoles.VENDOR]
  },
  {
    title: 'Requests',
    icon: 'flag-outline',
    link: '/requests',
    home: true,
    role: [UserRoles.SUPER, UserRoles.STAFF]
  },
  {
    title: 'Awaiting Requests',
    icon: 'flag-outline',
    link: '/requests/awaiting-requests',
    home: true,
    role: [UserRoles.ADMIN, UserRoles.SUPER]
  },
  {
    title: 'Purchase Orders',
    icon: 'shopping-bag-outline',
    link: '/orders',
    home: true,
    role: [UserRoles.ADMIN, UserRoles.SUPER, UserRoles.VENDOR]
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
    icon: 'cube-outline',
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
    title: 'Employees',
    icon: 'people-outline',
    link: '/employees',
    home: true,
    role: [UserRoles.SUPER]
  },
  {
    title: 'Support',
    icon: 'question-mark-circle-outline',
    link: '',
    home: true,
    role: [UserRoles.ADMIN, UserRoles.SUPER, UserRoles.STAFF, UserRoles.VENDOR]
  }
];
