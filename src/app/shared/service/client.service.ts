import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {HttpService} from './http.service';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ClientService extends HttpService {

  constructor(private http: HttpClient) {
    super(http);
  }

  getClients(page: number, filter: string, orderBy: string): Observable<any> {
    return this.http.get(`${this.API_URL}/client-service/clients/all?page=${page}${filter ? '&' + filter : ''}${orderBy ? '&sort=' + orderBy : ''}`);
  }

  getApplications(page: number, filter: string, orderBy: string): Observable<any> {
    return this.http.get(`${this.API_URL}/client-service/applications/all?page=${page}${filter ? '&' + filter : ''}${orderBy ? '&sort=' + orderBy : ''}`);
  }

  getApplication(appId: string): Observable<any> {
    return this.http.get(`${this.API_URL}/client-service/applications/${appId}`);
  }

  getAresData(ico: number): Observable<any> {
    return this.http.get(`${this.API_URL}/client-service/ares/${ico}`);
  }

  createClient(form): Observable<any> {
    return this.http.post(`${this.API_URL}/client-service/clients`, JSON.stringify(form), this.jsonHttpOptions);
  }
}
