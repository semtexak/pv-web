import {Component, OnInit} from '@angular/core';
import {ApplicationService} from '../../../../shared/service/application.service';
import {ActivatedRoute} from '@angular/router';
import {IApplication} from '../../../../shared/model/base/i-application';
import {ApplicationContextService} from '../../service/application-context.service';
import {AuthenticationService} from '../../../../shared/service/authentication.service';
import {User} from '../../../../shared/model/user';
import {FormBuilder, FormGroup} from '@angular/forms';
import {IOrder, Status} from '../../../../shared/model/base/i-order';

@Component({
  selector: 'pv-application',
  templateUrl: './application.component.html'
})
export class ApplicationComponent implements OnInit {

  application: IApplication;
  order: IOrder;
  formDisabled: boolean = false;
  user: User;
  form: FormGroup;

  constructor(private route: ActivatedRoute,
              private authenticationService: AuthenticationService,
              private applicationService: ApplicationService,
              private applicationContextService: ApplicationContextService,
              private formBuilder: FormBuilder) {
    this.form = this.formBuilder.group({
      'use-remembered-card': [true, null],
      'auto-renew': [false, null]
    });
  }

  ngOnInit() {
    this.authenticationService.loggedUser.subscribe((user: User) => this.user = user);
    this.applicationContextService.order.subscribe((order: IOrder) => {
      this.order = order;
      this.formDisabled = order.status === Status.PAID;
      this.toggleDisabledState(this.formDisabled);
    });
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

  onSubmit(data): void {
    if (this.form.valid) {
      console.log(data);
    }
  }

  toggleDisabledState(disabled: boolean) {
    for (const controlKey of Object.keys(this.form.controls)) {
      if (controlKey !== 'active' && controlKey !== 'type') {
        if (disabled) {
          this.form.controls[controlKey].disable();
        } else {
          this.form.controls[controlKey].enable();
        }

      }
    }
  }

}
