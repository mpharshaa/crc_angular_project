import { Injectable } from '@angular/core';
import {DataService} from 'src/app/data.service';
@Injectable({
  providedIn: 'root'
})
export class HistoryService {

  constructor( private dataService: DataService) { }

  getTransactionDetails(jsonData){
console.log("this.jsonUrlData",jsonData);
return this.dataService.getTransactionDetails(jsonData);
  }
}
