import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule  } from '@angular/router';

// Angular material
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatListModule } from '@angular/material/list';

import { ListJobsComponent } from './list-jobs/list-jobs.component';
import { ProfileComponent } from './profile/profile.component';


@NgModule({
  declarations: [
    ListJobsComponent,
    ProfileComponent
  ],
  imports: [
    CommonModule,
    MatButtonModule,
    MatIconModule,
    RouterModule,
    MatDialogModule,
    MatSnackBarModule,
    MatListModule
  ],
  exports: [
    ListJobsComponent,
    ProfileComponent
  ]
})
export class ComponentsModule { }
