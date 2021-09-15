import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RequestsComponent } from './requests/requests.component';
import { NbButtonModule, NbCardModule, NbIconModule, NbInputModule, NbListModule, NbSpinnerModule } from '@nebular/theme';
import { DemoBlockComponent } from './demo-block/demo-block.component';
import { ApprovalsComponent } from './approvals/approvals.component';
import { PipesModule } from 'app/pipes/pipes.module';
import { PurchaseOrdersComponent } from './purchase-orders/purchase-orders.component';
import { PlaceBidComponent } from './place-bid/place-bid.component';
import { CalenderComponent } from './calender/calender.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

const components = [
  RequestsComponent,
  DemoBlockComponent,
  ApprovalsComponent,
  PurchaseOrdersComponent,
  PlaceBidComponent
]

@NgModule({
  declarations: [components],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NbListModule,
    NbCardModule,
    NbIconModule,
    NbSpinnerModule,
    NbInputModule,
    NbButtonModule,

    PipesModule,
    NbButtonModule
  ],
  exports: [components]
})
export class ComponentsModule { }
