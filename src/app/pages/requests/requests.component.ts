import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NbGlobalPhysicalPosition, NbToastrService } from '@nebular/theme';
import { Request, RequestStatus } from 'app/@core/data/model';
import { User } from 'app/@core/data/users';
import { FirebaseService } from 'app/services/firebase.service';

@Component({
  selector: 'requests',
  templateUrl: './requests.component.html',
  styleUrls: ['./requests.component.scss']
})
export class RequestsComponent implements OnInit {

  users:User[] = []
  requestForm: FormGroup
  tp = NbGlobalPhysicalPosition.BOTTOM_RIGHT
  constructor(
    private fb: FormBuilder,
    private fireS: FirebaseService,
    private toastr: NbToastrService
  ) { }

  ngOnInit(): void {
    this.requestForm = this.fb.group({
      name: ['', Validators.required],
      detail: [''],
      userId: ['', Validators.required]
    })

    this.init();
  }

  async init() {
    this.users = await this.fireS.getUsers()
    this.users = this.users.filter(u => u.id !== this.fireS.UserInfo.id)
  }

  submit() {
    const d = Date.now()
    const {name, detail, userId} = this.requestForm.value
    const request: Request = {
      id: 'req_' + d,
      name: name,
      detail: detail,
      createdBy: this.fireS.UserInfo.id,
      createdOn: d,
      assignedTo: userId,
      status: RequestStatus.PENDING,
      active: true,
      timestamp: d
    }
    console.log(request)
    try {
      this.fireS.addRequest(request);
      this.toastr.success(`${request.id} added`, "New Request", {
        duration: 2000,
        position: this.tp,
      });
    } catch (error) {
      this.toastr.danger(`User Error`, error, { duration: 2000, position: this.tp });
    }
  }

}
