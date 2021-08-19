import { Component, Input, OnInit, SimpleChange } from '@angular/core';
import { Router } from '@angular/router';
import { Request, RequestStatus } from 'app/@core/data/model';
import { FirebaseService } from 'app/services/firebase.service';

@Component({
  selector: 'cmp-requests',
  templateUrl: './requests.component.html',
  styleUrls: ['./requests.component.scss']
})
export class RequestsComponent implements OnInit {
  @Input() new: Request;
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

  ngOnChanges(changes: { [property: string]: SimpleChange }) {
    let change: SimpleChange = changes['new'];
    if (change.currentValue) {
      this.requestsInView.unshift(change.currentValue)
    }
  }

  async init() {
    this.requestsInView = await this.fireS.getRequests()
    this.loadingRequests = false
  }

  view(id: string) {
    this.router.navigate(['requests', id])
  }

}
