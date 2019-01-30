import { Component, OnInit } from '@angular/core';
import { Location} from '@angular/common';
import {ApplicationContextService} from '../../../../service/application-context.service';
import {IApplication} from '../../../../../../shared/model/base/i-application';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'pv-donation',
  templateUrl: './donation.component.html'
})
export class DonationComponent implements OnInit {
  select: boolean;

  constructor(private router: Router,
              private route: ActivatedRoute,
              private _location: Location,
              private applicationContextService: ApplicationContextService) { }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.select = params['select'] !== undefined;
      console.log(this.select);
    });
    this.applicationContextService.application.subscribe((app: IApplication) => {
      const cfg = app.configurations.find(config => config.type === 'donation');
      if (cfg) {

      } else if (!cfg && app.configurations.length > 0) {
        this.router.navigate([app.configurations.pop().type], {relativeTo: this.route});
      } else {
        this.router.navigate(['/no-service-available'], {relativeTo: this.route});
      }
    });
  }

  selectDonate() {
    this.router.navigate([], {queryParams: {select: true}, relativeTo: this.route});
  }

  goBack() {
  }

}
