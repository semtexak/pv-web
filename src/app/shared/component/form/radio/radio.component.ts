import { Component, OnInit } from '@angular/core';
import {InputComponent} from '../input/input.component';

@Component({
  selector: 'pv-radio',
  templateUrl: './radio.component.html',
})
export class RadioComponent extends InputComponent implements OnInit {

  constructor() {
    super();
  }

  ngOnInit() {
  }

}
