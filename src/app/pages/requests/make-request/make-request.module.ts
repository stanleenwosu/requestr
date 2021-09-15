import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MakeRequestComponent } from './make-request.component';
import { RouterModule } from '@angular/router';
import { NbButtonModule, NbCalendarModule, NbCardModule, NbIconModule, NbInputModule, NbSelectModule } from '@nebular/theme';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ComponentsModule } from 'app/components/components.module';

const nb = [
  NbCardModule,
  NbInputModule,
  NbButtonModule,
  NbSelectModule,
  NbCalendarModule,
  NbIconModule
]

@NgModule({
  declarations: [MakeRequestComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild([
      {
        path: '',
        component: MakeRequestComponent
      }
    ]),
    ...nb,
    ComponentsModule
  ]
})
export class MakeRequestModule { }
