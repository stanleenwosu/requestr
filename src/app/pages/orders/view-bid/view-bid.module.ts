import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ViewBidComponent } from './view-bid.component';
import { RouterModule } from '@angular/router';
import { NbButtonModule, NbCardModule, NbListModule, NbSpinnerModule } from '@nebular/theme';
import { PipesModule } from 'app/pipes/pipes.module';
import { ComponentsModule } from 'app/components/components.module';

const nb = [
  NbCardModule,
  NbListModule,
  NbButtonModule,
  NbSpinnerModule,
]


@NgModule({
  declarations: [ViewBidComponent],
  imports: [
    CommonModule,
    PipesModule,
    ComponentsModule,
    RouterModule.forChild([
      {
        path: '',
        component: ViewBidComponent
      }
    ]),
    ...nb
  ]
})
export class ViewBidModule { }
