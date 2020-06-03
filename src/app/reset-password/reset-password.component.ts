import { Component, ViewChild, ElementRef, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth.service';
import { EnvService } from 'src/app/env.service';
import { ResetPasswordService } from 'src/app/reset-password/reset-password.service';
import { ChangePasswordModel } from 'src/app/Models/changePassword';
import { Captcha } from 'src/app/Models/captcha';
import { NgxSpinnerService } from 'ngx-spinner';
@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent implements OnInit {

  resetPassword: FormGroup;
  message: String = '';
  captcha: string;
  errorMessage: boolean = false;
  userDetails;


  loadingText = this.env.loadingText;
  captchaURL = this.env.captchaUrl;
  changePasswordHeading = this.env.changePasswordHeading;
  emptyPasswordError = this.env.emptyPasswordError;
  wrongCurrentPasswordError = this.env.wrongCurrentPasswordError;
  currentAndNewPasswordMatchingError = this.env.currentAndNewPasswordMatchingError;
  emptyCaptchaError = this.env.emptyCaptchaError;
  invalidCaptchaError = this.env.invalidCaptchaError;
  passwordDonotMatchError = this.env.passwordDonotMatchError;


  error;
  capthcResponse;
  resetPasswordResponse;

  @ViewChild('dataContainer') dataContainer: ElementRef;
  constructor(private router: Router,
    private authService: AuthService, public env: EnvService, private resetPasswordService: ResetPasswordService, private spinner: NgxSpinnerService) { }

  ngOnInit() {
    this.resetPassword = new FormGroup({
      currentPassword: new FormControl("", Validators.required),
      passwordOne: new FormControl("", Validators.required),
      passwordTwo: new FormControl("", Validators.required),
      captcha: new FormControl("", Validators.required)
    })

    this.refreshCaptcha();



  }
  resetPasswordfunc(form: any) {
    console.log("resetPasswordfunc");
    this.userDetails = this.authService.userCredentials;
    if (this.resetPassword.value.currentPassword == "" || this.resetPassword.value.passwordOne == "" || this.resetPassword.value.passwordTwo == "") {
      this.errorMessage = true;
      this.message = this.emptyPasswordError;
    }
    else if ((this.resetPassword.value.currentPassword) != (sessionStorage.getItem("password"))) {
      this.errorMessage = true;
      this.message = this.wrongCurrentPasswordError;
    } else if (((this.resetPassword.value.passwordOne == this.resetPassword.value.currentPassword) || (this.resetPassword.value.passwordTwo == this.resetPassword.value.currentPassword))) {
      this.errorMessage = true;
      this.message = this.currentAndNewPasswordMatchingError;
    }
    else if (this.resetPassword.value.captcha == "") {
      this.errorMessage = true;
      this.message = this.emptyCaptchaError;
    } else if (this.resetPassword.value.captcha != this.captcha) {
      this.errorMessage = true;
      this.message = this.invalidCaptchaError;
    } else if (this.resetPassword.value.passwordOne == this.resetPassword.value.passwordTwo) {
      this.spinner.show("sp2");
      // let resetPasswordData: ChangePasswordModel = {
      //   userId: sessionStorage.getItem("userId"),
      //   currentPassword: this.resetPassword.value.currentPassword,
      //   newPassword: this.resetPassword.value.passwordOne
      // };

      let resetPasswordData: ChangePasswordModel = {
        userId: sessionStorage.getItem("userId"),
        currentPassword: this.resetPassword.value.currentPassword,
        newPassword: this.resetPassword.value.passwordOne
      };

      this.resetPasswordResponse = this.resetPasswordService.resetPasswordService(resetPasswordData).subscribe((response: any) => {
        if (response) {
          //console.log("response", response);
          if (response.error) {
            this.spinner.hide("sp2");
            this.message = response.error.message + " (StatusCode:" + response.error.statusCode + ")"
            this.errorMessage = true;
            console.log("resetPasswordService-error response", response.error)
          } else if (response.message == "success") {
            console.log("responsemessage", response.message);
            sessionStorage.setItem("password", this.resetPassword.value.passwordOne)
            //this.userDetails.password = this.resetPassword.value.passwordOne;
            this.spinner.hide("sp2");
            this.router.navigate(['home']);
          }

        } else {
          this.spinner.hide("sp2");
          console.log("No Response from resetpasword");
          this.message = "No response from server please try again";
          this.errorMessage = true;
        }
      },
        error => {
          console.log(this.error.message);
          this.spinner.hide("sp2");
          this.error = error

          this.message = error.message.substring(0, 21);
          this.errorMessage = true;

        })

    } else {
      console.log("this.message"+this.message);
      this.spinner.hide("sp2");
      this.errorMessage = true;
      this.message = this.passwordDonotMatchError;

      this.resetPassword.controls['passwordTwo'].setValue('');
    }
  }

  refreshCaptcha() {
    this.capthcResponse = this.resetPasswordService.getResetPasswordCaptcha().subscribe((response: any) => {
      //console.log("response", response);
      if (response) {
        if (response.error) {
          console.log("getResetPasswordCaptcha-response.error", response.error);
          this.message = response.error.message + " (StatusCode:" + response.error.statusCode + ")"
            this.errorMessage = true;
        } else if (response.data) {
          //console.log("coming response.data", response.data)
          this.captcha = response.text;
          this.dataContainer.nativeElement.innerHTML = response.data;
        }
      } else {
        console.log("No Response");
        this.message = "No response from server please try again";
        this.errorMessage = true;
      }
    },
      error => {
        console.log(this.error.message);
        this.error = error
        this.message = error.message;
        this.errorMessage = true;

      });

  }

  cancelResetPasswordfunc() {
    this.router.navigate(['home']);
  }
  get resetPasswordForm() {
    return this.resetPassword.controls;
  }


}
