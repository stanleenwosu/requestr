import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RequestsComponent } from './requests/requests.component';
import { NbButtonModule, NbCalendarModule, NbCardModule, NbCheckboxModule, NbDialogModule, NbIconModule, NbInputModule, NbListModule, NbSpinnerModule } from '@nebular/theme';
import { DemoBlockComponent } from './demo-block/demo-block.component';
import { ApprovalsComponent } from './approvals/approvals.component';
import { PipesModule } from 'app/pipes/pipes.module';
import { PurchaseOrdersComponent } from './purchase-orders/purchase-orders.component';
import { PlaceBidComponent } from './place-bid/place-bid.component';
import { CalenderComponent } from './calender/calender.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ConfirmDialogComponent } from './confirm-dialog/confirm-dialog.component';
import { NotificationsComponent } from './notifications/notifications.component';
import { RouterModule } from '@angular/router';
import { MessageComponent } from './message/message.component';
import { RegisterComponent } from './register/register.component';

const components = [
  RequestsComponent,
  DemoBlockComponent,
  ApprovalsComponent,
  PurchaseOrdersComponent,
  PlaceBidComponent,
  ConfirmDialogComponent,
  NotificationsComponent,
  CalenderComponent,
  MessageComponent,
  RegisterComponent
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
    NbCalendarModule,
    NbInputModule,
    NbCheckboxModule,
    NbButtonModule,
    PipesModule,
    RouterModule,
    NbButtonModule
  ],
  exports: [components]
})
export class ComponentsModule { }
