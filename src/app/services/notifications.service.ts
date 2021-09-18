import { Injectable } from '@angular/core';
import { AppNotificaionType, AppNotification, AppNotificationPayload } from 'app/@core/data/notifications';

import firebase from "firebase/app";
import 'firebase/database'
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class NotificationsService {

  private notifications: AppNotification[] = []
  db = firebase.database()
  constructor(
    private userS: UserService
  ) { }

  public get UserNotifications() {
    if (this.notifications.length == 0) {
      this.getNotifications()
    }
    return this.notifications
  }

  public set UserNotifications(notiication: AppNotification[]) {
    this.notifications = notiication
  }

  getNotifications() {
    const userId = this.userS.UserInfo.id
    this.db.ref(`notifications/${userId}`)
      .on('child_added', (snapshot) => {
        const data = snapshot.val()
        console.log(data)
        this.notifications.push(data)
      })
  }

  /* getN() {
    const userId = this.userS.UserInfo.id
    this.db.ref(`notifications/${userId}`)
      .once('value', (snap) => {
        console.log("DB Check")
        console.log(snap.val())
      })
  } */



  addNotification(title: string, message: string, userId: string, payload: AppNotificationPayload) {
    const d = Date.now()
    const not: AppNotification = {
      id: 'NOT_' + d,
      title,
      message,
      userId,
      timestamp: d,
      view: false,
      payload: payload
    }
    return this.db.ref('notifications/' + userId).set(not);
  }
}
