import { Injectable } from '@angular/core';
import {HttpService} from './http.service';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DonationService extends HttpService {

  constructor(private http: HttpClient) {
    super(http);
  }

  getDonations(page: number, filter: string, orderBy: string): Observable<any> {
    return this.http.get(`${this.API_URL}/donation-service/donations/all?page=${page}${filter ? '&' + filter : ''}${orderBy ? '&sort=' + orderBy : ''}`);
  }

  getUserDonations(page: number, filter: string, orderBy: string): Observable<any> {
    return this.http.get(`${this.API_URL}/donation-service/donations?page=${page}${filter ? '&' + filter : ''}${orderBy ? '&sort=' + orderBy : ''}`);
  }

}
