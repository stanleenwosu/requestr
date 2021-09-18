import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DepartmentsComponent } from './departments.component';
import { RouterModule } from '@angular/router';
import { NbButtonModule, NbCardModule, NbInputModule, NbListModule } from '@nebular/theme';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

const nb = [
  NbCardModule,
  NbListModule,
  NbButtonModule,
  NbInputModule
]

@NgModule({
  declarations: [DepartmentsComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild([
      {
        path: '',
        component: DepartmentsComponent
      },
      {
        path: ':id',
        loadChildren: () => import('./view-department/view-department.module').then(m => m.ViewDepartmentModule)
      }
    ]),
    ...nb
  ]
})
export class DepartmentsModule { }
