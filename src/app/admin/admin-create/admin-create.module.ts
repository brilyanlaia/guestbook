import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { AdminCreatePage } from './admin-create.page';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

const routes: Routes = [
  {
    path: '',
    component: AdminCreatePage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    
    ReactiveFormsModule,
    
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [AdminCreatePage]
})
export class AdminCreatePageModule {}
