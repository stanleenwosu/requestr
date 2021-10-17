import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { User, UserRoles } from 'app/@core/data/users';

import firebase from "firebase/app";
import "firebase/firestore";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  uDB = firebase.firestore().collection('users')
  currentUser: User
  constructor(
    private router: Router
  ) { }

  async login(email: string, password: string) {
    const res = await this.uDB
      .where("email", "==", email)
      .where("password", "==", password)
      .get();
    if (res.docs.length > 0) {
      this.currentUser = res.docs[0].data() as User;
      return this.currentUser;
    }
    return null;
  }

  logout() {
    this.router.navigate(["logout"]);
    this.UserInfo = null;
  }

  public get UserInfo() {
    return this.currentUser ? this.currentUser : null;
  }

  public set UserInfo(info: User) {
    this.currentUser = info;
  }

  async addUser(user: User) {
    const res = await this.uDB.where('email', '==', user.email).get()
    console.log(res.docs)
    if (res.docs.length > 0) {
      throw new Error("User Exists");
    }
    return await this.uDB.doc(user.id).set(user)
  }

  async updateUser(user: User) {
    return await this.uDB.doc(user.id).update(user)
  }

  async getUser(id: string) {
    const res = await this.uDB.where('id', '==', id).get();
    if (res.docs.length > 0)
      return res.docs[0].data() as User
    return null
  }

  async getUsers(limit = 5): Promise<User[]> {
    const res = await this.uDB.orderBy("timestamp", "desc").limit(limit).get();
    return res.docs.map((r) => r.data() as User);
  }

  async paginateUsers(limit = 5, lastUserId: string): Promise<User[]> {
    const lastUserDoc = await this.uDB.doc(lastUserId).get()
    const res = await this.uDB
      .orderBy("timestamp", "desc")
      .startAfter(lastUserDoc)
      .limitToLast(limit)
      .get();
    return res.docs.map((r) => r.data() as User);
  }

  async getStaffs() {
    const res = await this.uDB.where('role', '==', UserRoles.STAFF).get();
    return (res.docs.map(r => r.data())) as User[]
  }

  async getAdmins() {
    const res = await this.uDB
      .where('role', '==', UserRoles.ADMIN)
      .get();
    return (res.docs.map(r => r.data())) as User[]
  }

  async getSupers() {
    const res = await this.uDB
      .where('role', '==', UserRoles.SUPER)
      .get();
    return (res.docs.map(r => r.data())) as User[]
  }

}
