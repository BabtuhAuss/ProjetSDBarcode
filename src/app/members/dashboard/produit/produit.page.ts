import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Produit } from 'src/app/Produit';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { NavController } from '@ionic/angular';
import { NavigationExtras } from '@angular/router';

@Component({
  selector: 'app-produit',
  templateUrl: './produit.page.html',
  styleUrls: ['./produit.page.scss'],
})
export class ProduitPage implements OnInit {
  bareCode: string;
  nomProduit: Produit;

  errorMsg = '';
  produitSearch : Produit;
  constructor(private route: ActivatedRoute, private http: HttpClient, private navCtrl: NavController) {  console.log(this.bareCode);}


  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.produitSearch = JSON.parse(params["p"]);
  });
  }
  public modifyProduct(){
    console.log("modification");
    let navigationExtras: NavigationExtras = {
      queryParams: {
        produit: JSON.stringify(this.produitSearch)
      }
    };
    this.navCtrl.navigateForward(['members', 'edit-produit'], navigationExtras);
  }
}
