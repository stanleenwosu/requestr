import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { NbGlobalPhysicalPosition, NbToastrService } from "@nebular/theme";
import { User } from "app/@core/data/users";
import { UserService } from "app/services/user.service";

@Component({
  selector: "users",
  templateUrl: "./users.component.html",
  styleUrls: ["./users.component.scss"],
})
export class UsersComponent implements OnInit {
  form: FormGroup;
  tp = NbGlobalPhysicalPosition.BOTTOM_RIGHT
  users: User[]
  constructor(
    private fb: FormBuilder,
    private userS: UserService,
    private toastr: NbToastrService
  ) { }

  ngOnInit(): void {
    this.form = this.fb.group({
      name: [""],
      email: ["", [Validators.required, Validators.email]],
      password: ["", Validators.required],
    });
    this.init()
  }

  async init() {
    this.users = await this.userS.getUsers()
    return;
  }
  submit() {
    const d = Date.now();
    const { name, email, password } = this.form.value;
    try {
      const user: User = {
        id: "user_" + d,
        name: name,
        email: email,
        password: password,
        timestamp: d,
      };
      this.userS.addUser(user);
      this.toastr.success(`${name} added`, "New User", {
        duration: 2000,
        position: this.tp,
      });
    } catch (error) {
      this.toastr.danger(`User Error`, error, { duration: 2000, position: this.tp });
    }
  }

  generatePassword() { }
}
