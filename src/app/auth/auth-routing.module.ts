import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { MapComponent } from '../pages/map/map.component';

import { AuthGuard } from '../guards/auth.guard';

const routes: Routes = [
  {
    path: 'auth',
    //canActivate: [AuthGuard],
    children: [
      { path: 'map', component: MapComponent }
    ],
  },
  { path: '**', redirectTo: '' }
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
