import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {IcoValidation} from '../../../../core/validation/ico-validation';
import {ClientService} from '../../../../shared/service/client.service';
import {AlertService} from '../../../../shared/service/alert.service';
import {HttpErrorResponse} from '../../../../../../node_modules/@angular/common/http';
import {Router} from '@angular/router';

@Component({
  selector: 'pv-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {

  form: FormGroup;
  hideAres = false;
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
              private router: Router,
              private clientService: ClientService) { }

  ngOnInit() {
    this.form = this.formBuilder.group({
      'agreement': [false, Validators.requiredTrue],

      'personName': [null, Validators.compose([Validators.required])],
      'personSurname': [null, Validators.compose([Validators.required])],
      'personPhone': [null, Validators.compose([Validators.required])],

      'bankNumber': [null, Validators.compose([Validators.required])],
      'bankCode': [null, Validators.compose([Validators.required])],
      'iban': [null, null],
      'swift': [null, null],

      'company': [null, Validators.compose([Validators.required])],
      'email': [null, Validators.compose([Validators.required, Validators.email])],
      'phone': [null, Validators.compose([Validators.required, Validators.pattern('^[0-9\\-\\+]{9,15}$')])],
      'address': [null, null],
      'zip': [null, null],
      'city': [null, null],
      'state': [null, null],
      'ico': [null, Validators.compose([Validators.required])],
      'dic': [null, null],
    }, {
      validator: IcoValidation.IsValid
    });
  }

  sendData(values: any) {
    console.log(values);
    if (this.form.invalid) {
      Object.keys(this.form.controls).forEach(key => {
        this.form.get(key).markAsDirty();
      });
    } else {
      this.clientService.createClient(values).subscribe(data => {
        this.completed = true;
        this.router.navigate(['/klient/stranka/registrace']).then(value => {
          this.alertService.success('Váš klientský účet byl založen.');
        });
      }, e => {
        if (e instanceof HttpErrorResponse) {
          if (e.error.status === 422) {
            this.alertService.error('Vyskytla se chyba. Zkontrolujte správnost všech údajů.');
          }
        } else {
          this.alertService.error('Vyskytla se chyba.');
        }
      });
    }
  }

  loadClientDataFromAres(ico: number) {
    this.clientService.getAresData(ico).subscribe(
      (data) => {
        if (data.length === 1) {
          const organization = data[0];
          this.form.controls['company'].setValue(organization.organizationName);
          this.form.controls['ico'].setValue((String('0').repeat(8) + organization.ico).substr((-8), 8));
          const address = organization.street + ' ' + (organization.landRegistryNumber ? (organization.houseNumber ? organization.landRegistryNumber + '/' + organization.houseNumber : organization.landRegistryNumber) : '');
          this.form.controls['address'].setValue(address);
          this.form.controls['dic'].setValue(organization.dic);
          this.form.controls['city'].setValue(organization.city);
          this.form.controls['zip'].setValue(organization.zip);
          this.form.get('state').setValue(+organization.state);
        } else if (data.length === 0) {
          this.form.controls['company'].setValue('');
          this.form.controls['dic'].setValue('');
          this.form.controls['address'].setValue('');
          this.form.controls['city'].setValue('');
          this.form.controls['zip'].setValue('');
          this.form.get('state').setValue(null);
        }
      }
    );
  }



  // onChange($event) {
  //   if($event.nextId === 'company-tab') {
  //     this.hideAres = false;
  //   } else {
  //     this.hideAres = true;
  //   }
  // }
}
