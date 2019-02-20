import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {AdminRoutingModule} from './admin-routing.module';
import {UsersComponent} from './page/users/users.component';
import {ClientsComponent} from './page/clients/clients.component';
import {SubscriptionsComponent} from './page/subscriptions/subscriptions.component';
import {OrdersComponent} from './page/orders/orders.component';
import {FormsModule} from '@angular/forms';
import {ApplicationsComponent} from './page/applications/applications.component';
import {DonationsComponent} from './page/donations/donations.component';
import {PipeModule} from '../../shared/pipe/pipe.module';
import { UserDetailComponent } from './page/users/user-detail/user-detail.component';
import {SharedModule} from '../../shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    AdminRoutingModule,
    PipeModule,
    FormsModule,
  ],
  declarations: [UsersComponent, ClientsComponent, ApplicationsComponent, SubscriptionsComponent, OrdersComponent, DonationsComponent, UserDetailComponent]
})
export class AdminModule {
}
