import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ISingInForm} from '../../../../shared/model/i-sing-in-form';
import {AuthenticationService} from '../../../../shared/service/authentication.service';
import {Router} from '@angular/router';
import {HttpErrorResponse} from '@angular/common/http';
import {AlertService} from '../../../../shared/service/alert.service';

@Component({
  selector: 'pv-sign-in',
  templateUrl: './sign-in.component.html'
})
export class SignInComponent {

  public form: FormGroup;
  public error: string;

  constructor(private authenticationService: AuthenticationService,
              private alertService: AlertService,
              private router: Router,
              private formBuilder: FormBuilder) {
    this.form = this.formBuilder.group({
      'username': [null, Validators.compose([Validators.pattern('^\\w+([\\.-]?\\w+)*@\\w+([\\.-]?\\w+)*(\\.\\w{2,3})+$'), Validators.required])],
      'password': [null, Validators.required]
    });
  }

  onSubmit(data: ISingInForm): void {
    if (this.form.valid) {
      this.authenticationService.authenticate(data).subscribe(() => {
          this.router.navigateByUrl('/');
        },
        error => {
        console.log(error);
          if (error instanceof HttpErrorResponse) {
            if (!error.error.error_description) {
              this.alertService.error('Vyskytla se neznámá chyba. Prosím, opakujte akci pozdějí.');
            } else {
              if (error.error.error_description.includes('disabled')) {
                this.alertService.warning('Uživatel nebyl aktivován, nejprve proveďte aktivaci.');
              } else if (error.error.error_description.includes('locked')) {
                this.alertService.error('Uživatel byl zablokován.');
              } else if (error.error.error_description.includes('credentials')) {
                this.alertService.error('Špatná kombinace jména a hesla.');
              } else {
                this.alertService.error('Vyskytla se chyba.');
              }
            }
          }
          console.log(error);
        });
    }
  }

}
