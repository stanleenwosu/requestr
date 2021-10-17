import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { User } from "app/@core/data/users";
import { VendorService } from "app/services/vendor.service";
import { from } from 'rxjs';
import { map } from 'rxjs/operators';


@Component({
  selector: "suppliers",
  templateUrl: "./suppliers.component.html",
  styleUrls: ["./suppliers.component.scss"],
})
export class SuppliersComponent implements OnInit {
  vendors: User[] = [];
  loadingVendors = true;
  isEmpty: boolean = false;
  constructor(private vendorS: VendorService, private router: Router) { }

  ngOnInit(): void {
    this.init();
  }

  async init() {
    //this.vendors = await this.vendorS.getVendors();
    this.vendors = await this.vendorS.getVendors();
    if ( this.vendors.length < 10) this.isEmpty = true;
    this.vendors.forEach(async v => {
      const vd = await this.vendorS.getVendorInfo(v.id)
      v.isVerified = vd && vd.isVerified ? true : false
    })
  }

  view(vendorId: string) {
    this.router.navigate(["suppliers/", vendorId]);
  }

  async loadmore() {
    const more = await this.vendorS.paginate(10, this.vendors[this.vendors.length - 1].id)
    more.forEach(async v => {
      const vd = await this.vendorS.getVendorInfo(v.id)
      v.isVerified = vd && vd.isVerified ? true : false
    })
    this.vendors = [...more, ...this.vendors]
    if (more.length < 10) this.isEmpty = true;
  }
}
