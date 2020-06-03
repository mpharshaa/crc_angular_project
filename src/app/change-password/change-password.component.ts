import { Component, ViewChild, ElementRef, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth.service';
import { EnvService } from 'src/app/env.service';
import { ChangePasswordService } from 'src/app/change-password/change-password.service';
import { ChangePasswordModel } from 'src/app/Models/changePassword';
import { Captcha } from 'src/app/Models/captcha';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})


export class ChangePasswordComponent implements OnInit {

  changePassword: FormGroup;



  errorMessage: boolean = false;


  captcha: string = "";
  message: String = '';



  error;
  responseFromCaptcha;
  changePasswordResponse;


  captchaURL = this.env.captchaUrl;
  changePasswordHeading = this.env.changePasswordHeading;
  emptyPasswordError = this.env.emptyPasswordError;
  wrongCurrentPasswordError = this.env.wrongCurrentPasswordError;
  currentAndNewPasswordMatchingError = this.env.currentAndNewPasswordMatchingError;
  emptyCaptchaError = this.env.emptyCaptchaError;
  invalidCaptchaError = this.env.invalidCaptchaError;
  passwordDonotMatchError = this.env.passwordDonotMatchError;
  loadingText = this.env.loadingText;
  contact = this.env.contact;



  @ViewChild('dataContainer') dataContainer: ElementRef;

  constructor(private router: Router, private authService: AuthService,
    private changepasswordservice: ChangePasswordService,
    private spinner: NgxSpinnerService, public env: EnvService) { }

  ngOnInit() {

    this.changePassword = new FormGroup({
      currentPassword: new FormControl("", Validators.required),
      passwordOne: new FormControl("", Validators.required),
      passwordTwo: new FormControl("", Validators.required),
      captcha: new FormControl("", Validators.required)
    })

    this.refreshCaptcha();
  }

  changePasswordfunc(form: any) {
    console.log("changePasswordfunc");

    if (this.changePassword.value.currentPassword == "" || this.changePassword.value.passwordOne == "" || this.changePassword.value.passwordTwo == "") {
      this.errorMessage = true;
      this.message = this.emptyPasswordError;

    }
    else if ((this.changePassword.value.currentPassword) != (sessionStorage.getItem("password"))) {
      this.errorMessage = true;
      this.message = this.wrongCurrentPasswordError;
    } else if (((this.changePassword.value.passwordOne == this.changePassword.value.currentPassword) || (this.changePassword.value.passwordTwo == this.changePassword.value.currentPassword))) {
      this.errorMessage = true;
      this.message = this.currentAndNewPasswordMatchingError;

    }
    else if (this.changePassword.value.captcha == "") {
      this.errorMessage = true;
      this.message = this.emptyCaptchaError;

    } else if (this.changePassword.value.captcha != this.captcha) {

      this.errorMessage = true;
      this.message = this.invalidCaptchaError;
    }
    else if (this.changePassword.value.passwordOne == this.changePassword.value.passwordTwo) {
      this.spinner.show("sp2");
      let changePasswordData: ChangePasswordModel =
      {
        userId: sessionStorage.getItem("userId"),
        currentPassword: this.changePassword.value.currentPassword,
        newPassword: this.changePassword.value.passwordOne
      };


      this.changePasswordResponse = this.changepasswordservice.changePasswordService(changePasswordData).subscribe((response: any) => {

        if (response) {
          //console.log("response", response);
          if (response.error) {
            console.log("changepasswordservice-response.error"+response.error);
            this.message = response.error.message + " (StatusCode:" + response.error.statusCode + ")  "+this.contact
            this.errorMessage = true;
          } else if (response.message == "success") {
            sessionStorage.setItem("password", this.changePassword.value.passwordOne);
            this.authService.userCredentials.password = this.changePassword.value.passwordOne;
            let jsonuserId = {
              vendorEmail: sessionStorage.getItem("userId"),
              vendorStatus: "Verified"
            }
            this.changepasswordservice.updateVendorStatus(jsonuserId).subscribe((response: any) => {

              if (response) {
                //console.log("response", response);
                if (response.error) {
                  this.message = response.error.message + " (StatusCode:" + response.error.statusCode + ")  "+this.contact
                  this.errorMessage = true;

                } else if (response.vendorStatus == "Verified") {

                  this.spinner.hide("sp2");
                  this.router.navigate(['home']);

                }

              } else {
                console.log("No Response from update vendorstatus")
              }
            },
              error => {
                console.log(this.error.message);
                this.spinner.hide("sp2");
                this.error = error

                this.message = error.message + " (StatusCode:" + error.statusCode + ")  "+this.contact
                this.errorMessage = true;

              });
          }
        } else {
          console.log("No Response from service");
        }

      },
        error => {
          console.log(this.error.message);
          this.spinner.hide("sp2");
          this.error = error

          this.message = error.message + " (StatusCode:" + error.statusCode + ")  "+this.contact
          this.errorMessage = true;

        });





    } else {
      this.spinner.hide("sp2");
      this.errorMessage = true;
      this.message = this.passwordDonotMatchError;

      this.changePassword.controls['passwordTwo'].setValue('');
    }
  }
  refreshCaptcha() {
    this.responseFromCaptcha = this.changepasswordservice.getChangePasswordCaptcha().subscribe((response: any) => {
if(response){
  if(response.error){
    this.message = response.error.message + " (StatusCode:" + response.error.statusCode + ")  "+this.contact
    this.errorMessage = true;
  }else if(response.data){
    this.captcha = response.text;
    this.dataContainer.nativeElement.innerHTML = response.data;
  }
}else{
  console.log("No response")
}
     
    },
      error => {
        console.log(this.error.message)
        this.error = error

        this.message = error.message + " (StatusCode:" + error.statusCode + ")  "+this.contact
        this.errorMessage = true;

      });
  }
  cancelChangePasswordfunc() {
    sessionStorage.removeItem("userId");
    sessionStorage.removeItem("password");
    this.router.navigate(['login']);
  }
  get changePasswordForm() {
    return this.changePassword.controls;
  }



}
