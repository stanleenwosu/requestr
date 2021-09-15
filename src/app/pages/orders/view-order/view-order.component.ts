import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RFO } from 'app/@core/data/model';
import { PurchaseOrder } from 'app/@core/data/order';
import { UserRoles } from 'app/@core/data/users';
import { OrdersService } from 'app/services/orders.service';
import { RequestService } from 'app/services/request.service';
import { UserService } from 'app/services/user.service';

@Component({
  selector: 'view-order',
  templateUrl: './view-order.component.html',
  styleUrls: ['./view-order.component.scss']
})
export class ViewOrderComponent implements OnInit {

  order: PurchaseOrder
  rfo: RFO
  role = UserRoles
  constructor(
    private orderS: OrdersService,
    private reqS: RequestService,
    private route: ActivatedRoute,
    public userS:UserService
  ) { }

  ngOnInit(): void {
  }

  async init() {
    const oId = this.route.snapshot.params['id']
    this.order = await this.orderS.getPurchaseOrder(oId)
    this.rfo = await this.reqS.getRFO(this.order.rfoId)
  }

}
