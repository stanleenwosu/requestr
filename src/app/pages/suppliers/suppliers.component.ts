import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { User, UserRoles } from "app/@core/data/users";
import { VendorService } from "app/services/vendor.service";
import { UserService } from "app/services/user.service";
import { AppService } from "app/services/app.service";

@Component({
  selector: "suppliers",
  templateUrl: "./suppliers.component.html",
  styleUrls: ["./suppliers.component.scss"],
})
export class SuppliersComponent implements OnInit {
  vendors: User[] = [];
  loadingVendors = true;
  isEmpty: boolean = false;
  role = UserRoles;
  verifier = "";
  constructor(
    private vendorS: VendorService,
    private router: Router,
    public userS: UserService,
    private appS: AppService
  ) {}

  ngOnInit(): void {
    this.init();
  }

  async init() {
    this.getVerifier();
    this.vendors = await this.vendorS.getVendors();
    if (this.vendors.length < 10) this.isEmpty = true;
    this.vendors.forEach(async (v) => {
      const vd = await this.vendorS.getVendorInfo(v.id);
      v.isVerified = vd && vd.isVerified ? true : false;
    });
  }

  view(vendorId: string) {
    this.router.navigate(["suppliers/", vendorId]);
  }

  async loadmore() {
    const more = await this.vendorS.paginate(
      10,
      this.vendors[this.vendors.length - 1].id
    );
    more.forEach(async (v) => {
      const vd = await this.vendorS.getVendorInfo(v.id);
      v.isVerified = vd && vd.isVerified ? true : false;
    });
    this.vendors = [...more, ...this.vendors];
    if (more.length < 10) this.isEmpty = true;
  }

  async makeVerifier() {
    await this.vendorS.setVerifier(this.verifier);
    this.appS.showToast('success', 'Verifier Modified')
  }

  async getVerifier() {
    this.verifier = await this.vendorS.getVerifier();
  }
}
