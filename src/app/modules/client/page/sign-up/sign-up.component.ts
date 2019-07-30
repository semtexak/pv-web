import {AfterContentInit, Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {Form, FormBuilder, FormGroup, Validators} from '@angular/forms';
import {IcoValidation} from '../../../../core/validation/ico-validation';
import {ClientService} from '../../../../shared/service/client.service';
import {AlertService} from '../../../../shared/service/alert.service';
import {HttpErrorResponse} from '@angular/common/http';
import {Router} from '@angular/router';
import {Tab} from '../../../user/my-account/my-account.component';
import {catchError, map, switchMap} from 'rxjs/operators';
import {of} from 'rxjs';
import {IToken} from '../../../../shared/model/i-token';
import {AuthenticationService} from '../../../../shared/service/authentication.service';

@Component({
  selector: 'pv-sign-up',
  templateUrl: './sign-up.component.html'
})
export class SignUpComponent implements OnInit, AfterContentInit {

  form: FormGroup;
  SubjectType = SubjectType;
  baseInfoForm: FormGroup;
  addressForm: FormGroup;
  contactPersonForm: FormGroup;
  bankForm: FormGroup;
  hideAres = false;
  tabs: Array<any>;
  @ViewChild('baseInfo', { static: true }) t1: ElementRef;
  @ViewChild('contactPerson', { static: true }) t2: ElementRef;
  @ViewChild('bank', { static: true }) t3: ElementRef;
  states = [
    {
      id: 203, name: 'Česká republika'
    },
    {
      id: 703, name: 'Slovensko'
    }
  ];
  completed = false;

  constructor(private formBuilder: FormBuilder,
              private alertService: AlertService,
              private authenticationService: AuthenticationService,
              private router: Router,
              private clientService: ClientService) {
  }

  ngOnInit() {
    this.baseInfoForm = this.formBuilder.group({
      'subjectType': [SubjectType.PHYSICAL, Validators.required],
      'company': [null, Validators.compose([Validators.required])],
      'ico': [null, null],
      'dic': [null, null],
      'email': [null, Validators.compose([Validators.required, Validators.email])]
    }, {
      validator: IcoValidation.IsValid
    });

    this.addressForm = this.formBuilder.group({
      'street': [null, Validators.compose([Validators.required])],
      'city': [null, Validators.compose([Validators.required])],
      'zip': [null, Validators.required],
      'state': [null, Validators.required],
    });
    this.contactPersonForm = this.formBuilder.group({
      'name': [null, Validators.compose([Validators.required])],
      'surname': [null, Validators.compose([Validators.required])],
      'phone': [null, Validators.compose([Validators.required, Validators.pattern('^[0-9\\-\\+]{9,15}$')])],
    });
    this.bankForm = this.formBuilder.group({
      'bankPrefix': [null, null],
      'bankNumber': [null, Validators.compose([Validators.required])],
      'bankCode': [null, Validators.compose([Validators.required])],
      'iban': [null, null],
      'swift': [null, null],
      'agreement': [false, Validators.requiredTrue],
    });

    this.form = this.formBuilder.group({
      'baseInfoForm': this.baseInfoForm,
      'contactPersonForm': this.contactPersonForm,
      'bankForm': this.bankForm,
      'addressForm': this.addressForm
    });

    this.baseInfoForm.get('subjectType').valueChanges.subscribe((type: SubjectType) => {
      switch (type) {
        case SubjectType.PHYSICAL:
          break;
        case SubjectType.CORPORATE:
          break;
      }
    });
  }

  ngAfterContentInit() {
    this.tabs = [
      {key: 'baseInfo', title: 'Základní údaje', icon: 'fa-info', active: true, status: '', disabled: false, content: this.t1},
      {key: 'contactPerson', title: 'Kontaktní osoba', icon: 'fa-user', active: false, status: '', disabled: true, content: this.t2},
      {key: 'bank', title: 'Bankovní spojení', icon: 'fa-dollar-sign', active: false, status: '', disabled: true, content: this.t3},
    ];
  }

  selectTab(tab: Tab) {
    if (tab && !tab.disabled) {
      this.tabs.forEach(el => el.active = false);
      this.tabs.find(el => el.key === tab.key).active = true;
    }
  }

  sendData(form: FormGroup) {
    const values = {
      ...form.get('baseInfoForm').value,
      address: form.get('addressForm').value,
      contactPerson: form.get('contactPersonForm').value,
      bank: form.get('bankForm').value
    };
    console.log(values);
    if (this.form.invalid) {
      Object.keys(this.form.controls).forEach(key => {
        if (key === '')
          this.form.get(key).markAsDirty();
      });
    } else {
      this.clientService.createClient(values).pipe(
        switchMap((token: IToken) => {
            this.authenticationService.saveToken(token);
            return this.authenticationService.saveUser().pipe(
              map(() => true),
              switchMap((status: boolean) => {
                return this.router.navigate(['/klient/stranka/registrace']).then(value => {
                  this.alertService.success('Váš klientský účet byl založen.');
                });
              }),
              catchError(err => of(false))
            );
        }),
        catchError(error => {
          console.log(error);
          if (error instanceof HttpErrorResponse) {
            if (error.error && error.error.status === 422) {
              this.alertService.error('Vyskytla se chyba. Zkontrolujte správnost všech údajů.');
            }
          } else {
            this.alertService.error('Vyskytla se chyba.');
          }
          return of(false);
        })
      ).subscribe();
    }
  }

  loadClientDataFromAres(ico: number) {
    this.clientService.getAresData(ico).subscribe(
      (data) => {
        if (data.length === 1) {
          const organization = data[0];
          this.baseInfoForm.get('company').setValue(organization.organizationName);
          this.baseInfoForm.get('ico').setValue((String('0').repeat(8) + organization.ico).substr((-8), 8));
          const address = organization.street + ' ' + (organization.landRegistryNumber ? (organization.houseNumber ? organization.landRegistryNumber + '/' + organization.houseNumber : organization.landRegistryNumber) : '');
          this.addressForm.get('street').setValue(address);
          this.baseInfoForm.get('dic').setValue(organization.dic);
          this.addressForm.get('city').setValue(organization.city);
          this.addressForm.get('zip').setValue(organization.zip);
          this.addressForm.get('state').setValue(+organization.state);
        } else if (data.length === 0) {
          this.baseInfoForm.get('company').setValue('');
          this.baseInfoForm.get('dic').setValue('');
          this.addressForm.get('street').setValue('');
          this.addressForm.get('city').setValue('');
          this.addressForm.get('zip').setValue('');
          this.addressForm.get('state').setValue(null);
        }
      }
    );
  }

  // selectTab(tab) {
  //   if (this.tabs) {
  //     this.tabs.selectTab(tab);
  //   }
  // }

  // onChange($event) {
  //   if($event.nextId === 'company-tab') {
  //     this.hideAres = false;
  //   } else {
  //     this.hideAres = true;
  //   }
  // }
  nextStep(forms: Array<FormGroup>, current: any = null, next: any = null) {
    this.sendData(this.form);
    forms.forEach((form: FormGroup) => {
      if (form.invalid) {
        Object.keys(form.controls).forEach(key => {
          form.get(key).markAsDirty();
        });
        current.status = 'error';
      } else {
        if (next) {
          next.disabled = false;
          current.status = 'success';
          this.selectTab(next);
        } else {
          this.sendData(this.form);
        }
      }
    });
  }

  isPreviousValid(tab: Tab): boolean {
    if (tab) {
      const index = this.tabs.findIndex(t => t.key === tab.key);
      if (index !== -1) {
        if (index > 0) {
          return this.form.get(this.tabs[index - 1].key + 'Form').valid;
        }
        return true;
      }
    }
    return false;
  }
}

export enum SubjectType {
  PHYSICAL = 0,
  CORPORATE = 1
}
