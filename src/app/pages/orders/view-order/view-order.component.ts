import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { RFO } from 'app/@core/data/model';
import { Bid, PurchaseOrder } from 'app/@core/data/order';
import { UserRoles } from 'app/@core/data/users';
import { OrdersService } from 'app/services/orders.service';
import { RequestService } from 'app/services/request.service';
import { UserService } from 'app/services/user.service';
import { NbDialogService } from '@nebular/theme';
import { PlaceBidComponent } from 'app/components/place-bid/place-bid.component';


@Component({
  selector: 'view-order',
  templateUrl: './view-order.component.html',
  styleUrls: ['./view-order.component.scss']
})
export class ViewOrderComponent implements OnInit {

  order: PurchaseOrder
  rfo: RFO
  bids: Bid[]
  vendorBid: boolean
  role = UserRoles
  constructor(
    private orderS: OrdersService,
    private reqS: RequestService,
    private route: ActivatedRoute,
    private router: Router,
    public userS: UserService,
    private dialogS: NbDialogService
  ) { }

  ngOnInit(): void {
    this.init()
  }

  async init() {
    const oId = this.route.snapshot.params['id']
    this.order = await this.orderS.getPurchaseOrder(oId)
    this.rfo = await this.reqS.getRFO(this.order.rfoId)
    this.bids = await this.orderS.getBidsByOrderId(this.order.id)
    this.vendorBid = this.bids.map(b => b.vendorId).includes(this.userS.UserInfo.id)
  }

  bid() {
    this.dialogS.open(PlaceBidComponent, {
      context: {
        'orderId': this.order.id
      },
      hasBackdrop: true
    })
      .onClose.subscribe(bid => {
        if (bid)
          this.router.navigate(['orders'])
      });
  }

}
