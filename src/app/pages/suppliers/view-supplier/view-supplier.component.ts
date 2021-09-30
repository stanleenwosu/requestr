import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Vendor } from 'app/@core/data/vendor';
import { AppService } from 'app/services/app.service';
import { UserService } from 'app/services/user.service';
import { VendorService } from 'app/services/vendor.service';

@Component({
  selector: 'view-supplier',
  templateUrl: './view-supplier.component.html',
  styleUrls: ['./view-supplier.component.scss']
})
export class ViewSupplierComponent implements OnInit {

  vendor: Vendor
  constructor(
    private route: ActivatedRoute,
    private vendorS: VendorService,
    private appS: AppService,
    public userS: UserService
  ) { }

  ngOnInit(): void {
    this.init()
  }

  async init() {
    this.vendor = await this.vendorS.getVendorInfo(this.route.snapshot.params.id)
  }

  async verify() {
    this.vendor.isVerified = true
    await this.vendorS.updateVendor(this.vendor)
    this.appS.showToast('success', 'You Verified a Vendor', 'Vendor Verification')
  }

}
