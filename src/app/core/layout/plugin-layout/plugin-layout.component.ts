import {Component, OnDestroy, OnInit, Renderer2} from '@angular/core';

@Component({
  selector: 'app-plugin-layout',
  templateUrl: './plugin-layout.component.html'
})
export class PluginLayoutComponent implements OnInit, OnDestroy {

  constructor(private renderer: Renderer2) {
  }

  ngOnInit() {
    this.renderer.addClass(document.body, 'plugin');
  }

  ngOnDestroy() {
    this.renderer.removeClass(document.body, 'plugin');
  }
}
