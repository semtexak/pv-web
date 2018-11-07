import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {DropdownDirective} from './directive/dropdown.directive';
import {DropdownMenuDirective} from './directive/dropdown-menu.directive';
import {DropdownToggleDirective} from './directive/dropdown-toggle.directive';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {CookieService} from 'ngx-cookie-service';
import {AlertsComponent} from './component/alerts/alerts.component';
import {AlertComponent} from './component/alerts/alert/alert.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule
  ],
  declarations: [
    AlertsComponent,
    AlertComponent,
    DropdownDirective,
    DropdownMenuDirective,
    DropdownToggleDirective
  ],
  providers: [
    CookieService
  ],
  exports: [
    DropdownDirective,
    DropdownMenuDirective,
    DropdownToggleDirective,
    AlertsComponent,
    AlertComponent,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class SharedModule {
}
