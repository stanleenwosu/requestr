import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { NbGlobalPhysicalPosition, NbToastrService } from '@nebular/theme';
import { RFO, RFO_Status } from 'app/@core/data/model';
import { User } from 'app/@core/data/users';
import { NotificationsService } from 'app/services/notifications.service';
import { RequestService } from 'app/services/request.service';
import { UserService } from 'app/services/user.service';
import firebase from 'firebase/app'
import "firebase/storage";

@Component({
  selector: 'make-request',
  templateUrl: './make-request.component.html',
  styleUrls: ['./make-request.component.scss']
})
export class MakeRequestComponent implements OnInit {

  users: User[] = []
  requestForm: FormGroup
  newRequest: RFO;
  tp = NbGlobalPhysicalPosition.BOTTOM_RIGHT
  filesToUpload: any
  fileInfo: any
  file: any[]
  uploadProgress;
  uploading;
  msgDisplay = {
    type: '',
    msg: ''
  }
  type: 'REQUEST' | 'ORDER'
  constructor(
    private fb: FormBuilder,
    private userS: UserService,
    private reqS: RequestService,
    private toastr: NbToastrService,
    private route: ActivatedRoute,
    private notS: NotificationsService
  ) { }

  ngOnInit(): void {
    this.requestForm = this.fb.group({
      name: ['', Validators.required],
      items: this.fb.array([this.item()]),
      detail: [''],
      userId: [''],
      deadline: ['']
    })

    this.init();
  }

  async init() {
    this.type = this.route.snapshot.data['type']
  }

  item() {
    return this.fb.group({
      name: ['', Validators.required],
      quantity: ['', [Validators.min(0)]],
      amount: ['', [Validators.min(0)]],
      total: ['', [Validators.min(0)]]
    })
  }

  items(): FormArray {
    return this.requestForm.get("items") as FormArray
  }

  addItem() {
    this.items().push(this.item())
  }

  removeItem(i) {
    this.items().removeAt(i)
  }

  async submit(attachmentURL = '') {
    const d = Date.now()
    const { name, detail, userId, deadline, items } = this.requestForm.value
    const request: RFO = {
      id: 'RFO' + d,
      name: name,
      detail: detail,
      items: items,
      createdBy: this.userS?.UserInfo?.id || null,
      createdOn: d,
      assignedTo: userId,
      status: RFO_Status.PENDING,
      active: true,
      type: this.type,
      deadline: deadline,
      attachment: attachmentURL,
      timestamp: d
    }
    try {
      await this.reqS.addRFO(request);
      await this.notS.addNotification(`New${this.type}`, '', this.userS.UserInfo.id, { type: <any>this.type })
      await this.notS.addStaffNotification(request.id)
      this.newRequest = request
      this.toastr.success(`${request.id} added`, `New ${this.type}`, {
        duration: 4000,
        position: this.tp,
      });
      this.requestForm.reset()
    } catch (error) {
      this.toastr.danger(`User Error`, error, { duration: 2000, position: this.tp });
    }
  }

  handleDateChange(e) {
    const d = new Date(e)
    this.requestForm.patchValue({ deadline: d })
  }

  upload(files) {
    //clear all  the shit first
    this.fileInfo = null
    this.filesToUpload = null
    this.msgDisplay = {
      type: '',
      msg: ''
    }
    try {
      if (files.length === 0)
        return;
      let mimeType = files[0].type;
      if (mimeType.match(/image|zip|document|sheet\/*/) == null) {
        throw new Error("File not Supported");
      }
      if (files[0].size > 1048576) {
        throw new Error("File must be less than 1mb");
      }
      var reader = new FileReader();
      this.fileInfo = files[0];

      reader.readAsDataURL(files[0]);
      reader.onload = (_event) => {
        const fileUrl = reader.result;
        console.log(reader.result)
        this.filesToUpload = fileUrl
        console.log(this.filesToUpload)
      }
      reader.onerror = (_ev) => {
        throw new Error("An Error Occured");
      }
    } catch (error) {
      this.msgDisplay = {
        type: 'error',
        msg: error
      }
    }

  }



  uploadToDB() {
    if (!this.fileInfo) {
      this.submit()
      return
    }
    this.uploading = true
    const uploadTask = firebase.storage().ref().child(`files/${this.fileInfo.name}`).putString(this.filesToUpload, 'data_url')
    uploadTask.on('state_changed', snapshot => {
      let progress = Math.floor((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
      this.uploadProgress = progress
    },
      err => {
        this.toastr.danger(`Upload Error`, err, { duration: 2000, position: this.tp });
      },
      () => {
        uploadTask.snapshot.ref.getDownloadURL()
          .then(dURL => {
            this.submit(dURL)
          })
          .catch(err => this.toastr.danger(`Upload Error`, err, { duration: 2000, position: this.tp }))
      })
  }

}
