import { ChangeDetectorRef, Component, OnInit } from "@angular/core";
import { NbLoginComponent } from "@nebular/auth";

@Component({
  selector: "login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.scss"],
})
export class LoginComponent extends NbLoginComponent implements OnInit {
  role:string = "staff"
  ngOnInit(): void { }
}


