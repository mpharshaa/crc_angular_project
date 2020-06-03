import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


import{ChangePasswordComponent} from './change-password/change-password.component';
import{ResetPasswordComponent} from 'src/app/reset-password/reset-password.component';
import{HomeComponent} from'./home/home.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { AuthGuard } from './auth.guard';
import {LoginPageComponent} from 'src/app/login-page/login-page.component';
import {ServerUnavailableComponent} from 'src/app/server-unavailable/server-unavailable.component'

const routes: Routes = [
  { path: '',pathMatch: 'full',redirectTo: 'home', canActivate: [AuthGuard]},
  { path:"login", component:LoginPageComponent},
  { path:"changePassword", component:ChangePasswordComponent, canActivate: [AuthGuard]},
  { path:"resetPassword", component:ResetPasswordComponent, canActivate: [AuthGuard]},
   { path:"home", component:HomeComponent , canActivate: [AuthGuard]},
  {path:"serverUnavailable" , component:ServerUnavailableComponent},
  {path:"**", component:PageNotFoundComponent}
]

@NgModule({
  imports: [RouterModule.forRoot(routes,{useHash: true})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
