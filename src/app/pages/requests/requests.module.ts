import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { RequestsComponent } from './requests.component';
import { NbButtonModule, NbCardModule, NbInputModule, NbSelectModule  } from '@nebular/theme';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ComponentsModule } from 'app/components/components.module';


const nb = [
  NbCardModule,
  NbInputModule,
  NbButtonModule,
  NbSelectModule
]

@NgModule({
  declarations: [RequestsComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild([
      {
        path: '',
        component: RequestsComponent
      }
    ]),
    ...nb,
    ComponentsModule
  ]
})
export class RequestsModule { }
