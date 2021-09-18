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
        path: '',
        component: ViewOrderComponent,
        pathMatch: 'full'
      },
      {
        path: 'bids',
        loadChildren: () => import('../bids/bids.module').then(m => m.BidsModule),
        data: {
          filter: 'order'
        }
      },
      {
        path: 'bids/:id',
        loadChildren: () => import('../view-bid/view-bid.module').then(m => m.ViewBidModule)
      }
    ]),
    ...nb
  ]
})
export class ViewOrderModule { }
