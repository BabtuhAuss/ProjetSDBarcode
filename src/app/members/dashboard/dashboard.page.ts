import { AuthenticationService } from './../../services/authentication.service';
import { Component, OnInit , ViewChild } from '@angular/core';
import { IonInfiniteScroll, NavController } from '@ionic/angular';
import {ItemProduitComponent} from './item-produit/item-produit.component'
import { Produit } from 'src/app/Produit';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { computeStackId } from '@ionic/angular/dist/directives/navigation/stack-utils';
import { Storage } from '@ionic/storage';
import { environment } from 'src/environments/environment';
import { NavigationExtras } from '@angular/router';
import { BarcodeScanner } from '@ionic-native/barcode-scanner/ngx';
import { AlertController } from '@ionic/angular';

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


  constructor(public alertController: AlertController, private navCtrl : NavController, private authService: AuthenticationService, private http: HttpClient, private barcodeScanner: BarcodeScanner, private storage: Storage) { 
    //this.doRefresh();
  }
 
  deleteHist(){
    let json = {
      user: this.authService.currentUser
    };
    let httpoption = {headers : new HttpHeaders({
      'Content-Type' : 'application/json',
      'Access-Control-Allow-Origin':'*'
    })};
    var adresseRequest = environment.adressePython+"/deleteHist"
    this.http.post(adresseRequest, json, httpoption).subscribe(
      data=>{
        if(data['result'] == 'delete'){
          this.doRefresh();
        }
      }
    )
  }

  async presentAlertConfirm() {
    const alert = await this.alertController.create({
      header: 'Suppression !',
      message: 'Êtes-vous sur de vouloir supprimer votre historique ?',
      buttons: [
        {
          text: 'Non',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
            console.log('Confirm Cancel: blah');
          }
        }, {
          text: 'Oui',
          handler: () => {
            this.deleteHist()
          }
        }
      ]
    });

    await alert.present();
  }


  scanBarcode(){
    this.barcodeScanner.scan().then(barcodeData => {
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
    var adresseRequest = environment.adressePython+"/addHistorique"
    this.http.post(adresseRequest , json, httpoption).subscribe(
      data=>{
        if(data['result'] == "bon"){
          this.doRefresh();
          let produit = this.searchHttp(pBareCode);
          //this.addMoreItems();
          //this.items.push(produit);
          let navigationExtras: NavigationExtras = {
            queryParams: {
              p : JSON.stringify(produit)
            }
        }
        this.navCtrl.navigateForward(['produit'],navigationExtras);
        }
      }
    );
  }

  searchHttp(pBareCode:string){
    let json = {
      barCode : pBareCode,
    }
    let httpoption = {headers : new HttpHeaders({
      'Content-Type' : 'application/json',
      'Access-Control-Allow-Origin':'*'
    })};
    let testProduit
    var adresseRequest = environment.adressePython+"/search"
    this.http.post(adresseRequest, json, httpoption).subscribe(
      data=>{
        if(data['result']=="Le produit n'existe pas"){
          this.errorMsg = data['result'];
        }
        else{
          testProduit = data as Produit;
          }
        }
    );
    return testProduit;
  }


  loadData(event) {
    setTimeout(() => {
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
    this.doRefresh();
  }

  getHistoriqueHttp(pUser:string){
    let json = {
      user : pUser,
      debut : this.compteurBaseDeDonnee
    }
    let httpoption = {headers : new HttpHeaders({
      'Content-Type' : 'application/json',
      'Access-Control-Allow-Origin':'*'
    })};
    var adresseRequest = environment.adressePython+"/getHistorique"
    this.http.post(adresseRequest, json, httpoption).subscribe(
      data=>{
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
          this.compteurBaseDeDonnee += compteur;
          console.log("compteur base de données :"+this.compteurBaseDeDonnee);
        }
      }
    )
  }


  addMoreItems(){
    this.getHistoriqueHttp(this.authService.currentUser);  
  }


  doRefresh() {
    console.log("REFREEEEEEEEEESH");
    this.items = [];
    this.compteurBaseDeDonnee = 0;
    this.addMoreItems();
  }


  logout() {
    this.authService.logout();
  }
}
