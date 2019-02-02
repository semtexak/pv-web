import {Component, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {TabsComponent} from '../../../../shared/component/tabs/tabs.component';
import {ActivatedRoute} from '@angular/router';
import {ApplicationService} from '../../../../shared/service/application.service';
import {TabComponent} from '../../../../shared/component/tabs/tab/tab.component';
import {IApplication} from '../../../../shared/model/base/i-application';
import {Title} from '@angular/platform-browser';
import {HttpResponse} from '@angular/common/http';
import {AlertService} from '../../../../shared/service/alert.service';

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

  initFormData = [
    {
      type: 'donation',
      debug: false,
      active: false
    },
    {
      type: 'subscription',
      debug: false,
      active: false
    },
    {
      type: 'paid-content',
      debug: false,
      active: false
    }
  ];

  constructor(private formBuilder: FormBuilder,
              private route: ActivatedRoute,
              private titleService: Title,
              private alertService: AlertService,
              private applicationService: ApplicationService) {
    this.titleService.setTitle('Nastavení stránky');
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.initForm();
      if (params['appId']) {
        this.appId = params['appId'];
        this.setDefaults(this.initFormData, 'INIT');
        this.loadData();
      }
    });
  }

  loadData() {
    this.applicationService.getApplication(this.appId).subscribe((application: IApplication) => {
      this.application = application;
      if (this.application && this.application.configurations.length > 0) {
        this.setDefaults(this.application.configurations, 'LOAD');
      }
    });
  }

  onSubmit(values) {
    const form = values[this.activeTab.type];
    if (form) {
      console.log(form);
      this.applicationService.addServicesToApplication(this.appId, form).subscribe((response: HttpResponse<any>) => {
        if (response.status === 200) {
          this.alertService.success('Nastavení bylo úspěšně uloženo.');
          this.loadData();
        }
      });
    }
  }

  setDefaults(values: Array<any>, source: string) {
    console.log(`---------- ${source} ----------`);
    for (const item of values) {
      console.log(item.type);
      const subForm = this.form.controls[item.type];
      if (this.tabs.tabs) {
        const tabByType: TabComponent = this.tabs.tabs.find(tab => tab.type === item.type);
        tabByType.activated = item.active;
      }
      for (const valKey of Object.keys(item)) {
        const control = subForm.get(valKey);
        if (control) {
          control.patchValue(item[valKey]);
          // console.log(`Form: ${item.type}, valKey: ${valKey}`);
        }
      }
    }
  }

  onTabChange(tab: TabComponent) {
    this.activeTab = tab;
  }

  toggleDisabledState(value: boolean) {
    console.log(value);
    const form = this.form.controls[this.activeTab.type];
    if (form) {
      const controls = form['controls'];
      for (const controlKey of Object.keys(controls)) {
        if (controlKey !== 'active' && controlKey !== 'type') {
          if (value) {
            controls[controlKey].enable();
          } else {
            controls[controlKey].disable();
          }

        }
      }
    }
  }

  private initForm() {
    this.donationForm = this.formBuilder.group({
      'type': ['donation', Validators.compose([Validators.required])],
      'debug': [null, Validators.compose([Validators.required])],
      'active': [null, Validators.compose([Validators.required])],
    });
    this.subscriptionForm = this.formBuilder.group({
      'type': ['subscription', Validators.compose([Validators.required])],
      'debug': [null, Validators.compose([Validators.required])],
      'active': [null, Validators.compose([Validators.required])],
      'checkOnLoad': [null, Validators.compose([Validators.required])],
      'popupOnLoad': [null, Validators.compose([Validators.required])],
      'closable': [null, Validators.compose([Validators.required])],
    });
    this.paidContentForm = this.formBuilder.group({
      'type': ['paid-content', Validators.compose([Validators.required])],
      'debug': [null, Validators.compose([Validators.required])],
      'active': [null, Validators.compose([Validators.required])],
    });
    this.form = this.formBuilder.group({
      'donation': this.donationForm,
      'subscription': this.subscriptionForm,
      'paid-content': this.paidContentForm
    });
  }
}
