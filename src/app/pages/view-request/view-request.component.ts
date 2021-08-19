import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Request, RequestStatus } from 'app/@core/data/model';
import { FirebaseService } from 'app/services/firebase.service';

@Component({
  selector: 'view-request',
  templateUrl: './view-request.component.html',
  styleUrls: ['./view-request.component.scss']
})
export class ViewRequestComponent implements OnInit {

  request:Request = null
  constructor(
    private route: ActivatedRoute,
    public fireS: FirebaseService
  ) { }

  ngOnInit(): void {
    this.init()
  }

  async init() {
    const requestId = this.route.snapshot.params['id']
    this.request = await this.fireS.getRequest(requestId)
  }

  cancel(){
    this.request.active = false
  }

  approve() {
    this.request.status = RequestStatus.APPROVED
  }

  deny() {
    this.request.status = RequestStatus.REJECTED
  }

  save() {
    this.fireS.updateRequest(this.request)
  }

  ngOnDestroy() {
    this.save()
    console.log("Saved Reqeust")
  }

}
