import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders} from '@angular/common/http';
import { Captcha } from 'src/app/Models/captcha';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { ChangePasswordModel } from 'src/app/Models/changePassword'
//import { EnvService } from 'src/app/env.service';






@Injectable({
  providedIn: 'root'
})



export class DataService {



  //host = environment.host;
  ping = environment.ping;
  userAuthenticationURL = environment.userAuthenticateURl;
  isFirstTimeURL = environment.isFirstTimeURL;
  captchaURL = environment.captchaUrl;
  changePasswordUrl = environment.changePasswordURL;
  firstChangePasswordUrl = environment.firstTimechangePasswordURL;
  updateVendorStatusURL = environment.updateVendorStatus;
  getAvailableBidUrl = environment.getAvailableBidUrl;
  getVendorOfferBidsUrl = environment.VendorOfferBids;
  getBidFormUrl = environment.getBidFormDetailsUrl;
  getVendorDetailsurl = environment.getVendorDetails;
  addBidFormURL = environment.addBidFormURL;
  updateBidFormUrl = environment.updateBidFormUrl;
  // angularToken = environment.angularToken;
  getDocumentDetailsURL = environment.getDocumentDetails;
  downloadDocumentURL = environment.downloadDocument;
  getDocumentURL = environment.getDocument;
  historianURL = environment.historian;
  transactionDetailURL = environment.transactionDetails;
  constructor(private httpClient: HttpClient) {

  }

  checkServerConnection() {
    console.log("checkServerConnection-checkServerConnection",this.ping);
    return this.httpClient.get(this.ping);
  }

  isAuthenticated(userDetails): any {
    console.log("isAuthenticated-isAuthenticated");
    return this.httpClient.post<any>(this.userAuthenticationURL, userDetails)
  }



  isFirstTime(userId): any {
    console.log("isFirstTime-isFirstTime")

    let headers = new HttpHeaders().set('Content-Type', 'application/json; charset=utf-8'); // create header object
    // add a new header, creating a new object
    headers = headers.append('angularToken', 'AGToken');
    headers = headers.append('X-Access-Token', sessionStorage.getItem('X-Access-Token'));
    return this.httpClient.post<any>(this.isFirstTimeURL, userId, { headers })
  }



  getCaptcha(): Observable<Captcha> {
    console.log("getCaptcha-getCaptcha")
    let headers = new HttpHeaders().set('Content-Type', 'application/json; charset=utf-8'); // create header object
    // add a new header, creating a new object
    headers = headers.append('angularToken', 'AGToken');
    headers = headers.append('X-Access-Token', sessionStorage.getItem('X-Access-Token'));



    return this.httpClient.get<Captcha>(this.captchaURL, { headers });
  }
  firstTimeChangePasswordService(changePasswordData: ChangePasswordModel): Observable<ChangePasswordModel> {
    console.log("firstTimeChangePasswordService-firstTimeChangePasswordService")
    let headers = new HttpHeaders().set('Content-Type', 'application/json; charset=utf-8'); // create header object
    // add a new header, creating a new object
    headers = headers.append('angularToken', 'AGToken');
    headers = headers.append('X-Access-Token', sessionStorage.getItem('X-Access-Token'));
    return this.httpClient.post<ChangePasswordModel>(this.firstChangePasswordUrl, changePasswordData, { headers });
  }

  changePasswordService(changePasswordData: ChangePasswordModel): Observable<ChangePasswordModel> {
    console.log("changePasswordService-changePasswordService")
    let headers = new HttpHeaders().set('Content-Type', 'application/json; charset=utf-8'); // create header object
    // add a new header, creating a new object
    headers = headers.append('angularToken', 'AGToken');
    headers = headers.append('X-Access-Token', sessionStorage.getItem('X-Access-Token'));
    return this.httpClient.post<ChangePasswordModel>(this.changePasswordUrl, changePasswordData, { headers });
  }


  updateVendorStatus(userIdd) {
    console.log("updateVendorStatus-updateVendorStatus")
    let headers = new HttpHeaders().set('Content-Type', 'application/json; charset=utf-8'); // create header object
    // add a new header, creating a new object
    headers = headers.append('angularToken', 'AGToken');
    headers = headers.append('X-Access-Token', sessionStorage.getItem('X-Access-Token'));

    return this.httpClient.put(this.updateVendorStatusURL, userIdd, { headers });
  }

  getAvailableBids(jsonUserId) {
    console.log("getAvailableBids-getAvailableBids",this.getAvailableBidUrl)
    let headers = new HttpHeaders().set('Content-Type', 'application/json; charset=utf-8'); // create header object
    // add a new header, creating a new object
    headers = headers.append('angularToken', 'AGToken');
    headers = headers.append('X-Access-Token', sessionStorage.getItem('X-Access-Token'));
    return this.httpClient.post(this.getAvailableBidUrl, jsonUserId, { headers });
  }
  getVendorOfferBids(jsonUserId) {
    console.log("getVendorOfferBids-getVendorOfferBids")
    let headers = new HttpHeaders().set('Content-Type', 'application/json; charset=utf-8'); // create header object
    // add a new header, creating a new object
    headers = headers.append('angularToken', 'AGToken');
    headers = headers.append('X-Access-Token', sessionStorage.getItem('X-Access-Token'));

    return this.httpClient.post(this.getVendorOfferBidsUrl, jsonUserId, { headers });
  }

  addBidOffer(addBidOfferData) {
    console.log("addBidOffer-addBidOffer")
    let headers = new HttpHeaders().set('Content-Type', 'application/json; charset=utf-8'); // create header object
    // add a new header, creating a new object
    headers = headers.append('angularToken', 'AGToken');
    headers = headers.append('X-Access-Token', sessionStorage.getItem('X-Access-Token'));

    return this.httpClient.post(this.addBidFormURL, addBidOfferData, { headers })
  }
  updateBidOffer(jsonUpDateData) {
    console.log("updateBidOffer-updateBidOffer")
    let headers = new HttpHeaders().set('Content-Type', 'application/json; charset=utf-8'); // create header object
    // add a new header, creating a new object
    headers = headers.append('angularToken', 'AGToken');
    headers = headers.append('X-Access-Token', sessionStorage.getItem('X-Access-Token'));

    // return this.httpClient.post(jsonUpDateData);
    return this.httpClient.post(this.updateBidFormUrl, jsonUpDateData, { headers });
  }

  getVendorDetails(vendorData) {
    console.log("getVendorDetails-getVendorDetails")
    let headers = new HttpHeaders().set('Content-Type', 'application/json; charset=utf-8'); // create header object
    // add a new header, creating a new object
    headers = headers.append('angularToken', 'AGToken');
    headers = headers.append('X-Access-Token', sessionStorage.getItem('X-Access-Token'));

    return this.httpClient.post(this.getVendorDetailsurl, vendorData, { headers })
  }
  getBidOfferDetails(jsonBidFormRequest) {
    console.log("getBidOfferDetails-getBidOfferDetails",this.getBidFormUrl)
    let headers = new HttpHeaders().set('Content-Type', 'application/json; charset=utf-8'); // create header object
    // add a new header, creating a new object
    headers = headers.append('angularToken', 'AGToken');
    headers = headers.append('X-Access-Token', sessionStorage.getItem('X-Access-Token'));

    return this.httpClient.post(this.getBidFormUrl, jsonBidFormRequest, { headers }).pipe(retry(1));
  }
  getDocumentDetails(jsonDataForGetDocumentDetails) {
    console.log("getDocumentDetails-getDocumentDetails")
    let headers = new HttpHeaders().set('Content-Type', 'application/json; charset=utf-8'); // create header object
    // add a new header, creating a new object
    headers = headers.append('angularToken', 'AGToken');
    headers = headers.append('X-Access-Token', sessionStorage.getItem('X-Access-Token'));

    return this.httpClient.post(this.getDocumentDetailsURL, jsonDataForGetDocumentDetails, { headers });
  }
  downloadDocument(jsonDataForDownloadDocument) {
    console.log("downloadDocument-downloadDocument")
    let headers = new HttpHeaders().set('Content-Type', 'application/json; charset=utf-8'); // create header object
    // add a new header, creating a new object
    headers = headers.append('angularToken', 'AGToken');
    headers = headers.append('X-Access-Token', sessionStorage.getItem('X-Access-Token'));

    return this.httpClient.post(this.downloadDocumentURL, jsonDataForDownloadDocument, { headers })
  }
  viewDocument(jsonDataForGetDocument) {
    console.log("viewDocument-viewDocument")
    let headers = new HttpHeaders().set('Content-Type', 'application/json; charset=utf-8'); // create header object
    // add a new header, creating a new object
    headers = headers.append('angularToken', 'AGToken');
    headers = headers.append('X-Access-Token', sessionStorage.getItem('X-Access-Token'));
    return this.httpClient.post(this.getDocumentURL, jsonDataForGetDocument, { headers });
  }


  historian(jsonData) {
    console.log("historian-historian",this.historianURL);
    let headers = new HttpHeaders().set('Content-Type', 'application/json; charset=utf-8');
    headers = headers.append('angularToken', 'AGToken');
    headers = headers.append('X-Access-Token', sessionStorage.getItem('X-Access-Token'));
    return this.httpClient.post(this.historianURL, jsonData, { headers });
  }
  tr;

  getTransactionDetails(jsonData) {
    console.log("getTransactionDetails-getTransactionDetails");
    let headers = new HttpHeaders().set('Content-Type', 'application/json; charset=utf-8');
    headers = headers.append('angularToken', 'AGToken');
    headers = headers.append('X-Access-Token', sessionStorage.getItem('X-Access-Token'));
    return this.httpClient.post(this.transactionDetailURL, jsonData, { headers });
  }
}



// @Injectable()
// export class MyFirstInterceptor implements HttpInterceptor {
//     constructor() { }
//     intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
//         console.log(JSON.stringify(req));
//         //const token: string = this.currentUserService.token;
//         // if (token) {
//         //     req = req.clone({ headers: req.headers.set('Authorization', 'Bearer ' + token) });
//         // }
//         // if (!req.headers.has('Content-Type')) {
//         //     req = req.clone({ headers: req.headers.set('Content-Type', 'application/json') });
//         // }
//         req = req.clone({ headers: req.headers.set('Accept', 'application/json') });
//         return next.handle(req);
//     }
// }