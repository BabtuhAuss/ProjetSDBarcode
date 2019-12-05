import { Component, OnInit } from '@angular/core';
import { Produit } from 'src/app/Produit';
import { ActivatedRoute } from '@angular/router';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-edit-produit',
  templateUrl: './edit-produit.page.html',
  styleUrls: ['./edit-produit.page.scss'],
})

export class EditProduitPage implements OnInit {
  options: CameraOptions = {
    quality: 100,
    destinationType: this.camera.DestinationType.DATA_URL,
    encodingType: this.camera.EncodingType.JPEG,
    mediaType: this.camera.MediaType.PICTURE
  }

  customActionSheetOptions: any = {
    header: 'Nutriscore',
    subHeader: 'Choisissez le score nutri'
  };


  produitEdit: Produit;
  constructor(private route: ActivatedRoute, private camera: Camera, private http: HttpClient) {
  }
  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.produitEdit = JSON.parse(params["produit"]);
    });
  }

  modifNutri($event) {
    this.produitEdit.nutriscore = $event.target.value;
  }

  modifNomProduit($event) {
    this.produitEdit.nomProduit = $event.target.value;
  }
  pictureNutri() {
    this.camera.getPicture(this.options).then((imageData) => {
      // imageData is either a base64 encoded string or a file URI
      // If it's base64 (DATA_URL):
      console.log("premier test");
      this.produitEdit.urlimagenut = 'data:image/jpeg;base64,' + imageData;
      console.log("test2");
    }, (err) => {
      // Handle error
    });

  }

  pictureIng() {
    this.camera.getPicture(this.options).then((imageData) => {
      // imageData is either a base64 encoded string or a file URI
      // If it's base64 (DATA_URL):
      this.produitEdit.urlimageing = 'data:image/jpeg;base64,' + imageData;

    }, (err) => {
      // Handle error
    });

  }
  picturePrincipale() {
    this.camera.getPicture(this.options).then((imageData) => {
      // imageData is either a base64 encoded string or a file URI
      // If it's base64 (DATA_URL):
      console.log("premier test");
      this.produitEdit.urlimage = 'data:image/jpeg;base64,' + imageData;
      this.produitEdit.urlimagesmall = 'data:image/jpeg;base64,' + imageData;
      console.log("test2");
    }, (err) => {
      // Handle error
    });

  }

  delete(val: string) {
    switch (val) {
      case 'p':
        this.produitEdit.urlimage = '';
        this.produitEdit.urlimagesmall = '';
        break;
      case 'n':
        // code block
        break;
      case 'i':
        // code block
        break;
      default:
      // code block
    }
  }



  updateHttp() {
    let json = JSON.stringify(this.produitEdit);

    let httpoption = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      })
    };
    let testProduit
    var adresseRequest = environment.adressePython + "/updateProduit"
    this.http.post(adresseRequest, json, httpoption).subscribe(
      data => {
        console.log("data" + data);
        
      }
    );
    return testProduit;
  }




}
