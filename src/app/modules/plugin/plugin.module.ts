import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PluginRoutingModule } from './plugin-routing.module';
import { SignInComponent } from './page/sign-in/sign-in.component';
import { SignUpComponent } from './page/sign-up/sign-up.component';
import { TestComponent } from './page/test/test.component';
import {SharedModule} from '../../shared/shared.module';
import { ApplicationComponent } from './page/application/application.component';
import { DonationComponent } from './page/application/donation/donation.component';
import { SubscriptionComponent } from './page/application/subscription/subscription.component';

@NgModule({
  imports: [
    CommonModule,
    PluginRoutingModule,
    SharedModule
  ],
  declarations: [SignInComponent, SignUpComponent, TestComponent, ApplicationComponent, DonationComponent, SubscriptionComponent]
})
export class PluginModule { }
