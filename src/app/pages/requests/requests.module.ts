import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterModule } from "@angular/router";

const routes = [
  {
    path: "",
    redirectTo: "overview",
    pathMatch: 'full'
  },
  {
    path: "overview",
    loadChildren: () =>
      import("./request-overview/request-overview.module").then(
        (m) => m.RequestOverviewModule
      ),
  },
  {
    path: "make-request",
    loadChildren: () =>
      import("./make-request/make-request.module").then(
        (m) => m.MakeRequestModule
      ),
  },
  {
    path: "awaiting-requests",
    loadChildren: () =>
      import("./awaiting-requests/awaiting-requests.module").then(
        (m) => m.AwaitingRequestsModule
      ),
  },
  {
    path: "all",
    loadChildren: () =>
      import("./all-requests/all-requests.module").then(
        (m) => m.AllRequestsModule
      ),
  },
  {
    path: ":id",
    loadChildren: () =>
      import("./view-request/view-request.module").then(
        (m) => m.ViewRequestModule
      ),
  },

]

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ]
})
export class RequestsModule { }
