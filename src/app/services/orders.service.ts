import { Injectable } from "@angular/core";
import { Bid, PurchaseOrder } from "app/@core/data/order";
import { FirebaseService } from "./firebase.service";

import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
@Injectable({
  providedIn: "root",
})
export class OrdersService {
  db = firebase.firestore();
  ordColPath = "purchase-orders";
  bidColPath = "bids";
  constructor(private fireS: FirebaseService) {}

  createPurchaseOrder(order: PurchaseOrder) {
    return this.fireS.addDoc(this.ordColPath, order);
  }

  getPurchaseOrder(id: string) {
    return this.fireS.getDoc(this.ordColPath, id) as Promise<PurchaseOrder>;
  }

  getPurchaseOrders(noOfItems = 5) {
    return this.fireS.getColWithLimit(this.ordColPath, noOfItems) as Promise<
      PurchaseOrder[]
    >;
  }

  paginatePurchaseOrders(lastId: string, noOfItems = 5) {
    return this.fireS.paginateCol(
      this.ordColPath,
      noOfItems,
      lastId
    ) as Promise<PurchaseOrder[]>;
  }

  async getPurchaseOrdersByUserId(userId: string, noOfItems = 5) {
    const res = await this.db
      .collection(this.ordColPath)
      .orderBy("timestamp", "desc")
      .where("createdBy", "==", userId)
      .limit(noOfItems)
      .get();
    return res.docs.map((r) => r.data()) as PurchaseOrder[];
  }

  async paginatePurchaseOrdersByUserID(
    lastId: string,
    userId: string,
    noOfItems = 10
  ) {
    const lastDoc = await this.db.collection(this.ordColPath).doc(lastId).get();
    const res = await this.db
      .collection(this.ordColPath)
      .orderBy("timestamp", "desc")
      .where("createdBy", "==", userId)
      .startAfter(lastDoc)
      .limit(noOfItems)
      .get();
    return res.docs.map((r) => r.data()) as PurchaseOrder[];
  }

  addBid(bid: Bid) {
    console.log(bid);
    return this.fireS.addDoc(this.bidColPath, bid);
  }

  updateBid(bid: Bid) {
    return this.fireS.updateDoc(this.bidColPath, bid.id, bid);
  }
  async getBid(bidId: string) {
    return (await this.fireS.getDoc(this.bidColPath, bidId)) as Bid;
  }

  async getBidsByOrderId(orderId: string) {
    const res = await firebase
      .firestore()
      .collection("bids")
      .where("orderId", "==", orderId)
      .get();
    return res.docs.map((r) => r.data()) as Bid[];
  }

  async getBidsByOrderIdandVendorId(orderId: string, vendorId: string) {
    const res = await firebase
      .firestore()
      .collection("bids")
      .where("orderId", "==", orderId)
      .where("vendorId", "==", vendorId)
      .get();
    return res.docs.map((r) => r.data()) as Bid[];
  }

  async getBidsByVendor(vendorId: string) {
    const res = await firebase
      .firestore()
      .collection("bids")
      .where("vendorId", "==", vendorId)
      .get();
    return res.docs.map((r) => r.data()) as Bid[];
  }
}
