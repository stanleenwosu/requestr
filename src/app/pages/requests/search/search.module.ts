import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SearchComponent } from './search.component';
import { RouterModule } from '@angular/router';
import { NbButtonModule, NbCardModule, NbIconModule, NbInputModule, NbListModule, NbSpinnerModule } from '@nebular/theme';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PipesModule } from 'app/pipes/pipes.module';

const nb = [
  NbButtonModule,
  NbIconModule,
  NbCardModule,
  NbInputModule,
  NbListModule,
  NbSpinnerModule
]

@NgModule({
  declarations: [SearchComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    PipesModule,
    RouterModule.forChild([
      {
        path: '',
        component: SearchComponent
      }
    ]),
    ...nb
  ]
})
export class SearchModule { }
