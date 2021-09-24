import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ViewRequestComponent } from './view-request.component';
import { RouterModule } from '@angular/router';
import { NbButtonModule, NbCardModule, NbInputModule, NbListModule, NbSpinnerModule } from '@nebular/theme';
import { PipesModule } from 'app/pipes/pipes.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

const nb = [
  NbCardModule,
  NbListModule,
  NbInputModule,
  NbButtonModule,
  NbSpinnerModule,
]

@NgModule({
  declarations: [ViewRequestComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild([
      {
        path: '',
        component: ViewRequestComponent
      }
    ]),
    ...nb,
    PipesModule
  ]
})
export class ViewRequestModule { }
