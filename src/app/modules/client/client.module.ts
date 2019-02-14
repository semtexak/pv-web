import { NgModule } from '@angular/core';
import {CommonModule} from '@angular/common';

import { ClientRoutingModule } from './client-routing.module';
import { DashboardComponent } from './page/dashboard/dashboard.component';
import {CountoModule} from 'angular2-counto';
import { SignUpComponent } from './page/sign-up/sign-up.component';
import { SettingsComponent } from './page/settings/settings.component';
import {PipeModule} from '../../shared/pipe/pipe.module';
import {SharedModule} from '../../shared/shared.module';
import { ApplicationRegistrationComponent } from './page/application-registration/application-registration.component';
import {NgSelectModule} from '@ng-select/ng-select';
import { InvoicesComponent } from './page/invoices/invoices.component';
import {TableModule} from 'primeng/table';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    CountoModule,
    PipeModule,
    TableModule,
    NgSelectModule,
    ClientRoutingModule
  ],
  declarations: [DashboardComponent, SignUpComponent, SettingsComponent, ApplicationRegistrationComponent, InvoicesComponent]
})
export class ClientModule { }
