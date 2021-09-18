import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProcurementComponent } from './procurement.component';
import { NbButtonModule, NbCardModule, NbFormFieldModule, NbIconModule, NbInputModule, NbListModule, NbUserModule } from '@nebular/theme';
import { RouterModule } from '@angular/router';



@NgModule({
  declarations: [ProcurementComponent],
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path: '',
        component: ProcurementComponent
      }
    ]),
    NbCardModule,
    NbFormFieldModule,
    NbInputModule,
    NbButtonModule,
    NbUserModule,
    NbListModule,
    NbIconModule
  ]
})
export class ProcurementModule { }
