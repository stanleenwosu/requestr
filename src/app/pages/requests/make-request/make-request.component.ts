import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NbGlobalPhysicalPosition, NbToastrService } from '@nebular/theme';
import { RFO, RFO_Status } from 'app/@core/data/model';
import { User } from 'app/@core/data/users';
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
  constructor(
    private fb: FormBuilder,
    private userS: UserService,
    private reqS: RequestService,
    private toastr: NbToastrService
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
    /* this.users = await this.userS.getUsers()
    this.users = this.users.filter(u => u.id !== this.userS.UserInfo.id) */
  }

  item() {
    return this.fb.group({
      name: ['', Validators.required],
      quantity: ['', [Validators.required, Validators.min(0)]],
      amount: ['', [Validators.required, Validators.min(0)]],
      total: ['', [Validators.required, Validators.min(0)]]
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
      id: 'req_' + d,
      name: name,
      detail: detail,
      items: items,
      createdBy: this.userS?.UserInfo?.id || null,
      createdOn: d,
      assignedTo: userId,
      status: RFO_Status.PENDING,
      active: true,
      deadline: deadline,
      attachment: attachmentURL,
      timestamp: d
    }
    try {
      await this.reqS.addRFO(request);
      this.newRequest = request
      this.toastr.success(`${request.id} added`, "New Request", {
        duration: 4000,
        position: this.tp,
      });
    } catch (error) {
      this.toastr.danger(`User Error`, error, { duration: 2000, position: this.tp });
    }
  }

  handleDateChange(e) {
    const d = new Date(e)
    this.requestForm.patchValue({ deadline: d })
  }

  upload(files) {
    this.fileInfo = null
    this.filesToUpload = null
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
        this.filesToUpload = fileUrl
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