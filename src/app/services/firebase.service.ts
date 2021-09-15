import { Injectable } from "@angular/core";

import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";

@Injectable({
  providedIn: "root",
})
export class FirebaseService {
  constructor() {}
  /*  async getApproval(id: string) {
     const res = await this.rDB.where("assignedTo", "==", id).get();
     if (res.docs.length > 0) {
       return res.docs[0].data() as Request;
     }
     return null;
   }



   async getApprovals(limit = 5): Promise<Request[]> {
     if (!this.user) {
       return [];
     }
     const res = await this.rDB
       .where("assignedTo", "==", this.user.id)
       .where("active", '==', true)
       .orderBy("timestamp", "desc")
       .limit(limit)
       .get();
     this.lastApproval = res.docs[res.docs.length - 1];
     return res.docs.map((r) => r.data() as Request);
   }

   async paginateApprovals(limit = 5): Promise<Request[]> {
     const res = await this.rDB
       .where("assignedTo", "==", this.user.id)
       .where("active", '==', true)
       .orderBy("timestamp", "desc")
       .startAfter(this.lastRequest)
       .limitToLast(limit)
       .get();
     this.lastApproval = res.docs[res.docs.length - 1];
     return res.docs.map((r) => r.data() as Request);
   } */

  async addDoc(colPath: string, data: any) {
    return await firebase
      .firestore()
      .collection(colPath)
      .doc(data.id)
      .set(data);
  }

  async getDoc(colPath: string, docId: string) {
    const res = await firebase.firestore().collection(colPath).doc(docId).get();
    return res.data();
  }

  async getCol(colPath: string) {
    const res = await firebase
      .firestore()
      .collection(colPath)
      .orderBy("timestamp", "desc")
      .get();
    return res.docs.map((r) => r.data() as any);
  }

  async getColWithLimit(colPath: string, noOfItems = 10) {
    const res = await firebase
      .firestore()
      .collection(colPath)
      .orderBy("timestamp", "desc")
      .limit(noOfItems)
      .get();
    return res.docs.map((r) => r.data()) as any[]
  }

  async paginateCol(colPath: string, noOfItems = 10, lastDocId: string) {
    if (!lastDocId) {
      return this.getColWithLimit(colPath, noOfItems);
    }
    const lastDoc = this.getDoc(colPath, lastDocId);
    const res = await firebase
      .firestore()
      .collection(colPath)
      .orderBy("timestamp", "desc")
      .startAfter(lastDoc)
      .limitToLast(noOfItems)
      .get();
    return res.docs.map((r) => r.data()) as any[];
  }

  //Delete a document
  async deleteDoc(colPath: string, docId: string) {
    return await firebase.firestore().collection(colPath).doc(docId).delete();
  }

  // Update a document
  async updateDoc(colPath: string, docId: string, data: any) {
    return await firebase
      .firestore()
      .collection(colPath)
      .doc(docId)
      .update(data);
  }
}
