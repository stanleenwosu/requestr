import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { User, UserRoles } from "app/@core/data/users";
import { Vendor } from "app/@core/data/vendor";
import { UserService } from "app/services/user.service";
import { VendorService } from "app/services/vendor.service";
import firebase from "firebase/app";
import "firebase/storage";
import { NbGlobalPhysicalPosition, NbToastrService } from "@nebular/theme";
import { Router } from "@angular/router";

@Component({
  selector: "app-register",
  templateUrl: "./register.component.html",
  styleUrls: ["./register.component.scss"],
})
export class RegisterComponent implements OnInit {
  user: User;
  vendor: Vendor;
  userRole = UserRoles;
  vendorForm: FormGroup;
  registering = false;

  tp = NbGlobalPhysicalPosition.BOTTOM_RIGHT;
  uploading;
  cac_f: any;
  cac_fu: any;
  atth_f: any;
  atth_fu: any;
  constructor(
    private fb: FormBuilder,
    private userS: UserService,
    private vendorS: VendorService,
    private toastr: NbToastrService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.vendorForm = this.fb.group({
      name: ["", Validators.required],
      email: ["", [Validators.required, Validators.email]],
      password: ["", Validators.required],
      companyName: ["", Validators.required],
      companyAddress: ["", Validators.required],
      registrationDate: [""],
      website: [""],
      repName: ["", Validators.required],
      repPhone: ["", Validators.required],
    });
  }

  async init() { }

  async createUser() {
    const d = Date.now();
    const id = "user_" + d;
    const user: User = {
      name: this.vendorForm.value["name"],
      id: id,
      email: this.vendorForm.value["email"],
      password: this.vendorForm.value["password"],
      picture: "",
      role: UserRoles.VENDOR,
      timestamp: d,
    };
    console.log(user);
    await this.userS.addUser(user);
    return user;
  }

  async add(cac_url?: string, atth_url?: string) {
    const user = await this.createUser();
    console.log(user);
    this.vendor = this.vendorForm.value;
    this.vendor.id = user.id;
    this.vendor.cac_url = cac_url;
    this.vendor.document_url = atth_url;
    this.vendor.isVerified = false;
    await this.vendorS.addVendor(this.vendor);
    this.toastr.success(`Profile`, "Profile Updated", {
      duration: 2000,
      position: this.tp,
    });
    this.userS.UserInfo = this.user;
    this.router.navigate(["dashboard"]);
  }

  uploadCAC(files) {
    try {
      if (files.length === 0) return;
      let mimeType = files[0].type;
      if (mimeType.match(/image|pdf\/*/) == null) {
        throw new Error("File not Supported");
      }
      if (files[0].size > 1048576) {
        throw new Error("File must be less than 1mb");
      }
      var reader = new FileReader();
      this.cac_f = files[0];

      reader.readAsDataURL(files[0]);
      reader.onload = (_event) => {
        const fileUrl = reader.result;
        this.cac_fu = fileUrl;
      };
      reader.onerror = (_ev) => {
        throw new Error("An Error Occured");
      };
    } catch (error) { }
  }

  uploadATTH(files) {
    console.log(files);
    try {
      if (files.length === 0) return;
      let mimeType = files[0].type;
      if (mimeType.match(/image|pdf\/*/) == null) {
        throw new Error("File not Supported");
      }
      if (files[0].size > 1048576) {
        throw new Error("File must be less than 1mb");
      }
      var reader = new FileReader();
      this.atth_f = files[0];

      reader.readAsDataURL(files[0]);
      reader.onload = (_event) => {
        const fileUrl = reader.result;
        this.atth_fu = fileUrl;
      };
      reader.onerror = (_ev) => {
        throw new Error("An Error Occured");
      };
    } catch (error) { }
  }

  uploadToDB() {
    this.registering = true
    const uploadTask = firebase
      .storage()
      .ref()
      .child(`files/${this.cac_f.name}`)
      .putString(this.cac_fu, "data_url");
    uploadTask.on("state_changed", () => {
      uploadTask.snapshot.ref
        .getDownloadURL()
        .then((cURL) => {
          const ft = firebase
            .storage()
            .ref()
            .child(`files/${this.atth_f.name}`)
            .putString(this.atth_fu, "data_url");
          ft.on("state_changed", () => {
            ft.snapshot.ref
              .getDownloadURL()
              .then((aURL) => {
                this.add(cURL, aURL);
              })
              .catch((err) =>
                console.log(err)
              );
          });
        })
        .catch((err) =>
          console.log(err)
        );
    });
  }
}
