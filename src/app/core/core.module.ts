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
import {TokenInterceptor} from '../shared/service/interceptor/token-interceptor';
import {UserService} from '../shared/service/user.service';
import {NgHttpLoaderModule} from 'ng-http-loader';
import {LoaderComponent} from './component/loader/loader.component';
import {AlertService} from '../shared/service/alert.service';
import {SubscriptionService} from '../shared/service/subscription.service';
import {ClientService} from '../shared/service/client.service';
import {DonationService} from '../shared/service/donation.service';
import {OrderService} from '../shared/service/order.service';
import {ApplicationService} from '../shared/service/application.service';
import {CartService} from '../shared/service/cart.service';
import {AuthServiceConfig, FacebookLoginProvider, LoginOpt, SocialLoginModule} from 'angularx-social-login';
import { WindowService } from '../shared/service/window.service';

export function getSocialConfig() {
  const fbLoginOptions: LoginOpt = {
    scope: 'email',
    return_scopes: true,
    enable_profile_selector: true
  };
  return new AuthServiceConfig(
    [
      {
        id: FacebookLoginProvider.PROVIDER_ID,
        provider: new FacebookLoginProvider('200484067346822', fbLoginOptions)
      },
    ]
  );
}

@NgModule({
  imports: [
    CommonModule,
    CoreRoutingModule,
    HttpClientModule,
    SocialLoginModule,
    NgHttpLoaderModule,
    SharedModule
  ],
  declarations: [
    AdminLayoutComponent,
    WebLayoutComponent,
    PluginLayoutComponent,
    LoaderComponent,
    HeaderComponent,
    FooterComponent,
    SidebarComponent,
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
    ApplicationService,
    SubscriptionService,
    DonationService,
    OrderService,
    AlertService,
    CartService,
    WindowService,
    {
      provide: AuthServiceConfig,
      useFactory: getSocialConfig
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true
    },
  ]
})
export class CoreModule {
}
