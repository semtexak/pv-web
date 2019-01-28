import { Injectable } from '@angular/core';
import {BehaviorSubject, Subject} from 'rxjs';
import {IApplication} from '../../../shared/model/base/i-application';
import {IOrder} from '../../../shared/model/base/i-order';

@Injectable({
  providedIn: 'root'
})
export class ApplicationContextService {

  application: Subject<IApplication> = new Subject();
  order: Subject<IOrder> = new Subject();

  constructor() { }
}
