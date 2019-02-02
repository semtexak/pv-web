import { Injectable } from '@angular/core';
import {BehaviorSubject, Subject} from 'rxjs';
import {IApplication} from '../../../shared/model/base/i-application';
import {IOrder} from '../../../shared/model/base/i-order';

@Injectable({
  providedIn: 'root'
})
export class ApplicationContextService {

  application: BehaviorSubject<IApplication> = new BehaviorSubject(null);
  order: Subject<IOrder> = new Subject();

  constructor() { }
}
