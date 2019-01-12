import { Injectable } from '@angular/core';
import {BehaviorSubject, Subject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LayoutService {

  public fixedHeader: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  public sidebarMinimized: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  isLoading: BehaviorSubject<boolean> = new BehaviorSubject(false);

  constructor() { }
}
