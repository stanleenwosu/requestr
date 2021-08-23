import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { Request } from "app/@core/data/model";
import { User } from "app/@core/data/users";

import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";

@Injectable({
  providedIn: "root",
})
export class FirebaseService {
  rDB = firebase.firestore().collection("request");
  uDB = firebase.firestore().collection("users");
  lastRequest: any;
  lastApproval: any;
  lastuser: any;
  user: User;
  constructor(private router: Router) { }

  async getRequests(limit = 5): Promise<Request[]> {
    const res = await this.rDB.orderBy("timestamp", "desc").limit(limit).get();
    this.lastRequest = res.docs[res.docs.length - 1];
    return res.docs.map((r) => r.data() as Request);
  }

  async paginateRequests(limit = 5): Promise<Request[]> {
    const res = await this.rDB
      .orderBy("timestamp", "desc")
      .startAfter(this.lastRequest)
      .limitToLast(limit)
      .get();
    this.lastRequest = res.docs[res.docs.length - 1];
    return res.docs.map((r) => r.data() as Request);
  }

  async getUsers(limit = 5): Promise<User[]> {
    const res = await this.uDB.orderBy("timestamp", "desc").limit(limit).get();
    this.lastuser = res.docs[res.docs.length - 1];
    return res.docs.map((r) => r.data() as User);
  }

  async paginateUsers(limit = 5): Promise<User[]> {
    const res = await this.uDB
      .orderBy("timestamp", "desc")
      .startAfter(this.lastuser)
      .limitToLast(limit)
      .get();
    this.lastuser = res.docs[res.docs.length - 1];
    return res.docs.map((r) => r.data() as User);
  }

  addRequest(request: Request) {
    return this.rDB.add(request);
  }

  async updateRequest(request: Request) {
    const res = await this.rDB.where('id', '==', request.id).get()
    if (res.docs.length > 0) {
      return this.rDB.doc(res.docs[0].id).update(request)
    }
    return null
  }

  async addUser(user: User) {
    const res = await this.uDB.where('email', '==', user.email).get()
    console.log(res)
    if (res.docs.length > 0){
      throw new Error("User Exists");
    }
    return this.uDB.add(user);
  }

  async getUser(id: string) {
    const res = await this.uDB.where('id', '==', id).get();
    if (res.docs.length > 0)
      return res.docs[0].data() as User
    return null
  }
  async getRequest(id: string) {
    const res = await this.rDB.where("id", "==", id).get();
    if (res.docs.length > 0) {
      return res.docs[0].data() as Request;
    }
    return null;
  }

  async getApproval(id: string) {
    const res = await this.rDB.where("assignedTo", "==", id).get();
    if (res.docs.length > 0) {
      return res.docs[0].data() as Request;
    }
    return null;
  }

  async login(email: string, password: string) {
    const res = await this.uDB
      .where("email", "==", email)
      .where("password", "==", password)
      .get();
    if (res.docs.length > 0) {
      this.UserInfo = res.docs[0].data() as User;
      return this.UserInfo;
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
  }

  logout() {
    this.router.navigate(["logout"]);
    this.UserInfo = null;
  }

  public get UserInfo() {
    return this.user ? this.user : null;
  }

  public set UserInfo(info: User) {
    this.user = info;
  }
}
