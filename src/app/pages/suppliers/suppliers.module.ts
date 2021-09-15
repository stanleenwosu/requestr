import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SuppliersComponent } from './suppliers.component';
import { RouterModule } from '@angular/router';



@NgModule({
  declarations: [SuppliersComponent],
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path:'',
        component: SuppliersComponent
      }
    ])
  ]
})
export class SuppliersModule { }
