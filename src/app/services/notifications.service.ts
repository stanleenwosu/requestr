import { Injectable } from '@angular/core';
import { AppNotificaionType, AppNotification, AppNotificationPayload } from 'app/@core/data/notifications';
import { UserRoles } from 'app/@core/data/users';

import firebase from "firebase/app";
import 'firebase/database'
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class  NotificationsService {

  private notifications: AppNotification[] = []
  db = firebase.database()
  constructor(
    private userS: UserService
  ) { }

  public get UserNotifications() {
    if (this.notifications.length == 0) {
      if (this.userS.UserInfo.role === UserRoles.VENDOR){
        this.getVendorNotifications()
      }
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
        this.notifications.push(data)
      })
  }


  addVendorNotification(orderId: string) {
    const d = Date.now()
    const not: AppNotification = {
      id: 'NOT_' + d,
      title: 'New Order',
      message: `Order ${orderId} is available`,
      userId: '',
      timestamp: d,
      view: false,
      payload: {
        type: AppNotificaionType.ORDER,
        route: `orders/${orderId}`
      }
    }
    return this.db.ref('vendors/' + not.id).set(not);
  }


  getVendorNotifications() {
    this.db.ref(`vendors/`)
      .on('child_added', (snapshot) => {
        const data = snapshot.val()
        this.notifications.push(data)
      })
  }

  addStaffNotification(requestId: string) {
    const d = Date.now()
    const not: AppNotification = {
      id: 'NOT_' + d,
      title: 'New Order',
      message: `Request ${requestId} is available`,
      userId: '',
      timestamp: d,
      view: false,
      payload: {
        type: AppNotificaionType.ORDER,
        route: `requests/${requestId}`
      }
    }
    console.log(not)
    return this.db.ref('staffs/' + not.id).set(not);
  }


  getStaffNotifications() {
    this.db.ref(`staffs/`)
      .on('child_added', (snapshot) => {
        const data = snapshot.val()
        console.log(data)
        this.notifications.push(data)
      })
  }



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
