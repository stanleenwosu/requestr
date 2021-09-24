import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { NbGlobalPhysicalPosition, NbToastrService } from "@nebular/theme";
import { User, UserRoles } from "app/@core/data/users";
import { AppService } from 'app/services/app.service';
import { UserService } from 'app/services/user.service';
@Component({
  selector: 'employees',
  templateUrl: './employees.component.html',
  styleUrls: ['./employees.component.scss']
})
export class EmployeesComponent implements OnInit {

  form: FormGroup;
  tp = NbGlobalPhysicalPosition.BOTTOM_RIGHT
  staffs: User[]
  admins: User[]
  loading = true
  constructor(
    private fb: FormBuilder,
    private userS: UserService,
    private toastr: NbToastrService,
    private appS: AppService
  ) { }

  ngOnInit(): void {
    this.form = this.fb.group({
      name: [""],
      email: ["", [Validators.required, Validators.email]],
      role: ["", Validators.required],
    });
    this.init()
  }

  async init() {
    this.staffs = await this.userS.getStaffs()
    this.admins = await this.userS.getAdmins()
    this.loading = false
    return;
  }
  submit() {
    const d = Date.now();
    const { name, email } = this.form.value;
    try {
      const user: User = {
        id: "user_" + d,
        name: name,
        email: email,
        password: this.appS.generatePassword(),
        timestamp: d,
      };
      this.userS.addUser(user);
      this.toastr.success(`${name} added`, "New User", {
        duration: 2000,
        position: this.tp,
      });
    } catch (error) {
      this.toastr.danger(`User Error`, error, { duration: 2000, position: this.tp });
    }
  }

  generatePassword() { }


  async makeAdmin(uid:string) {
    const res = this.admins.filter(u => u.id === uid)
    if (res.length > 0) {
      this.appS.showToast('danger', 'User is aleady an Admin', 'Staffs')
      return
    }
    try {
      let user = await this.userS.getUser(uid)
      user.role = UserRoles.ADMIN
      this.userS.updateUser(user)
      this.appS.showToast('success', 'User is now an Admin', 'Staffs')
      this.init()
    } catch (error) {
      this.appS.showToast('danger', error, 'Staffs')
    }
  }



  async makeStaff(uid:string) {
    const res = this.staffs.filter(u => u.id === uid)
    if (res.length > 0) {
      this.appS.showToast('danger', 'User is aleady a Staff', 'Staffs')
      return
    }
    try {
      let user = await this.userS.getUser(uid)
      user.role = UserRoles.STAFF
      this.userS.updateUser(user)
      this.appS.showToast('success', 'User is now a Staff', 'Staffs')
      this.init()
    } catch (error) {
      this.appS.showToast('danger', error, 'Staffs')
    }
  }

}
