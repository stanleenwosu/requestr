import { Observable } from 'rxjs';

export interface User {
  name: string;
  id: string;
  email: string;
  password: string;
  picture?: string;
  role?: UserRoles;
  timestamp: number;
}


export enum UserRoles {
  ADMIN = 'admin',
  USER = 'user'
}

export interface Contacts {
  user: User;
  type: string;
}

export interface RecentUsers extends Contacts {
  time: number;
}

export abstract class UserData {
  abstract getUsers(): Observable<User[]>;
  abstract getContacts(): Observable<Contacts[]>;
  abstract getRecentUsers(): Observable<RecentUsers[]>;
}
