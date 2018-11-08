import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable, Subject} from 'rxjs';
import {IMessage} from '../model/i-message';
import {NavigationStart, Router} from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AlertService {

  private messages$: BehaviorSubject<IMessage[]> = new BehaviorSubject([]);
  private messages: IMessage[] = [];
  private keepAfterNavigationChange = false;

  constructor(private router: Router) {
    router.events.subscribe(event => {
      if (event instanceof NavigationStart) {
        if (this.keepAfterNavigationChange) {
          this.keepAfterNavigationChange = false;
        } else {
          this.messages = [];
          this.messages$.next(this.messages);
        }
      }
    });
  }

  success(message: string, keepAfterNavigationChange = false) {
    this.keepAfterNavigationChange = keepAfterNavigationChange;
    if (this.messages.length > 0) {
      this.messages = [];
    }
    this.messages.push({type: 'success', text: message});
    this.messages$.next(this.messages);
  }

  error(message: string, keepAfterNavigationChange = false) {
    this.keepAfterNavigationChange = keepAfterNavigationChange;
    if (this.messages.length > 0) {
      this.messages = [];
    }
    this.messages.push({type: 'danger', text: message});
    this.messages$.next(this.messages);
  }

  warning(message: string, keepAfterNavigationChange = false) {
    this.keepAfterNavigationChange = keepAfterNavigationChange;
    if (this.messages.length > 0) {
      this.messages = [];
    }
    this.messages.push({type: 'warning', text: message});
    this.messages$.next(this.messages);
  }

  info(message: string, keepAfterNavigationChange = false) {
    this.keepAfterNavigationChange = keepAfterNavigationChange;
    if (this.messages.length > 0) {
      this.messages = [];
    }
    this.messages.push({type: 'info', text: message});
    this.messages$.next(this.messages);
  }

  getMessages(): Observable<IMessage[]> {
    return this.messages$.asObservable();
  }
}
