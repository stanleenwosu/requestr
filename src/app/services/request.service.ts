import { Injectable } from "@angular/core";
import { RFO } from "app/@core/data/model";
import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import { FirebaseService } from "./firebase.service";
@Injectable({
  providedIn: "root",
})
export class RequestService {
  rfoDB = firebase.firestore().collection("RFOs");
  colPath = "RFOs";
  constructor(private fireS: FirebaseService) { }

  addRFO(rfo: RFO) {
    return this.rfoDB.doc(rfo.id).set(rfo);
  }

  async getRFO(id: string) {
    const res = await this.rfoDB.doc(id).get();
    if (res.exists) {
      return res.data() as RFO;
    }
    return null;
  }

  async updateRFO(rfo: RFO) {
    const res = await this.rfoDB.doc(rfo.id).update(rfo);
    return res;
  }

  getRFOs(noOfItems = 5) {
    return this.fireS.getColWithLimit(this.colPath, noOfItems);
  }

  async getRFOsByUser(userId: string) {
    const res = await firebase
      .firestore()
      .collection(this.colPath)
      .where("createdBy", "==", userId)
      .orderBy("timestamp", "desc")
      .limit(5)
      .get();
    return res.docs.map((r) => r.data()) as RFO[];
  }

  async paginateRFOsByUser(userId: string, lastId: string) {
    const lastDoc = await this.getLastDoc(lastId)
    const res = await firebase
      .firestore()
      .collection(this.colPath)
      .where("createdBy", "==", userId)
      .orderBy("timestamp", "desc")
      .startAfter(lastDoc)
      .limit(10)
      .get();
    return res.docs.map((r) => r.data()) as RFO[];
  }

  paginateRFOs(noOfItems = 5, lastRFOId: string) {
    return this.fireS.paginateCol(this.colPath, noOfItems, lastRFOId);
  }

  deleteRFO(RFO_Id: string) {
    return this.fireS.deleteDoc(this.colPath, RFO_Id);
  }

  getLastDoc(id: string) {
    return firebase.firestore().collection(this.colPath).doc(id).get()
  }
}
