import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {WebLayoutComponent} from './layout/web-layout/web-layout.component';
import {AdminLayoutComponent} from './layout/admin-layout/admin-layout.component';
import {PluginLayoutComponent} from './layout/plugin-layout/plugin-layout.component';
import {AuthGuard} from './guard/auth.guard';

const routes: Routes = [
  {
    path: '',
    component: WebLayoutComponent,
    loadChildren: '../modules/web/web.module#WebModule'
  },
  {
    path: 'zakaznik',
    component: AdminLayoutComponent,
    loadChildren: '../modules/user/user.module#UserModule',
    canActivate: [AuthGuard]
  },
  {
    path: 'klient',
    component: AdminLayoutComponent,
    loadChildren: '../modules/client/client.module#ClientModule',
    canActivate: [AuthGuard]
  },
  {
    path: 'admin',
    component: AdminLayoutComponent,
    loadChildren: '../modules/admin/admin.module#AdminModule',
    canActivate: [AuthGuard]
  },
  {
    path: 'plugin',
    component: PluginLayoutComponent,
    loadChildren: '../modules/admin/admin.module#AdminModule'
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})
export class CoreRoutingModule {
}
