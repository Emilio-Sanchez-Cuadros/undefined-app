import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LandingPageComponent } from './landing-page/landing-page.component'
import { UsersComponent } from './users/users.component'
import { UsersService } from './users/users.service';

const routes: Routes = [
  {
    path: '',
    component: LandingPageComponent
  },
  {
    path: 'users',
    component: UsersComponent,
    // canActivate: [RoleGuard],
    // resolve: {
    //     users: UsersService
    // }
  },
  { path: '**', redirectTo: '' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
