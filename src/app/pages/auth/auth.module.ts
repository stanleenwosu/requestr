import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NbAlertModule, NbButtonModule,NbCheckboxModule, NbInputModule, NbIconModule, NbToastrModule, NbSelectModule } from '@nebular/theme';
import { RegisterComponent } from './register/register.component';
import { LoginHandlerComponent } from './login-handler/login-handler.component';
import { ComponentsModule } from 'app/components/components.module';



const AuthComponents = [
  LoginComponent,
  RegisterComponent,
  LoginHandlerComponent
]


@NgModule({
  declarations: [...AuthComponents],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NbAlertModule,
    NbInputModule,
    NbButtonModule,
    NbCheckboxModule,
    NbToastrModule,
    NbSelectModule,
    NbIconModule,
    ComponentsModule,
    RouterModule.forChild([
      {
        path: '',
        redirectTo: 'login',
        pathMatch: 'full'
      },
      {
        path: 'login',
        component: LoginComponent
      },
      {
        path: 'register',
        component: RegisterComponent
      },
      {
        path: 'login-handler',
        component: LoginHandlerComponent
      },
    ])
  ]
})
export class AuthModule { }
