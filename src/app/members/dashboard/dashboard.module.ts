import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { DashboardPage } from './dashboard.page';

import {ItemProduitComponent} from './item-produit/item-produit.component';
import { BarcodeScanner } from '@ionic-native/barcode-scanner/ngx';
import { ProduitPage } from './produit/produit.page';
import { Component } from '@angular/core';

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
    RouterModule.forChild(routes),
  ],
  providers: [
    BarcodeScanner,
  ],
  declarations: [DashboardPage,ItemProduitComponent]
})
export class DashboardPageModule {}
