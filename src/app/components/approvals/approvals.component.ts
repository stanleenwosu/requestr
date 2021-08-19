import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Request, RequestStatus } from 'app/@core/data/model';
import { FirebaseService } from 'app/services/firebase.service';
@Component({
  selector: 'cmp-approvals',
  templateUrl: './approvals.component.html',
  styleUrls: ['./approvals.component.scss']
})
export class ApprovalsComponent implements OnInit {

  approvalsInView: Request[] = []
  loadingApprovals = true
  rs = RequestStatus
  constructor(
    private fireS: FirebaseService,
    private router: Router
  ) { }

  ngOnInit(): void {
    setTimeout(() => {
      this.init()
    }, 2000);
  }

  async init() {
   this.approvalsInView = await this.fireS.getApprovals()
   this.loadingApprovals = false
  }

  view(id:string) {
    this.router.navigate(['requests', id])
  }

}
