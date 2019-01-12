import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'pv-tab',
  templateUrl: './tab.component.html'
})
export class TabComponent {

  @Input() title: string;
  @Input() active: boolean = false;

  constructor() { }

}
