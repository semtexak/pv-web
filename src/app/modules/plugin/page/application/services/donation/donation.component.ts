import { Component, OnInit } from '@angular/core';
import {ApplicationContextService} from '../../../../service/application-context.service';
import {IApplication} from '../../../../../../shared/model/base/i-application';
import {Router} from '@angular/router';

@Component({
  selector: 'pv-donation',
  templateUrl: './donation.component.html'
})
export class DonationComponent implements OnInit {

  constructor(private router: Router,
              private applicationContextService: ApplicationContextService) { }

  ngOnInit() {
    this.applicationContextService.application.subscribe((app: IApplication) => {
      const cfg = app.configurations.find(config => config.type === 'donation');
      if (cfg) {

      } else if (!cfg && app.configurations.length > 0) {
        this.router.navigate([`/plugin/app/${app.appId}/${app.configurations.pop().type}`]);
      } else {
        this.router.navigate([`/plugin/app/${app.appId}/no-service-available`]);
      }
    });
  }

}
