import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { AppNotification } from 'app/@core/data/notifications';
import { NotificationsService } from 'app/services/notifications.service';

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.scss']
})
export class NotificationsComponent implements OnInit {

  notifications: AppNotification[]
  constructor(
    private notS: NotificationsService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.init()
  }

  init() {
    this.notifications = this.notS.UserNotifications.sort((a, b) => b.timestamp - a.timestamp)
  }

  view(route) {
    console.log(route)
    this.router.navigateByUrl(route)
  }
}

