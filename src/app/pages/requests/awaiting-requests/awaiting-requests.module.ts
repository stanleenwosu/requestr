import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AwaitingRequestsComponent } from './awaiting-requests.component';
import { RouterModule } from '@angular/router';
import { ComponentsModule } from 'app/components/components.module';
import { NbCardModule } from '@nebular/theme';

const nb = [
  NbCardModule
]


@NgModule({
  declarations: [AwaitingRequestsComponent],
  imports: [
    CommonModule,
    ComponentsModule,
    RouterModule.forChild([
      {
        path: '',
        component: AwaitingRequestsComponent
      }
    ]),
    ...nb
  ]
})
export class AwaitingRequestsModule { }
