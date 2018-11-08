import {Component, Input, OnInit} from '@angular/core';
import {IMessage} from '../../../model/i-message';

@Component({
  selector: 'pv-alert',
  templateUrl: './alert.component.html'
})
export class AlertComponent {

  @Input() message: IMessage;

  constructor() { }

}
