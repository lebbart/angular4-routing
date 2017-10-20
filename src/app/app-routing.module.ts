import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {HomeComponent} from './home/home.component';
import {UsersComponent} from './users/users.component';
import {ServersComponent} from './servers/servers.component';
import {UserComponent} from './users/user/user.component';
import {EditServerComponent} from './servers/edit-server/edit-server.component';
import {ServerComponent} from './servers/server/server.component';
import {AuthGuard} from './auth-guard.service';
import {CanDeactivateGuard} from './servers/edit-server/can-deactivate.service';
import {ErrorPageComponent} from './error-page/error-page.component';
import {ServerResolver} from './servers/server/server-resolver.service';

const appRoutes: Routes = [{
  path: '',
  component: HomeComponent
}, {
  path: 'users',
  component: UsersComponent,
  children: [
    {
      path: ':id/:name',
      component: UserComponent
    }
  ]
}, {
  path: 'servers',
  component: ServersComponent,
  // canActivate: [AuthGuard],
  canActivateChild: [AuthGuard],
  children: [
    {
      path: ':id',
      component: ServerComponent,
      resolve: {
        server: ServerResolver
      }
    }, {
      path: ':id/edit',
      canDeactivate: [CanDeactivateGuard],
      component: EditServerComponent
    }
  ],
},
  {
    path: 'not-found',
    component: ErrorPageComponent,
    data: {
      msg: 'Page not found!'
    }
}, {
  path: '**',
  redirectTo: '/not-found',
  pathMatch: 'full'
}];

@NgModule({
  imports: [
    // RouterModule.forRoot(appRoutes, {useHash: true})
    RouterModule.forRoot(appRoutes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
