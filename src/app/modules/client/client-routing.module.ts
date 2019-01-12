import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {DashboardComponent} from './page/dashboard/dashboard.component';
import {SignUpComponent} from './page/sign-up/sign-up.component';
import {SettingsComponent} from './page/settings/settings.component';
import {ApplicationRegistrationComponent} from './page/application-registration/application-registration.component';

const routes: Routes = [
  {
    path: 'registrace',
    component: SignUpComponent
  },
  {
    path: 'stranka/registrace',
    component: ApplicationRegistrationComponent
  },
  {
    path: 'stranka/:appId',
    children: [
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'prehled'
      },
      {
        path: 'prehled',
        component: DashboardComponent
      },
      {
        path: 'nastaveni',
        component: SettingsComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ClientRoutingModule { }
