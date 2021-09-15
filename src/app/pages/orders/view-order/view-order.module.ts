import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ViewOrderComponent } from './view-order.component';



@NgModule({
  declarations: [ViewOrderComponent],
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path:'',
        component:ViewOrderComponent,
        pathMatch:'full'
      }
    ])
  ]
})
export class ViewOrderModule { }
