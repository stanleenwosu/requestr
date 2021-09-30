import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { User, UserRoles } from "app/@core/data/users";
import { Vendor } from "app/@core/data/vendor";
import { UserService } from "app/services/user.service";
import { VendorService } from "app/services/vendor.service";
import firebase from "firebase/app";
import "firebase/storage";
import { NbGlobalPhysicalPosition, NbToastrService } from "@nebular/theme";

@Component({
  selector: "profile",
  templateUrl: "./profile.component.html",
  styleUrls: ["./profile.component.scss"],
})
export class ProfileComponent implements OnInit {
  user: User;
  vendor: Vendor;
  userRole = UserRoles;
  form: FormGroup;
  vendorForm: FormGroup;

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
    private toastr: NbToastrService
  ) { }

  ngOnInit(): void {
    this.user = this.userS.UserInfo;
    this.form = this.fb.group({
      name: [this.user.name, Validators.required],
      email: [this.user.email, Validators.required],
      password: [this.user.password, Validators.required],
    });
    this.vendorForm = this.fb.group({
      companyName: ["", Validators.required],
      companyAddress: ["", Validators.required],
      registrationDate: [""],
      website: [""],
      repName: ["", Validators.required],
      repPhone: ["", Validators.required],
    });
    this.init();
  }

  async init() {
    if (this.user.role == UserRoles.VENDOR) {
      const vendorInfo = await this.vendorS.getVendorInfo(this.user.id);
      this.vendor = vendorInfo

      if (vendorInfo) {
        this.vendor = vendorInfo;
        this.vendorForm = this.fb.group({
          companyName: [vendorInfo.companyName || "", Validators.required],
          companyAddress: [vendorInfo.companyAddress || "", Validators.required],
          registrationDate: [
            vendorInfo.registrationDate || "",
            Validators.required,
          ],
          website: [vendorInfo.website || ""],
          repName: [vendorInfo.repName || "", Validators.required],
          repPhone: [vendorInfo.repPhone || "", Validators.required],
          cac_url: [vendorInfo.cac_url || "", Validators.required],
          document_url: [vendorInfo.document_url || "", Validators.required],
        });
      }
    }
  }

  add(cac_url?: string, atth_url?: string) {
    try {
      this.vendor = this.vendorForm.value;
      this.vendor.id = this.user.id;
      this.vendor.cac_url = cac_url;
      this.vendor.document_url = atth_url;
      this.vendorS.addVendor(this.vendor);
      this.toastr.success(`Profile`, "Profile Updated", {
        duration: 2000,
        position: this.tp,
      })
    } catch (error) {
      this.toastr.danger(`Profile Error`, error, {
        duration: 2000,
        position: this.tp,
      })
    }
  }

  async updateUser() {
    this.user.email = this.form.value['email']
    this.user.name = this.form.value['name']
    this.user.password = this.form.value['password']
    await this.userS.updateUser(this.user)
  }

  update() {
    try {
      const v = this.vendorForm.value;
      this.vendor = this.vendorForm.value;
      v.id = this.user.id;
      v.cac_url = this.vendor.cac_url;
      v.document_url = this.vendor.document_url;
      this.vendorS.updateVendor(v);
      this.toastr.success(`Profile`, "Profile Updated", {
        duration: 2000,
        position: this.tp,
      })
    } catch (error) {
      this.toastr.danger(`Profile Error`, error, {
        duration: 2000,
        position: this.tp,
      })
    }
  }

  uploadCAC(files) {
    console.log(files)
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
    console.log(files)
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

  async uploadToDB() {

    await this.updateUser();
    this.toastr.success(`Profile`, 'Profile update Successful', {
      duration: 2000,
      position: this.tp,
    })
    if (this.user.role == UserRoles.VENDOR) {
      if (this.vendor) {
        this.update();
      }

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
                  this.toastr.danger(`Upload Error`, err, {
                    duration: 2000,
                    position: this.tp,
                  })
                );
            });
          })
          .catch((err) =>
            this.toastr.danger(`Upload Error`, err, {
              duration: 2000,
              position: this.tp,
            })
          );
      });
    }
  }
}
