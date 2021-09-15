import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RequestOverviewComponent } from './request-overview.component';
import { RouterModule } from '@angular/router';
import { NbButtonModule, NbCardModule, NbIconModule } from '@nebular/theme';
import { ComponentsModule } from 'app/components/components.module';

const nb =[
  NbButtonModule,
  NbCardModule,
  NbIconModule
]

@NgModule({
  declarations: [RequestOverviewComponent],
  imports: [
    CommonModule,
    ComponentsModule,
    RouterModule.forChild([
      {
        path: '',
        component: RequestOverviewComponent
      }
    ]),
    ...nb
  ]
})
export class RequestOverviewModule { }
