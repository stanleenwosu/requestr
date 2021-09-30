import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { SuppliersComponent } from "./suppliers.component";
import { RouterModule } from "@angular/router";
import {
  NbButtonModule,
  NbCardModule,
  NbIconModule,
  NbListModule,
} from "@nebular/theme";

const nb = [NbListModule, NbCardModule, NbButtonModule, NbIconModule];

@NgModule({
  declarations: [SuppliersComponent],
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path: "",
        component: SuppliersComponent,
      },
      {
        path: ":id",
        loadChildren: () =>
          import("./view-supplier/view-supplier.module").then(
            (m) => m.ViewSupplierModule
          ),
      },
    ]),
    ...nb,
  ],
})
export class SuppliersModule {}
