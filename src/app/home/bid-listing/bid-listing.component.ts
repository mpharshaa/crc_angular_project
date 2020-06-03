import { Component, OnInit, ViewChild } from '@angular/core';
import { BidListingService } from 'src/app/home/bid-listing/bid-listing.service';
import { DatePipe } from '@angular/common';
import { NgxSpinnerService } from 'ngx-spinner';
import { FormGroup, FormControl } from '@angular/forms';
import { EnvService } from 'src/app/env.service';
import * as $ from 'jquery';
declare var $: any;

import { MatPaginator, MatTableDataSource, MatSort } from '@angular/material';
import { of } from 'rxjs/internal/observable/of';
import { delay } from 'rxjs/operators';


@Component({
  selector: 'app-bid-listing',
  templateUrl: './bid-listing.component.html',
  styleUrls: ['./bid-listing.component.css'],
  providers: [DatePipe]
})

export class BidListingComponent implements OnInit {

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
  userId = sessionStorage.getItem("userId");
  jsonUserId = {
    "vendorEmail": this.userId
  }


  loadingText = this.env.loadingText;
  noBidsAvailableError = this.env.noBidsAvailableError;
  contact=this.env.contact;

  constructor(public env: EnvService, private BidListingService: BidListingService, private datePipe: DatePipe, private spinner: NgxSpinnerService) {
    this.dataSource.paginator = this.paginator;
  }


  ngOnInit() {
    this.loadAvailableBids();


    var date = new Date();

    this.currentDate = this.datePipe.transform(date, 'MM/dd/yyyy');


    this.customerBidForm = new FormGroup({
      'orgName': new FormControl(''),
      'case': new FormControl(''),
      'customerBid': new FormControl(''),
      'uom': new FormControl(''),
      'customerNo': new FormControl(''),
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

  }


  applyFilter(filterValue: string) {
    filterValue = filterValue.trim();
    filterValue = filterValue.toLowerCase();
    this.dataSource.filter = filterValue;

  }


  loadAvailableBids() {
    this.availableBids(this.jsonUserId);
  }






  areAvailableBidsAvailable: boolean = false;
  availableBids(jsonUserId) {
    console.log("availableBids");
    return this.BidListingService.getAvailableBids(jsonUserId).subscribe((availableBidsresponse: any) => {
      if (availableBidsresponse) {
       // console.log("availableBidsresponse", availableBidsresponse);
        if (availableBidsresponse.error) {
          console.log("availableBidsresponse.error", availableBidsresponse.error);
          this.errorMessage = true;
          this.message = availableBidsresponse.error.message + " (StatusCode:" + availableBidsresponse.error.statusCode + ")  "+this.contact

        } else if (availableBidsresponse.length > 0) {

          this.Bids = availableBidsresponse;
          this.dataSource.data = this.Bids;
        }
        else {
          console.log("No AvailableBids");
          this.areAvailableBidsAvailable = true;
        }
      } else {
        console.log("No Response from service")
      }
    },
      error => {
        console.log(error.message);
        this.error = error
        this.errorMessage = true;
        this.message = error.message + " (StatusCode:" + error.statusCode + ")  "+this.contact
      })
  }





  jsonVendordetailsRequest
  jsonBidFormDetailsRequest
  errorMessageInBidForm: boolean = false;
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
  LeadComment
  Norm;
  NormFlag;
  NormComment
  Other;
  OtherFlag;
  OtherComment;
  UOM;

  //
  locationDetails
  orgName
  caseNumber
  //
  equipDescription
  BidNumber;






  getBidForm(bidNumber) {
    console.log("getbidform");
    this.errorMessageInBidForm = false;
    this.customerBidError = false;
    this.reset();
    this.spinner.show("sp2");
    this.BidNumber = bidNumber;
    this.jsonVendordetailsRequest = {
      "vendorEmail": this.userId
    }

    this.BidListingService.getVendorDetails(this.jsonVendordetailsRequest).subscribe((getVendorDetailsresponse: any) => {
      if (getVendorDetailsresponse) {
        //console.log("getVendorDetailsresponse", getVendorDetailsresponse);
        if (getVendorDetailsresponse.error) {
          this.spinner.hide("sp2");
          this.message = getVendorDetailsresponse.error.message + " (StatusCode:" + getVendorDetailsresponse.error.statusCode + ") "+this.contact
          this.errorMessageInBidForm = true;
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
                  console.log("bidOfferDetailsResponse.error", bidOfferDetailsResponse.error)
                  this.spinner.hide("sp2");
                  this.message = bidOfferDetailsResponse.error.message + " (StatusCode:" + bidOfferDetailsResponse.error.statusCode + ") "+this.contact
                  this.errorMessageInBidForm = true;

                } else if (bidOfferDetailsResponse.InvMetadata) {


                  if (bidOfferDetailsResponse.InvMetadata.length > 0) {

                    this.spinner.hide("sp2");
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
                      customerBid: "",
                      uom: this.UOM,
                      customerNo: this.customerNo,
                    })
                  } else {
                    console.log("No location Data");
                  }

                  if (bidOfferDetailsResponse.Inventory.length > 0) {
                    this.equipDescription = bidOfferDetailsResponse.Inventory;
                  } else {
                    console.log("No Inventory Data");
                  }

                } else {
                  console.log("No data is there in the response")
                }
              } else {
                console.log("No Response from getBidOfferDetails")
              }
            },
              error => {
                console.log(error.message );
                this.spinner.hide("sp2");
                this.error = error
                this.message = error.message + " (StatusCode:" + error.statusCode + ")  "+this.contact
                this.errorMessageInBidForm = true;

              })
          }
        } else if (getVendorDetailsresponse.code) {
          this.spinner.hide("sp2");
          console.log("getVendorDetailsresponse.code");
        }

      } else {
        console.log("No Reponse from getVendorDetails");
      }



    },
      error => {
        console.log(error.message);
        this.spinner.hide("sp2");
        this.error = error
        this.message = error.message + " (StatusCode:" + error.statusCode + ")  "+this.contact
        this.errorMessageInBidForm = true;

      });




  }






  reset() {
    this.customerBidForm.reset();
    //$("table").children().remove()
    this.LLLForm.reset();
    this.descriptionForm.reset();
    this.VendorDetailsForm.reset();
    this.pointOfContactForm.reset();
  }



  addBidOfferData;
  customerBidError: Boolean = false;
  count;
  bidOfferConfirmation;




  addBidOffer(customerBidForm) {
    console.log("addbidoffer");

    if (customerBidForm.value.customerBid > 0) {

      this.spinner.show("sp2");
      this.addBidOfferData = {
        "bidNumber": this.BidNumber,
        "vendorEmail": this.userId,
        "bidOfferAmount": +customerBidForm.value.customerBid

      }
      this.count = 0;

      return this.BidListingService.addBidOffer(this.addBidOfferData).subscribe((res: any) => {
        if (res) {
         // console.log("res", res);
          if (res.error) {
            console.log("addBidOffer-res.error"+res.error);
            this.spinner.hide("sp2");
            this.message = res.error.message + " (StatusCode:" + res.error.statusCode + ") "+this.contact
            this.customerBidError = true;
          } else if (res.bidOfferConfirmation) {
            this.spinner.hide("sp2");
            this.bidOfferConfirmation = res.bidOfferConfirmation;
            this.showModal();
          }
        } else {
          console.log("response is not coming")
        }

      },
        error => {
          console.log(error.message)
          this.error = error
          this.message = error.message + " (StatusCode:" + error.statusCode + ")  "+this.contact
          this.errorMessage = true;


        }
      )
    } else {
      this.customerBidError = true;
      this.message = "CustomerBid cannot be empty or negative"
      console.log("customer bid lessthan zero") 
    }
  }


  showModal() {
    (<any>$("#ShowSuccessModal")).modal('show');
  }




  closeModal() {
    this.ngOnInit();
    this.loadAvailableBids();
    (<any>$("#BidFormEditModal")).modal('hide');



  }


}
