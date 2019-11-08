import { Component, OnInit, Input } from '@angular/core';
import { Produit } from 'src/app/Produit';

@Component({
  selector: 'app-item-produit',
  templateUrl: './item-produit.component.html',
  styleUrls: ['./item-produit.component.scss'],
})
export class ItemProduitComponent implements OnInit {

  @Input() produit : Produit;
  constructor() { }
  ngOnInit() {}

}
