import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {UserService} from '../../../../shared/service/user.service';
import {AlertService} from '../../../../shared/service/alert.service';
import {ActivatedRoute, Router} from '@angular/router';
import {MatchPasswordValidation} from '../../../../core/validation/match-password-validation';
import {catchError, map, switchMap} from 'rxjs/operators';
import {of} from 'rxjs';
import {IChangePasswordForm} from '../../../../shared/model/i-change-password-form';
import {AuthenticationService} from '../../../../shared/service/authentication.service';
import {HttpErrorResponse} from '@angular/common/http';

@Component({
  selector: 'pv-password-change',
  templateUrl: './password-change.component.html'
})
export class PasswordChangeComponent implements OnInit {

  public form: FormGroup;
  // public token$ = this.route.queryParams.pipe(
  //   map(params => params.token),
  //   switchMap((token: string) => {
  //     return this.userService.ongoingPasswordChange(token).pipe(
  //       map(() => true)
  //     );
  //   }),
  //   catchError(error => {
  //     console.log(error);
  //     return of(false);
  //   })
  // );
  private token: string;

  constructor(private userService: UserService,
              private authenticationService: AuthenticationService,
              private alertService: AlertService,
              private router: Router,
              private route: ActivatedRoute,
              private formBuilder: FormBuilder) {
    this.form = this.formBuilder.group({
      'currentPassword': [null, Validators.required],
      'newPassword': [null, Validators.compose([Validators.minLength(8), Validators.required])],
      'newPasswordConfirm': [null, Validators.required],
    }, {
      validator: [MatchPasswordValidation.match('newPassword', 'newPasswordConfirm'), MatchPasswordValidation.different('currentPassword', 'newPassword')],
    });

    this.route.params.subscribe(params => {
      this.token = params.token;
    });
  }

  ngOnInit() {
    const currentPassword = this.form.get('currentPassword');
    if (this.token) {
      currentPassword.setValidators([]);
    }
  }

  onSubmit(form: IChangePasswordForm): void {
    if (this.token) {
      form.token = this.token;
    }
    this.userService.changePassword(form).subscribe(data => {
      this.authenticationService.logout();
      this.router.navigate(['/uzivatel/prihlaseni']).then(value => {
        this.alertService.success('Změna hesla proběhla úspěšně. Přihlašte se.');
      });
    }, e => {
      if (e instanceof HttpErrorResponse) {
        if (e.error.status === 409) {
          this.alertService.error('Špatně zadané současné heslo.');
        }
      } else {
        this.alertService.error('Vyskytla se chyba.');
      }
    });
  }

}
