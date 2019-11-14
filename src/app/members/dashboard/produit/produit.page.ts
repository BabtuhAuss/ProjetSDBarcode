import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Produit } from 'src/app/Produit';

@Component({
  selector: 'app-produit',
  templateUrl: './produit.page.html',
  styleUrls: ['./produit.page.scss'],
})
export class ProduitPage implements OnInit {
  bareCode: string;
  produit: Produit;


  constructor(private route: ActivatedRoute) {  console.log(this.bareCode);}


  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.bareCode = params["barcode"];
      this.produit = params["produit"];
      console.log("produit dans la page produit : " + this.produit);
  });
  }

}
