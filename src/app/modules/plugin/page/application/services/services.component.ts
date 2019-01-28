import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {ApplicationContextService} from '../../../service/application-context.service';
import {IApplication} from '../../../../../shared/model/base/i-application';

@Component({
  selector: 'pv-services',
  templateUrl: './services.component.html'
})
export class ServicesComponent implements OnInit {

  application: IApplication;

  constructor(private router: Router,
              private applicationContextService: ApplicationContextService) { }

  ngOnInit() {
    this.applicationContextService.application.subscribe(app => console.log(app));
  }

}
