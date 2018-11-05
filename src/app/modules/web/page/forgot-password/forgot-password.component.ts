import {Component} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AuthenticationService} from '../../../../shared/service/authentication.service';
import {IForgotPasswordForm} from '../../../../shared/model/i-forgot-password-form';
import {UserService} from '../../../../shared/service/user.service';

@Component({
  selector: 'pv-forgot-password',
  templateUrl: './forgot-password.component.html'
})
export class ForgotPasswordComponent {

  public form: FormGroup;
  public sent = false;
  public success = false;

  constructor(private authenticationService: AuthenticationService,
              private userService: UserService,
              private formBuilder: FormBuilder) {
    this.form = this.formBuilder.group({
      'username': [null, Validators.compose([Validators.pattern('^\\w+([\\.-]?\\w+)*@\\w+([\\.-]?\\w+)*(\\.\\w{2,3})+$'), Validators.required])]
    });
  }

  onSubmit(data: IForgotPasswordForm): void {
    this.userService.forgotPassword(data.username).subscribe(d => {
      this.sent = true;
      this.success = true;
    }, e => {
      console.log(e);
      this.sent = true;
    });
  }

}
