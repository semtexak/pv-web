import {Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AuthenticationService} from '../../../../shared/service/authentication.service';
import {AlertService} from '../../../../shared/service/alert.service';
import {ActivatedRoute, NavigationExtras, Router} from '@angular/router';
import {ISingInForm} from '../../../../shared/model/form/i-sing-in-form';
import {HttpErrorResponse} from '@angular/common/http';

@Component({
  selector: 'pv-sign-in-form',
  templateUrl: './sign-in-form.component.html'
})
export class SignInFormComponent implements OnInit {

  @Input() stayOnSamePageAfterLogin: boolean = false;
  @Input() redirectAfterLoginUrl: string;
  @Input() boxClass: string;
  @Input() registerLink: string = '../registrace';
  @Input() plugin = false;
  @Output() onNavigate = new EventEmitter();

  @ViewChild('username') usernameInput: ElementRef;
  @ViewChild('password') passwordInput: ElementRef;
  public form: FormGroup;
  redirectUrl: string = '/';
  loading = false;

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

  ngOnInit() {
    this.route.queryParams.subscribe(queryParams => {
      const redirect = queryParams['redirect'];
      if (redirect) {
        this.redirectUrl = redirect;
      }
      if (this.redirectAfterLoginUrl) {
        this.redirectUrl = this.redirectAfterLoginUrl;
      }
      const login = queryParams['e'];
      this.form.get('username').setValue(login);
      if (login) {
        this.passwordInput.nativeElement.focus();
      } else {
        this.usernameInput.nativeElement.focus();
      }
    });
  }

  onSubmit(data: ISingInForm): void {
    if (this.form.valid) {
      this.loading = true;
      this.authenticationService.authenticate(data).subscribe(() => {
          if (!this.stayOnSamePageAfterLogin) {
            console.log(`Redirecting to: ${this.redirectUrl}`);
            this.loading = false;
            this.router.navigateByUrl(this.redirectUrl);
          }
        },
        error => {
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
          this.loading = false;
          console.log(error);
        });
    }
  }

  goToSignUpPage() {
    this.onNavigate.emit();
  }
}
