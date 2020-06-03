import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { EnvService } from 'src/app/env.service';
import { LoginPageService } from 'src/app/login-page/login-page.service';
import { UserIdleService } from 'angular-user-idle';


@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})



export class LoginPageComponent implements OnInit {



  //variable declaration
  loginForm: FormGroup;



  submitted: boolean = false;
  wrongCredentials: boolean = false;
  loading: boolean = false;



  userName: string = "";
  password: string = "";
  errorMessage: string = "";


  error;
  userDetails;
  userIdJson;
  responseFromisFirstTime;


  //data from configuration file
  loadingText: string = this.env.loadingText;
  loginHeading: string = this.env.loginHeading;
  userNameError: string = this.env.userNameError;
  passwordError: string = this.env.passwordError;
  vendorStatus = this.env.vendorStatus;
  contact=this.env.contact;



  constructor(private userIdle: UserIdleService, private router: Router, private loginPageService: LoginPageService, public env: EnvService) {

  }




  ngOnInit() {

    this.userIdle.startWatching();
    this.userIdle.onTimeout().subscribe(() => {
      console.log("sessionTimeout")
    });

    // FormGroup: it tracks the value and validity status of an angular form control

    this.loginForm = new FormGroup({
      userId: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required])
    });

  }


  /**
   * OnSubmitLogin() which gets data from login page and 
   * responds based on response of the server
   */
  lowercaseUserName;
  OnSubmitLogin() {
    console.log("Starting OnSubmitLogin");

    this.loginPageService.checkServerConnection().subscribe((response: any) => {
      //console.log("checkServerConnection", response);
      if (response.version) {
        this.wrongCredentials = false;
        this.submitted = true;
        this.loading = true;

        if (this.loginForm.invalid) {
          this.loading = false;
          return;
        }

        //userDetails : Data which we need to send to service call for authentication

        this.lowercaseUserName = this.loginForm.value.userId.toLowerCase();

        this.userDetails = {
          "username": this.loginForm.value.userId.toLowerCase(),
          "password": this.loginForm.value.password
        }
        //console.log("userDetails", this.userDetails);

        this.loginPageService.isAuthenticated(this.userDetails).subscribe((response: any) => {
          if (response) {
            //console.log(response);
            if (response.error) {
              sessionStorage.removeItem("userId");
              sessionStorage.removeItem("password");
              sessionStorage.removeItem("X-Access-Token");
              this.loading = false;
              this.errorMessage = response.error.message + " (StatusCode:" + response.error.statusCode + ") "+this.contact
              this.wrongCredentials = true;
              console.log("isAuthenticated-response.error", response.error);
            } else if (response.access_token) {
              //storing user credentials in session storage
              sessionStorage.setItem('userId', this.loginForm.value.userId.toLowerCase());
              sessionStorage.setItem('password', this.loginForm.value.password);
              sessionStorage.setItem('X-Access-Token', response.access_token)

              //userIdJson: Data which we need to send to service call to know whether he is first time user or not
              this.userIdJson = {
                vendorEmail: this.loginForm.value.userId
              }
              this.loginPageService.isFirstTimeUser(this.userIdJson).subscribe((response: any) => {
                if (response) {
                  //console.log("response", response);
                  if(response.error){
                    console.log("isFirstTimeUser-response.error",response.error);
                    sessionStorage.removeItem("userId");
                  sessionStorage.removeItem("password");
                  sessionStorage.removeItem("X-Access-Token");
                  this.loading = false;
                  this.errorMessage = response.error.message + " (StatusCode:" + response.error.statusCode + ") "+this.contact;
                  this.wrongCredentials = true;
                  }else if(response.vendorStatus){
                    this.responseFromisFirstTime = response.vendorStatus;

                    /**
                     * if the response gets as Invited then user moves to changepassword page else he will move to home page
                     */
                    if (this.responseFromisFirstTime == this.vendorStatus) {
                      console.log("New user");
                      this.loading = false;
                      this.router.navigate(['changePassword']);
                    } else {
                      console.log("existing user");
                      this.loading = false;
                      this.router.navigate(['home']);
                    }
                  }
                }else{
                  console.log("No response from service")
                }

              },
                error => {
                  console.log(error.message);
                  sessionStorage.removeItem("userId");
                  sessionStorage.removeItem("password");
                  sessionStorage.removeItem("X-Access-Token");
                  this.loading = false;
                  this.error = error
                  this.errorMessage = error.message + " (StatusCode:" + error.statusCode + ") "+this.contact;
                  this.wrongCredentials = true;
                });
            }
          } else {
            console.log("No response from the service");
          }
        },
          //showing Server Errors
          error => {
            console.log(error.message);
            sessionStorage.removeItem("userId");
            sessionStorage.removeItem("password");
            sessionStorage.removeItem("X-Access-Token");

            this.loading = false;
            this.error = error
            this.errorMessage = error.message.substring(0, 21);
            this.wrongCredentials = true;
          });
      }
      else {
        console.log("version is not there in connection");
        this.loading = false;
      }
    }, error => {
      console.log("error.message")
      console.log(error.message);
      this.loading = false;
      this.error = error
      this.router.navigate(['serverUnavailable']);
    })




  }




  /**
   * get loginFormControl() : is for validation control
   */

  get loginFormControl() {
    return this.loginForm.controls;
  }





  /**
   * reset(): Resetting Login Data in UI
   */
  reset() {
    this.wrongCredentials = false;
    this.loginForm.reset();
  }

}
