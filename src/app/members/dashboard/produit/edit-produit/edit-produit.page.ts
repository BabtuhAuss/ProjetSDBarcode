import { Component, OnInit } from '@angular/core';
import { Produit } from 'src/app/Produit';
import { ActivatedRoute } from '@angular/router';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';

@Component({
  selector: 'app-edit-produit',
  templateUrl: './edit-produit.page.html',
  styleUrls: ['./edit-produit.page.scss'],
})

export class EditProduitPage implements OnInit {
  options: CameraOptions = {
    quality: 100,
    destinationType: this.camera.DestinationType.FILE_URI,
    encodingType: this.camera.EncodingType.JPEG,
    mediaType: this.camera.MediaType.PICTURE
  }

  customActionSheetOptions: any = {
    header: 'Nutriscore',
    subHeader: 'Choisissez le score nutri'
  };
  

  produitEdit: Produit;
  constructor(private route: ActivatedRoute , private camera: Camera) {
  }
  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.produitEdit = JSON.parse(params["produit"]);
    });
  }

  modifNutri($event){
    this.produitEdit.nutriscore = $event.target.value; 
  }

  modifNomProduit($event){
    this.produitEdit.nomProduit = $event.target.value;
  }

  picturePrincipale(){
    this.camera.getPicture(this.options).then((imageData) => {
      // imageData is either a base64 encoded string or a file URI
      // If it's base64 (DATA_URL):

      let base64Image = 'data:image/jpeg;base64,' + imageData;
      this.produitEdit.urlimage = base64Image;
     }, (err) => {
      // Handle error
     });
     
  }

  modifImgPrincipale(val : string){

  }


}
