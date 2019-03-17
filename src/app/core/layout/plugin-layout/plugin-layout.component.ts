import {Component, OnDestroy, OnInit, Renderer2} from '@angular/core';
import { WindowService } from 'src/app/shared/service/window.service';

@Component({
  selector: 'app-plugin-layout',
  templateUrl: './plugin-layout.component.html'
})
export class PluginLayoutComponent implements OnInit, OnDestroy {

  constructor(private renderer: Renderer2, private w: WindowService) {
    if (window.addEventListener) {
      window.addEventListener('message', this.receiveMessage.bind(this), false);
    } else {
      (<any>window).attachEvent('onmessage', this.receiveMessage.bind(this));
    }
  }

  ngOnInit() {
    this.renderer.addClass(document.body, 'plugin');
  }

  ngOnDestroy() {
    this.renderer.removeClass(document.body, 'plugin');
  }

  receiveMessage(event: MessageEvent) {
    let replaced = typeof event.data === 'string' ? event.data.replace('[iFrameSizer]message', '"message"') : event.data;
    if (event.data !== replaced) {
      replaced = '{' + replaced + '}';
      const message = JSON.parse(replaced);
      console.log(message);

      // this.isAdBlockActive = message.message.isAdBlockActive;
      // this.paymentService.isAdBlockActive = this.isAdBlockActive;
    } else {
      return;
    }
    if (event.origin !== 'http://localhost:4200') {
      return;
    }
    // localStorage.setItem('token', event.data.token);
    // localStorage.setItem('username', event.data.username);
    // (<any>window).popup.postMessage('success', 'http://localhost:3000');
  }
}
