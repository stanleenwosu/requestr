import { Injectable } from '@angular/core';
import { User, UserRoles } from 'app/@core/data/users';
import { Vendor } from 'app/@core/data/vendor';

import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import { FirebaseService } from './firebase.service';

@Injectable({
  providedIn: 'root'
})
export class VendorService {
  db = firebase.firestore().collection('users')
  vDb = firebase.firestore().collection('vendors')
  constructor(
    private fireS: FirebaseService
  ) { }

  updateVendor(vendor:Vendor) {
    return this.fireS.updateDoc('vendors', vendor.id, vendor)
  }

  addVendor(vendor:Vendor) {
    return this.fireS.addDoc('vendors', vendor)
  }
  async getVendors() {
    const res = await this.db.orderBy('timestamp').where('role', '==', UserRoles.VENDOR).get()
    if (res.docs.length > 0) {
      return res.docs.map(r => r.data()) as User[]
    }
    return []
  }

  async getVendorInfo(vid: string) {
    const res = await this.db.doc(vid).get()
    if (res.exists) {
      return res.data() as Vendor
    }
    return null
  }
}
