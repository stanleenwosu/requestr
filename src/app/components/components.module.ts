import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RequestsComponent } from './requests/requests.component';
import { NbCardModule, NbListModule, NbSpinnerModule } from '@nebular/theme';
import { DemoBlockComponent } from './demo-block/demo-block.component';
import { ApprovalsComponent } from './approvals/approvals.component';
import { PipesModule } from 'app/pipes/pipes.module';

const components = [
  RequestsComponent,
  DemoBlockComponent,
  ApprovalsComponent
]

@NgModule({
  declarations: [components],
  imports: [
    CommonModule,
    NbListModule,
    NbCardModule,
    NbSpinnerModule,
    PipesModule
  ],
  exports: [components]
})
export class ComponentsModule { }
