import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {HttpService} from './http.service';

@Injectable({
  providedIn: 'root'
})
export class SubscriptionService extends HttpService {

  constructor(private http: HttpClient) {
    super(http);
  }

  getSubscriptions(page: number, filter: string, orderBy: string): Observable<any> {
    return this.http.get(`${this.API_URL}/subscription-service/subscriptions/all?page=${page}${filter ? '&' + filter : ''}${orderBy ? '&sort=' + orderBy : ''}`);
  }
}
