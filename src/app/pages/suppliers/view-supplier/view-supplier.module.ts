import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ViewSupplierComponent } from './view-supplier.component';
import { RouterModule } from '@angular/router';
import {
  NbButtonModule,
  NbCardModule,
  NbIconModule,
  NbListModule,
} from "@nebular/theme";
import { PipesModule } from 'app/pipes/pipes.module';

const nb = [NbListModule, NbCardModule, NbButtonModule, NbIconModule];


@NgModule({
  declarations: [ViewSupplierComponent],
  imports: [
    CommonModule,
    PipesModule,
    RouterModule.forChild([
      {
        path: '',
        component: ViewSupplierComponent
      }
    ]),
    ...nb
  ]
})
export class ViewSupplierModule { }
