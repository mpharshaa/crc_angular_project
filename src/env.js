(function (window) {
  window.__env = window.__env || {};

  window.__env.ping = "http://172.16.8.206:3001/api/system/ping";

  window.__env.userAuthenticateURl = "http://172.16.8.206:3001/api/CRCUser/login";
  window.__env.isFirstTimeURL = "http://172.16.8.206:3001/api/CRCVendor/getVendorStatus";

  window.__env.captchaUrl = 'http://172.16.8.206:3001/api/Captcha/getCaptcha ';
  window.__env.firstTimechangePasswordURL = "http://172.16.8.206:3001/api/CRCUser/changePasswordFirstTime";
  window.__env.changePasswordURL = "http://172.16.8.206:3001/api/CRCUser/changePassword";
  window.__env.updateVendorStatus = "http://172.16.8.206:3001/api/CRCVendor/updateVendorStatus";

  window.__env.getAvailableBidUrl = "http://172.16.8.206:3001/api/CRCBid/getAvailableBids";
  window.__env.VendorOfferBids = "http://172.16.8.206:3001/api/CRCBid/getVendorBids";

  window.__env.getVendorDetails = "http://172.16.8.206:3001/api/CRCVendor/getVendorDetails";
  window.__env.getBidFormDetailsUrl = "http://172.16.8.206:3001/api/CRCBidOffer/getBidDetails ";

  window.__env.addBidFormURL = "http://172.16.8.206:3001/api/CRCBidOffer/addBidOffer";
  window.__env.updateBidFormUrl = "http://172.16.8.206:3001/api/CRCBidOffer/updateBidOffer";

  
  window.__env.getDocumentDetails = "http://172.16.8.206:3001/api/CRCBid/getDocumentDetails";
  window.__env.downloadDocument = "http://172.16.8.206:3001/api/CRCBid/downloadDocument1";
  window.__env.getDocument = "http://172.16.8.206:3001/api/CRCBid/getDocument1";


  window.__env.historian = "http://172.16.8.206:3001/api/CRCBid/getHistorian";



  // URL for Dev


  // window.__env.ping = "http://172.16.8.207/scrapsalesservices/api/system/ping";


  // window.__env.userAuthenticateURl = "http://172.16.8.207/scrapsalesservices/api/CRCUser/login";
  // window.__env.isFirstTimeURL = "http://172.16.8.207/scrapsalesservices/api/CRCVendor/getVendorStatus";
  

  // window.__env.captchaUrl= 'http://172.16.8.207/scrapsalesservices/api/Captcha/getCaptcha';
  // window.__env.firstTimechangePasswordURL = "http://172.16.8.207/scrapsalesservices/api/CRCUser/changePasswordFirstTime";
  // window.__env.changePasswordURL= "http://172.16.8.207/scrapsalesservices/api/CRCUser/changePassword";
  // window.__env.updateVendorStatus = "http://172.16.8.207/scrapsalesservices/api/CRCVendor/updateVendorStatus";

  
  
  
  
  // window.__env.getAvailableBidUrl = "http://172.16.8.207/scrapsalesservices/api/CRCBid/getAvailableBids";
  // window.__env.VendorOfferBids = "http://172.16.8.207/scrapsalesservices/api/CRCBid/getVendorBids";

  // window.__env.getVendorDetails = "http://172.16.8.207/scrapsalesservices/api/CRCVendor/getVendorDetails";
  // window.__env.getBidFormDetailsUrl = "http://172.16.8.207/scrapsalesservices/api/CRCBidOffer/getBidDetails ";


  // window.__env.addBidFormURL = "http://172.16.8.207/scrapsalesservices/api/CRCBidOffer/addBidOffer";
  // window.__env.updateBidFormUrl = "http://172.16.8.207/scrapsalesservices/api/CRCBidOffer/updateBidOffer";
  

  // window.__env.getDocumentDetails = "http://172.16.8.207/scrapsalesservices/api/CRCBid/getDocumentDetails";
  // window.__env.downloadDocument = "http://172.16.8.207/scrapsalesservices/api/CRCBid/downloadDocument1";
  // window.__env.getDocument = "http://172.16.8.207/scrapsalesservices/api/CRCBid/getDocument1";
  // window.__env.historian = "http://172.16.8.207/scrapsalesservices/api/CRCBid/getHistorian";




  //URL for Test Server


  // window.__env.ping = "http://ec2-52-43-103-235.us-west-2.compute.amazonaws.com/scrapsalesservices/api/system/ping";
 
  // window.__env.userAuthenticateURl="http://ec2-52-43-103-235.us-west-2.compute.amazonaws.com/scrapsalesservices/api/CRCUser/login";
  // window.__env.isFirstTimeURL="http://ec2-52-43-103-235.us-west-2.compute.amazonaws.com/scrapsalesservices/api/CRCVendor/GetVendorStatus";


  // window.__env.captchaUrl='http://ec2-52-43-103-235.us-west-2.compute.amazonaws.com/scrapsalesservices/api/Captcha/getCaptcha';
  // window.__env.firstTimechangePasswordURL = "http://ec2-52-43-103-235.us-west-2.compute.amazonaws.com/scrapsalesservices/api/CRCUser/changePasswordFirstTime";
  // window.__env.changePasswordURL="http://ec2-52-43-103-235.us-west-2.compute.amazonaws.com/scrapsalesservices/api/CRCUser/changePassword";
  // window.__env.updateVendorStatus="http://ec2-52-43-103-235.us-west-2.compute.amazonaws.com/scrapsalesservices/api/CRCVendor/updateVendorStatus";
  

  // window.__env.getAvailableBidUrl="http://ec2-52-43-103-235.us-west-2.compute.amazonaws.com/scrapsalesservices/api/CRCBid/getAvailableBids";
  // window.__env.VendorOfferBids="http://ec2-52-43-103-235.us-west-2.compute.amazonaws.com/scrapsalesservices/api/CRCBid/getVendorBids";


  // window.__env.getVendorDetails="http://ec2-52-43-103-235.us-west-2.compute.amazonaws.com/scrapsalesservices/api/CRCVendor/getVendorDetails";
  // window.__env.getBidFormDetailsUrl="http://ec2-52-43-103-235.us-west-2.compute.amazonaws.com/scrapsalesservices/api/CRCBidOffer/getBidDetails ";

  // window.__env.addBidFormURL="http://ec2-52-43-103-235.us-west-2.compute.amazonaws.com/scrapsalesservices/api/CRCBidOffer/addBidOffer";
  // window.__env.updateBidFormUrl="http://ec2-52-43-103-235.us-west-2.compute.amazonaws.com/scrapsalesservices/api/CRCBidOffer/updateBidOffer";
  
  
  // window.__env.getDocumentDetails = "http://ec2-52-43-103-235.us-west-2.compute.amazonaws.com/scrapsalesservices/api/CRCBid/getDocumentDetails";
  // window.__env.downloadDocument = "http://ec2-52-43-103-235.us-west-2.compute.amazonaws.com/scrapsalesservices/api/CRCBid/downloadDocument1";
  // window.__env.getDocument = "http://ec2-52-43-103-235.us-west-2.compute.amazonaws.com/scrapsalesservices/api/CRCBid/getDocument1";
  // window.__env.historian = "http://ec2-52-43-103-235.us-west-2.compute.amazonaws.com/scrapsalesservices/api/CRCBid/getHistorian";




//URL for Production Server


  //  window.__env.ping = "http://ec2-52-36-123-121.us-west-2.compute.amazonaws.com/scrapsalesservices/api/system/ping";
 
  //  window.__env.userAuthenticateURl="http://ec2-52-36-123-121.us-west-2.compute.amazonaws.com/scrapsalesservices/api/CRCUser/login";
  //  window.__env.isFirstTimeURL="http://ec2-52-36-123-121.us-west-2.compute.amazonaws.com/scrapsalesservices/api/CRCVendor/GetVendorStatus";


  //  window.__env.captchaUrl='http://ec2-52-36-123-121.us-west-2.compute.amazonaws.com/scrapsalesservices/api/Captcha/getCaptcha';
  //  window.__env.firstTimechangePasswordURL = "http://ec2-52-36-123-121.us-west-2.compute.amazonaws.com/scrapsalesservices/api/CRCUser/changePasswordFirstTime";
  //  window.__env.changePasswordURL="http://ec2-52-36-123-121.us-west-2.compute.amazonaws.com/scrapsalesservices/api/CRCUser/changePassword";
  //  window.__env.updateVendorStatus="http://ec2-52-36-123-121.us-west-2.compute.amazonaws.com/scrapsalesservices/api/CRCVendor/updateVendorStatus";
  

  //  window.__env.getAvailableBidUrl="http://ec2-52-36-123-121.us-west-2.compute.amazonaws.com/scrapsalesservices/api/CRCBid/getAvailableBids";
  //  window.__env.VendorOfferBids="http://ec2-52-36-123-121.us-west-2.compute.amazonaws.com/scrapsalesservices/api/CRCBid/getVendorBids";


  //  window.__env.getVendorDetails="http://ec2-52-36-123-121.us-west-2.compute.amazonaws.com/scrapsalesservices/api/CRCVendor/getVendorDetails";
  //  window.__env.getBidFormDetailsUrl="http://ec2-52-36-123-121.us-west-2.compute.amazonaws.com/scrapsalesservices/api/CRCBidOffer/getBidDetails ";

  //  window.__env.addBidFormURL="http://ec2-52-36-123-121.us-west-2.compute.amazonaws.com/scrapsalesservices/api/CRCBidOffer/addBidOffer";
  //  window.__env.updateBidFormUrl="http://ec2-52-36-123-121.us-west-2.compute.amazonaws.com/scrapsalesservices/api/CRCBidOffer/updateBidOffer";
  
  
  //  window.__env.getDocumentDetails = "http://ec2-52-36-123-121.us-west-2.compute.amazonaws.com/scrapsalesservices/api/CRCBid/getDocumentDetails";
  //  window.__env.downloadDocument = "http://ec2-52-36-123-121.us-west-2.compute.amazonaws.com/scrapsalesservices/api/CRCBid/downloadDocument1";
  //  window.__env.getDocument = "http://ec2-52-36-123-121.us-west-2.compute.amazonaws.com/scrapsalesservices/api/CRCBid/getDocument1";
  //  window.__env.historian = "http://ec2-52-36-123-121.us-west-2.compute.amazonaws.com/scrapsalesservices/api/CRCBid/getHistorian";




//URL for Load balancer Server


  //  window.__env.ping = "http://CRC-LB-PROD-2048632371.us-west-2.elb.amazonaws.com/scrapsalesservices/api/system/ping";
 
  //  window.__env.userAuthenticateURl="http://CRC-LB-PROD-2048632371.us-west-2.elb.amazonaws.com/scrapsalesservices/api/CRCUser/login";
  //  window.__env.isFirstTimeURL="http://CRC-LB-PROD-2048632371.us-west-2.elb.amazonaws.com/scrapsalesservices/api/CRCVendor/GetVendorStatus";


  //  window.__env.captchaUrl='http://CRC-LB-PROD-2048632371.us-west-2.elb.amazonaws.com/scrapsalesservices/api/Captcha/getCaptcha';
  //  window.__env.firstTimechangePasswordURL = "http://CRC-LB-PROD-2048632371.us-west-2.elb.amazonaws.com/scrapsalesservices/api/CRCUser/changePasswordFirstTime";
  //  window.__env.changePasswordURL="http://CRC-LB-PROD-2048632371.us-west-2.elb.amazonaws.com/scrapsalesservices/api/CRCUser/changePassword";
  //  window.__env.updateVendorStatus="http://CRC-LB-PROD-2048632371.us-west-2.elb.amazonaws.com/scrapsalesservices/api/CRCVendor/updateVendorStatus";
  

  //  window.__env.getAvailableBidUrl="http://CRC-LB-PROD-2048632371.us-west-2.elb.amazonaws.com/scrapsalesservices/api/CRCBid/getAvailableBids";
  //  window.__env.VendorOfferBids="http://CRC-LB-PROD-2048632371.us-west-2.elb.amazonaws.com/scrapsalesservices/api/CRCBid/getVendorBids";


  //  window.__env.getVendorDetails="http://CRC-LB-PROD-2048632371.us-west-2.elb.amazonaws.com/scrapsalesservices/api/CRCVendor/getVendorDetails";
  //  window.__env.getBidFormDetailsUrl="http://CRC-LB-PROD-2048632371.us-west-2.elb.amazonaws.com/scrapsalesservices/api/CRCBidOffer/getBidDetails ";

  //  window.__env.addBidFormURL="http://CRC-LB-PROD-2048632371.us-west-2.elb.amazonaws.com/scrapsalesservices/api/CRCBidOffer/addBidOffer";
  //  window.__env.updateBidFormUrl="http://CRC-LB-PROD-2048632371.us-west-2.elb.amazonaws.com/scrapsalesservices/api/CRCBidOffer/updateBidOffer";
  
  
  //  window.__env.getDocumentDetails = "http://CRC-LB-PROD-2048632371.us-west-2.elb.amazonaws.com/scrapsalesservices/api/CRCBid/getDocumentDetails";
  //  window.__env.downloadDocument = "http://CRC-LB-PROD-2048632371.us-west-2.elb.amazonaws.com/scrapsalesservices/api/CRCBid/downloadDocument1";
  //  window.__env.getDocument = "http://CRC-LB-PROD-2048632371.us-west-2.elb.amazonaws.com/scrapsalesservices/api/CRCBid/getDocument1";
  //  window.__env.historian = "http://CRC-LB-PROD-2048632371.us-west-2.elb.amazonaws.com/scrapsalesservices/api/CRCBid/getHistorian";













  /**
   //window.__env.angularToken= "AGToken";
   window.__env.loggerboolean = false;
   window.__env.vendorStatus = "Invited";
   window.__env.loadingText = "Loading...";
 
 
   window.__env.loginHeading = "Welcome to CRC Scrap Sales Portal";
   window.__env.userNameError = "User Name is required";
   window.__env.passwordError = "Password is required";
   window.__env.vendorStatusError = "Vendor Status error,Please Login again";
 
   window.__env.changePasswordHeading = "Change Your Password";
   window.__env.emptyPasswordError = "Password cannot be empty";
   window.__env.wrongCurrentPasswordError = "Entered Current Password is Wrong. Please re-enter your Current Password";
   window.__env.currentAndNewPasswordMatchingError = "Current Password and new password cannot be same";
   window.__env.emptyCaptchaError = "Please Enter the text as in captcha ";
   window.__env.invalidCaptchaError = "Invalid Captcha";
   window.__env.passwordDonotMatchError = "Passwords do not match. Please re-enter correct password";
   window.__env.homePageHeading = "CRC Scrap Sales Portal";
 
 
   window.__env.noBidsAvailableError = "No Bids Available"
  
  */






  //window.__env.angularToken= "AGToken";
  window.__env.loggerboolean = true;
  window.__env.vendorStatus = "Invited";
  window.__env.loadingText = "Loading...";


  window.__env.loginHeading = "Welcome to CRC Scrap Sales Portal";
  window.__env.userNameError = "Email Address is required";
  window.__env.passwordError = "Password is required";
  window.__env.vendorStatusError = "Vendor Status error,Please Login again";

  window.__env.changePasswordHeading = "Change Your Password";
  window.__env.emptyPasswordError = "Password cannot be empty";
  window.__env.wrongCurrentPasswordError = "Entered Current Password is Wrong. Please re-enter your Current Password";
  window.__env.currentAndNewPasswordMatchingError = "Current Password and new password cannot be same";
  window.__env.emptyCaptchaError = "Please Enter the text as in captcha ";
  window.__env.invalidCaptchaError = "Invalid Captcha";
  window.__env.passwordDonotMatchError = "Passwords do not match. Please re-enter correct password";
  window.__env.homePageHeading = "CRC Scrap Sales Portal";


  window.__env.contact="Please contact scrapsalesadmin@crc.com"
  window.__env.noBidsAvailableError = "No Bids Available"
}(this));

/**This will make a special (global) variable __env available
 * in our browser window containing the environment variables for our application. */