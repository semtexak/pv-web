import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SignInComponent } from './page/sign-in/sign-in.component';
import { SignUpComponent } from './page/sign-up/sign-up.component';
import {TestComponent} from './page/test/test.component';
import {ApplicationComponent} from './page/application/application.component';
import {DonationComponent} from './page/application/donation/donation.component';
import {SubscriptionComponent} from './page/application/subscription/subscription.component';

const routes: Routes = [
  {
    path: 'sign-in',
    component: SignInComponent
  },
  {
    path: 'sign-up',
    component: SignUpComponent
  },
  {
    path: 'app/:appId',
    component: ApplicationComponent,
    children: [
      {
        path: 'donation',
        component: DonationComponent
      },
      {
        path: 'subscription',
        component: SubscriptionComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PluginRoutingModule { }
