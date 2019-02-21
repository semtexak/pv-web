import {AfterContentInit, Component, ElementRef, OnInit, ViewChild, ViewChildren} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {UserService} from '../../../shared/service/user.service';
import {MatchPasswordValidation} from '../../../core/validation/match-password-validation';

@Component({
  selector: 'pv-my-account',
  templateUrl: './my-account.component.html'
})
export class MyAccountComponent implements OnInit, AfterContentInit {

  @ViewChild('general') general: ElementRef;
  @ViewChild('password') password: ElementRef;
  @ViewChild('connections') connections: ElementRef;
  @ViewChild('notifications') notifications: ElementRef;
  tabs: Array<Tab> = [];
  social = {
    instagram: false,
    google: false,
    facebook: false,
    twitter: false
  };
  form: FormGroup;
  userInfoForm: FormGroup;
  passwordForm: FormGroup;
  notificationForm: FormGroup;
  appImg: string;
  file: File = null;

  constructor(private formBuilder: FormBuilder,
              private userService: UserService) {
  }

  ngOnInit() {
    this.userInfoForm = this.formBuilder.group({
      'firstName': [null, Validators.compose([Validators.required])],
      'lastName': [null, Validators.compose([Validators.required])],
      'email': [null, Validators.compose([Validators.pattern('^\\w+([\\.-]?\\w+)*@\\w+([\\.-]?\\w+)*(\\.\\w{2,3})+$'), Validators.required])],
    });
    this.passwordForm = this.formBuilder.group({
      'password': [null, Validators.compose([Validators.required])],
      'newPassword': [null, Validators.compose([Validators.minLength(8), Validators.required])],
      'newPasswordConfirm': [null, Validators.required],
    }, {
      validator: MatchPasswordValidation.match('newPassword', 'newPasswordConfirm')
    });
    this.userInfoForm.get('email').disable();
    this.form = this.formBuilder.group({
      'userInfo': this.userInfoForm,
      'password': this.passwordForm,
    });
    this.userService.getSelf().subscribe(user => {
      if (user) {
        this.userInfoForm.get('firstName').patchValue(user.firstName);
        this.userInfoForm.get('lastName').patchValue(user.lastName);
        this.userInfoForm.get('email').patchValue(user.email);
      }
    });
  }

  selectTab(tab: Tab) {
    if (tab) {
      this.tabs.forEach(el => el.active = false);
      this.tabs.find(el => el.key === tab.key).active = true;
    }
  }

  ngAfterContentInit() {
    this.tabs = [
      {key: 'general', title: 'Obecné', active: true, content: this.general},
      {key: 'password', title: 'Změna hesla', active: false, content: this.password},
      {key: 'connections', title: 'Propojené účty', active: false, content: this.connections},
      {key: 'notifications', title: 'Notifikace', active: false, content: this.notifications},
    ];
  }

  onStatusChange($event) {
    if ($event && this.social[$event.type]) {
      this.social[$event.type] = $event.status;
    }
  }

  onSubmit(values: any) {
    console.log(values);
  }

  onSelectFile(_event) { // called each time file input changes
    if (_event.target.files && _event.target.files[0]) {
      const reader = new FileReader();
      reader.readAsDataURL(_event.target.files[0]); // read file as data url
      reader.onload = (_eventInner) => { // called once readAsDataURL is completed
        _eventInner = _eventInner as ProgressEvent;
        this.appImg = _eventInner.target['result'];
        this.form.controls['appImgStr'].setValue(reader.result.split(',')[1]);
      };
    }
    this.file = <File> _event.target.files[0];
  }

  removeImage() {
    this.appImg = null;
    this.form.controls['appImg'].setValue(null);
  }
}

export interface Tab {
  key: string;
  title: string;
  active: boolean;
  content: ElementRef;
}
