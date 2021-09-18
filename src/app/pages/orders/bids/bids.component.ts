import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Bid } from 'app/@core/data/order';
import { OrdersService } from 'app/services/orders.service';
import { UserService } from 'app/services/user.service';

@Component({
  selector: 'bids',
  templateUrl: './bids.component.html',
  styleUrls: ['./bids.component.scss']
})
export class BidsComponent implements OnInit {

  filter: 'vendor' | 'order'
  bids: Bid[]
  orderId = ''
  constructor(
    private route: ActivatedRoute,
    private orderS: OrdersService,
    private router: Router,
    private userS: UserService
  ) { }

  ngOnInit(): void {
    this.init()
  }

  async init() {
    this.filter = this.route.snapshot.data['filter']
    if (this.filter === 'vendor') {
      this.bids = await this.orderS.getBidsByVendor(this.userS.UserInfo.id)
    }

    if (this.filter === 'order') {
      this.orderId = this.route.snapshot.queryParams['orderId']
      this.bids = await this.orderS.getBidsByOrderId(this.orderId)
    }

  }

  view(bidId: string) {
    this.router.navigate(['orders', this.orderId, 'bids', bidId])
  }

  loadmore() {

  }
}
