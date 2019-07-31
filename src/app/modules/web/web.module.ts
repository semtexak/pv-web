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
import { PairAccountComponent } from './page/pair-account/pair-account.component';
import { AddressFormComponent } from './page/address-form/address-form.component';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatRadioModule } from '@angular/material/radio';
import { MatCardModule } from '@angular/material/card';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    WebRoutingModule,
    SharedModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule,
    MatRadioModule,
    MatCardModule,
    ReactiveFormsModule
  ],
  declarations: [ReceivePaymentComponent, HomepageComponent, ContactComponent, SignInComponent, ForgotPasswordComponent, SignUpComponent, UserActivationComponent, PasswordChangeComponent, ActivationKeyComponent, PairAccountComponent, AddressFormComponent]
})
export class WebModule { }
