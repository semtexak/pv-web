import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {ReceivePaymentComponent} from './page/receive-payment/receive-payment.component';
import {HomepageComponent} from './page/homepage/homepage.component';
import {ContactComponent} from './page/contact/contact.component';
import {SignInComponent} from './page/sign-in/sign-in.component';
import {ForgotPasswordComponent} from './page/forgot-password/forgot-password.component';
import {SignUpComponent} from './page/sign-up/sign-up.component';
import {UserActivationComponent} from './page/user-activation/user-activation.component';
import {NotLoggedGuard} from '../../core/guard/not-logged.guard';
import {ActivationKeyComponent} from './page/activation-key/activation-key.component';
import {PasswordChangeComponent} from './page/password-change/password-change.component';
import {AuthGuard} from '../../core/guard/auth.guard';

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
    path: 'uzivatel',
    children: [
      {
        path: 'prihlaseni',
        component: SignInComponent,
        canActivate: [NotLoggedGuard]
      },
      {
        path: 'registrace',
        component: SignUpComponent
      },
      {
        path: 'zapomenute-heslo',
        component: ForgotPasswordComponent
      },
      {
        path: 'zmena-hesla',
        children: [
          {
            path: ':token',
            component: PasswordChangeComponent,
            canActivate: [NotLoggedGuard]
          },
          {
            path: '',
            pathMatch: 'full',
            component: PasswordChangeComponent,
            canActivate: [AuthGuard]
          },
        ]
      },
      {
        path: 'aktivace/novy-klic',
        component: ActivationKeyComponent
      },
      {
        path: 'aktivace/:activationKey',
        component: UserActivationComponent
      }
    ]
  },
  {
    path: 'kontakt',
    component: ContactComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class WebRoutingModule { }
