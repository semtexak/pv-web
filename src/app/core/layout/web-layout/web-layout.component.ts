import {Component, OnInit} from '@angular/core';
import {LoaderComponent} from '../../component/loader/loader.component';

@Component({
  selector: 'app-web-layout',
  templateUrl: './web-layout.component.html'
})
export class WebLayoutComponent implements OnInit {

  public loader = LoaderComponent;

  constructor() {
  }

  ngOnInit() {

  }

}
