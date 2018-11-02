import {AfterViewInit, Component, ElementRef, Input, OnInit, ViewChild} from '@angular/core';
import {BehaviorSubject} from 'rxjs';
import {LayoutService} from '../../../shared/service/layout.service';

@Component({
  selector: 'pv-header',
  templateUrl: './header.component.html'
})
export class HeaderComponent implements OnInit, AfterViewInit {

  @ViewChild('nav') nav: ElementRef;
  public fixedHeader: boolean;
  public isOnTop = false;
  private scrollOffset = null;

  constructor(private layoutService: LayoutService) {
    this.layoutService.fixedHeader.subscribe((status: boolean) => this.fixedHeader = status);
  }

  ngOnInit() {
  }

  ngAfterViewInit() {
    this.scrollOffset = this.nav.nativeElement.offsetHeight;
    console.log(this.scrollOffset);
  }

  onWindowScroll($event) {
    const verticalOffset = window.pageYOffset
      || document.documentElement.scrollTop
      || document.body.scrollTop || 0;
    if (verticalOffset >= this.scrollOffset) {
      this.isOnTop = true;
    } else {
      this.isOnTop = false;
    }
  }
}
