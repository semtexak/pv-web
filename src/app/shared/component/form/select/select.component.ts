import {Component, Input, OnInit} from '@angular/core';
import {InputComponent} from '../input/input.component';

@Component({
  selector: 'pv-select',
  templateUrl: './select.component.html'
})
export class SelectComponent extends InputComponent implements OnInit {

  @Input() items: Array<any> = [];

  constructor() {
    super();
  }

  ngOnInit() {
  }

}
