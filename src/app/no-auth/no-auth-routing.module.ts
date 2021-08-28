import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LoginComponent } from '../pages/login/login.component';

import { NoAuthGuard } from '../guards/no-auth.guard';

const routes: Routes = [
  {
    path: '',
    //canActivate: [NoAuthGuard],
    children: [
      { path: '', component: LoginComponent }
    ]
  },
  { path: '**', redirectTo: '' }
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class NoAuthRoutingModule { }
