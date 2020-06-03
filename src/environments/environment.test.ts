
export const environment = {
    production: false,
    name: 'test',
    ping : "http://ec2-52-43-103-235.us-west-2.compute.amazonaws.com/scrapsalesservices/api/system/ping",
 
  userAuthenticateURl:"http://ec2-52-43-103-235.us-west-2.compute.amazonaws.com/scrapsalesservices/api/CRCUser/login",
  isFirstTimeURL:"http://ec2-52-43-103-235.us-west-2.compute.amazonaws.com/scrapsalesservices/api/CRCVendor/GetVendorStatus",


  captchaUrl:'http://ec2-52-43-103-235.us-west-2.compute.amazonaws.com/scrapsalesservices/api/Captcha/getCaptcha',
  firstTimechangePasswordURL : "http://ec2-52-43-103-235.us-west-2.compute.amazonaws.com/scrapsalesservices/api/CRCUser/changePasswordFirstTime",
  changePasswordURL:"http://ec2-52-43-103-235.us-west-2.compute.amazonaws.com/scrapsalesservices/api/CRCUser/changePassword",
  updateVendorStatus:"http://ec2-52-43-103-235.us-west-2.compute.amazonaws.com/scrapsalesservices/api/CRCVendor/updateVendorStatus",
  

  getAvailableBidUrl:"http://ec2-52-43-103-235.us-west-2.compute.amazonaws.com/scrapsalesservices/api/CRCBid/getAvailableBids",
  VendorOfferBids:"http://ec2-52-43-103-235.us-west-2.compute.amazonaws.com/scrapsalesservices/api/CRCBid/getVendorBids",


  getVendorDetails:"http://ec2-52-43-103-235.us-west-2.compute.amazonaws.com/scrapsalesservices/api/CRCVendor/getVendorDetails",
  getBidFormDetailsUrl:"http://ec2-52-43-103-235.us-west-2.compute.amazonaws.com/scrapsalesservices/api/CRCBidOffer/getBidDetails ",

  addBidFormURL:"http://ec2-52-43-103-235.us-west-2.compute.amazonaws.com/scrapsalesservices/api/CRCBidOffer/addBidOffer",
  updateBidFormUrl:"http://ec2-52-43-103-235.us-west-2.compute.amazonaws.com/scrapsalesservices/api/CRCBidOffer/updateBidOffer",
  
  
  getDocumentDetails : "http://ec2-52-43-103-235.us-west-2.compute.amazonaws.com/scrapsalesservices/api/CRCBid/getDocumentDetails",
  downloadDocument : "http://ec2-52-43-103-235.us-west-2.compute.amazonaws.com/scrapsalesservices/api/CRCBid/downloadDocument1",
  getDocument : "http://ec2-52-43-103-235.us-west-2.compute.amazonaws.com/scrapsalesservices/api/CRCBid/getDocument1",
  historian : "http://ec2-52-43-103-235.us-west-2.compute.amazonaws.com/scrapsalesservices/api/CRCBid/getHistorian",


  transactionDetails:"http://ec2-52-43-103-235.us-west-2.compute.amazonaws.com/scrapsalesservices/api/CRCBid/getTransactionDetails",

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