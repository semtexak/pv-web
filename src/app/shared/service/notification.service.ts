import {Injectable} from '@angular/core';

import * as SockJS from 'sockjs-client';
import {CompatClient, Stomp} from '@stomp/stompjs';
import {BehaviorSubject} from 'rxjs';
import {INotification} from '../model/base/i-notification';
import {AuthenticationService} from './authentication.service';
import {User} from '../model/user';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  private notifications: INotification[] = [];
  private stompClient: CompatClient;

  notifications$: BehaviorSubject<INotification[]> = new BehaviorSubject(this.notifications);

  constructor(private authenticationService: AuthenticationService) {
    this.authenticationService.loggedUser.subscribe((user: User) => {
      console.log(user);
      if (user) {
        this.connect(user.id);
      } else {
        this.disconnect();
      }
    });
  }

  connect(userId: number) {
    const socket = new SockJS('http://localhost:10000/notifications');
    this.stompClient = Stomp.over(socket);
    this.stompClient.debug(null);

    this.stompClient.connect({userId: userId}, frame => {
      this.stompClient.subscribe(`/pv/notifications/${userId}`, response => {
        this.notifications = JSON.parse(response.body);
        this.notifications$.next(this.notifications);
      });
      this.stompClient.subscribe(`/topic/notification/${userId}`, response => {
        this.notifications.push(JSON.parse(response.body));
        this.notifications$.next(this.notifications);
      });
    });
  }

  disconnect() {
    if (this.stompClient != null) {
      this.stompClient.disconnect();
      console.log('Disconnected!');
    }

  }

  sendTest() {
    this.stompClient.send(
      '/pv/notification',
      {},
      JSON.stringify({'name': 'AA'})
    );
  }
}
