import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BidsComponent } from './bids.component';
import { ActivatedRoute, RouterModule } from '@angular/router';

import { NbButtonModule, NbCardModule, NbInputModule, NbListModule } from '@nebular/theme';
import { PipesModule } from 'app/pipes/pipes.module';

const nb = [
  NbCardModule,
  NbListModule,
  NbButtonModule,
  NbInputModule
]

let data = {}


@NgModule({
  declarations: [BidsComponent],
  imports: [
    CommonModule,
    PipesModule,
    RouterModule.forChild([
      {
        path: '',
        component: BidsComponent,
        data
      },
      {
        path: ':id',
        loadChildren: () => import('../view-bid/view-bid.module').then(m => m.ViewBidModule)
      }
    ]),
    ...nb
  ]
})
export class BidsModule {
  constructor(
    private route: ActivatedRoute
  ) {
    data = route.snapshot.data
  }
}
