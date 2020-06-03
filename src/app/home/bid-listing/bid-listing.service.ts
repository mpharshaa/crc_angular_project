import { Injectable } from '@angular/core';
import {DataService} from 'src/app/data.service';
@Injectable({
  providedIn: 'root'
})
export class BidListingService {





  constructor( private dataService: DataService) { }
  getAvailableBids(jsonUserId){
    
    return this.dataService.getAvailableBids(jsonUserId)
  }
 
  getVendorOfferBids(jsonUserId){
    return this.dataService.getVendorOfferBids(jsonUserId);
  }

  addBidOffer(addBidOfferData){
    return this.dataService.addBidOffer(addBidOfferData);
  }
  updateBidOffer(updateData){
//return this.http.put(this.updateBidFormUrl,updateData)
return this.dataService.updateBidOffer(updateData);
  }
  getVendorDetails(vendorData){
return this.dataService.getVendorDetails(vendorData);
  }
  getBidOfferDetails(jsonBidFormRequest){
    //return this.http.get(this.getBidFormUrl+"/"+bidId)
    return this.dataService.getBidOfferDetails(jsonBidFormRequest);
  }
  getDocumentDetails(jsonDataForGetDocumentDetails){
    return this.dataService.getDocumentDetails(jsonDataForGetDocumentDetails)
  }
  downloadDocument(jsonDataForDownloadDocument){
    return this.dataService.downloadDocument(jsonDataForDownloadDocument);
  }

  viewDocument(jsonDataForGetDocument){
    return this.dataService.viewDocument(jsonDataForGetDocument);
  }
}
