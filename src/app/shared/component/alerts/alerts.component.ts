import { Component, OnInit } from '@angular/core';
import {AlertService} from '../../service/alert.service';
import {Observable} from 'rxjs';
import {IMessage} from '../../model/i-message';

@Component({
  selector: 'pv-alerts',
  templateUrl: './alerts.component.html'
})
export class AlertsComponent implements OnInit {

  public messages$: Observable<IMessage[]> = this.alertService.getMessages();

  constructor(private alertService: AlertService) { }

  ngOnInit() {
  }

}
