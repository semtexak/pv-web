import { Injectable } from '@angular/core';
import {IPage} from '../../../shared/model/i-page';
import {BehaviorSubject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TableService {

  page$: BehaviorSubject<IPage> = new BehaviorSubject(null);

  constructor() { }
}
