import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TocComponent } from './toc.component';
import { RouterModule } from '@angular/router';
import { NbCardModule } from '@nebular/theme';



@NgModule({
  declarations: [TocComponent],
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path:'',
        component: TocComponent
      }
    ]),
    NbCardModule
  ]
})
export class TocModule { }
