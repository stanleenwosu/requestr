import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { WithdrawalComponent } from "./withdrawal.component";
import { RouterModule } from "@angular/router";
import { NbStepperModule, NbCardModule, NbInputModule, NbButtonModule, NbSelectModule } from "@nebular/theme";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

const nbs = [NbStepperModule, NbCardModule, NbInputModule, NbButtonModule, NbSelectModule];

@NgModule({
  declarations: [WithdrawalComponent],
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path: "",
        component: WithdrawalComponent,
      },
    ]),
    FormsModule,
    ReactiveFormsModule,
    ...nbs
  ],
})
export class WithdrawalModule {}
