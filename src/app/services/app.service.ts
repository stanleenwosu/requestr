import { Injectable } from '@angular/core';
import { NbGlobalPhysicalPosition, NbToastrService } from '@nebular/theme';
import { UserRoles } from 'app/@core/data/users';
import { UserService } from './user.service';


@Injectable({
  providedIn: 'root'
})
export class AppService {

  tp = NbGlobalPhysicalPosition.BOTTOM_RIGHT
  constructor(
    private toastr: NbToastrService,
    private userS: UserService
  ) { }

  showToast(type: 'success' | 'danger', message: string, title?: string) {
    if (type === 'success')
      this.toastr.success(message, title, {
        duration: 4000,
        position: this.tp,
      });
    if (type === 'danger')
      this.toastr.danger(message, title, {
        duration: 4000,
        position: this.tp,
      });
    return
  }

  generatePassword() {
    let length = 15,
      charset =
        "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%!*-",
      retVal = "";
    for (let i = 0, n = charset.length; i < length; ++i) {
      retVal += charset.charAt(Math.floor(Math.random() * n));
    }
    return retVal;
  }

  randomStringGenerator(len: number) {
    let length = len,
      charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ",
      retVal = "";
    for (let i = 0, n = charset.length; i < length; ++i) {
      retVal += charset.charAt(Math.floor(Math.random() * n));
    }
    return retVal;
  }
  randomNumberGenerator(len: number) {
    let length = len,
      numset = "1234567890",
      retVal = "";
    for (let i = 0, n = numset.length; i < length; ++i) {
      retVal += numset.charAt(Math.floor(Math.random() * n));
    }
    return retVal;
  }

  ObjectToArray() {

  }

  isAdmin() {
    return (this.userS.UserInfo?.role === UserRoles.ADMIN) || (this.userS.UserInfo?.role === UserRoles.SUPER)
  }

  isSuper () {
    return (this.userS.UserInfo?.role === UserRoles.SUPER)
  }
}
