import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { MatPaginator, MatTableDataSource, MatSort } from '@angular/material';
import { of } from 'rxjs/internal/observable/of';
import { delay } from 'rxjs/operators';
import { DatePipe } from '@angular/common';
import { DataService } from 'src/app/data.service';
import { EnvService } from 'src/app/env.service';
import { HistoryService } from 'src/app/home/history.service'

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.css'],
  providers: [DatePipe]
})
export class HistoryComponent implements OnInit {

  filterForm: FormGroup;
  transactionDetailsForm: FormGroup;
  rangeSelectForm: FormGroup;
  disabled: boolean = true;



  @ViewChild(MatSort)
  set sort(v: MatSort) { this.dataSource.sort = v; }

  @ViewChild(MatPaginator)
  set paginator(v: MatPaginator) { this.dataSource.paginator = v; }

  displayedColumns: string[] = ["transactionType", "transactionId", "transactionTimestamp"];
  public dataSource = new MatTableDataSource();

  tomorrow = new Date();





  constructor(public env: EnvService, private HistoryService: HistoryService, private datePipe: DatePipe, private dataService: DataService) {
    this.dataSource.paginator = this.paginator;
    //this.tomorrow.setDate(this.tomorrow.getDate() + 1);
  }

  contact = this.env.contact;

  ngOnInit() {

    this.rangeSelectForm = new FormGroup({
      'dropdown': new FormControl(''),
      'startDate': new FormControl(''),
      'endDate': new FormControl('')
    })
    this.transactionDetailsForm = new FormGroup({
      'transactiondetailValue': new FormControl('')
    })

  }




  ngAfterViewInit(): void {

    of(this.responseData).pipe(delay(1250)).subscribe(x => {
      this.dataSource.data = this.responseData
    })

    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;

  }



  applyFilter(filterValue: string) {
    filterValue = filterValue.trim();
    filterValue = filterValue.toLowerCase();
    this.dataSource.filter = filterValue;

  }



  emptyDropDownError: boolean = false;

  getRangeData(rangeSelectForm) {
    this.historyerror = true;
    this.dateFormatError = false;
    this.dateEmptyError = false;
    this.greaterDateError = false;
    this.emptyDropDownError = false;
    this.noRecordeFound = false;
    //console.log(rangeSelectForm.value);
    if (rangeSelectForm.value.dropdown == "30days") {
      console.log("30 days call");
      this.RangeCall30Days(rangeSelectForm);

    }
    if (rangeSelectForm.value.dropdown == "90days") {
      console.log("90 days call");
      this.RangeCall90Days(rangeSelectForm);
    }
    if (rangeSelectForm.value.dropdown == "custom") {
      console.log("custom call");
      this.RangeCallCustom(rangeSelectForm);
    }
    if (rangeSelectForm.value.dropdown == "") {
      console.log("emptyDropdown")
      this.emptyDropDownError = true;

    }
  }





  todaysDate;
  changedTodaysDate;
  DateAfter30Days;
  changedDateAfter30Days;
  json30DaysData;
  RangeCall30Days(rangeSelectForm) {
    this.resetTable = false;



    this.todaysDate = new Date();
    //console.log("this.todaysDate", this.todaysDate);
    this.changedTodaysDate = this.transformDate(this.todaysDate);
    //console.log("this.changedTodaysDate", this.changedTodaysDate);
    this.DateAfter30Days = new Date((new Date()).getTime() - 30 * 24 * 60 * 60 * 1000)
    //console.log("this.DateAfter30Days", this.DateAfter30Days);
    this.changedDateAfter30Days = this.transformDate(this.DateAfter30Days);
    //console.log("this.changedDateAfter30Days", this.changedDateAfter30Days);
    this.json30DaysData = {
      "fromDate": this.changedDateAfter30Days,
      "toDate": this.changedTodaysDate
    }
    this.historianService(this.json30DaysData);
  }



  DateAfter90Days;
  changedDateAfter90Days;
  json90DaysData;
  RangeCall90Days(rangeSelectForm) {

    this.resetTable = false;

    this.todaysDate = new Date();
    //console.log("this.todaysDate", this.todaysDate);

    this.changedTodaysDate = this.transformDate(this.todaysDate);
    //console.log("this.changedTodaysDate", this.changedTodaysDate);

    this.DateAfter90Days = new Date((new Date()).getTime() - 90 * 24 * 60 * 60 * 1000)
    //console.log("this.DateAfter90Days", this.DateAfter90Days);
    this.changedDateAfter90Days = this.transformDate(this.DateAfter90Days);
    //console.log("this.changedDateAfter90Days", this.changedDateAfter90Days);
    this.json90DaysData = {
      "fromDate": this.changedDateAfter90Days,
      "toDate": this.changedTodaysDate
    }
    this.historianService(this.json90DaysData);
  }



  //customSearch: boolean = false;
  jsonData;
  formattedCustomStartDate;
  formattedCustomEndDate;
  dateFormatError: boolean = false;
  dateEmptyError: boolean = false;
  greaterDateError: boolean = false;
  RangeCallCustom(rangeSelectForm) {
    this.resetTable = false;

    // console.log("rangeSelectForm", rangeSelectForm.value.startDate);
    // console.log("rangeSelectForm", rangeSelectForm.value.endDate);

    if (rangeSelectForm.value.startDate == null || rangeSelectForm.value.endDate == null) {
      console.log("I am null");
      this.dateFormatError = true;
    } else if (rangeSelectForm.value.startDate == "" || rangeSelectForm.value.endDate == "") {
      this.dateEmptyError = true;
    } else {
      this.formattedCustomStartDate = this.transformDate(rangeSelectForm.value.startDate);
      this.formattedCustomEndDate = this.transformDate(rangeSelectForm.value.endDate);
      //console.log("rangeSelectForm", this.formattedCustomStartDate);
      //console.log("rangeSelectForm", this.formattedCustomEndDate);
      if (new Date(this.formattedCustomStartDate) > new Date(this.formattedCustomEndDate)) {
        this.greaterDateError = true;

      } else if (this.formattedCustomStartDate <= this.formattedCustomEndDate) {

        this.jsonData = {
          "fromDate": this.formattedCustomStartDate,
          "toDate": this.formattedCustomEndDate
        }
        //console.log("this.jsonData", this.jsonData);
        this.historianService(this.jsonData);
      }

    }
  }



  reset() {
    this.historyerror = false;
    this.dateFormatError = false;
    this.dateEmptyError = false;
    this.greaterDateError = false;
    this.emptyDropDownError = false;
    this.noRecordeFound = false;
    this.resetTable = true;
    this.rangeSelectForm.patchValue({
      startDate: "",
      endDate: ""
    })
  }



  responseData;
  noRecordeFound: boolean = false;
  historyerror: boolean = false;
  message;
  error;
  historianService(jsonData) {
    console.log("Dates", jsonData);
    this.dataService.historian(jsonData).subscribe((historianResponse: any) => {
      if (historianResponse) {
        //console.log(historianResponse);
        if (historianResponse.error) {
          this.historyerror = true;
          this.message = historianResponse.error.message + " (StatusCode:" + historianResponse.error.statusCode + ") " + this.contact
          console.log("historianResponse.error", historianResponse.error);
        } else if (historianResponse.length > 0) {
          console.log("Historian response", historianResponse.length);
          this.responseData = historianResponse
          this.dataSource.data = this.responseData;
        } else if (historianResponse.length == 0) {
          this.noRecordeFound = true;
        }
      } else {
        console.log("No response history")
      }

    },
      error => {
        console.log(error.message);
        this.error = error
        this.historyerror = true;
        this.message = error.message + " (StatusCode:" + error.statusCode + ")  " + this.contact
      })
  }



  changedTransactionTypeLastIndex;
  changedTransactionType;
  changeTransactionType(history) {
    this.changedTransactionTypeLastIndex = history.transactionType.lastIndexOf(".");
    this.changedTransactionType = history.transactionType.substr(this.changedTransactionTypeLastIndex + 1);

  }
  // changedTransactionId;
  // changeTransactionId(history){
  //   this.changedTransactionId= history.transactionId.substring(0, 20)
  // }
  localDate;
  changeDate(history) {

    history.transactionTimestamp
    this.localDate = new Date(history.transactionTimestamp);
  }





  transformDate(date) {
    return this.datePipe.transform(date, 'MM/dd/yyyy');
  }


  resetTable: boolean = false;
  selectOnchange(event) {
    this.resetTable = true;
    console.log("evnet on change", event.value)
    if (event.value == "custom") {
      this.reset();
      this.disabled = false;

    }
    if (event.value == "30days" || event.value == "90days") {

      this.disabled = true;
      this.reset();
      this.rangeSelectForm.patchValue({
        startDate: "",
        endDate: ""
      })



    }
  }
  details;
  transactionTypee;
  jsonDataa: any;
  jsonUrlData;
  transactionDetailError: boolean=false;
  errorMessage;
  getTransactionDetails(history) {
    this.transactionDetailError = false;
    //console.log("history.transactionId",history.transactionId);
    //console.log("history.transactionType",history.transactionType);
    this.changeTransactionType(history);
    this.transactionTypee = this.changedTransactionType;
    //console.log("this.transactionTypee",this.transactionTypee);
    this.jsonUrlData = {

      "transactionId": history.transactionId,

      "transactionType": this.transactionTypee

    }


    this.HistoryService.getTransactionDetails(this.jsonUrlData).subscribe((transactionDetailResponse: any) => {
      //console.log("transactionDetailResponse",transactionDetailResponse);
      if (transactionDetailResponse) {

        if (transactionDetailResponse.error) {
          this.transactionDetailError = true;
          this.errorMessage = transactionDetailResponse.error.message + " (StatusCode:" + transactionDetailResponse.error.statusCode + ") " + this.contact
          console.log("transactionDetailResponse.error", transactionDetailResponse.error);
        } else {
          this.jsonDataa = transactionDetailResponse;
        }
      } else {
        console.log("No Response");
      }

    },
      error => {
        console.log(error.message);
        this.error = error
        this.transactionDetailError = true;
        this.errorMessage = error.message + " (StatusCode:" + error.statusCode + ")  " + this.contact
      })


  }
}