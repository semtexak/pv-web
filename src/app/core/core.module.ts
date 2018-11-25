import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule} from '@angular/router';
import {CoreRoutingModule} from './core-routing.module';
import {AdminLayoutComponent} from './layout/admin-layout/admin-layout.component';
import {WebLayoutComponent} from './layout/web-layout/web-layout.component';
import {PluginLayoutComponent} from './layout/plugin-layout/plugin-layout.component';
import {HeaderComponent} from './component/header/header.component';
import {FooterComponent} from './component/footer/footer.component';
import {SidebarComponent} from './component/sidebar/sidebar.component';
import {SharedModule} from '../shared/shared.module';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {AuthenticationService} from '../shared/service/authentication.service';
import {ReactiveFormsModule} from '@angular/forms';
import {TokenInterceptor} from '../shared/service/interceptor/token-interceptor';
import {UserService} from '../shared/service/user.service';
import {NgHttpLoaderModule} from 'ng-http-loader';
import {LoaderComponent} from './component/loader/loader.component';
import {AlertService} from '../shared/service/alert.service';
import {SubscriptionService} from '../shared/service/subscription.service';
import {ClientService} from '../shared/service/client.service';

@NgModule({
  imports: [
    CommonModule,
    CoreRoutingModule,
    HttpClientModule,
    NgHttpLoaderModule,
    ReactiveFormsModule,
    SharedModule
  ],
  declarations: [
    AdminLayoutComponent,
    WebLayoutComponent,
    PluginLayoutComponent,
    LoaderComponent,
    HeaderComponent,
    FooterComponent,
    SidebarComponent
  ],
  exports: [
    RouterModule
  ],
  entryComponents: [
    LoaderComponent
  ],
  providers: [
    AuthenticationService,
    UserService,
    ClientService,
    SubscriptionService,
    AlertService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true
    }
  ]
})
export class CoreModule {
}
