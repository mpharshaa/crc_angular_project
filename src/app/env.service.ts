import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class EnvService {

 // The values that are defined here are the default values that can
  // be overridden by env.js

  // API url
  public apiUrl = '';

  // Whether or not to enable debug mode
  public enableDebug = true;



  public ping = "";
 
  public userAuthenticateURl="" ;
  public isFirstTimeURL="" ;


  public captchaUrl="" ;
  public firstTimechangePasswordURL = "";
  public changePasswordURL="" ;
  public updateVendorStatus="" ;
  

  public getAvailableBidUrl="" ;
  public VendorOfferBids="" ;


  public getVendorDetails="" ;
  public getBidFormDetailsUrl=" " ;

  public addBidFormURL="" ;
  public updateBidFormUrl="" ;
  
  
  public getDocumentDetails = "";
  public downloadDocument = "";
  public getDocument = "";
  public historian = "";
  public loggerboolean= false;




  vendorStatus="Invited";
  loadingText="Loading...";

  //angularToken= "AGToken";
  loginHeading="Welcome to CRC Scrap Sales Portal";
  userNameError="User Name is required";
  passwordError= "Password is required";
  vendorStatusError="Vendor Status error,Please Login again";

  changePasswordHeading="Change Your Password";
  emptyPasswordError="Password cannot be empty";
  wrongCurrentPasswordError="Entered Current Password is Wrong. Please re-enter your Current Password";
  currentAndNewPasswordMatchingError="Current Password and new password cannot be same";
  emptyCaptchaError="Please Enter the text as in captcha ";
  invalidCaptchaError="Invalid Captcha";
  passwordDonotMatchError="Passwords do not match. Please re-enter correct password";

  homePageHeading="CRC Scrap Sales Portal";

  
  noBidsAvailableError="No Bids Available";

  contact="Please contact your Administrator Project@crc.com"


  constructor() { }
}
