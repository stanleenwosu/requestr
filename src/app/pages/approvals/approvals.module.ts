import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApprovalsComponent } from './approvals.component';
import { RouterModule } from '@angular/router';
import { NbCardModule } from '@nebular/theme';
import { ComponentsModule } from 'app/components/components.module';



@NgModule({
  declarations: [ApprovalsComponent],
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path:'',
        component:ApprovalsComponent
      }
    ]),
    NbCardModule,
    ComponentsModule
  ]
})
export class ApprovalsModule { }
