import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { OrdersComponent } from "./orders.component";
import { ActivatedRoute, RouterModule } from "@angular/router";
import { NbButtonModule, NbCardModule, NbIconModule } from "@nebular/theme";
import { ComponentsModule } from "app/components/components.module";

let data = {};

@NgModule({
  declarations: [OrdersComponent],
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path: "",
        component: OrdersComponent,
        data,
      },

      {
        path: "add",
        loadChildren: () =>
          import("../requests/make-request/make-request.module").then(
            (m) => m.MakeRequestModule
          ),
        data: {
          type: "order",
        },
      },

      {
        path: ":id",
        loadChildren: () =>
          import("./view-order/view-order.module").then(
            (m) => m.ViewOrderModule
          ),
      },
    ]),
    NbCardModule,
    NbButtonModule,
    NbIconModule,
    ComponentsModule,
  ],
})
export class OrdersModule {
  constructor(private route: ActivatedRoute) {
    data = route.snapshot.data;
  }
}
