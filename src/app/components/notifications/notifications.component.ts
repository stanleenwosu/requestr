import { Component, OnInit } from '@angular/core';
import { AppNotification } from 'app/@core/data/notifications';
import { NotificationsService } from 'app/services/notifications.service';

@Component({
  selector: 'notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.scss']
})
export class NotificationsComponent implements OnInit {

  notifications: AppNotification[]
  constructor(
    private notS: NotificationsService
  ) { }

  ngOnInit(): void {
    this.init()
  }

  init() {
    this.notifications = this.notS.UserNotifications
  }
}
