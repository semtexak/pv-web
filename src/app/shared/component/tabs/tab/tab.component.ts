import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'pv-tab',
  templateUrl: './tab.component.html'
})
export class TabComponent {

  @Input() title: string;
  @Input() icon: string;
  @Input() active: boolean = false;
  @Input() disabled: boolean = false;
  @Input() activated: boolean = false;

  constructor() { }

}
