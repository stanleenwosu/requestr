import { RouterModule, Routes } from "@angular/router";
import {
  NbAuthComponent,
  NbLoginComponent,
  NbLogoutComponent,
  NbRegisterComponent,
  NbRequestPasswordComponent,
  NbResetPasswordComponent,
} from "@nebular/auth";
import { NgModule } from "@angular/core";
import { PagesComponent } from "./pages.component";
import { AuthGuard } from "app/guards/auth.guard";


let role;
const routes: Routes = [
  {
    path: "",
    redirectTo: "auth",
    pathMatch: "full",
  },
  {
    path: "",
    component: PagesComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: "",
        redirectTo: "dashboard",
        pathMatch: "full",
      },
      {
        path: "dashboard",
        loadChildren: () =>
          import("./dashboard/dashboard.module").then((m) => m.DashboardModule),
      },
      {
        path: "notifications",
        loadChildren: () =>
          import("./notifications/notifications.module").then((m) => m.NotificationsModule),
      },
      {
        path: "requests",
        loadChildren: () =>
          import("./requests/requests.module").then((m) => m.RequestsModule),
      },
      {
        path: "orders",
        loadChildren: () =>
          import("./orders/orders.module").then((m) => m.OrdersModule),
      },
      {
        path: "bids",
        loadChildren: () =>
          import("./orders/bids/bids.module").then((m) => m.BidsModule),
        data: {
          filter: "staff",
        },
      },
      {
        path: "deliveries",
        loadChildren: () =>
          import("./deliveries/deliveries.module").then(
            (m) => m.DeliveriesModule
          ),
      },
      {
        path: "invoices",
        loadChildren: () =>
          import("./invoices/invoices.module").then((m) => m.InvoicesModule),
      },
      {
        path: "suppliers",
        loadChildren: () =>
          import("./suppliers/suppliers.module").then((m) => m.SuppliersModule),
      },
      {
        path: "departments",
        loadChildren: () =>
          import("./departments/departments.module").then(
            (m) => m.DepartmentsModule
          ),
      },
      {
        path: "procurements",
        loadChildren: () =>
          import("./procurement/procurement.module").then(
            (m) => m.ProcurementModule
          ),
      },
      {
        path: "employees",
        loadChildren: () =>
          import("./employees/employees.module").then((m) => m.EmployeesModule),
      },
      {
        path: "payments",
        loadChildren: () =>
          import("./payments/payments.module").then((m) => m.PaymentsModule),
      },
      {
        path: "users",
        loadChildren: () =>
          import("./users/users.module").then((m) => m.UsersModule),
      },
      {
        path: "profile",
        loadChildren: () =>
          import("./profile/profile.module").then((m) => m.ProfileModule),
      },

    ],
  },
  {
    path: "auth",
    component: NbAuthComponent,
    loadChildren: () => import("./auth/auth.module").then((m) => m.AuthModule),
  },
  {
    path: "terms-and-conditions",
    component: NbAuthComponent,
    loadChildren: () =>
      import("./toc/toc.module").then((m) => m.TocModule),
  },
  { path: "**", redirectTo: "auth" },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PagesRoutingModule { }
