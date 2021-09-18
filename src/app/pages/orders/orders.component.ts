import { Component, OnInit } from '@angular/core';
import { UserRoles } from 'app/@core/data/users';
import { UserService } from 'app/services/user.service';

@Component({
  selector: 'orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss']
})
export class OrdersComponent implements OnInit {

  role = UserRoles
  constructor(
    public userS:UserService
  ) { }

  ngOnInit(): void {
  }

}
