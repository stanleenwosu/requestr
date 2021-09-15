import { Component } from '@angular/core';
import { UserService } from 'app/services/user.service';
import { MENU_ITEMS } from '../@core/data/menu';

@Component({
  selector: 'ngx-pages',
  styleUrls: ['pages.component.scss'],
  template: `
    <ngx-one-column-layout>
      <nb-menu [items]="menu"></nb-menu>
      <router-outlet></router-outlet>
    </ngx-one-column-layout>
  `,
})
export class PagesComponent {
  menu = []
  constructor(
    public userS: UserService
  ) {
    console.log(MENU_ITEMS)
    if (userS.UserInfo) {
      this.menu = MENU_ITEMS.filter(m => m.role.includes(userS.UserInfo.role))
    } else {
      this.menu = MENU_ITEMS
    }

  }
}
