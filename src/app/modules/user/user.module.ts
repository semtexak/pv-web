import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserRoutingModule } from './user-routing.module';
import { MyAccountComponent } from './my-account/my-account.component';
import { ServicesComponent } from './services/services.component';
import { DonationsComponent } from './services/donations/donations.component';
import { SubscriptionsComponent } from './services/subscriptions/subscriptions.component';
import { HelpComponent } from './help/help.component';
import { OrdersComponent } from './orders/orders.component';
import {SharedModule} from '../../shared/shared.module';
import { SocialMediaComponent } from './component/social-media/social-media.component';
import {TableModule} from 'primeng/table';
import {NgSelectModule} from '@ng-select/ng-select';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    TableModule,
    NgSelectModule,
    UserRoutingModule
  ],
  declarations: [MyAccountComponent, ServicesComponent, DonationsComponent, SubscriptionsComponent, HelpComponent, OrdersComponent, SocialMediaComponent]
})
export class UserModule { }
