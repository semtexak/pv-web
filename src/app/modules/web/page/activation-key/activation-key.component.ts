import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AuthenticationService} from '../../../../shared/service/authentication.service';
import {AlertService} from '../../../../shared/service/alert.service';
import {UserService} from '../../../../shared/service/user.service';
import {IForgotPasswordForm} from '../../../../shared/model/i-forgot-password-form';

@Component({
  selector: 'pv-activation-key',
  templateUrl: './activation-key.component.html'
})
export class ActivationKeyComponent {

  public form: FormGroup;

  constructor(private authenticationService: AuthenticationService,
              private alertService: AlertService,
              private userService: UserService,
              private formBuilder: FormBuilder) {
    this.form = this.formBuilder.group({
      'username': [null, Validators.compose([Validators.pattern('^\\w+([\\.-]?\\w+)*@\\w+([\\.-]?\\w+)*(\\.\\w{2,3})+$'), Validators.required])]
    });
  }

  onSubmit(data: IForgotPasswordForm): void {
    this.userService.generateNewActivationKey(data.username).subscribe(d => {
      this.alertService.success('Aktivační klíč byl odeslán.');
      this.form.reset();
    }, e => {
      console.log(e);
      this.alertService.error('Vyskytla se chyba.');
    });
  }

}
