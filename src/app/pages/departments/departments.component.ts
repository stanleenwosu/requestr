import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Department } from 'app/@core/data/employees';
import { AppService } from 'app/services/app.service';
import { EmployeesService } from 'app/services/employees.service';

@Component({
  selector: 'departments',
  templateUrl: './departments.component.html',
  styleUrls: ['./departments.component.scss']
})
export class DepartmentsComponent implements OnInit {

  form: FormGroup
  departments: Department[] = []
  constructor(
    private fb: FormBuilder,
    private empS: EmployeesService,
    private appS: AppService
  ) { }

  ngOnInit(): void {
    this.init()
  }

  async init() {
    this.form = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(2)]],
      description: ['']
    })
    this.departments = await this.empS.getDepts()
  }

  create() {
    const d = Date.now()
    const dept: Department = {
      id: 'dept_' + d,
      name: this.form.value['name'],
      description: this.form.value['description'],
      createdOn: d,
      timestamp: d
    }
    try {
      this.empS.createDept(dept);
      this.appS.showToast('success', 'New Department Created', 'Department')
      this.departments.unshift(dept)
    } catch (error) {
      this.appS.showToast('danger', error)
    }
  }

  delete(id) {
    try {
      this.empS.deleteDept(id)
      this.appS.showToast('success', 'Department Deleted', 'Department')
      this.init()
    } catch (error) {
      this.appS.showToast('danger', error)
    }
  }
}
