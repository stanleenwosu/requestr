import { Component, OnInit } from '@angular/core';
import { User } from 'app/@core/data/users';
import { VendorService } from 'app/services/vendor.service';

@Component({
  selector: 'suppliers',
  templateUrl: './suppliers.component.html',
  styleUrls: ['./suppliers.component.scss']
})
export class SuppliersComponent implements OnInit {

  vendors: User[] = []
  constructor(
    private vendorS: VendorService
  ) { }

  ngOnInit(): void {
    this.init()
  }

  async init () {
    this.vendors = await this.vendorS.getVendors()
  }
}
