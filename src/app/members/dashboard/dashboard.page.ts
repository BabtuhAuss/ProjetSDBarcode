import { AuthenticationService } from './../../services/authentication.service';
import { Component, OnInit , ViewChild } from '@angular/core';
import { IonInfiniteScroll } from '@ionic/angular';
import {ItemProduitComponent} from './item-produit/item-produit.component'
import { Produit } from 'src/app/Produit';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { computeStackId } from '@ionic/angular/dist/directives/navigation/stack-utils';
import { BarcodeScanner } from '@ionic-native/barcode-scanner/ngx';

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


  constructor(private authService: AuthenticationService, private http: HttpClient, private barcodeScanner: BarcodeScanner) { 
    this.addMoreItems();
  }
 


  scanBarcode(){
    this.barcodeScanner.scan().then(barcodeData => {
      console.log('Barcode data', barcodeData);
      this.addHistorique(barcodeData.text);
     }).catch(err => {
         console.log('Error', err);
     });
  }

  addHistorique(pBareCode:string){
    let json = {
      barCode : pBareCode,
      user: this.authService.currentUser
    }

    console.log("Le code barre scanné est : "+pBareCode);

    let httpoption = {headers : new HttpHeaders({
      'Content-Type' : 'application/json',
      'Access-Control-Allow-Origin':'*'
    })};

    this.http.post('http://192.168.43.6:5000/addHistorique', json, httpoption).subscribe(
      data=>{
        console.log("data"+data);
        if(data['result'] == "bon"){
          console.log("ouvrir la page produit");
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

    this.http.post('http://192.168.43.6:5000/getHistorique', json, httpoption).subscribe(
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