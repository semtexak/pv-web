import {Injectable} from '@angular/core';
import {HttpService} from './http.service';
import {HttpClient} from '@angular/common/http';
import {Observable, of, throwError} from 'rxjs';
import {ISingUpForm} from '../model/form/i-sing-up-form';
import {IChangePasswordForm} from '../model/form/i-change-password-form';
import {environment} from '../../../environments/environment';
import {catchError, map, switchMap} from 'rxjs/operators';
import {AuthenticationService} from './authentication.service';
import {HttpErrorResponse} from '@angular/common/http';
import {Router} from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class UserService extends HttpService {
  private autoLogin = environment.autoLogin;

  constructor(private authenticationService: AuthenticationService,
              private router: Router,
              private http: HttpClient) {
    super(http);
  }

  forgotPassword(email: string): Observable<any> {
    return this.http.put(`${this.API_URL}/user-service/user/forgot-password`, JSON.stringify({email: email}), this.jsonHttpOptions);
  }

  registerUser(form: ISingUpForm, redirectUri: string = '/'): Observable<any> {
    if (this.autoLogin) {
      console.log('Autologin enabled');
      return this.http.post(`${this.API_URL}/user-service/user/register`, JSON.stringify(form), this.jsonHttpOptions).pipe(
        switchMap(() => {
          console.log('Calling authentication method.');
          return this.authenticationService.authenticate({username: form.email, password: form.password}).pipe(
            switchMap(() => {
              return this.router.navigateByUrl(redirectUri);
            })
          );
        }),
        catchError(error => {
          return throwError(error);
        })
      );
    } else {
      console.log('Autologin disabled');
      return this.http.post(`${this.API_URL}/user-service/user/register`, JSON.stringify(form), this.jsonHttpOptions);
    }
  }

  activateUser(activationKey: string) {
    return this.http.get(`${this.API_URL}/user-service/user/activate-user?t=${activationKey}`);
  }

  generateNewActivationKey(email: string) {
    return this.http.post(`${this.API_URL}/user-service/user/activation-key`, JSON.stringify({email: email}), this.jsonHttpOptions);
  }

  ongoingPasswordChange(token: string) {
    return this.http.get(`${this.API_URL}/user-service/user/ongoing-password-change?t=${token}`);
  }

  changePassword(form: IChangePasswordForm) {
    if (form.token) {
      return this.http.put(`${this.API_URL}/user-service/user/change-password-token?t=${form.token}`, JSON.stringify(form), this.jsonHttpOptions);
    } else {
      return this.http.put(`${this.API_URL}/user-service/user/change-password`, JSON.stringify(form), this.jsonHttpOptions);
    }
  }

  getUsers(page: number, filter: string, orderBy: string): Observable<any> {
    return this.http.get(`${this.API_URL}/user-service/users/all?page=${page}${filter ? '&' + filter : ''}${orderBy ? '&sort=' + orderBy : ''}`);
  }
}
