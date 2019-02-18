import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'pv-my-account',
  templateUrl: './my-account.component.html'
})
export class MyAccountComponent implements OnInit {

  social = {
    instagram: false,
    google: false,
    facebook: false,
    twitter: false
  };

  constructor() { }

  ngOnInit() {
  }

}
