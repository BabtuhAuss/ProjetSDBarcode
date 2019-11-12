import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { DashboardPage } from './dashboard.page';

import {ItemProduitComponent} from './item-produit/item-produit.component';
import { BarcodeScanner } from '@ionic-native/barcode-scanner/ngx';

const routes: Routes = [
  {
    path: '',
    component: DashboardPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [DashboardPage,ItemProduitComponent],
  providers : [BarcodeScanner]
})
export class DashboardPageModule {}
