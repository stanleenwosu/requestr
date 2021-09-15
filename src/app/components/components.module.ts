import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RequestsComponent } from './requests/requests.component';
import { NbButtonModule, NbCardModule, NbIconModule, NbListModule, NbSpinnerModule } from '@nebular/theme';
import { DemoBlockComponent } from './demo-block/demo-block.component';
import { ApprovalsComponent } from './approvals/approvals.component';
import { PipesModule } from 'app/pipes/pipes.module';
import { PurchaseOrdersComponent } from './purchase-orders/purchase-orders.component';

const components = [
  RequestsComponent,
  DemoBlockComponent,
  ApprovalsComponent,
  PurchaseOrdersComponent
]

@NgModule({
  declarations: [components],
  imports: [
    CommonModule,
    NbListModule,
    NbCardModule,
    NbIconModule,
    NbSpinnerModule,
    PipesModule,
    NbButtonModule
  ],
  exports: [components]
})
export class ComponentsModule { }
