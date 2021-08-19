import { Component } from '@angular/core';
import { FirebaseService } from 'app/services/firebase.service';

@Component({
  selector: 'ngx-dashboard',
  templateUrl: './dashboard.component.html',
})
export class DashboardComponent {
  constructor(
    public fireS:FirebaseService
  ){

  }
}
