import {Injectable} from '@angular/core';
import {HttpService} from './http.service';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {ISingUpForm} from '../model/i-sing-up-form';
import {IChangePasswordForm} from '../model/i-change-password-form';

@Injectable({
  providedIn: 'root'
})
export class UserService extends HttpService {

  constructor(private http: HttpClient) {
    super(http);
  }

  forgotPassword(email: string): Observable<any> {
    return this.http.put(`${this.API_URL}/user-service/user/forgot-password`, JSON.stringify({email: email}), this.jsonHttpOptions);
  }

  registerUser(form: ISingUpForm): Observable<any> {
    return this.http.post(`${this.API_URL}/user-service/user/register`, JSON.stringify(form), this.jsonHttpOptions);
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
