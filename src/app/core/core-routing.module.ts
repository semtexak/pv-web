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
    loadChildren: () => import('../modules/web/web.module').then(m => m.WebModule)
  },
  {
    path: 'zakaznik',
    component: AdminLayoutComponent,
    loadChildren: () => import('../modules/user/user.module').then(m => m.UserModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'klient',
    component: AdminLayoutComponent,
    loadChildren: () => import('../modules/client/client.module').then(m => m.ClientModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'admin',
    component: AdminLayoutComponent,
    loadChildren: () => import('../modules/admin/admin.module').then(m => m.AdminModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'plugin',
    component: PluginLayoutComponent,
    loadChildren: () => import('../modules/plugin/plugin.module').then(m => m.PluginModule)
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {onSameUrlNavigation: 'reload'})
  ],
  exports: [RouterModule]
})
export class CoreRoutingModule {
}
