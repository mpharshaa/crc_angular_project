


export const environment = {
  production: true,
   ping : "https://ec2-52-36-123-121.us-west-2.compute.amazonaws.com/scrapsalesservices/api/system/ping",
 
   userAuthenticateURl:"https://ec2-52-36-123-121.us-west-2.compute.amazonaws.com/scrapsalesservices/api/CRCUser/login",
   isFirstTimeURL:"https://ec2-52-36-123-121.us-west-2.compute.amazonaws.com/scrapsalesservices/api/CRCVendor/GetVendorStatus",


   captchaUrl:'https://ec2-52-36-123-121.us-west-2.compute.amazonaws.com/scrapsalesservices/api/Captcha/getCaptcha',
   firstTimechangePasswordURL : "https://ec2-52-36-123-121.us-west-2.compute.amazonaws.com/scrapsalesservices/api/CRCUser/changePasswordFirstTime",
   changePasswordURL:"https://ec2-52-36-123-121.us-west-2.compute.amazonaws.com/scrapsalesservices/api/CRCUser/changePassword",
   updateVendorStatus:"https://ec2-52-36-123-121.us-west-2.compute.amazonaws.com/scrapsalesservices/api/CRCVendor/updateVendorStatus",
  

   getAvailableBidUrl:"https://ec2-52-36-123-121.us-west-2.compute.amazonaws.com/scrapsalesservices/api/CRCBid/getAvailableBids",
   VendorOfferBids:"https://ec2-52-36-123-121.us-west-2.compute.amazonaws.com/scrapsalesservices/api/CRCBid/getVendorBids",


   getVendorDetails:"https://ec2-52-36-123-121.us-west-2.compute.amazonaws.com/scrapsalesservices/api/CRCVendor/getVendorDetails",
   getBidFormDetailsUrl:"https://ec2-52-36-123-121.us-west-2.compute.amazonaws.com/scrapsalesservices/api/CRCBidOffer/getBidDetails ",

   addBidFormURL:"https://ec2-52-36-123-121.us-west-2.compute.amazonaws.com/scrapsalesservices/api/CRCBidOffer/addBidOffer",
   updateBidFormUrl:"https://ec2-52-36-123-121.us-west-2.compute.amazonaws.com/scrapsalesservices/api/CRCBidOffer/updateBidOffer",
  
  
   getDocumentDetails : "https://ec2-52-36-123-121.us-west-2.compute.amazonaws.com/scrapsalesservices/api/CRCBid/getDocumentDetails",
   downloadDocument : "https://ec2-52-36-123-121.us-west-2.compute.amazonaws.com/scrapsalesservices/api/CRCBid/downloadDocument1",
   getDocument : "https://ec2-52-36-123-121.us-west-2.compute.amazonaws.com/scrapsalesservices/api/CRCBid/getDocument1",
   historian : "https://ec2-52-36-123-121.us-west-2.compute.amazonaws.com/scrapsalesservices/api/CRCBid/getHistorian",

   transactionDetails:"https://ec2-52-36-123-121.us-west-2.compute.amazonaws.com/scrapsalesservices/api/CRCBid/getTransactionDetails",






   

  loggerboolean :false,
  vendorStatus:"Invited",
  loadingText:"Loading...",

  loginHeading:"Welcome to CRC Scrap Sales Portal",
  userNameError:"User Name is required",
  passwordError: "Password is required",
  vendorStatusError:"Vendor Status error,Please Login again",

  changePasswordHeading:"Change Your Password",
  emptyPasswordError:"Password cannot be empty",
  wrongCurrentPasswordError:"Entered Current Password is Wrong. Please re-enter your Current Password",
  currentAndNewPasswordMatchingError:"Current Password and new password cannot be same",
  emptyCaptchaError:"Please Enter the text as in captcha ",
  invalidCaptchaError:"Invalid Captcha",
  passwordDonotMatchError:"Passwords do not match. Please re-enter correct password",

  homePageHeading:"CRC Scrap Sales Portal",

  
  noBidsAvailableError:"No Bids Available"
};
