import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import {AuthService} from './auth.service'
import { Router } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private auth:AuthService ,private router:Router,
    private httpclient:HttpClientModule){}


  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    //  console.log("authguard");
      if(sessionStorage.getItem("userId")){
     //   console.log(sessionStorage.getItem("userId"));
        return true;
      }else{
        this.router.navigate(['/login']);
        return false;
      }
        
  }
}
