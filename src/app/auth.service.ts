import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.prod';
import { HttpClient } from '@angular/common/http';
import { Captcha } from 'src/app/Models/captcha';
import { userDetailsModel } from 'src/app/Models/userDetails';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { Router } from '@angular/router';
import { DataService } from 'src/app/data.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  userCredentials;

  isFirstTimeResponse;

  constructor(private dataService: DataService) { }

  checkServerConnection(){
    return this.dataService.checkServerConnection();
  }
  isAuthenticated(userDetails): any {

    this.userCredentials = userDetails;
    //return this.httpClient.post<any>(this.userAuthenticationURL,userDetails)
    return this.dataService.isAuthenticated(userDetails);

  }

  isFirstTime(userId): any {
    //console.log(userId);
    //return this.httpClient.get<any>(this.isFirstTimeURLDummy + "/" + userId.vendorEmail)
return this.dataService.isFirstTime(userId);
  }

  role: String = '';
  getRole() {
    if (this.userCredentials.userId == "admin") {
      this.role = "admin";
    } else if (this.userCredentials.userId == "vendor") {
      this.role = "vendor";
    }
    return this.role;
  }
}
