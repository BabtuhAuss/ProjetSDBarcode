import { Component, OnInit } from '@angular/core';
import { Produit } from 'src/app/Produit';
import { ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-edit-produit',
  templateUrl: './edit-produit.page.html',
  styleUrls: ['./edit-produit.page.scss'],
})

export class EditProduitPage implements OnInit {

  produitEdit: Produit;
  constructor(private route: ActivatedRoute) {
  }
  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.produitEdit = JSON.parse(params["produit"]),
        console.log("produit dans la page de modification ! " + this.produitEdit);
    });
  }

}
