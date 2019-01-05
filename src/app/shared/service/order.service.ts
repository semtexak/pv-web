import { Injectable } from '@angular/core';
import {HttpService} from './http.service';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OrderService extends HttpService {

  constructor(private http: HttpClient) {
    super(http);
  }

  getOrders(page: number, filter: string, orderBy: string): Observable<any> {
    return this.http.get(`${this.API_URL}/order-service/orders/all?page=${page}${filter ? '&' + filter : ''}${orderBy ? '&sort=' + orderBy : ''}`);
  }
}
