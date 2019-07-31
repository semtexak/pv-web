import {Component, OnInit} from '@angular/core';
import {LoaderComponent} from '../../component/loader/loader.component';

@Component({
  selector: 'app-web-layout',
  templateUrl: './mat-web-layout.component.html'
})
export class WebLayoutComponent implements OnInit {

  public loader = LoaderComponent;

  navSections: Array<NavLinkSection> = [
    {
      title: 'Test',
      links: [
        {title: 'Přijímání plateb', route: '/prijimani-plateb', icon: 'payment'},
        {title: 'Kontakt', route: '/kontakt', icon: 'email'}
      ]
    }
  ];

  constructor() {
  }

  ngOnInit() {

  }

}

export interface NavLinkSection {
  title: string;
  links: NavLink[];
}

export interface NavLink {
  title: string;
  route: string;
  icon?: string;
}
