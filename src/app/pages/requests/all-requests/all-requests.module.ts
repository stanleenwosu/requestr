import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AllRequestsComponent } from './all-requests.component';
import { RouterModule } from '@angular/router';
import { NbCardModule } from '@nebular/theme';
import { ComponentsModule } from 'app/components/components.module';

const nb = [
  NbCardModule
]

@NgModule({
  declarations: [AllRequestsComponent],
  imports: [
    CommonModule,
    ComponentsModule,
    RouterModule.forChild([
      {
        path:'',
        component: AllRequestsComponent
      }
    ]),
    ...nb
  ]
})
export class AllRequestsModule { }
