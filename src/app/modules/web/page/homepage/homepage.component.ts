import {Component, OnDestroy, OnInit} from '@angular/core';
import {LayoutService} from '../../../../shared/service/layout.service';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html'
})
export class HomepageComponent implements OnInit, OnDestroy {

  constructor(private layoutService: LayoutService) { }

  ngOnInit() {
    this.layoutService.fixedHeader.next(true);
  }

  ngOnDestroy() {
    this.layoutService.fixedHeader.next(false);
  }
}
