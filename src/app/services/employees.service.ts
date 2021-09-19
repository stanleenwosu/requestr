import { Injectable } from '@angular/core';
import { Department } from 'app/@core/data/employees';
import { User } from 'app/@core/data/users';
import { FirebaseService } from './firebase.service';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class EmployeesService {

  deptColPath = 'departments'
  empColPath = 'employees'
  prColPath = 'procurements_staffs'
  constructor(
    private fireS: FirebaseService,
    private userS: UserService
  ) { }

  createDept(dept: Department) {
    return this.fireS.addDoc(this.deptColPath, dept)
  }

  getDept(dept: Department) {
    this.fireS.getDoc(this.deptColPath, dept.id)
  }
  getDepts() {
    return this.fireS.getCol(this.deptColPath) as Promise<Department[]>
  }

  deleteDept(id: string) {
    return this.fireS.deleteDoc(this.deptColPath, id)
  }

  addStaffToPr(userId: string) {
    const d = Date.now()
    const data = {
      id: userId,
      userId: userId,
      timestamp: d,
      addedBy: this.userS.UserInfo.id
    }
    return this.fireS.addDoc(this.prColPath, data)
  }

  removeStaffFromPr(userId: string) {
    return this.fireS.deleteDoc(this.prColPath, userId)
  }

  getPr() {
    return this.fireS.getCol(this.prColPath) as Promise<any[]>
  }

}
