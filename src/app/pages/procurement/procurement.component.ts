import { Component, OnInit } from '@angular/core';
import { User } from 'app/@core/data/users';
import { AppService } from 'app/services/app.service';
import { EmployeesService } from 'app/services/employees.service';
import { UserService } from 'app/services/user.service';

@Component({
  selector: 'procurement',
  templateUrl: './procurement.component.html',
  styleUrls: ['./procurement.component.scss']
})
export class ProcurementComponent implements OnInit {

  staffs: User[]
  team: any[]
  constructor(
    private userS: UserService,
    private empS: EmployeesService,
    private appS: AppService
  ) { }

  ngOnInit(): void {
    this.init()
  }

  async init() {
    this.staffs = await this.userS.getStaffs()
    this.team = await this.empS.getPr()
  }

  addToTeam(userId: string) {
    const has = this.team.filter(u => u.id === userId)
    if (has.length > 0) {
      this.appS.showToast('danger', 'User is aleady a Member', 'Procurement Team')
      return
    }
    try {
      this.empS.addStaffToPr(userId)
      this.appS.showToast('success', 'User has been added to Team', 'Procurement Team')
      this.init()
    } catch (error) {
      this.appS.showToast('danger', error, 'Procurement Team')
    }

  }

  remove(userId: string) {
    try {
      this.empS.removeStaffFromPr(userId)
      const i = this.team.findIndex(u => u.id === userId)
      this.team.splice(i, 0)
      this.appS.showToast('success', 'User has been removed from Team', 'Procurement Team')
      this.init()
    } catch (error) {
      this.appS.showToast('danger', error, 'Procurement Team')
    }
  }
}
