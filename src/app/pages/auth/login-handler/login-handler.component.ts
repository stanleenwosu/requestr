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
  user:{email:string, password:string}
  constructor(
    private toastr: NbToastrService,
    private router: Router,
    private route: ActivatedRoute,
    private fireS: FirebaseService
  ) { }

  ngOnInit(): void {
    this.user = this.route.snapshot.params as any
    console.log(this.user)
    this.login()
  }

  async login() {
    try {
      const res = await this.fireS.login(this.user.email, this.user.password);
      console.log(res);
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
      console.log(error)
      this.toastr.danger(`Login Error`, error, {
        duration: 3000,
        position: this.tp,
      });
      this.router.navigate(['auth'])
    }
  }
}
