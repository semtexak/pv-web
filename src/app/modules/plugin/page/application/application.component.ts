import {Component, OnInit} from '@angular/core';
import {ApplicationService} from '../../../../shared/service/application.service';
import {ActivatedRoute} from '@angular/router';
import {IApplication} from '../../../../shared/model/base/i-application';
import {ApplicationContextService} from '../../service/application-context.service';

@Component({
  selector: 'pv-application',
  templateUrl: './application.component.html'
})
export class ApplicationComponent implements OnInit {

  application: IApplication;

  constructor(private route: ActivatedRoute,
              private applicationService: ApplicationService,
              private applicationContextService: ApplicationContextService) {
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      const appId = params['appId'];
      if (appId) {
        this.applicationService.getApplication(appId).subscribe((app: IApplication) => {
          this.application = app;
          this.applicationContextService.application.next(app);
        });
      }
    });
  }

}
