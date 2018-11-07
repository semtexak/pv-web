import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { WebRoutingModule } from './web-routing.module';
import { ReceivePaymentComponent } from './page/receive-payment/receive-payment.component';
import {SharedModule} from '../../shared/shared.module';
import { HomepageComponent } from './page/homepage/homepage.component';
import { ContactComponent } from './page/contact/contact.component';
import { SignInComponent } from './page/sign-in/sign-in.component';
import { ForgotPasswordComponent } from './page/forgot-password/forgot-password.component';
import { SignUpComponent } from './page/sign-up/sign-up.component';
import { UserActivationComponent } from './page/user-activation/user-activation.component';
import { PasswordChangeComponent } from './page/password-change/password-change.component';
import { ActivationKeyComponent } from './page/activation-key/activation-key.component';

@NgModule({
  imports: [
    CommonModule,
    WebRoutingModule,
    SharedModule
  ],
  declarations: [ReceivePaymentComponent, HomepageComponent, ContactComponent, SignInComponent, ForgotPasswordComponent, SignUpComponent, UserActivationComponent, PasswordChangeComponent, ActivationKeyComponent]
})
export class WebModule { }
