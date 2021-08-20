import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NbGlobalPhysicalPosition, NbToastrService } from '@nebular/theme';
import { Request, RequestStatus } from 'app/@core/data/model';
import { User } from 'app/@core/data/users';
import { FirebaseService } from 'app/services/firebase.service';
import  firebase from 'firebase/app'
import "firebase/storage";

@Component({
  selector: 'requests',
  templateUrl: './requests.component.html',
  styleUrls: ['./requests.component.scss']
})
export class RequestsComponent implements OnInit {

  users: User[] = []
  requestForm: FormGroup
  newRequest: Request;
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
    private fireS: FirebaseService,
    private toastr: NbToastrService
  ) { }

  ngOnInit(): void {
    this.requestForm = this.fb.group({
      name: ['', Validators.required],
      detail: [''],
      userId: [''],
      deadline: ['']
    })

    this.init();
  }

  async init() {
    this.users = await this.fireS.getUsers()
    this.users = this.users.filter(u => u.id !== this.fireS.UserInfo.id)
  }

  async submit(atch?:string) {
    const d = Date.now()
    const { name, detail, userId, deadline } = this.requestForm.value
    const request: Request = {
      id: 'req_' + d,
      name: name,
      detail: detail,
      createdBy: this.fireS.UserInfo.id,
      createdOn: d,
      assignedTo: userId,
      status: RequestStatus.PENDING,
      active: true,
      deadline: deadline,
      attachment: atch,
      timestamp: d
    }
    try {
      await this.fireS.addRequest(request);
      this.newRequest = request
      this.toastr.success(`${request.id} added`, "New Request", {
        duration: 2000,
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
    if (!this.fileInfo){
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
