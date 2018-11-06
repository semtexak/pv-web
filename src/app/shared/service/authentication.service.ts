import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable, Subscription} from 'rxjs';
import {User} from '../model/user';
import {HttpService} from './http.service';
import {HttpClient, HttpParams} from '@angular/common/http';
import {ISingInForm} from '../model/i-sing-in-form';
import {environment} from '../../../environments/environment';
import {IToken} from '../model/i-token';
import {CookieService} from 'ngx-cookie-service';
import {map, mergeMap, switchMap} from 'rxjs/operators';
import {LoginStatus} from '../model/login-status';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService extends HttpService {

  public loggedUser: BehaviorSubject<User> = new BehaviorSubject(undefined);
  public status: BehaviorSubject<LoginStatus> = new BehaviorSubject(new LoginStatus(false));

  private grantType = environment.grantType;
  private clientId = environment.clientId;
  private clientSecret = environment.clientSecret;

  constructor(private http: HttpClient, private cookieService: CookieService) {
    super(http);
    const udata = localStorage.getItem('udata');
    if (udata && this.getToken() !== '') {
      this.loggedUser.next(JSON.parse(udata));
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
        return this.testSaveUser();
      })
    );
  }

  private testSaveUser(): Observable<any> {
    return this.getUserData().pipe(
      map((userData: User) => {
        const user = this.mapUser(userData);
        console.log(`User receiver ${userData.name}`);
        localStorage.setItem('udata', JSON.stringify(user));
        this.loggedUser.next(user);
        return user;
      })
    );
  }

  public obtainToken(params: HttpParams): Observable<any> {
    return this.http.post(`${this.API_URL}/user-service/token`, params.toString(), this.formAuthRequestOptions());
  }

  private saveUser() {
    this.getUserData().pipe(map((userData: User) => {
      return this.mapUser(userData);
    })).subscribe((user: User) => {
      this.loggedUser.next(user);
      localStorage.setItem('udata', JSON.stringify(user));
    });
  }

  private getUserData(): Observable<any> {
    return this.http.get(`${this.API_URL}/user-service/user/self`);
  }

  private mapUser(userData: User) {
    const user = new User();
    user.id = userData.id;
    user.email = userData.email;
    user.name = userData.name ? userData.name : userData.email;
    user.authorities = userData.authorities;
    return user;
  }

  private saveToken(token: IToken) {
    this.cookieService.set('act', token.access_token, new Date(token.expires_at), '/');
    console.log(`Token ${token.access_token} saved!`);
  }

  private prepareFormAuth(credentials: ISingInForm): HttpParams {
    return new HttpParams()
      .set('username', credentials.username)
      .set('password', credentials.password)
      .set('grant_type', this.grantType)
      .set('client_id', this.clientId)
      .set('client_secret', this.clientSecret);
  }
}