import { Component, Input, OnInit, SimpleChange } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { RFO, RFO_Status } from 'app/@core/data/model';
import { UserRoles } from 'app/@core/data/users';
import { FirebaseService } from 'app/services/firebase.service';
import { RequestService } from 'app/services/request.service';
import { UserService } from 'app/services/user.service'

@Component({
  selector: 'cmp-requests',
  templateUrl: './requests.component.html',
  styleUrls: ['./requests.component.scss']
})
export class RequestsComponent implements OnInit {
  @Input() new: Request;
  requestsInView: RFO[] = []
  loadingRequests = true
  rs = RFO_Status
  todayDate = Date.now();
  constructor(
    private reqS: RequestService,
    private router: Router,
    private route: ActivatedRoute,
    private userS: UserService
  ) { }

  ngOnInit(): void {
    this.init()
  }

  ngOnChanges(changes: { [property: string]: SimpleChange }) {
    let change: SimpleChange = changes['new'];
    if (change.currentValue) {
      this.requestsInView.unshift(change.currentValue)
    }
  }

  async init() {
    if (this.userS.UserInfo.role === UserRoles.STAFF) {
      return this.requestsInView = await this.reqS.getRFOsByUser(this.userS.UserInfo.id);
    }
    this.requestsInView = await this.reqS.getRFOs();
    console.log(this.requestsInView)
    this.loadingRequests = false
    return;
  }

  view(id: string) {
    this.router.navigate(['/requests', id], { relativeTo: this.route })
  }

}
