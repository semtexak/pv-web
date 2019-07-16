import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {PluginRoutingModule} from './plugin-routing.module';
import {SignInComponent} from './page/sign-in/sign-in.component';
import {SignUpComponent} from './page/sign-up/sign-up.component';
import {SharedModule} from '../../shared/shared.module';
import {ApplicationComponent} from './page/application/application.component';
import {DonationComponent} from './page/application/services/donation/donation.component';
import {SubscriptionComponent} from './page/application/services/subscription/subscription.component';
import {OrderStatusComponent} from './page/application/order-status/order-status.component';
import {ServicesComponent} from './page/application/services/services.component';
import {SideComponent} from './page/side/side.component';
import {PayComponent} from './page/side/pay/pay.component';
import {ActivationComponent} from './page/application/activation/activation.component';
import { HowItWorksComponent } from './page/how-it-works/how-it-works.component';
import { FooterComponent } from './component/footer/footer.component';
import { DonationProductComponent } from './page/application/services/donation/donation-product/donation-product.component';

@NgModule({
  imports: [
    CommonModule,
    PluginRoutingModule,
    SharedModule
  ],
  declarations: [
    SignInComponent,
    SignUpComponent,
    ApplicationComponent,
    DonationComponent,
    SubscriptionComponent,
    OrderStatusComponent,
    ServicesComponent,
    SideComponent,
    PayComponent,
    ActivationComponent,
    HowItWorksComponent,
    FooterComponent,
    DonationProductComponent
  ]
})
export class PluginModule {
}
