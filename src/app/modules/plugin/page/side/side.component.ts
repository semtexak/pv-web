import {Component, Input, OnInit} from '@angular/core';
import {IApplication} from '../../../../shared/model/base/i-application';
import {User} from '../../../../shared/model/user';

@Component({
  selector: 'pv-side',
  templateUrl: './side.component.html'
})
export class SideComponent implements OnInit {

  @Input() user: User;
  @Input() application: IApplication;

  constructor() { }

  ngOnInit() {
  }

}
