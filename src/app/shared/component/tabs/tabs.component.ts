import {AfterContentInit, Component, ContentChildren, Input, OnInit, QueryList} from '@angular/core';
import {TabComponent} from './tab/tab.component';

@Component({
  selector: 'pv-tabs',
  templateUrl: './tabs.component.html'
})
export class TabsComponent implements AfterContentInit {

  @ContentChildren(TabComponent) tabs: QueryList<TabComponent>;

  constructor() {
  }

  ngAfterContentInit(): void {
    let activeTabs = this.tabs.filter(it => it.active);

    if (activeTabs.length === 0) {
      this.selectTab(this.tabs.first);
    }
  }

  selectTab(tab) {
    this.tabs.forEach(it => it.active = false);

    tab.active = true;
  }

}
