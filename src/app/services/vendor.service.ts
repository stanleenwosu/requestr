import { Injectable } from '@angular/core';
import { User, UserRoles } from 'app/@core/data/users';

import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";

@Injectable({
  providedIn: 'root'
})
export class VendorService {
  db = firebase.firestore().collection('users')
  constructor(
  ) { }

  async getVendors() {
    const res = await this.db.orderBy('timestamp').where('role', '==', UserRoles.VENDOR).get()
    if (res.docs.length > 0) {
      return res.docs.map(r => r.data()) as User[]
    }
    return []
  }
}
