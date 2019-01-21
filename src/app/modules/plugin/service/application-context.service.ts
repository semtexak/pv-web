import { Injectable } from '@angular/core';
import {BehaviorSubject, Subject} from 'rxjs';
import {IApplication} from '../../../shared/model/base/i-application';

@Injectable({
  providedIn: 'root'
})
export class ApplicationContextService {

  application: Subject<IApplication> = new Subject();

  constructor() { }
}
