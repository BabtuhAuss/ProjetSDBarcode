import { Component, OnInit, Input } from '@angular/core';
import { Produit } from 'src/app/Produit';
import { NavigationExtras } from '@angular/router';
import { IonInfiniteScroll, NavController } from '@ionic/angular';

@Component({
  selector: 'app-item-produit',
  templateUrl: './item-produit.component.html',
  styleUrls: ['./item-produit.component.scss'],
})
export class ItemProduitComponent implements OnInit {

  @Input() produit : Produit;
  constructor(private navCtrl : NavController) { }
  ngOnInit() {}

  redirect(){
    let navigationExtras: NavigationExtras = {
      queryParams: {
        p : JSON.stringify(this.produit)
      }
    };
    
  this.navCtrl.navigateForward(['members','produit'],navigationExtras);
  }

}
