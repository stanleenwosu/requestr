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

const routes: Routes = [
  {
    path: "",
    redirectTo: 'auth',
    pathMatch: "full"
  },
  {
    path: "",
    component: PagesComponent,
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

      /* {
        path: 'deposit',
        loadChildren: () => import('./deposit/deposit.module').then(m => m.DepositModule)
      },
      {
        path: 'withdrawal',
        loadChildren: () => import('./withdrawal/withdrawal.module').then(m => m.WithdrawalModule)
      }, */
      {
        path: 'report',
        loadChildren: () => import('./reports/reports.module').then(m => m.ReportsModule)
      }
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
