import { Injectable } from "@angular/core";
import { User, UserRoles } from "app/@core/data/users";
import { Vendor } from "app/@core/data/vendor";

import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import { FirebaseService } from "./firebase.service";

@Injectable({
  providedIn: "root",
})
export class VendorService {
  db = firebase.firestore().collection("users");
  vDb = firebase.firestore().collection("vendors");
  constructor(private fireS: FirebaseService) { }

  updateVendor(vendor: Vendor) {
    return this.fireS.updateDoc("vendors", vendor.id, vendor);
  }

  addVendor(vendor: Vendor) {
    return this.fireS.addDoc("vendors", vendor);
  }
  async getVendors(limit = 10) {
    const res = await this.db
      .orderBy("timestamp", "desc")
      .where("role", "==", UserRoles.VENDOR)
      .limit(limit)
      .get();
    if (res.docs.length > 0) {
      return res.docs.map((r) => r.data()) as User[];
    }
    return [];
  }

  async paginate(limit = 10, lastId: string) {
    const lastDoc = await this.getLastDoc(lastId);
    const res = await this.db
      .orderBy("timestamp", "desc")
      .where("role", "==", UserRoles.VENDOR)
      .startAfter(lastDoc)
      .limit(limit)
      .get();
    return res.docs.map((r) => r.data()) as User[];
  }

  async getVendorInfo(vid: string) {
    const res = await this.vDb.doc(vid).get();
    if (res.exists) {
      return res.data() as Vendor;
    }
    return null;
  }

  getLastDoc(id: string) {
    return this.vDb.doc(id).get();
  }

  async getVerifier() {
    const res = await firebase
      .firestore()
      .collection("settings")
      .doc("vendor")
      .get();
      return res.data().verifier
  }

  async setVerifier(email: string) {
    console.log(email)
    await firebase
      .firestore()
      .collection("settings")
      .doc("vendor")
      .set({ verifier: email });
  }
}
