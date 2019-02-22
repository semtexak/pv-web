import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {DropdownDirective} from './directive/dropdown.directive';
import {DropdownMenuDirective} from './directive/dropdown-menu.directive';
import {DropdownToggleDirective} from './directive/dropdown-toggle.directive';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {CookieService} from 'ngx-cookie-service';
import {AlertsComponent} from './component/alerts/alerts.component';
import {AlertComponent} from './component/alerts/alert/alert.component';
import {PricePipe} from './pipe/pipe/price.pipe';
import {PipeModule} from './pipe/pipe.module';
import {TabComponent} from './component/tabs/tab/tab.component';
import {TabsComponent} from './component/tabs/tabs.component';
import {CartComponent} from './component/cart/cart.component';
import {CartItemComponent} from './component/cart/cart-item/cart-item.component';
import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
import { PERFECT_SCROLLBAR_CONFIG } from 'ngx-perfect-scrollbar';
import { PerfectScrollbarConfigInterface } from 'ngx-perfect-scrollbar';
import { TooltipModule } from 'ng2-tooltip-directive';
import {TableComponent} from './component/table/table.component';
import {TableModule} from 'primeng/table';
import {NgSelectModule} from '@ng-select/ng-select';

const DEFAULT_PERFECT_SCROLLBAR_CONFIG: PerfectScrollbarConfigInterface = {
  suppressScrollX: true
};

@NgModule({
  imports: [
    CommonModule,
    PipeModule,
    PerfectScrollbarModule,
    FormsModule,
    TooltipModule,
    ReactiveFormsModule,
    TableModule,
    NgSelectModule
  ],
  declarations: [
    AlertsComponent,
    AlertComponent,
    TabsComponent,
    TabComponent,
    DropdownDirective,
    DropdownMenuDirective,
    DropdownToggleDirective,
    CartComponent,
    CartItemComponent,
    TableComponent,
  ],
  providers: [
    CookieService,
    {
      provide: PERFECT_SCROLLBAR_CONFIG,
      useValue: DEFAULT_PERFECT_SCROLLBAR_CONFIG
    }
  ],
  exports: [
    DropdownDirective,
    DropdownMenuDirective,
    DropdownToggleDirective,
    TooltipModule,
    PricePipe,
    AlertsComponent,
    AlertComponent,
    TabsComponent,
    TabComponent,
    CartComponent,
    CartItemComponent,
    TableComponent,
    FormsModule,
    PerfectScrollbarModule,
    PipeModule,
    ReactiveFormsModule,
    TableModule,
    NgSelectModule
  ]
})
export class SharedModule {
}
