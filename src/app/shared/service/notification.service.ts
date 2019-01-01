import {Injectable} from '@angular/core';

import * as SockJS from 'sockjs-client';
import {CompatClient, Stomp} from '@stomp/stompjs';
import {BehaviorSubject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  private _notifications: string[] = [];
  private stompClient: CompatClient;

  notifications: BehaviorSubject<string[]> = new BehaviorSubject(this._notifications);

  constructor() {
    this.connect();
  }

  connect() {

    const socket = new SockJS('http://localhost:10000/notifications');
    // const socket = new SockJS('http://localhost:8765/notification-service/notifications');
    this.stompClient = Stomp.over(socket);
    this.stompClient.debug(null);

    const _this = this;
    this.stompClient.connect({}, function (frame) {
      console.log('Connected');
      _this.stompClient.subscribe('/pv/notifications', function (hi) {
        console.log(hi.body);
        console.log(JSON.parse(hi.body));
        _this._notifications = JSON.parse(hi.body);
        _this.notifications.next(_this._notifications);
      });
      _this.stompClient.subscribe('/topic/notification', function (hello) {
        console.log(hello.body);
        _this._notifications.push(hello.body);
        _this.notifications.next(_this._notifications);
      });
    });
  }

  disconnect() {
    if (this.stompClient != null) {
      this.stompClient.disconnect();
    }

    console.log('Disconnected!');
  }

  sendTest() {
    this.stompClient.send(
      '/pv/notification',
      {},
      JSON.stringify({'name': 'AA'})
    );
  }

  showGreeting(message) {
    this.notifications.getValue().push(message);
    this.notifications.next(this.notifications.getValue());
  }
}
