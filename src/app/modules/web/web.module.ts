import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { WebRoutingModule } from './web-routing.module';
import { ReceivePaymentComponent } from './page/receive-payment/receive-payment.component';
import {SharedModule} from '../../shared/shared.module';
import { HomepageComponent } from './page/homepage/homepage.component';
import { ContactComponent } from './page/contact/contact.component';

@NgModule({
  imports: [
    CommonModule,
    WebRoutingModule,
    SharedModule
  ],
  declarations: [ReceivePaymentComponent, HomepageComponent, ContactComponent]
})
export class WebModule { }
