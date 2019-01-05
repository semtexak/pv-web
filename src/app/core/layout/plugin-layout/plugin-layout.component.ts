import {Component, OnInit, Renderer2} from '@angular/core';

@Component({
  selector: 'app-plugin-layout',
  templateUrl: './plugin-layout.component.html'
})
export class PluginLayoutComponent implements OnInit {

  constructor(private renderer: Renderer2) { }

  ngOnInit() {
    this.renderer.addClass(document.body, 'plugin');
  }


}
