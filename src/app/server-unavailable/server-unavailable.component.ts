import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-server-unavailable',
  templateUrl: './server-unavailable.component.html',
  styleUrls: ['./server-unavailable.component.css']
})
export class ServerUnavailableComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
  }
goback(){
  this.router.navigate(['login']);
}
}
