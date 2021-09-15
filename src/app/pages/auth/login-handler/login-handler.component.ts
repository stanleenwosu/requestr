import { NbGlobalPhysicalPosition, NbToastrService } from "@nebular/theme";
import { FirebaseService } from "app/services/firebase.service";
import { ChangeDetectorRef, Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { UserService } from "app/services/user.service";

@Component({
  selector: 'login-handler',
  templateUrl: './login-handler.component.html',
  styleUrls: ['./login-handler.component.scss']
})
export class LoginHandlerComponent implements OnInit {
  tp = NbGlobalPhysicalPosition.BOTTOM_RIGHT;
  user: any
  type: string
  constructor(
    private toastr: NbToastrService,
    private router: Router,
    private route: ActivatedRoute,
    private userS: UserService
  ) { }

  ngOnInit(): void {
    //this.router.navigate(['dashboard'])
    this.user = history.state.user as any
    this.type = history.state.type
    setTimeout(() => {
      if (this.type === 'login') {
        this.login()
      }
      if (this.type === 'signup') {
        this.signup()
      }
    }, 2000);
  }

  async signup() {
    try {
      const d = Date.now()
      this.user.id = 'user_' + d
      this.user.timestamp = d
      await this.userS.addUser(this.user);
      this.toastr.success(`New Account`, "Your Account has been Successfully Created", {
        duration: 3000,
        position: this.tp,
      });
      this.userS.UserInfo = this.user
      this.router.navigate(['dashboard'])
    } catch (error) {
      this.toastr.danger(`Signup Error`, error, {
        duration: 3000,
        position: this.tp,
      });
      this.router.navigate(['auth'])
    }

  }
  async login() {
    try {
      const res = await this.userS.login(this.user.email, this.user.password);
      if (res) {
        this.toastr.success(`Account Logged In`, "Login Successful", {
          duration: 3000,
          position: this.tp,
        });
        this.router.navigate(['dashboard'])
        return
      }
      throw new Error("User details are incorrect");
    } catch (error) {
      this.toastr.danger(`Login Error`, error, {
        duration: 3000,
        position: this.tp,
      });
      this.router.navigate(['auth'])
    }
  }
}
