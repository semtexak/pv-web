import {AfterContentInit, Component, ContentChildren, EventEmitter, Input, OnInit, Output, QueryList} from '@angular/core';
import {TabComponent} from './tab/tab.component';

@Component({
  selector: 'pv-tabs',
  templateUrl: './tabs.component.html'
})
export class TabsComponent implements AfterContentInit {

  @Input() icons: boolean = false;
  @Input() justify: boolean = false;
  @Input() extended: boolean = false;
  @Input() defaultVisible: number = 4;
  @Output('onTabChange') onTabChange: EventEmitter<TabComponent> = new EventEmitter();
  @ContentChildren(TabComponent) tabs: QueryList<TabComponent>;

  constructor() {
  }

  ngAfterContentInit(): void {
    let activeTabs = this.tabs.filter(it => it.active);

    if (activeTabs.length === 0) {
      let tab = this.tabs.first;
      this.selectTab(tab);
      this.onTabChange.emit(tab);
    }
  }

  selectTab(tab) {
    this.tabs.forEach(it => it.active = false);

    tab.active = true;
    this.onTabChange.emit(tab);
  }

  activateToggleTab(tab: TabComponent, status: boolean) {
    tab.activated = status;
  }

  more() {
    this.extended = true;
  }
}
