import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
 
const routes: Routes = [
  { path: 'dashboard', loadChildren: './dashboard/dashboard.module#DashboardPageModule' },
  { path: 'produit', loadChildren: './dashboard/produit/produit.module#ProduitPageModule' },  { path: 'edit-produit', loadChildren: './dashboard/produit/edit-produit/edit-produit.module#EditProduitPageModule' }

];
 
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MemberRoutingModule { }
