import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfileComponent } from './profile.component';
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
  declarations: [ProfileComponent],
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path: '',
        component: ProfileComponent
      }
    ]),
    ComponentsModule,
    ReactiveFormsModule,
    FormsModule,
    ...nb
  ]
})
export class ProfileModule { }
