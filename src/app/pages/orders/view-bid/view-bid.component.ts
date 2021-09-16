import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NbDialogService } from '@nebular/theme';
import { Bid } from 'app/@core/data/order';
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

  async approve() {
    const res = await this.confirm("Are you sure you want to Approve Bid?")
    console.log(res)
    if (res) {
      this.bid.status = 'APPROVED'
      this.orderS.updateBid(this.bid)
    }
  }

  async reject() {
    const res = await this.confirm("Are you sure you want to Reject Bid?")
    console.log(res)
    if (res) {
      this.bid.status = 'REJECTED'
      this.orderS.updateBid(this.bid)
    }
  }

  cancel() {

  }

}
