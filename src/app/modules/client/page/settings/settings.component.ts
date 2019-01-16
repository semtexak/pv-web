import {Component, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {TabsComponent} from '../../../../shared/component/tabs/tabs.component';
import {ActivatedRoute} from '@angular/router';
import {ApplicationService} from '../../../../shared/service/application.service';
import {TabComponent} from '../../../../shared/component/tabs/tab/tab.component';

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
  activeTabType: string;

  constructor(private formBuilder: FormBuilder,
              private route: ActivatedRoute,
              private applicationService: ApplicationService) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      if (params['appId']) {
        this.appId = params['appId'];
        console.log(this.appId);
      }
    });
    this.donationForm = this.formBuilder.group({
      'type': ['donation', Validators.compose([Validators.required])],
      'debug': [false, Validators.compose([Validators.required])],
      'active': [true, Validators.compose([Validators.required])],
      '_enabled': [false, Validators.compose([Validators.required])],
    });
    this.subscriptionForm = this.formBuilder.group({
      'type': ['subscription', Validators.compose([Validators.required])],
      'debug': [false, Validators.compose([Validators.required])],
      'active': [true, Validators.compose([Validators.required])],
      '_enabled': [false, Validators.compose([Validators.required])],
    });
    this.paidContentForm = this.formBuilder.group({
      'type': ['paid-content', Validators.compose([Validators.required])],
      'debug': [false, Validators.compose([Validators.required])],
      'active': [true, Validators.compose([Validators.required])],
      '_enabled': [false, Validators.compose([Validators.required])],
    });
    this.form = this.formBuilder.group({
      'donationForm': this.donationForm,
      'subscriptionForm': this.subscriptionForm
    });
    console.log(this.form.controls['donationForm']);
    console.log(this.form.get('donationForm'));
  }

  onSubmit(values) {
    console.log(values[this.activeTabType]);
    this.applicationService.addServicesToApplication(this.appId, values).subscribe(data => {
      console.log(data);
    });
  }

  toggleActivatedTab(tab: TabComponent, type: string, value: boolean) {
    this.tabs.activateToggleTab(tab, value);
    console.log(type);
    this.activeTabType = type;
  }

  onTabChange(tab: TabComponent) {
    this.activeTab = tab;
    console.log(tab);
  }
}
