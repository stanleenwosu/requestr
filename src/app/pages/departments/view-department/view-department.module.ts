import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ViewDepartmentComponent } from './view-department.component';
import { RouterModule } from '@angular/router';



@NgModule({
  declarations: [ViewDepartmentComponent],
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path: '',
        component: ViewDepartmentComponent
      }
    ])
  ]
})
export class ViewDepartmentModule { }
