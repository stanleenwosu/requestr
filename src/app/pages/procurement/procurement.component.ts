import { Component, OnInit } from '@angular/core';
import { User } from 'app/@core/data/users';
import { EmployeesService } from 'app/services/employees.service';
import { UserService } from 'app/services/user.service';

@Component({
  selector: 'procurement',
  templateUrl: './procurement.component.html',
  styleUrls: ['./procurement.component.scss']
})
export class ProcurementComponent implements OnInit {

  staffs: User[]
  team: User[]
  constructor(
    private userS: UserService,
    private empS: EmployeesService
  ) { }

  ngOnInit(): void {
    this.init()
  }

  async init() {
    this.staffs = await this.userS.getStaffs()
  }

}
