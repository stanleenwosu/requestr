import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReportsComponent } from './reports.component';
import { RouterModule } from '@angular/router';
import {
  NbCardModule,
  NbInputModule,
  NbButtonModule,
  NbIconModule,
} from '@nebular/theme';


const nb = [NbCardModule, NbInputModule, NbButtonModule, NbIconModule,]

@NgModule({
  declarations: [ReportsComponent],
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path: '',
        component: ReportsComponent
      }
    ]),
    ...nb
  ]
})
export class ReportsModule { }
