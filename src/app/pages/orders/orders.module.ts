import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrdersComponent } from './orders.component';
import { RouterModule } from '@angular/router';
import { NbCardModule } from '@nebular/theme';
import { ComponentsModule } from 'app/components/components.module';



@NgModule({
  declarations: [OrdersComponent],
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path: '',
        component: OrdersComponent
      },
      {
        path: ':id',
        loadChildren: () => import('./view-order/view-order.module').then(m => m.ViewOrderModule)
      }
    ]),
    NbCardModule,
    ComponentsModule
  ]
})
export class OrdersModule { }
