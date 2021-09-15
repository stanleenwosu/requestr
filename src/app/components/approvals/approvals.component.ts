import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RFO_Status } from 'app/@core/data/model';
import { RequestService } from 'app/services/request.service';
@Component({
  selector: 'cmp-approvals',
  templateUrl: './approvals.component.html',
  styleUrls: ['./approvals.component.scss']
})
export class ApprovalsComponent implements OnInit {

  approvalsInView: Request[] = []
  loadingApprovals = true
  rs = RFO_Status
  constructor(
    private reqS: RequestService,
    private router: Router
  ) { }

  ngOnInit(): void {
    setTimeout(() => {
      this.init()
    }, 2000);
  }

  async init() {
   this.approvalsInView = await this.reqS.getRFOs(10)
   this.loadingApprovals = false
  }

  view(id:string) {
    this.router.navigate(['requests', id])
  }

}
