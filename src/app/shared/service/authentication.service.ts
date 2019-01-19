import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable, of, Subscription} from 'rxjs';
import {User} from '../model/user';
import {HttpService} from './http.service';
import {HttpClient, HttpParams} from '@angular/common/http';
import {ISingInForm} from '../model/i-sing-in-form';
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

  constructor(private http: HttpClient, private cookieService: CookieService) {
    super(http);
    const udata = localStorage.getItem('udata');
    if (udata && this.getToken() !== '') {
      this.loggedUser.next(this.mapUser(JSON.parse(udata)));
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

  private saveUser(): Observable<any> {
    return this.getUserData().pipe(
      switchMap((userData: User) => {
        const user = this.mapUser(userData);
        console.log(`User receiver ${userData.name}`);
        localStorage.setItem('udata', JSON.stringify(user));
        this.loggedUser.next(user);
        return this.getUserApplications(user.id).pipe(
          map(applications => {
            console.log(applications);
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
    return this.http.get(`${this.API_URL}/user-service/user/self`);
  }

  private logoutBackend(): Observable<any> {
    return this.http.delete(`${this.API_URL}/user-service/user/logout`);
  }


  private mapUser(userData: User) {
    const user = new User();
    user.id = userData.id;
    user.email = userData.email;
    user.name = userData.name ? userData.name : userData.email;
    user.authorities = userData.authorities;
    user.applications = userData.applications;
    return user;
  }

  private saveToken(token: IToken) {
    const current = new Date();
    const expiresAt = new Date(current.getTime() + (token.expires_in * 1000));
    this.cookieService.set('act', token.access_token, expiresAt, '/');
    console.log('Saving token', token.access_token);
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
        this.cookieService.delete('act', '/');
        localStorage.removeItem('udata');
        this.loggedUser.next(null);
        return of(true);
      }),
      catchError(error => {
        console.log(error);
        return of(false);
      })
    );
  }

}
