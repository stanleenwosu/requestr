import { NbGlobalPhysicalPosition, NbToastrService } from "@nebular/theme";
import { FirebaseService } from "app/services/firebase.service";
import { ChangeDetectorRef, Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";

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
    private fireS: FirebaseService
  ) { }

  ngOnInit(): void {
    this.user = history.state.user as any
    console.log(this.user)

    this.type = history.state.type
    if (this.type === 'login') {
      this.login()
    }
    if (this.type === 'signup') {
      this.signup()
    }
  }

  async signup() {
    try {
      this.user.timestamp = Date.now()
      await this.fireS.addUser(this.user);
      this.toastr.success(`User`, "User Signed up Successful", {
        duration: 3000,
        position: this.tp,
      });
      this.fireS.UserInfo = this.user
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
      const res = await this.fireS.login(this.user.email, this.user.password);
      if (res) {
        this.toastr.success(`User logged in`, "Login Successful", {
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
