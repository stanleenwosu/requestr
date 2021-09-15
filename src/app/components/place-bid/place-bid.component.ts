import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NbDialogRef, NbGlobalPhysicalPosition, NbToastrService } from '@nebular/theme';
import { Bid } from 'app/@core/data/order';
import { OrdersService } from 'app/services/orders.service';
import { UserService } from 'app/services/user.service';
import firebase from 'firebase/app'
import "firebase/storage";


@Component({
  selector: 'place-bid',
  templateUrl: './place-bid.component.html',
  styleUrls: ['./place-bid.component.scss']
})
export class PlaceBidComponent implements OnInit {

  @Input() orderId: string;
  form: FormGroup
  filesToUpload: any
  fileInfo: any
  file: any[]
  uploadProgress;
  uploading;
  msgDisplay = {
    type: '',
    msg: ''
  }
  tp = NbGlobalPhysicalPosition.BOTTOM_RIGHT
  constructor(
    private fb: FormBuilder,
    private userS: UserService,
    private toastr: NbToastrService,
    private orderS: OrdersService,
    private dialogRef: NbDialogRef<PlaceBidComponent>
  ) { }

  ngOnInit(): void {
    this.init()
  }

  init() {
    this.form = this.fb.group({
      details: ['', Validators.required],
      amount: ['']
    })
  }

  async placeBid(fileUrl: string = '') {
    const d = Date.now()
    const bid: Bid = {
      id: 'bid_' + d,
      vendorId: this.userS.UserInfo.id,
      orderId: this.orderId,
      details: this.form.value['details'],
      amount: this.form.value['amount'],
      attachment: fileUrl,
      createdOn: d,
      timestamp: d
    }
    try {
      await this.orderS.addBid(bid)
      this.toastr.success(`New Bid Added`, 'Bid Success', { duration: 2000, position: this.tp });
      this.dialogRef.close(bid)
    } catch (error) {
      this.toastr.danger(error, 'Bid Error', { duration: 2000, position: this.tp });
    }
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
      this.placeBid()
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
            this.placeBid(dURL)
          })
          .catch(err => this.toastr.danger(`Upload Error`, err, { duration: 2000, position: this.tp }))
      })
  }
}
