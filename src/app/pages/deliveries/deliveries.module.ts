import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DeliveriesComponent } from './deliveries.component';
import { RouterModule } from '@angular/router';



@NgModule({
  declarations: [DeliveriesComponent],
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path: '',
        component: DeliveriesComponent,
      }
    ])
  ],
})
export class DeliveriesModule { }
