import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NGXLogger } from 'ngx-logger';
import { EnvService } from 'src/app/env.service';
import * as $ from 'jquery';
declare var $: any;
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})



export class HomeComponent implements OnInit {
  message: String = "";
  userId: String = '';
  role: String = '';

  adminRole: boolean = false;
  vendorRole: boolean = false;
  bidsareavailable: boolean = false;
  myBidsAreAvailable: boolean = false;
  displayhistory: boolean = false;
  userIdToHTMl;

  loadingText = this.env.loadingText;
  homePageHeading = this.env.homePageHeading;

  constructor(public env: EnvService, private router: Router, private logger: NGXLogger) {
  }


  ngOnInit() {
    
    $('#sidebarCollapse').on('click', function () {
      $('#sidebar').toggleClass('active');
    });
    //this.logger.debug("in homecomponent");
    //this.logger.debug(sessionStorage.getItem("userId"));
    this.userIdToHTMl = sessionStorage.getItem("userId")
    this.vendorRole = true;
    this.availableBids();

  }

  availableBids() {
    this.displayhistory = false;
    this.myBidsAreAvailable = false;
    this.bidsareavailable = true;
  }
  myBids() {
    this.displayhistory = false;
    this.bidsareavailable = false;
    this.myBidsAreAvailable = true;
  }
  history() {
    this.myBidsAreAvailable = false;
    this.bidsareavailable = false;
    this.displayhistory = true;
  }
  logout() {
    sessionStorage.removeItem("userId");
    sessionStorage.removeItem("password");
    sessionStorage.removeItem("X-Access-Token");
    this.router.navigate(['/login']);
  }



}
