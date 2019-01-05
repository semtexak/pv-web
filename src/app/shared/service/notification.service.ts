import {Injectable} from '@angular/core';

import * as SockJS from 'sockjs-client';
import {CompatClient, Stomp} from '@stomp/stompjs';
import {BehaviorSubject} from 'rxjs';
import {INotification} from '../model/base/i-notification';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  private _notifications: INotification[] = [];
  private stompClient: CompatClient;

  notifications: BehaviorSubject<INotification[]> = new BehaviorSubject(this._notifications);

  constructor() {
    this.connect();
  }

  connect() {

    const socket = new SockJS('http://localhost:10000/notifications');
    // const socket = new SockJS('http://localhost:8765/ws');
    this.stompClient = Stomp.over(socket);
    this.stompClient.debug(null);

    const _this = this;
    this.stompClient.connect({}, function (frame) {
      _this.stompClient.subscribe('/pv/notifications', function (notificationsResponse) {
        _this._notifications = JSON.parse(notificationsResponse.body);
        console.log(_this._notifications);
        _this.notifications.next(_this._notifications);
      });
      _this.stompClient.subscribe('/topic/notification', function (notificationResponse) {
        _this._notifications.push(JSON.parse(notificationResponse.body));
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
}
