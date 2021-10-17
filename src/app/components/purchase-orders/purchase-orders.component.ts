import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { PurchaseOrder, PurchaseOrderStatus } from "app/@core/data/order";
import { UserRoles } from "app/@core/data/users";
import { OrdersService } from "app/services/orders.service";
import { UserService } from "app/services/user.service";

@Component({
  selector: "purchase-orders",
  templateUrl: "./purchase-orders.component.html",
  styleUrls: ["./purchase-orders.component.scss"],
})
export class PurchaseOrdersComponent implements OnInit {
  ordersInView: PurchaseOrder[] = [];
  loadingOrders = true;
  ps = PurchaseOrderStatus;
  userRole;
  role = UserRoles
  lastOrderId: string;
  canPaginate: boolean = true;
  constructor(
    private orderS: OrdersService,
    private router: Router,
    private route: ActivatedRoute,
    private userS: UserService
  ) {}

  ngOnInit(): void {
    this.init();
  }

  async init() {
    this.userRole = this.userS.UserInfo.role
    if (this.userS.UserInfo.role === UserRoles.STAFF) {
      this.ordersInView = await this.orderS.getPurchaseOrdersByUserId(
        this.userS.UserInfo.id
      );
    } else {
      this.ordersInView = await this.orderS.getPurchaseOrders();
      this.lastOrderId = this.ordersInView[this.ordersInView.length - 1].id;
    }
    if (this.ordersInView.length < 5) this.canPaginate = false;
    this.loadingOrders = false;
  }

  view(id: string) {
    this.router.navigate(["/orders", id]);
  }

  async paginate() {
    let moreData = [];
    if (this.userS.UserInfo.role === UserRoles.STAFF) {
      moreData = await this.orderS.paginatePurchaseOrdersByUserID(
        this.lastOrderId,
        this.userS.UserInfo.id
      );
    } else {
      moreData = await this.orderS.paginatePurchaseOrders(this.lastOrderId);
    }
    if (moreData.length < 5) this.canPaginate = false;
    this.ordersInView = [...moreData, ...this.ordersInView];
    this.lastOrderId = this.ordersInView[this.ordersInView.length - 1].id;
  }
}
