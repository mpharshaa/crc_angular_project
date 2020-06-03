
import { BidListingService } from 'src/app/home/bid-listing/bid-listing.service';
import { DatePipe } from '@angular/common';
import { NgxSpinnerService } from 'ngx-spinner';
import { saveAs } from 'file-saver';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { EnvService } from 'src/app/env.service';
import * as $ from 'jquery';
declare var $: any;
import { MatPaginator, MatTableDataSource, MatSort } from '@angular/material';
import { of } from 'rxjs/internal/observable/of';
import { delay } from 'rxjs/operators';



















@Component({
  selector: 'app-edit-bid-listing',
  templateUrl: './edit-bid-listing.component.html',
  styleUrls: ['./edit-bid-listing.component.css'],
  providers: [DatePipe]
})
export class EditBidListingComponent implements OnInit {


  customerBidForm: FormGroup;
  LLLForm: FormGroup;
  descriptionForm: FormGroup;
  VendorDetailsForm: FormGroup;
  pointOfContactForm: FormGroup;



  @ViewChild(MatSort)
  set sort(v: MatSort) { this.dataSource.sort = v; }

  @ViewChild(MatPaginator)
  set paginator(v: MatPaginator) { this.dataSource.paginator = v; }

  displayedColumns: string[] = ["bidNumber", "orgName", "bidCloseDate", "details", "offer"];
  public dataSource = new MatTableDataSource();






  Bids: any = [];
  VendorOfferBids: any = [];
  cannotEdit: boolean = false;
  currentDate;
  error;
  message;
  errorMessage: boolean = false;
  errorMessageInBidForm: boolean = false;
  userId = sessionStorage.getItem("userId");
  jsonUserId = {
    "vendorEmail": this.userId
  }


  loadingText = this.env.loadingText;
  noBidsAvailableError = this.env.noBidsAvailableError;
  contact=this.env.contact;



  phoneForm: FormGroup;
  constructor(public env: EnvService, private BidListingService: BidListingService, private datePipe: DatePipe, private spinner: NgxSpinnerService) {
    this.dataSource.paginator = this.paginator;
  }

  ngOnInit() {

    this.loadVendorOfferBids();
    var date = new Date();
    this.currentDate = this.datePipe.transform(date, 'MM/dd/yyyy');




    this.customerBidForm = new FormGroup({
      'orgName': new FormControl(''),
      'case': new FormControl(''),
      'customerBid': new FormControl(''),
      'uom': new FormControl(''),
      'customerNo': new FormControl('')
    });

    this.LLLForm = new FormGroup({
      'location': new FormControl(''),
      'Lat': new FormControl(''),
      'Long': new FormControl('')
    });

    this.descriptionForm = new FormGroup({
      'Description': new FormControl(''),
      'Joints': new FormControl(''),
      'Footage': new FormControl(''),
      'Each': new FormControl('')
    })

    this.VendorDetailsForm = new FormGroup({
      'companyCity': new FormControl(''),
      'companyName': new FormControl(''),
      'companyState': new FormControl(''),
      'companyStreetAddress': new FormControl(''),
      'companyZip': new FormControl(''),
      'vendorTIN': new FormControl(''),
      'vendorEmail': new FormControl(''),
      'vendorPhone': new FormControl(''),
      'vendorContactName': new FormControl(''),
    })

    this.pointOfContactForm = new FormGroup({
      "BidCloseDate": new FormControl(''),
      "FieldContact": new FormControl('')
    })
  }

  ngAfterViewInit(): void {

    of(this.Bids).pipe(delay(1250)).subscribe(x => {
      this.dataSource.data = this.Bids
    })

    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;

    $('.modal-child').on('show.bs.modal', function () {
      var modalParent = $(this).attr('data-modal-parent');
      $(modalParent).css('opacity', 0);
    });

    $('.modal-child').on('hidden.bs.modal', function () {
      var modalParent = $(this).attr('data-modal-parent');
      $(modalParent).css('opacity', 1);
    });



  }


  applyFilter(filterValue: string) {
    filterValue = filterValue.trim();
    filterValue = filterValue.toLowerCase();
    this.dataSource.filter = filterValue;

  }




  loadVendorOfferBids() {
    this.vendorOfferBids(this.jsonUserId);
  }




  areVendorOfferBidsAvailable: boolean = false;
  vendorOfferBids(jsonUserIdforVendorOfferBids) {
    console.log("vendorOfferBids");
    return this.BidListingService.getVendorOfferBids(jsonUserIdforVendorOfferBids).subscribe((VendorOfferBids: any) => {
      if (VendorOfferBids) {
        //console.log("VendorOfferBids"+VendorOfferBids);
        if (VendorOfferBids.error) {
          console.log("VendorOfferBids.error", VendorOfferBids.error);
          this.message = VendorOfferBids.error.message + " (StatusCode:" + VendorOfferBids.error.statusCode + ") "+this.contact
     
          this.errorMessage = true;
        } else if (VendorOfferBids.length > 0) {
          this.VendorOfferBids = VendorOfferBids;
          this.dataSource.data = this.VendorOfferBids;

        } else {
          console.log("No My Bids");
          this.areVendorOfferBidsAvailable = true;
        }
      } else {
        console.log("response is not coming")
      }
    },
      error => {
        console.log(error.message);
        this.error = error
        this.message = error.message + " (StatusCode:" + error.statusCode + ") "+this.contact
        this.errorMessage = true;

      })
  }

















  jsonVendordetailsRequest
  jsonBidFormDetailsRequest
  //VendorDetails
  companyCity;
  companyName;
  companyState;
  companyStreetAddress;
  companyZip;
  vendorTIN;
  vendorEmail;
  vendorPhone;
  vendorContactName;
  customerNo;



  //InvMetadata
  Asbestos;
  AsbestosFlag;
  AsbestosComment;
  BidCloseDate;
  FieldContact;
  Lead;
  LeadFlag;
  LeadComment;
  Norm;
  NormFlag;
  NormComment;
  Other;
  OtherFlag;
  OtherComment;
  UOM;

  //InvBid
  bidOfferAmount;



  //
  locationDetails
  orgName
  caseNumber
  //
  equipDescription
  BidNumber;




  getBidForm(bidNumber) {
    console.log("getBidForm");
    this.errorMessageInBidForm = false;
    this.customerBidError = false;
    this.reset();
    this.spinner.show('sp2');

    this.BidNumber = bidNumber;
    this.jsonVendordetailsRequest = {
      "vendorEmail": this.userId
    }

    this.BidListingService.getVendorDetails(this.jsonVendordetailsRequest).subscribe((getVendorDetailsresponse: any) => {
      if (getVendorDetailsresponse) {
        if (getVendorDetailsresponse.error) {
          this.message = getVendorDetailsresponse.error.message + " (StatusCode:" + getVendorDetailsresponse.error.statusCode + ") "+this.contact;
          this.errorMessageInBidForm = true;
          this.spinner.hide("sp2")
        } else if (getVendorDetailsresponse.customerNo) {

          this.companyCity = getVendorDetailsresponse.companyCity;
          this.companyName = getVendorDetailsresponse.companyName;
          this.companyState = getVendorDetailsresponse.companyState;
          this.companyStreetAddress = getVendorDetailsresponse.companyStreetAddress;
          this.companyZip = getVendorDetailsresponse.companyZip;
          this.vendorTIN = getVendorDetailsresponse.vendorTIN;
          this.vendorEmail = getVendorDetailsresponse.vendorEmail;
          this.vendorPhone = getVendorDetailsresponse.vendorPhone;
          this.vendorContactName = getVendorDetailsresponse.vendorContactName;
          this.customerNo = getVendorDetailsresponse.customerNo;
          this.VendorDetailsForm.patchValue({
            companyName: this.companyName,
            vendorContactName: this.vendorContactName,
            vendorTIN: this.vendorTIN,
            companyStreetAddress: this.companyStreetAddress,
            companyState: this.companyState,
            companyCity: this.companyCity,
            companyZip: this.companyZip,
            vendorEmail: this.vendorEmail,
            vendorPhone: this.vendorPhone
          })
          if (this.customerNo) {
            this.jsonBidFormDetailsRequest = {
              "bidNumber": bidNumber,
              "vendorEmail": this.userId,
              "customerNo": this.customerNo
            }
            this.BidListingService.getBidOfferDetails(this.jsonBidFormDetailsRequest).subscribe((bidOfferDetailsResponse: any) => {
              if (bidOfferDetailsResponse) {
                //console.log("bidOfferDetailsResponse", bidOfferDetailsResponse);
                if (bidOfferDetailsResponse.error) {
                  console.log("bidOfferDetailsResponse.error", bidOfferDetailsResponse.error);
                  this.message = bidOfferDetailsResponse.error.message + " (StatusCode:" + bidOfferDetailsResponse.error.statusCode + ") "+this.contact
                  this.errorMessageInBidForm = true;
                  this.spinner.hide("sp2");
                } else if (bidOfferDetailsResponse.InvMetadata) {
                  this.spinner.hide("sp2")
                  this.bidOfferAmount = bidOfferDetailsResponse.InvBid[0].CustomerBid;
                  if (bidOfferDetailsResponse.InvMetadata.length > 0) {

                    this.Asbestos = bidOfferDetailsResponse.InvMetadata[0].Asbestos;
                    this.Lead = bidOfferDetailsResponse.InvMetadata[0].Led;
                    this.Norm = bidOfferDetailsResponse.InvMetadata[0].Norm;
                    this.Other = bidOfferDetailsResponse.InvMetadata[0].Other;
                    this.BidCloseDate = bidOfferDetailsResponse.InvMetadata[0].BidCloseDate;
                    this.UOM = bidOfferDetailsResponse.InvMetadata[0].UOM;
                    this.FieldContact = bidOfferDetailsResponse.InvMetadata[0].FieldContact;
                    this.AsbestosComment = bidOfferDetailsResponse.InvMetadata[0].AsbestosComment;
                    this.LeadComment = bidOfferDetailsResponse.InvMetadata[0].LedComment;
                    this.NormComment = bidOfferDetailsResponse.InvMetadata[0].NormComment;
                    this.OtherComment = bidOfferDetailsResponse.InvMetadata[0].OtherComment;

                    this.pointOfContactForm.patchValue({
                      BidCloseDate: this.BidCloseDate,
                      FieldContact: this.FieldContact
                    })
                    if (bidOfferDetailsResponse.InvMetadata[0].Asbestos == "YES") {
                      this.AsbestosFlag = true;
                    } else {
                      this.AsbestosFlag = false;
                    }
                    if (bidOfferDetailsResponse.InvMetadata[0].Led == "YES") {
                      this.LeadFlag = true;
                    } else {
                      this.LeadFlag = false;
                    }
                    if (bidOfferDetailsResponse.InvMetadata[0].Norm == "YES") {
                      this.NormFlag = true;
                    } else {
                      this.NormFlag = false;
                    }
                    if (bidOfferDetailsResponse.InvMetadata[0].Other == "YES") {
                      this.OtherFlag = true;
                    } else {
                      this.OtherFlag = false;
                    }

                  } else {
                    this.spinner.hide("sp2");
                    console.log("No InvMetadata")
                  }
                  if (bidOfferDetailsResponse.Location.length > 0) {
                    this.locationDetails = bidOfferDetailsResponse.Location;
                    this.orgName = bidOfferDetailsResponse.Location[0].OrgName;
                    this.caseNumber = bidOfferDetailsResponse.Location[0].CaseNumber;
                    this.customerBidForm.patchValue({
                      orgName: this.orgName,
                      case: this.caseNumber,
                      customerBid: this.bidOfferAmount,
                      uom: this.UOM,
                      customerNo: this.customerNo
                    })
                  } else {
                    console.log("No location data");
                  }
                  if (bidOfferDetailsResponse.Inventory.length > 0) {
                    this.equipDescription = bidOfferDetailsResponse.Inventory;
                  } else {
                    console.log("No Inventory data");
                  }

                }
              } else {
                console.log("No response from the service")
              }

            },
              error => {
                console.log(error.message)
                this.error = error
                this.message = error.message + " (StatusCode:" + error.statusCode + ") "+this.contact
                this.errorMessageInBidForm = true;
                this.spinner.hide("sp2");
              })
          } else {
            console.log('No customer number')
          }
        } else if (getVendorDetailsresponse.code) {
          this.spinner.hide("sp2");
          console.log(getVendorDetailsresponse.code);
        }
      } else {
        console.log("No Response from service")
      }
    },
      error => {
        console.log(error.message);
        this.error = error
        this.message = error.message + " (StatusCode:" + error.statusCode + ") "+this.contact
        this.errorMessageInBidForm = true;
        this.spinner.hide("sp2");
      });




  }





  reset() {
    this.customerBidForm.reset();
    this.LLLForm.reset();
    this.descriptionForm.reset();
    this.VendorDetailsForm.reset();
    this.pointOfContactForm.reset();
  }









  showModal() {
    (<any>$("#ShowSuccessModal")).modal('show');
  }




  closeModal() {
    this.ngOnInit();
    // this.imagePath = "";
    this.loadVendorOfferBids();
    (<any>$("#BidFormUpdateModal")).modal('hide');
    (<any>$("#BidFormViewModal")).modal('hide');
  }





  count;
  updateData;
  bidOfferConfirmation;
  customerBidError
  updateBidOffer(customerBidForm) {
    console.log("updateBidOffer");
    if (customerBidForm.value.customerBid > 0) {
      this.spinner.show('sp2');
      this.updateData = {
        "bidNumber": this.BidNumber,
        "vendorEmail": this.userId,
        "bidOfferAmount": +customerBidForm.value.customerBid

      }

      this.count = 1;

      return this.BidListingService.updateBidOffer(this.updateData).subscribe((res: any) => {

        if (res) {
          //console.log("res", res);
          if (res.error) {
            console.log("updateBidOffer-res.error", res.error);
            this.message = res.error.message + " (StatusCode:" + res.error.statusCode + ") "+this.contact
            this.customerBidError = true;
            this.spinner.hide('sp2');
          } else if (res.bidOfferConfirmation) {
            this.spinner.hide('sp2');
            this.bidOfferConfirmation = res.bidOfferConfirmation;
            this.showModal();
          }

        } else {
          console.log("No response from the service")
        }
      },
        error => {
          console.log(error.message);
          this.error = error
          this.message = error.message.substring(0, 21);
          this.errorMessage = true;

        })
    } else {
      console.log('customer bid is lessthan zero')
      this.customerBidError = true;
      this.message = "CustomerBid cannot be empty or negative"
    }
  }

  jsonDataForGetDocumentDetails;
  responseForGetDocumentDetails;
  noFiles: boolean = false;
  getDocumentError:boolean = false;
  getDocumentDetails() {
    this.noFiles=false;
    this.getDocumentError = false;
    this.downloadDocumentError=false;
    console.log("getDocumentDetails");
    this.jsonDataForGetDocumentDetails = {
      "bidNumber": this.BidNumber,
      "vendorEmail": this.vendorEmail
    }
    return this.BidListingService.getDocumentDetails(this.jsonDataForGetDocumentDetails).subscribe((res: any) => {
      //console.log("res",res);
      if (res) {
        //console.log("res",res);
        if (res.error) {
          console.log("getDocumentDetails-res.error",res.error);
          this.message = res.error.message + " (StatusCode:" + res.error.statusCode + ") "+this.contact

          this.getDocumentError = true;
        } else if (res.length > 0) {
          this.responseForGetDocumentDetails = res;
        } else {
          this.noFiles = true;
        }
      } else {
        console.log("No response")

      }
    }, error => {
      console.log(error.message);
      this.error = error
      this.message = error.message + " (StatusCode:" + error.statusCode + ") "+this.contact
      this.getDocumentError = true;

    })

  }

  jsonDataForDownloadDocument;

  downloadDocumentError:boolean=false;
  downloadDocument(attId) {
    this.downloadDocumentError=false;
    console.log("Download document");
    this.jsonDataForDownloadDocument = {
      "attId": attId,
      "bidNumber": this.BidNumber,
      "vendorEmail": this.vendorEmail
    }
    return this.BidListingService.downloadDocument(this.jsonDataForDownloadDocument).subscribe((res: any) => {
      if (res) {
        //console.log("res",res);
        if (res.error) {
          console.log("downloadDocument-res.error",res.error);
          this.message = res.error.message + " (StatusCode:" + res.error.statusCode + ") "+this.contact
          this.downloadDocumentError = true;
        } else if (res.attFile) {
          var blob = this.base64ToBlob(res.attFile, res.attMimeType);
          saveAs(blob, res.attName);
        } else {
          console.log("response other than error and actual");
        }

      } else {
        console.log("No response")
      }

    }, error => {
      console.log(error.message);
      this.error = error
      this.message =error.message + " (StatusCode:" + error.statusCode + ") "+this.contact
      this.errorMessage = true;

    })
  }




  public base64ToBlob(b64Data, contentType = '', sliceSize = 512) {
    console.log("base64ToBlob");
    b64Data = b64Data.replace(/\s/g, ''); //IE compatibility...
    let byteCharacters = atob(b64Data);
    let byteArrays = [];
    for (let offset = 0; offset < byteCharacters.length; offset += sliceSize) {
      let slice = byteCharacters.slice(offset, offset + sliceSize);

      let byteNumbers = new Array(slice.length);
      for (var i = 0; i < slice.length; i++) {
        byteNumbers[i] = slice.charCodeAt(i);
      }
      let byteArray = new Uint8Array(byteNumbers);
      byteArrays.push(byteArray);
    }
    return new Blob(byteArrays, { type: contentType });

  }

  imageToShow: any;
  isImageLoading: boolean;



  file;
  jsonDataForGetDocument;
  viewDocumentError;
  getImageFromService(attId) {
    this.viewDocumentError=false;
    console.log("getImageFromService");
    this.isImageLoading = true;
    this.jsonDataForGetDocument = {
      "attId": attId,
      "bidNumber": this.BidNumber,
      "vendorEmail": this.vendorEmail
    }
    this.BidListingService.viewDocument(this.jsonDataForGetDocument).subscribe((res: any) => {

      if (res) {
        //console.log("res",res)
        if (res.error) {
          console.log("viewDocument-res.error",res.error)
          this.message = res.error.message + " (StatusCode:" + res.error.statusCode + ") "+ this.contact
          this.viewDocumentError = true;
          this.isImageLoading = false;
        } else if (res.attFile) {
          var file = this.base64ToBlob(res.attFile, res.attMimeType);
          var fileURL = window.URL.createObjectURL(file);
          window.open(fileURL);
        } else {
          console.log("other than response and error");
        }

      } else {
        console.log("No response");
      }

    }, error => {
      console.log(error.message);
      this.error = error.message + " (StatusCode:" + error.statusCode + ") "+this.contact
      this.isImageLoading = false;
    });

  }










}
