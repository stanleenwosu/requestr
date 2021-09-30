import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { RFO } from "app/@core/data/model";
import { Bid, PurchaseOrder } from "app/@core/data/order";
import { UserRoles } from "app/@core/data/users";
import { OrdersService } from "app/services/orders.service";
import { RequestService } from "app/services/request.service";
import { UserService } from "app/services/user.service";
import { NbDialogService } from "@nebular/theme";
import { PlaceBidComponent } from "app/components/place-bid/place-bid.component";
import { VendorService } from "app/services/vendor.service";
import { MessageComponent } from "app/components/message/message.component";

@Component({
  selector: "view-order",
  templateUrl: "./view-order.component.html",
  styleUrls: ["./view-order.component.scss"],
})
export class ViewOrderComponent implements OnInit {
  order: PurchaseOrder;
  rfo: RFO;
  bids: Bid[];
  vendorBid: boolean;
  role = UserRoles;
  isVendorVerified: boolean;
  constructor(
    private orderS: OrdersService,
    private reqS: RequestService,
    private route: ActivatedRoute,
    private router: Router,
    public userS: UserService,
    private dialogS: NbDialogService,
    private vendorS: VendorService
  ) { }

  ngOnInit(): void {
    this.init();
  }

  async init() {
    const oId = this.route.snapshot.params["id"];
    this.order = await this.orderS.getPurchaseOrder(oId);
    this.rfo = await this.reqS.getRFO(this.order.rfoId);
    if (this.userS.UserInfo.role !== this.role.VENDOR)
      this.bids = await this.orderS.getBidsByOrderId(this.order.id);
    const vBid = await this.orderS.getBidsByOrderIdandVendorId(
      this.order.id,
      this.userS.UserInfo.id)
    console.log(vBid)
    this.vendorBid = vBid
      ? true
      : false;
    this.isVendorVerified = (
      await this.vendorS.getVendorInfo(this.userS.UserInfo.id)
    ).isVerified;
  }

  bid() {
    if (this.isVendorVerified) {
      this.dialogS
        .open(PlaceBidComponent, {
          context: {
            orderId: this.order.id,
          },
          hasBackdrop: true,
        })
        .onClose.subscribe((bid) => {
          if (bid) this.router.navigate(["orders"]);
        });
    } else {
      this.dialogS.open(MessageComponent, {
        context: {
          title: "Vendor Verification",
          message: "You can't place a Bid until account is verified",
          type: "error",
        },
        hasBackdrop: true,
      });
    }
  }

  delete() { }
}
