import { Component, HostListener } from '@angular/core';
import { Subject } from 'rxjs';
import { Router,NavigationEnd  } from '@angular/router';
import * as $ from 'jquery';
declare var $: any;
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'scrapsalesportal';

  userActivity;

  userInactive: Subject<any> = new Subject();
  constructor(private router: Router) {
  
    this.setTimeout();
    this.userInactive.subscribe(() =>{

      if(this.router.url=="/login"){

      }else{
        sessionStorage.removeItem("userId");
      sessionStorage.removeItem("password");  
      sessionStorage.removeItem("X-Access-Token")
      $('#SessionModal').modal({backdrop: 'static', keyboard: false});  
      }
      
    })
    
    
  }

  setTimeout() {
    this.userActivity = setTimeout(() => this.userInactive.next(undefined),300000);
  }

  @HostListener('window:mousemove') refreshUserState() {
    clearTimeout(this.userActivity);
    this.setTimeout();
  }


  goToLogin() {
    location.reload();  
    this.router.navigate(['login']);
  }
}
