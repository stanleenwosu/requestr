import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ViewBidComponent } from './view-bid.component';
import { RouterModule } from '@angular/router';



@NgModule({
  declarations: [ViewBidComponent],
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path: '',
        component: ViewBidComponent
      }
    ])
  ]
})
export class ViewBidModule { }
