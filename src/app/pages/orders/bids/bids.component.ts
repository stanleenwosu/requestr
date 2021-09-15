import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Bid } from 'app/@core/data/order';
import { OrdersService } from 'app/services/orders.service';

@Component({
  selector: 'bids',
  templateUrl: './bids.component.html',
  styleUrls: ['./bids.component.scss']
})
export class BidsComponent implements OnInit {

  bids: Bid[]
  orderId = ''
  constructor(
    private route: ActivatedRoute,
    private orderS: OrdersService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.init()
  }

  async init() {
    this.orderId = this.route.snapshot.queryParams['orderId']
    this.bids = await this.orderS.getBidsByOrderId(this.orderId)
  }

  view(bidId: string) {
    this.router.navigate(['orders', this.orderId, 'bids', bidId])
  }
}
