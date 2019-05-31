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
import {environment} from '../../../../../environments/environment';
import {BannerPosition} from '../../../../shared/model/enum/banner-position';

@Component({
  selector: 'pv-settings',
  templateUrl: './settings.component.html'
})
export class SettingsComponent implements OnInit {

  form: FormGroup;
  donationForm: FormGroup;
  subscriptionForm: FormGroup;
  paidContentForm: FormGroup;
  pluginCustomizationForm: FormGroup;
  appId: string;
  @ViewChild('tabs') tabs: TabsComponent;
  activeTab: TabComponent;
  application: IApplication = null;
  snippetCode: string;

  initFormData = [
    {
      type: 'donation',
      debug: false,
      active: false
    },
    {
      type: 'subscription',
      debug: false,
      active: false,
      // checkOnLoad: false,
      // popupOnLoad: false,
      // closable: false
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

    this.pluginCustomizationForm = this.formBuilder.group({
      'position': ['top', Validators.compose([Validators.required])],
      'marginBody': [null, Validators.compose([Validators.required])],
      'debug': [false, Validators.compose([Validators.required])],
    });

    this.pluginCustomizationForm.valueChanges.subscribe((options: PluginOptions) => {
      this.updateCodeSnippet(options);
    });

    this.pluginCustomizationForm.get('position').valueChanges.subscribe(value => {
      let validators = null;
      let control = this.pluginCustomizationForm.get('marginBody');
      if (value === BannerPosition.TOP) {
        validators = [Validators.required];
      }

      control.setValidators(validators);
      control.updateValueAndValidity();
    });
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.initForm();
      if (params['appId']) {
        this.appId = params['appId'];
        this.setDefaults(this.initFormData, 'INIT');
        this.loadData();
        this.updateCodeSnippet(this.pluginCustomizationForm.value);
      }
    });
  }

  loadData() {
    this.applicationService.getApplication(this.appId).subscribe((application: IApplication) => {
      this.application = application;
      if (this.application.configurations.length > 0 && this.application.configurations && this.application) {
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
      item.type = item.type.toLowerCase();
      console.log(item.type);
      const subForm = this.form.controls[item.type];
      if (this.tabs.tabs) {
        console.log(`Looking for ${item.type.toLowerCase()}`);
        const tabByType: TabComponent = this.tabs.tabs.find(tab => tab.type === item.type);
        if (tabByType) {
          tabByType.activated = item.active;
        }
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

  private updateCodeSnippet(pluginOptions: PluginOptions) {
    pluginOptions.appId = this.appId;
    let optionsFormatted = Object.keys(pluginOptions).reduce((options, val) => {
      let value = pluginOptions[val];
      if (value === null) {
        return options;
      }
      switch (typeof pluginOptions[val]) {
        case 'string':
          value = `'${value}'`;
          break;
      }
      options.push(`${val}: ${value}`);
      return options;
    }, []);

    this.snippetCode = '<script>\n' +
      '(function (d, s, id) {\n' +
      '   var js, fjs = d.getElementsByTagName(s)[0];\n' +
      '   if (d.getElementById(id)) return;\n' +
      '   js = d.createElement(s);\n' +
      '   js.id = id;\n' +
      '   js.src = \'' + environment.PLUGIN_URL + '\';\n' +
      '   js.onload = function() {\n' +
      '     window.payvont = new Payvont({\n' +
      '       ' + optionsFormatted.join(',') + '\n' +
      '     });\n' +
      '   };\n' +
      '   fjs.parentNode.insertBefore(js, fjs);\n' +
      '}(document, \'script\', \'payvont-script\'));\n' +
      '</script>';
  }
}

export interface PluginOptions {
  appId: string;
  position: string;
  marginBody: boolean;
  debug: boolean;
}
