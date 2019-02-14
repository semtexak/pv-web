import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {MyAccountComponent} from './my-account/my-account.component';
import {DonationsComponent} from './services/donations/donations.component';
import {SubscriptionsComponent} from './services/subscriptions/subscriptions.component';
import {HelpComponent} from './help/help.component';
import {OrdersComponent} from './orders/orders.component';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: MyAccountComponent
  },
  {
    path: 'sluzby',
    children: [
      {
        path: 'dary',
        component: DonationsComponent
      },
      {
        path: 'predplatne',
        component: SubscriptionsComponent
      }
    ]
  },
  {
    path: 'platby',
    component: OrdersComponent
  },
  {
    path: 'napoveda',
    component: HelpComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }
