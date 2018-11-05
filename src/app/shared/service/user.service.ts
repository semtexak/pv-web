import { Injectable } from '@angular/core';
import {HttpService} from './http.service';
import {HttpClient} from '@angular/common/http';
import {IForgotPasswordForm} from '../model/i-forgot-password-form';
import {Observable} from 'rxjs';
import {ISingUpForm} from '../model/i-sing-up-form';

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
}
