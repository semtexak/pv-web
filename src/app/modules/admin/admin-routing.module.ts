import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {ClientsComponent} from './page/clients/clients.component';
import {SubscriptionsComponent} from './page/subscriptions/subscriptions.component';
import {OrdersComponent} from './page/orders/orders.component';
import {UsersComponent} from './page/users/users.component';

const routes: Routes = [
  {
    path: 'uzivatele',
    component: UsersComponent
  },
  {
    path: 'klienti',
    component: ClientsComponent
  },
  {
    path: 'predplatne',
    component: SubscriptionsComponent
  },
  {
    path: 'objednavky',
    component: OrdersComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
