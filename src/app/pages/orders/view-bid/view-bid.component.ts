import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NbDialogService } from '@nebular/theme';
import { Bid, IDecision, IStatus, } from 'app/@core/data/order';
import { UserRoles } from 'app/@core/data/users';
import { ConfirmDialogComponent } from 'app/components/confirm-dialog/confirm-dialog.component';
import { OrdersService } from 'app/services/orders.service';
import { UserService } from 'app/services/user.service';

@Component({
  selector: 'view-bid',
  templateUrl: './view-bid.component.html',
  styleUrls: ['./view-bid.component.scss']
})
export class ViewBidComponent implements OnInit {

  bid: Bid
  role = UserRoles
  status = IStatus
  constructor(
    public userS: UserService,
    private orderS: OrdersService,
    private route: ActivatedRoute,
    private dialogS: NbDialogService
  ) { }

  ngOnInit(): void {
    this.init()
  }

  async init() {
    const bidId = this.route.snapshot.params['id']
    this.bid = await this.orderS.getBid(bidId)
  }

  confirm(message: string) {
    return this.dialogS.open(ConfirmDialogComponent, {
      context: {
        message: message
      }
    })
      .onClose.toPromise()
  }

  viewRFO() {

  }

  async approve(role: UserRoles) {
    const res = await this.confirm("Are you sure you want to Approve Bid?")
    if (!res) return
    switch (role) {
      case UserRoles.STAFF:
        this.bid.staffDecision = this.userDecision(IStatus.APPROVED)
        break;
      case UserRoles.ADMIN:
        this.bid.adminDecision = this.userDecision(IStatus.APPROVED)
        break;
      case UserRoles.SUPER:
        this.bid.status = this.status.APPROVED
        this.bid.superDecision = this.userDecision(IStatus.APPROVED)
        break;
    }
    this.orderS.updateBid(this.bid)

  }

  async reject(role: UserRoles) {
    const res = await this.confirm("Are you sure you want to Reject Bid?")
    if (!res) return
    switch (role) {
      case UserRoles.STAFF:
        this.bid.staffDecision = this.userDecision(IStatus.REJECTED)
        break;
      case UserRoles.ADMIN:
        this.bid.adminDecision = this.userDecision(IStatus.REJECTED)
        break;
      case UserRoles.SUPER:
        this.bid.status = this.status.REJECTED
        this.bid.superDecision = this.userDecision(IStatus.REJECTED)
        break;
    }
    this.orderS.updateBid(this.bid)
  }

  userDecision(status: IStatus): IDecision {
    const decision: IDecision = {
      userId: this.userS.UserInfo.id,
      status: status,
      timestamp: Date.now()
    }
    return decision
  }

  cancel() {

  }

}
