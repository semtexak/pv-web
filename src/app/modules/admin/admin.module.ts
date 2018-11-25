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

;

@NgModule({
  imports: [
    CommonModule,
    AdminRoutingModule,
    TableModule,
    FormsModule,
    NgSelectModule
  ],
  declarations: [UsersComponent, ClientsComponent, SubscriptionsComponent, OrdersComponent]
})
export class AdminModule {
}
