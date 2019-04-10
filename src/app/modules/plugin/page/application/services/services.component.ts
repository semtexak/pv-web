import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {ApplicationContextService} from '../../../service/application-context.service';
import {IApplication} from '../../../../../shared/model/base/i-application';

@Component({
  selector: 'pv-services',
  templateUrl: './services.component.html'
})
export class ServicesComponent implements OnInit {

  application: IApplication;

  constructor(private router: Router,
              private route: ActivatedRoute,
              private applicationContextService: ApplicationContextService) {
  }

  ngOnInit() {
    this.applicationContextService.application.subscribe(app => {
      this.application = app;
      if (app && app.configurations.length > 0) {
        const active = app.configurations.filter(config => config.active);
        if (active.length === 1) {
          this.selectService(active[0].type);
        }
      }
    });
  }

  hasService(service: string): boolean {
    return this.application && (this.application.configurations.findIndex(el => el.type === service && el.active) !== -1);
  }

  selectService(service: string) {
    this.router.navigate([service], {relativeTo: this.route});
  }
}
