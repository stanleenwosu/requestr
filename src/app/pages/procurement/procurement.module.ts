import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProcurementComponent } from './procurement.component';
import { NbButtonModule, NbCardModule, NbFormFieldModule, NbIconModule, NbInputModule, NbListModule, NbUserModule } from '@nebular/theme';
import { RouterModule } from '@angular/router';
import { PipesModule } from 'app/pipes/pipes.module';



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
    PipesModule,
    NbInputModule,
    NbButtonModule,
    NbUserModule,
    NbListModule,
    NbIconModule
  ]
})
export class ProcurementModule { }
