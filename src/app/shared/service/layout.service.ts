import { Injectable } from '@angular/core';
import {BehaviorSubject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LayoutService {

  public fixedHeader: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  constructor() { }
}
