import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Produit } from 'src/app/Produit';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { AlertController, NavController } from '@ionic/angular';
import {Location} from '@angular/common';

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
  constructor(private route: ActivatedRoute,private nav: NavController, private http: HttpClient, private alertCtrl: AlertController, private _location: Location) {  console.log(this.bareCode);}

  signal(pCode : number){
    let json = {
      code : pCode
    }
    console.log("Code signalé :" + pCode);
    let httpoption = {headers : new HttpHeaders({
      'Content-Type' : 'application/json',
      'Access-Control-Allow-Origin':'*'
    })};
    var adresseRequest = environment.adressePython+"/signal"
    this.http.post(adresseRequest, json, httpoption).subscribe(
      data=>{
        if(data['result']=="added"){
          this.errorMsg = "Le signalement à été prit en compte";  
        }
        else if(data['result']=="retour"){
          this.nav.navigateForward(['members','dashboard']);
        }
        console.log(this.errorMsg);
      }
    )
  }


  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.produitSearch = JSON.parse(params["p"]),
      console.log(this.produitSearch)
  });
  }
}
