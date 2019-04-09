import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {environment} from '../../../../../environments/environment';
import {UserService} from '../../../../shared/service/user.service';
import {AuthenticationService} from '../../../../shared/service/authentication.service';
import {AlertService} from '../../../../shared/service/alert.service';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {MatchPasswordValidation} from '../../../../core/validation/match-password-validation';
import {ISingUpForm} from '../../../../shared/model/form/i-sing-up-form';
import {HttpErrorResponse} from '@angular/common/http';

@Component({
  selector: 'pv-sign-up',
  templateUrl: './sign-up.component.html'
})
export class SignUpComponent implements OnInit {

  // public form: FormGroup;
  // private autoLogin = environment.autoLogin;
  // redirectUrl: string;

  constructor(private userService: UserService,
              private authenticationService: AuthenticationService,
              private alertService: AlertService,
              private router: Router,
              private route: ActivatedRoute,
              private formBuilder: FormBuilder) {
    // this.form = this.formBuilder.group({
    //   'email': [null, Validators.compose([Validators.pattern('^\\w+([\\.-]?\\w+)*@\\w+([\\.-]?\\w+)*(\\.\\w{2,3})+$'), Validators.required])],
    //   'password': [null, Validators.compose([Validators.minLength(8), Validators.required])],
    //   'passwordConfirm': [null, Validators.required],
    // }, {
    //   validator: MatchPasswordValidation.match('password', 'passwordConfirm')
    // });
  }

  ngOnInit() {

  }

  // ngOnInit(): void {
  //   this.route.queryParams.subscribe((params: Params) => {
  //     console.log(params);
  //     if (params['redirect']) {
  //       this.redirectUrl = params['redirect'];
  //     }
  //   });
  // }
  //
  // onSubmit(form: ISingUpForm): void {
  //   this.userService.registerUser(form, this.redirectUrl).subscribe(data => {
  //     // this.router.navigateByUrl(this.redirectUrl).then(value => {
  //     //   this.alertService.success('Registrace proběhla úspěšně. Na e-mail vám byly zaslány <strong>informace k aktivaci</strong> účtu.');
  //     // });
  //   }, error => {
  //     if (error instanceof HttpErrorResponse) {
  //       if (!error.error.error_description) {
  //         if (error.error.status === 409) {
  //           this.router.navigate(['/plugin/sign-in'], {queryParams: {e: form.email}}).then(() => {
  //             this.alertService.info('Zadaný e-mail je již registrován. Přihlašte se prosím.');
  //           });
  //         } else {
  //           this.alertService.error('Vyskytla se neznámá chyba. Prosím, opakujte akci později.');
  //         }
  //       } else {
  //         if (error.error.error_description.includes('disabled')) {
  //           this.alertService.warning('Uživatel nebyl aktivován, nejprve proveďte aktivaci.');
  //         } else if (error.error.error_description.includes('locked')) {
  //           this.alertService.error('Uživatel byl zablokován.');
  //         } else if (error.error.error_description.includes('credentials')) {
  //           this.alertService.error('Špatná kombinace jména a hesla.');
  //         } else {
  //           this.alertService.error('Vyskytla se chyba.');
  //         }
  //       }
  //     } else {
  //       this.alertService.error('Vyskytla se chyba.');
  //     }
  //     console.log(error);
  //   });
  // }

}
