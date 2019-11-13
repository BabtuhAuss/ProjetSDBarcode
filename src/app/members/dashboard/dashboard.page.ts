import { AuthenticationService } from './../../services/authentication.service';
import { Component, OnInit , ViewChild } from '@angular/core';
import { IonInfiniteScroll } from '@ionic/angular';
import {ItemProduitComponent} from './item-produit/item-produit.component'
import { Produit } from 'src/app/Produit';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { computeStackId } from '@ionic/angular/dist/directives/navigation/stack-utils';
import { environment } from 'src/environments/environment';

const token_key = 'auth-token';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
})

export class DashboardPage implements OnInit {

errorMsg = '';

  @ViewChild(IonInfiniteScroll, {static: false}) infiniteScroll: IonInfiniteScroll;

  @ViewChild(ItemProduitComponent, {static: false}) child: ItemProduitComponent;

  items = []; 
  compteurBaseDeDonnee =0;


  constructor(private authService: AuthenticationService, private http: HttpClient) { 
    this.addMoreItems();
  }
 
  addHistorique(pBareCode:number){
    let json = {
      barCode : pBareCode,
    }

    console.log("Le code barre scanné est : "+pBareCode);

    let httpoption = {headers : new HttpHeaders({
      'Content-Type' : 'application/json',
      'Access-Control-Allow-Origin':'*'
    })};
    var adresseRequest = environment.adressePython+"/addHistorique"
    console.log("ladresse du python est "+adresseRequest)
    this.http.post(adresseRequest , json, httpoption).subscribe(
      data=>{
        console.log("data"+data);
        if(data['result'] == "bon"){
          console.log("ouvrir la page produit");
          //renvoie vers la page produit
        }
      }
    );
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

  getHistoriqueHttp(pUser:string){
    let json = {
      user : pUser,
      debut : this.compteurBaseDeDonnee
    }

    console.log("user pour la requete :" + pUser);
    let httpoption = {headers : new HttpHeaders({
      'Content-Type' : 'application/json',
      'Access-Control-Allow-Origin':'*'
    })};
    var adresseRequest = environment.adressePython+"/getHistorique"
    this.http.post(adresseRequest, json, httpoption).subscribe(
      data=>{
        console.log("data" + data);
        if(data['result']=="Il n'y a aucun produit dans votre historique"){
          this.errorMsg = data['result'];
        }
        else{
          let compteur = 0
          for(let i in data){
            let testProduit = data[i] as Produit;
            this.items.push(testProduit);
            compteur++;
          }
          console.log(compteur);
          this.compteurBaseDeDonnee += compteur;
        }
      }
    )
  }


  addMoreItems(){
    this.getHistoriqueHttp(this.authService.currentUser);  
  }
  
  logout() {
    this.authService.logout();
  }
}