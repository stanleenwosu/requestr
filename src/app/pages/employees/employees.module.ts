import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EmployeesComponent } from './employees.component';
import { RouterModule } from '@angular/router';
import { NbButtonModule, NbCardModule, NbFormFieldModule, NbIconModule, NbInputModule, NbListModule, NbSelectModule, NbUserModule } from '@nebular/theme';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [EmployeesComponent],
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path: '',
        component: EmployeesComponent,
      }
    ]),
    NbCardModule,
    NbFormFieldModule,
    NbInputModule,
    NbButtonModule,
    NbUserModule,
    NbListModule,
    NbIconModule,
    NbSelectModule,
    FormsModule,
    ReactiveFormsModule
  ]

})
export class EmployeesModule { }
