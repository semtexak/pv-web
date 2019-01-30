import {Component, OnInit} from '@angular/core';
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
              private applicationContextService: ApplicationContextService) {
  }

  ngOnInit() {
    this.applicationContextService.application.subscribe(app => {
      this.application = app;
      if (app && app.configurations.length > 0) {
        if (app.configurations.length === 1) {
          this.selectService(app.configurations.pop());
        }
      }
    });
  }

  selectService(service: string) {
    console.log(this.application);
    this.router.navigateByUrl(`/plugin/app/${this.application.appId}/${service}`);
  }
}
