import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NotificationsComponent } from './notifications.component';
import { RouterModule } from '@angular/router';
import { ComponentsModule } from 'app/components/components.module';



@NgModule({
  declarations: [NotificationsComponent],
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path:'',
        component: NotificationsComponent
      }
    ]),
    ComponentsModule
  ]
})
export class NotificationsModule { }
