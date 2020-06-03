import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
//import { Observable, throwError } from 'rxjs';
import { AuthService } from 'src/app/auth.service';
@Injectable({
  providedIn: 'root'
})
export class LoginPageService {

  constructor(private httpClient: HttpClient, private authService: AuthService) { }

  checkServerConnection(){
    return this.authService.checkServerConnection();
  }
  isAuthenticated(userDetails) {
    return this.authService.isAuthenticated(userDetails);
  }

  

  isFirstTimeUser(userData) {
    return this.authService.isFirstTime(userData);
  }

  
}
