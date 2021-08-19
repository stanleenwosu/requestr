import { RouterModule, Routes } from '@angular/router';
import {
  NbAuthComponent,
  NbLoginComponent,
  NbLogoutComponent,
  NbRegisterComponent,
  NbRequestPasswordComponent,
  NbResetPasswordComponent,
} from '@nebular/auth';
import { NgModule } from '@angular/core';
import { PagesComponent } from './pages.component';
import { AuthGuard } from 'app/guards/auth.guard';

const routes: Routes = [
  {
    path: "",
    redirectTo: 'auth',
    pathMatch: "full"
  },
  {
    path: "",
    component: PagesComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: '',
        redirectTo: 'dashboard',
        pathMatch: 'full'
      },
      {
        path: 'dashboard',
        loadChildren: () => import('./dashboard/dashboard.module').then(m => m.DashboardModule)
      },
      {
        path: 'requests',
        loadChildren: () => import('./requests/requests.module').then(m => m.RequestsModule)
      },
      {
        path: 'requests/:id',
        loadChildren: () => import('./view-request/view-request.module').then(m => m.ViewRequestModule)
      },
      {
        path: 'approvals',
        loadChildren: () => import('./approvals/approvals.module').then(m => m.ApprovalsModule)
      },
      {
        path: 'users',
        loadChildren: () => import('./users/users.module').then(m => m.UsersModule)
      },
    ]
  },
  {
    path: 'auth',
    component: NbAuthComponent,
    loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule)
  },
  { path: '**', redirectTo: 'auth' },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PagesRoutingModule {
}
