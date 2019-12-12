import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { KursiDetailPage } from './kursi-detail.page';
import { IonicSelectableModule } from 'ionic-selectable'
const routes: Routes = [
  {
    path: '',
    component: KursiDetailPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes),
    IonicSelectableModule
  ],
  declarations: [KursiDetailPage]
})
export class KursiDetailPageModule {}
