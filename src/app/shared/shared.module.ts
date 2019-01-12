import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {DropdownDirective} from './directive/dropdown.directive';
import {DropdownMenuDirective} from './directive/dropdown-menu.directive';
import {DropdownToggleDirective} from './directive/dropdown-toggle.directive';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {CookieService} from 'ngx-cookie-service';
import {AlertsComponent} from './component/alerts/alerts.component';
import {AlertComponent} from './component/alerts/alert/alert.component';
import { PricePipe } from './pipe/pipe/price.pipe';
import {PipeModule} from './pipe/pipe.module';
import {TabComponent} from './component/tabs/tab/tab.component';
import {TabsComponent} from './component/tabs/tabs.component';

@NgModule({
  imports: [
    CommonModule,
    PipeModule,
    FormsModule,
    ReactiveFormsModule
  ],
  declarations: [
    AlertsComponent,
    AlertComponent,
    TabsComponent,
    TabComponent,
    DropdownDirective,
    DropdownMenuDirective,
    DropdownToggleDirective,
  ],
  providers: [
    CookieService
  ],
  exports: [
    DropdownDirective,
    DropdownMenuDirective,
    DropdownToggleDirective,
    PricePipe,
    AlertsComponent,
    AlertComponent,
    TabsComponent,
    TabComponent,
    FormsModule,
    PipeModule,
    ReactiveFormsModule
  ]
})
export class SharedModule {
}
