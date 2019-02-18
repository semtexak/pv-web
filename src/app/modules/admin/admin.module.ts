import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {AdminRoutingModule} from './admin-routing.module';
import {UsersComponent} from './page/users/users.component';
import {ClientsComponent} from './page/clients/clients.component';
import {SubscriptionsComponent} from './page/subscriptions/subscriptions.component';
import {OrdersComponent} from './page/orders/orders.component';
import {TableModule} from 'primeng/table';
import { NgSelectModule } from '@ng-select/ng-select';
import {FormsModule} from '@angular/forms';
import {ApplicationsComponent} from './page/applications/applications.component';
import {DonationsComponent} from './page/donations/donations.component';
import {PipeModule} from '../../shared/pipe/pipe.module';
import { UserDetailComponent } from './page/users/user-detail/user-detail.component';

@NgModule({
  imports: [
    CommonModule,
    AdminRoutingModule,
    PipeModule,
    TableModule,
    FormsModule,
    NgSelectModule
  ],
  declarations: [UsersComponent, ClientsComponent, ApplicationsComponent, SubscriptionsComponent, OrdersComponent, DonationsComponent, UserDetailComponent]
})
export class AdminModule {
}
