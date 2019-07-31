import {Component, OnDestroy, OnInit, Renderer2} from '@angular/core';
import {LoaderComponent} from '../../component/loader/loader.component';

@Component({
  selector: 'app-admin-layout',
  templateUrl: './mat-admin-layout.component.html'
})
export class AdminLayoutComponent implements OnInit, OnDestroy {

  public loader = LoaderComponent;

  constructor(private renderer: Renderer2) { }

  ngOnInit() {
    this.renderer.addClass(document.body, 'admin');
  }

  ngOnDestroy() {
    this.renderer.removeClass(document.body, 'admin');
  }
}
