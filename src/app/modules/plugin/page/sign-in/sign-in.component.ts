import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AuthenticationService} from '../../../../shared/service/authentication.service';
import {AlertService} from '../../../../shared/service/alert.service';
import {ActivatedRoute, Router} from '@angular/router';
import {ISingInForm} from '../../../../shared/model/i-sing-in-form';
import {HttpErrorResponse} from '@angular/common/http';

@Component({
  selector: 'pv-sign-in',
  templateUrl: './sign-in.component.html'
})
export class SignInComponent implements OnInit {

  public form: FormGroup;
  public error: string;
  private redirectUrl: string = '/';

  constructor(private authenticationService: AuthenticationService,
              private alertService: AlertService,
              private route: ActivatedRoute,
              private router: Router,
              private formBuilder: FormBuilder) {
    this.form = this.formBuilder.group({
      'username': [null, Validators.compose([Validators.pattern('^\\w+([\\.-]?\\w+)*@\\w+([\\.-]?\\w+)*(\\.\\w{2,3})+$'), Validators.required])],
      'password': [null, Validators.required]
    });
  }

  ngOnInit(): void {
    this.route.queryParams.subscribe(queryParams => {
      const redirect = queryParams['redirect'];
      if (redirect) {
        this.redirectUrl = redirect;
      }
    });
  }

  onSubmit(data: ISingInForm): void {
    if (this.form.valid) {
      this.authenticationService.authenticate(data).subscribe(() => {
        console.log(`Redirecting to: ${this.redirectUrl}`);
          this.router.navigateByUrl(this.redirectUrl);
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
