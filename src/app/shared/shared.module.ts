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
import {EditorDirective} from './directive/editor.directive';
import { LoadingButtonComponent } from './component/loading-button/loading-button.component';
import {LoadingBarModule} from '@ngx-loading-bar/core';
import {LoadingBarRouterModule} from '@ngx-loading-bar/router';
import {LoadingBarHttpClientModule} from '@ngx-loading-bar/http-client';
import {SignInFormComponent} from './component/form/sign-in-form/sign-in-form.component';
import { SignUpFormComponent } from './component/form/sign-up-form/sign-up-form.component';
import { InputComponent } from './component/form/input/input.component';
import { SelectComponent } from './component/form/select/select.component';
import { RadioComponent } from './component/form/radio/radio.component';
import { WizardComponent } from './component/form/wizard/wizard.component';
import { MaterialModule } from './material.module';

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
    NgSelectModule,
    LoadingBarHttpClientModule,
    LoadingBarRouterModule,
    LoadingBarModule,
    MaterialModule
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
    SignInFormComponent,
    SignUpFormComponent,
    EditorDirective,
    TableComponent,
    LoadingButtonComponent,
    SignUpFormComponent,
    InputComponent,
    SelectComponent,
    RadioComponent,
    WizardComponent,
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
    LoadingBarHttpClientModule,
    LoadingBarRouterModule,
    LoadingBarModule,
    AlertsComponent,
    AlertComponent,
    TabsComponent,
    TabComponent,
    CartComponent,
    SignInFormComponent,
    SignUpFormComponent,
    InputComponent,
    SelectComponent,
    RadioComponent,
    WizardComponent,
    CartItemComponent,
    TableComponent,
    EditorDirective,
    FormsModule,
    PerfectScrollbarModule,
    PipeModule,
    ReactiveFormsModule,
    LoadingButtonComponent,
    TableModule,
    NgSelectModule,
    MaterialModule
  ]
})
export class SharedModule {
}
