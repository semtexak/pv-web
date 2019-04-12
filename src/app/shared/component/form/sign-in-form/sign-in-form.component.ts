import {Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AuthenticationService} from '../../../service/authentication.service';
import {AlertService} from '../../../service/alert.service';
import {ActivatedRoute, NavigationExtras, Router} from '@angular/router';
import {ISingInForm} from '../../../model/form/i-sing-in-form';
import {HttpErrorResponse, HttpResponse} from '@angular/common/http';
import {FacebookLoginProvider, SocialUser} from 'angularx-social-login';
import {AuthService} from 'angularx-social-login';
import {fromPromise} from 'rxjs/internal-compatibility';
import {from, of} from 'rxjs';
import {IToken} from '../../../model/i-token';
import {environment} from '../../../../../environments/environment';

@Component({
  selector: 'pv-sign-in-form',
  templateUrl: './sign-in-form.component.html'
})
export class SignInFormComponent implements OnInit {

  @Input() stayOnSamePageAfterLogin: boolean = false;
  @Input() redirectAfterLoginUrl: string = '';
  @Input() boxClass: string;
  @Input() registerLink: string = '../registrace';
  @Input() plugin = false;
  @Output() onNavigate = new EventEmitter();

  @ViewChild('username') usernameInput: ElementRef;
  @ViewChild('password') passwordInput: ElementRef;
  public form: FormGroup;
  redirectUrl: string = '/';
  loading = false;
  socialStatus = environment.socialStatus;
  private data: SocialUser;

  constructor(private authenticationService: AuthenticationService,
              private alertService: AlertService,
              private route: ActivatedRoute,
              private authService: AuthService,
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

      const login = queryParams['e'];
      this.form.get('username').setValue(login);
      if (login) {
        this.passwordInput.nativeElement.focus();
      } else {
        this.usernameInput.nativeElement.focus();
      }
    });
    if (this.redirectAfterLoginUrl) {
      this.redirectUrl = this.redirectAfterLoginUrl;
    }
    this.authService.authState.subscribe(data => this.data = data);
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

  doFacebookLogin() {
    let observable;
    if (!this.data) {
      observable = from(this.authService.signIn(FacebookLoginProvider.PROVIDER_ID));
    } else {
      observable = of(this.data);
    }
    observable.subscribe((response: SocialUser) => {
      this.authenticationService.facebookLogin(response.authToken).subscribe((token: IToken) => {
        console.log(response);
        if (token && token.access_token) {
          this.authenticationService.saveToken(token);
          this.authenticationService.saveUser().subscribe(() => {
            if (!this.stayOnSamePageAfterLogin) {
              this.router.navigateByUrl(this.redirectUrl);
            }
          });
          console.log('Can login via facebook.', token.access_token);
        }
      });
    });

  }

  goToSignUpPage() {
    this.onNavigate.emit();
  }
}
