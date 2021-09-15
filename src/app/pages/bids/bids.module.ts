import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule} from '@angular/router'


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path:'',
        loadChildren: () => import('./all-bids/all-bids.module').then(m => m.AllBidsModule)
      }
    ])
  ]
})
export class BidsModule { }
