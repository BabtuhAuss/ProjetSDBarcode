import { AuthenticationService } from './../../services/authentication.service';
import { Component, OnInit , ViewChild } from '@angular/core';
import { IonInfiniteScroll } from '@ionic/angular';
import {ItemProduitComponent} from './item-produit/item-produit.component'
import { Produit } from 'src/app/Produit';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
})
export class DashboardPage implements OnInit {

  @ViewChild(IonInfiniteScroll, {static: false}) infiniteScroll: IonInfiniteScroll;

  @ViewChild(ItemProduitComponent, {static: false}) child: ItemProduitComponent;

  items = []; 
  compteurBaseDeDonnee =0;


  constructor(private authService: AuthenticationService) { 
    this.addMoreItems();
  }
 
  loadData(event) {
    setTimeout(() => {
      console.log('Done');
      event.target.complete();
      this.addMoreItems();
      // App logic to determine if all data is loaded
      // and disable the infinite scroll
      if (this.items.length == 100) {
        event.target.disabled = true;
      }
    }, 1000);
  }
  toggleInfiniteScroll() {
    this.infiniteScroll.disabled = !this.infiniteScroll.disabled;
  }
  ngOnInit() {
  }
 
  addMoreItems(){

    //récupération des items de l'historique 20 par 20 pour une bonne optimisation
    //dans la requète select, définir une clause "where id > compteurBaseDeDonnee and id < compteurBaseDeDonnee + 20"
    for(let i = this.compteurBaseDeDonnee; i < this.compteurBaseDeDonnee+ 20; i++){
      let produit = new Produit(i, 'NOM DU PRODUIT'); 
      //let componentItem = new ItemProduitComponent(i);
      this.items.push(produit);
    }
    this.compteurBaseDeDonnee += 20;
  }
  
  logout() {
    this.authService.logout();
  }
}