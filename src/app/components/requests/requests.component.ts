import { Component, Input, OnInit, SimpleChange } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { RFO, RFO_Status } from 'app/@core/data/model';
import { FirebaseService } from 'app/services/firebase.service';
import { RequestService } from 'app/services/request.service';

@Component({
  selector: 'cmp-requests',
  templateUrl: './requests.component.html',
  styleUrls: ['./requests.component.scss']
})
export class RequestsComponent implements OnInit {
  @Input() new: Request;
  requestsInView: Request[] = []
  loadingRequests = true
  rs = RFO_Status
  todayDate = Date.now();
  constructor(
    private reqS: RequestService,
    private router: Router,
    private route: ActivatedRoute
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
    this.requestsInView = await this.reqS.getRFOs();
    this.loadingRequests = false
  }

  view(id: string) {
    this.router.navigate(['/requests', id], {relativeTo: this.route})
  }

}
