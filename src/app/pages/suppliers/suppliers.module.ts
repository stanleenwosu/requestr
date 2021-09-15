import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SuppliersComponent } from './suppliers.component';
import { RouterModule } from '@angular/router';
import { NbCardModule, NbListModule } from '@nebular/theme';

const nb = [
  NbListModule,
  NbCardModule
]

@NgModule({
  declarations: [SuppliersComponent],
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path:'',
        component: SuppliersComponent
      }
    ]),
    ...nb
  ]
})
export class SuppliersModule { }
