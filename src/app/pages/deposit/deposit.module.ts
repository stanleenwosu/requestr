import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DepositComponent } from './deposit.component';
import { RouterModule } from '@angular/router';
import { NbButtonModule, NbCardModule, NbInputModule, NbIconModule, NbSelectModule, NbActionsModule, NbSpinnerModule } from '@nebular/theme';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

const nbs = [NbCardModule, NbInputModule, NbButtonModule, NbIconModule, NbSelectModule, NbActionsModule, NbSpinnerModule]

@NgModule({
  declarations: [DepositComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild([
      {
        path: '',
        component: DepositComponent
      }
    ]),
    ...nbs
  ]
})
export class DepositModule { }
