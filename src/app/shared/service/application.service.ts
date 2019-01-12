import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import {HttpService} from './http.service';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ApplicationService extends HttpService {

  constructor(private http: HttpClient) {
    super(http);
  }

  getApplicationStatistics(appId: string, from: string, to: string): Observable<any> {
    return this.http.get(`${this.API_URL}/client-service/applications/${appId}/statistics?from=${from}&to=${to}`);
  }

  createApplication(form): Observable<any> {
    return this.http.post(`${this.API_URL}/client-service/applications/logo`, form);
  }
}
