import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Request, RequestStatus } from 'app/@core/data/model';
import { FirebaseService } from 'app/services/firebase.service';

@Component({
  selector: 'cmp-requests',
  templateUrl: './requests.component.html',
  styleUrls: ['./requests.component.scss']
})
export class RequestsComponent implements OnInit {

  requestsInView: Request[] = []
  loadingRequests = true
  rs = RequestStatus
  constructor(
    private fireS: FirebaseService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.init()
  }

  async init() {
   this.requestsInView = await this.fireS.getRequests()
   this.loadingRequests = false
  }

  view(id:string) {
    this.router.navigate(['requests', id])
  }

}
