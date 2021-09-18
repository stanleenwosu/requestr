import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MakeOrderComponent } from './make-order.component';
import { RouterModule } from '@angular/router';



@NgModule({
  declarations: [MakeOrderComponent],
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path:'',
        component: MakeOrderComponent
      }
    ])
  ]
})
export class MakeOrderModule { }
