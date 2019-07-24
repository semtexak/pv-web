import { Component, OnInit, Input, APP_ID } from '@angular/core';
import { HowItWorksComponent } from '../../page/how-it-works/how-it-works.component';

@Component({
  selector: 'pv-footer',
  templateUrl: './footer.component.html'
})
export class FooterComponent implements OnInit {

  @Input() appId: string;
  @Input() type: string;
  @Input() purchasing: boolean = false;

  constructor() { }

  ngOnInit() {
  }

}
