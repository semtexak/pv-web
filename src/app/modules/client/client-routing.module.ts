import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {DashboardComponent} from './page/dashboard/dashboard.component';

const routes: Routes = [
  {
    path: ':id',
    children: [
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'prehled'
      },
      {
        path: 'prehled',
        component: DashboardComponent
      }
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ClientRoutingModule { }
