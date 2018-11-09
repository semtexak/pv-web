import {Component, OnInit} from '@angular/core';
import {LoaderComponent} from '../../component/loader/loader.component';

@Component({
  selector: 'app-admin-layout',
  templateUrl: './admin-layout.component.html'
})
export class AdminLayoutComponent implements OnInit {

  public loader = LoaderComponent;

  constructor() {
  }

  ngOnInit() {
  }

}
