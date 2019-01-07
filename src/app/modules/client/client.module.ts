import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ClientRoutingModule } from './client-routing.module';
import { DashboardComponent } from './page/dashboard/dashboard.component';
import {CountoModule} from 'angular2-counto';

@NgModule({
  imports: [
    CommonModule,
    CountoModule,
    ClientRoutingModule
  ],
  declarations: [DashboardComponent]
})
export class ClientModule { }
