import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable, of, Subscription} from 'rxjs';
import {User} from '../model/user';
import {HttpService} from './http.service';
import {HttpClient, HttpParams} from '@angular/common/http';
import {ISingInForm} from '../model/form/i-sing-in-form';
import {environment} from '../../../environments/environment';
import {IToken} from '../model/i-token';
import {CookieService} from 'ngx-cookie-service';
import {catchError, map, mergeMap, switchMap} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService extends HttpService {

  public loggedUser: BehaviorSubject<User> = new BehaviorSubject(undefined);
  private grantType = environment.grantType;
  private clientId = environment.clientId;
  private clientSecret = environment.clientSecret;
  private domain = environment.hostname;

  private static mapUser(userData: User) {
    const user = new User();
    user.id = userData.id;
    user.email = userData.email;
    user.name = userData.name ? userData.name : (userData.firstName ? `${userData.firstName} ${userData.lastName}` : userData.email);
    user.firstName = userData.firstName;
    user.lastName = userData.lastName;
    user.authorities = userData.authorities;
    user.applications = userData.applications;
    return user;
  }

  constructor(private http: HttpClient, private cookieService: CookieService) {
    super(http);
    const udata = localStorage.getItem('udata');
    if (udata && this.getToken() !== '') {
      this.loggedUser.next(AuthenticationService.mapUser(JSON.parse(udata)));
    } else {
      localStorage.removeItem('udata');
    }
  }

  public getToken() {
    return this.cookieService.get('act');
  }

  public authenticate(credentials: ISingInForm): Observable<any> {
    const httpParams = this.prepareFormAuth(credentials);

    return this.obtainToken(httpParams).pipe(
      switchMap((token: IToken) => {
        this.saveToken(token);
        return this.saveUser();
      })
    );
  }

  public reloadUserData(): Observable<any> {
    return this.saveUser();
  }

  public saveUser(): Observable<any> {
    console.log('SaveUser()');
    return this.getUserData().pipe(
      switchMap((userData: User) => {
        const user = AuthenticationService.mapUser(userData);
        localStorage.setItem('udata', JSON.stringify(user));
        this.loggedUser.next(user);
        return this.getUserApplications(user.id).pipe(
          map(applications => {
            const userTmp = this.loggedUser.getValue();
            userTmp.applications = applications;
            this.loggedUser.next(userTmp);
            localStorage.setItem('udata', JSON.stringify(userTmp));
          })
        );
      })
    );
  }

  public getUserApplications(user: number): Observable<any> {
    return this.http.get(`${this.API_URL}/client-service/client/applications`);
  }

  public obtainToken(params: HttpParams): Observable<any> {
    return this.http.post(`${this.API_URL}/user-service/token`, params.toString(), this.formAuthRequestOptions());
  }

  private getUserData(): Observable<any> {
    console.log('Getting user data');
    return this.http.get(`${this.API_URL}/user-service/user/self`);
  }

  private logoutBackend(): Observable<any> {
    return this.http.delete(`${this.API_URL}/user-service/user/logout`);
  }

  public saveToken(token: IToken) {
    const current = new Date();
    const expiresAt = new Date(current.getTime() + (token.expires_in * 1000));
    console.log('act', token.access_token, expiresAt, '/', `.${this.domain}`);
    if (this.domain === 'localhost') {
      this.cookieService.set('act', token.access_token, expiresAt, '/');
    } else {
      this.cookieService.set('act', token.access_token, expiresAt, '/', `.${this.domain}`);
    }
    console.log('Saving token', token.access_token);
    console.log(this.getToken());
  }

  private prepareFormAuth(credentials: ISingInForm): HttpParams {
    return new HttpParams()
      .set('username', credentials.username)
      .set('password', credentials.password)
      .set('grant_type', this.grantType)
      .set('client_id', this.clientId)
      .set('client_secret', this.clientSecret);
  }

  public logout(): Observable<boolean> {
    return this.logoutBackend().pipe(
      switchMap(() => {
        if (this.domain === 'localhost') {
          this.cookieService.delete('act', '/');
        } else {
          this.cookieService.delete('act', '/', `.${this.domain}`);
        }
        localStorage.removeItem('udata');
        this.loggedUser.next(null);
        return of(true);
      }),
      catchError(error => {
        console.log(error);

        if (this.domain === 'localhost') {
          this.cookieService.delete('act', '/');
        } else {
          this.cookieService.delete('act', '/', `.${this.domain}`);
        }
        localStorage.removeItem('udata');
        this.loggedUser.next(null);
        return of(false);
      })
    );
  }

  facebookLogin(accessToken: string) {
    return this.http.post(`${this.API_URL}/user-service/user/facebook`, JSON.stringify({accessToken: accessToken}), this.jsonHttpOptions);
  }
}
