import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ViewRequestComponent } from './view-request.component';
import { RouterModule } from '@angular/router';
import { NbButtonModule, NbCardModule, NbListModule, NbSpinnerModule } from '@nebular/theme';
import { PipesModule } from 'app/pipes/pipes.module';



@NgModule({
  declarations: [ViewRequestComponent],
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path:'',
        component:ViewRequestComponent
      }
    ]),
    NbCardModule,
    NbListModule,
    NbButtonModule,
    NbSpinnerModule,
    PipesModule
  ]
})
export class ViewRequestModule { }
