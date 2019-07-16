import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {ApplicationComponent} from './page/application/application.component';
import {DonationComponent} from './page/application/services/donation/donation.component';
import {SubscriptionComponent} from './page/application/services/subscription/subscription.component';
import {OrderStatusComponent} from './page/application/order-status/order-status.component';
import {ServicesComponent} from './page/application/services/services.component';
import { HowItWorksComponent } from './page/how-it-works/how-it-works.component';

const routes: Routes = [
  {
    path: 'app/:appId',
    component: ApplicationComponent,
    data: {redirectUrl: '/plugin/sign-in'},
    children: [
      {
        path: '',
        component: ServicesComponent
      },
      {
        path: 'donation',
        component: DonationComponent,
        children: [
          {
            path: 'how-it-works',
            component: HowItWorksComponent
          }
        ]
      },
      {
        path: 'subscription',
        component: SubscriptionComponent
      },
      {
        path: 'status',
        component: OrderStatusComponent
      },
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PluginRoutingModule { }
