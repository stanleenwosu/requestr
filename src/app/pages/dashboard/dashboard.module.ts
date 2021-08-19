import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { NbCardModule } from '@nebular/theme';

import { ThemeModule } from '../../@theme/theme.module';
import { DashboardComponent } from './dashboard.component';

@NgModule({
  imports: [
    NbCardModule,
    ThemeModule,
    RouterModule.forChild([
      {
        path: '',
        component: DashboardComponent,
        pathMatch: 'full'
      }
    ])
  ],
  declarations: [
    DashboardComponent,
  ],
})
export class DashboardModule { }
