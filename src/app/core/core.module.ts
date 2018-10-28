import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule} from '@angular/router';
import {CoreRoutingModule} from './core-routing.module';
import { AdminLayoutComponent } from './layout/admin-layout/admin-layout.component';
import { WebLayoutComponent } from './layout/web-layout/web-layout.component';
import { PluginLayoutComponent } from './layout/plugin-layout/plugin-layout.component';
import { HeaderComponent } from './component/header/header.component';
import { FooterComponent } from './component/footer/footer.component';
import { SidebarComponent } from './component/sidebar/sidebar.component';
import {SharedModule} from '../shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    CoreRoutingModule,
    SharedModule
  ],
  declarations: [AdminLayoutComponent, WebLayoutComponent, PluginLayoutComponent, HeaderComponent, FooterComponent, SidebarComponent],
  exports: [
    RouterModule
  ]
})
export class CoreModule { }
