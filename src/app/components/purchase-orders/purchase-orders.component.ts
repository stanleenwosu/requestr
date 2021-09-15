import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PurchaseOrder, PurchaseOrderStatus } from 'app/@core/data/order';
import { OrdersService } from 'app/services/orders.service';

@Component({
  selector: 'purchase-orders',
  templateUrl: './purchase-orders.component.html',
  styleUrls: ['./purchase-orders.component.scss']
})
export class PurchaseOrdersComponent implements OnInit {

  ordersInView: PurchaseOrder[] = []
  loadingOrders = true
  ps = PurchaseOrderStatus
  constructor(
    private orderS: OrdersService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.init()
  }

  async init() {
    this.ordersInView = await this.orderS.getPurchaseOrders();
    console.log(this.ordersInView)
    this.loadingOrders = false
  }

  view(id: string) {
    //this.router.navigate(['/requests', id])
  }

}
