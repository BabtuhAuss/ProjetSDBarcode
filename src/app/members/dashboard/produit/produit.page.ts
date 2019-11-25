import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Produit } from 'src/app/Produit';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';

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
  constructor(private route: ActivatedRoute, private http: HttpClient) {  console.log(this.bareCode);}


  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.produitSearch = JSON.parse(params["p"]),
      console.log(this.produitSearch)
  });
  }
}
