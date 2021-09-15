import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ViewOrderComponent } from './view-order.component';
import { NbButtonModule, NbCardModule, NbListModule, NbSpinnerModule } from '@nebular/theme';

const nb = [
  NbCardModule,
  NbButtonModule,
  NbListModule,
  NbSpinnerModule
]

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
    ]),
    ...nb
  ]
})
export class ViewOrderModule { }
