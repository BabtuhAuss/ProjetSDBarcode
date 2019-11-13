import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-produit',
  templateUrl: './produit.page.html',
  styleUrls: ['./produit.page.scss'],
})
export class ProduitPage implements OnInit {
  bareCode: string;
  constructor(private route: ActivatedRoute) {  console.log(this.bareCode);}


  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.bareCode = params["barcode"];
      console.log(this.bareCode);
  });
  }

}
