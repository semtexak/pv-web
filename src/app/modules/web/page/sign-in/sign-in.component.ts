import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ISingInForm} from '../../../../shared/model/i-sing-in-form';
import {AuthenticationService} from '../../../../shared/service/authentication.service';

@Component({
  selector: 'pv-sign-in',
  templateUrl: './sign-in.component.html'
})
export class SignInComponent {

  public form: FormGroup;

  constructor(private authenticationService: AuthenticationService,
              private formBuilder: FormBuilder) {
    this.form = this.formBuilder.group({
      'username': [null, Validators.compose([Validators.pattern('^\\w+([\\.-]?\\w+)*@\\w+([\\.-]?\\w+)*(\\.\\w{2,3})+$'), Validators.required])],
      'password': [null, Validators.required]
    });
  }

  onSubmit(data: ISingInForm): void {
    if (this.form.valid) {
      this.authenticationService.authenticate(data).subscri;
    }
  }

}
