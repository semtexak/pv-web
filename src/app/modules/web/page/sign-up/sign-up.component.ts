import {Component} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {MatchPasswordValidation} from '../../../../core/validation/match-password-validation';
import {UserService} from '../../../../shared/service/user.service';
import {ISingUpForm} from '../../../../shared/model/i-sing-up-form';
import {Router} from '@angular/router';
import {AlertService} from '../../../../shared/service/alert.service';

@Component({
  selector: 'pv-sign-up',
  templateUrl: './sign-up.component.html'
})
export class SignUpComponent {

  public form: FormGroup;

  constructor(private userService: UserService,
              private alertService: AlertService,
              private router: Router,
              private formBuilder: FormBuilder) {
    this.form = this.formBuilder.group({
      'email': [null, Validators.compose([Validators.pattern('^\\w+([\\.-]?\\w+)*@\\w+([\\.-]?\\w+)*(\\.\\w{2,3})+$'), Validators.required])],
      'password': [null, Validators.compose([Validators.minLength(8), Validators.required])],
      'passwordConfirm': [null, Validators.required],
    }, {
      validator: MatchPasswordValidation.match('password', 'passwordConfirm')
    });
  }

  onSubmit(form: ISingUpForm): void {
    this.userService.registerUser(form).subscribe(data => {
      this.router.navigate(['/uzivatel/prihlaseni']).then(value => {
        this.alertService.success('Registrace proběhla úspěšně. Na e-mail vám byly zaslány <strong>informace k aktivaci</strong> účtu.');
      });
    }, e => {
      this.alertService.error('Vyskytla se chyba.');
      console.log(e);
    });
  }

}
