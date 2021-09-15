import { Injectable } from '@angular/core';
import { Department } from 'app/@core/data/employees';
import { FirebaseService } from './firebase.service';

@Injectable({
  providedIn: 'root'
})
export class EmployeesService {

  deptColPath = 'departments'
  empColPath = 'employees'
  constructor(
    private fireS: FirebaseService
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

}
