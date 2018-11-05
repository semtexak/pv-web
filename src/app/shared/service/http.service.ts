import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {environment} from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  protected API_URL: string = environment.API_URL;

  constructor(private baseHttp: HttpClient) {
  }

  public jsonHttpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    })
  };

  public urlEncodedHttpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded',
    })
  };

  public formAuthRequestOptions() {
    return {
      headers: new HttpHeaders({
        'Content-Type': 'application/x-www-form-urlencoded',
      }),
      withCredentials: true
    };
  }
}
