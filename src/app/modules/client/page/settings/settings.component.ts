import {Component, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {TabsComponent} from '../../../../shared/component/tabs/tabs.component';
import {ActivatedRoute} from '@angular/router';
import {ApplicationService} from '../../../../shared/service/application.service';
import {TabComponent} from '../../../../shared/component/tabs/tab/tab.component';
import {IApplication} from '../../../../shared/model/base/i-application';

@Component({
  selector: 'pv-settings',
  templateUrl: './settings.component.html'
})
export class SettingsComponent implements OnInit {

  form: FormGroup;
  donationForm: FormGroup;
  subscriptionForm: FormGroup;
  paidContentForm: FormGroup;
  appId: string;
  @ViewChild('tabs') tabs: TabsComponent;
  activeTab: TabComponent;
  application: IApplication = null;

  constructor(private formBuilder: FormBuilder,
              private route: ActivatedRoute,
              private applicationService: ApplicationService) {
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      if (params['appId']) {
        this.appId = params['appId'];
        console.log(this.appId);
        this.applicationService.getApplication(this.appId).subscribe((application: IApplication) => {
          this.application = application;
          this.setDefaults(this.application.configurations);
          console.log(this.application);
        });
      }
    });
    this.donationForm = this.formBuilder.group({
      'type': ['donation', Validators.compose([Validators.required])],
      'debug': [false, Validators.compose([Validators.required])],
      'active': [false, Validators.compose([Validators.required])],
      '_enabled': [false, Validators.compose([Validators.required])],
    });
    this.subscriptionForm = this.formBuilder.group({
      'type': ['subscription', Validators.compose([Validators.required])],
      'debug': [false, Validators.compose([Validators.required])],
      'active': [false, Validators.compose([Validators.required])],
      'checkOnLoad': [true, Validators.compose([Validators.required])],
      'popupOnLoad': [false, Validators.compose([Validators.required])],
      'closable': [false, Validators.compose([Validators.required])],
      '_enabled': [false, Validators.compose([Validators.required])],
    });
    this.paidContentForm = this.formBuilder.group({
      'type': ['paid-content', Validators.compose([Validators.required])],
      'debug': [false, Validators.compose([Validators.required])],
      'active': [false, Validators.compose([Validators.required])],
      '_enabled': [false, Validators.compose([Validators.required])],
    });
    this.form = this.formBuilder.group({
      'donation': this.donationForm,
      'subscription': this.subscriptionForm,
      'paid-content': this.paidContentForm
    });
  }

  onSubmit(values) {
    const form = values[this.activeTab.type];
    if (form) {
      this.applicationService.addServicesToApplication(this.appId, form).subscribe(data => {
        console.log(data);
      });
    }
  }

  setDefaults(values: Array<any>) {
    console.log(values);
    for (const config of values) {
      for (const key of Object.keys(config)) {
        console.log(`Setting field ${key} with value ${config[key]} -> ${this.form.controls[config.type]}`);
        if (this.form.controls[config.type].get(key)) {
          this.form.controls[config.type].get(key).setValue(config[key]);
        }
      }
      // this.form.controls[config.type];
      console.log(this.form.controls[config.type]);
    }
  }

  onTabChange(tab: TabComponent) {
    this.activeTab = tab;
  }
}
