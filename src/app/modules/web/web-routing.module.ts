import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {ReceivePaymentComponent} from './page/receive-payment/receive-payment.component';
import {HomepageComponent} from './page/homepage/homepage.component';
import {ContactComponent} from './page/contact/contact.component';

const routes: Routes = [
  {
    path: '',
    component: HomepageComponent
  },
  {
    path: 'prijimani-plateb',
    component: ReceivePaymentComponent
  },
  {
    path: 'kontakt',
    component: ContactComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class WebRoutingModule { }
