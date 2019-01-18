import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import {HttpService} from './http.service';
import {HttpClient, HttpHeaders, HttpResponse} from '@angular/common/http';

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

  createApplication(form): Observable<HttpResponse<Object>> {
    let headers = new HttpHeaders();
    headers.set('Content-Type', null);
    headers.set('Accept', 'multipart/form-data');

    return this.http.post<HttpResponse<any>>(`${this.API_URL}/client-service/applications`, form, { observe: 'response', headers: headers});
  }

  addServicesToApplication(appId: string, form): Observable<any> {
    return this.http.post(`${this.API_URL}/client-service/applications/${appId}/services`, form);
  }

  getApplication(appId: string) {
    return this.http.get(`${this.API_URL}/client-service/applications/${appId}`);
  }
}
