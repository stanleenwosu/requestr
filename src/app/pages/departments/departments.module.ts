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
      }
    ]),
    ...nb
  ]
})
export class DepartmentsModule { }
