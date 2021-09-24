import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { RFO_Status, RFO } from 'app/@core/data/model';
import { PurchaseOrder, PurchaseOrderStatus } from 'app/@core/data/order';
import { UserRoles } from 'app/@core/data/users';
import { AppService } from 'app/services/app.service';
import { NotificationsService } from 'app/services/notifications.service';
import { OrdersService } from 'app/services/orders.service';
import { RequestService } from 'app/services/request.service';
import { UserService } from 'app/services/user.service';

@Component({
  selector: 'view-request',
  templateUrl: './view-request.component.html',
  styleUrls: ['./view-request.component.scss']
})
export class ViewRequestComponent implements OnInit {
  rfo: RFO = null
  rfoS = RFO_Status
  role = UserRoles
  action = {
    type: null,
    message: '',
    comment: null
  }
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    public userS: UserService,
    private reqS: RequestService,
    private orderS: OrdersService,
    private appS: AppService,
    private notS: NotificationsService
  ) { }

  ngOnInit(): void {
    this.init()
    console.log(this.userS.UserInfo)
  }

  async init() {
    const rfo_id = this.route.snapshot.params['id']
    this.rfo = await this.reqS.getRFO(rfo_id)
  }

  cancel() {
    this.rfo.active = false
  }

  async approve() {
    this.rfo.status = RFO_Status.APPROVED
    this.rfo.comment = this.action.comment
    await this.reqS.updateRFO(this.rfo)
    if (this.rfo.type == 'REQUEST') {
      return;
    }
    const d = Date.now()
    const newOrder: PurchaseOrder = {
      id: 'pco_' + d,
      rfoId: this.rfo.id,
      bids: [],
      timestamp: d,
      createdOn: d,
      createdBy: this.rfo.createdBy,
      approvedBy: this.userS.UserInfo.id,
      status: PurchaseOrderStatus.BIDDING
    }

    try {
      await this.orderS.createPurchaseOrder(newOrder)
      await this.notS.addVendorNotification(newOrder.id)
      this.appS.showToast('success', 'A new Purchase Order has been Created', 'Purchase Order')
      this.router.navigate(['requests/awaiting-requests'])

    } catch (error) {
      this.appS.showToast('danger', error, 'Purchase Order')
    }
  }

  deny() {
    this.rfo.status = RFO_Status.REJECTED
    this.rfo.comment = this.action.comment
    this.save()
  }

  actionApprove() {
    this.action.type = 'APPROVE'
    this.action.comment = null
    this.action.message = 'Reason for Approving Request'
  }

  actionDeny() {
    this.action.type = 'DENY'
    this.action.comment = null
    this.action.message = 'Reason for Denying Request'
  }

  takeAction() {
    if (this.action.type === 'APPROVE') {
      this.approve()
    }
    if (this.action.type === 'DENY') {
      this.deny()
    }
  }

  review() {
    this.rfo.status = RFO_Status.PENDING
    this.save()
  }

  save() {
    this.reqS.updateRFO(this.rfo);
    this.router.navigate(['requests/awaiting-requests'])
  }
}
