import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {ClientsComponent} from './page/clients/clients.component';
import {SubscriptionsComponent} from './page/subscriptions/subscriptions.component';
import {OrdersComponent} from './page/orders/orders.component';
import {UsersComponent} from './page/users/users.component';
import {ApplicationsComponent} from './page/applications/applications.component';
import {DonationsComponent} from './page/donations/donations.component';

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
    path: 'stranky',
    component: ApplicationsComponent
  },
  {
    path: 'sluzby',
    children: [
      {
        path: 'predplatne',
        component: SubscriptionsComponent
      },
      {
        path: 'dary',
        component: DonationsComponent
      }
    ]
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
