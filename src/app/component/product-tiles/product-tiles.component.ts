import { Component, Input } from '@angular/core';
import Product from '../../claass/product.class';

@Component({
  selector: 'app-product-tiles',
  templateUrl: './product-tiles.component.html',
  styleUrl: './product-tiles.component.css'
})
export class ProductTilesComponent {
  @Input() cardData: Product = {} as Product;

  constructor() { }
  ngOnInit() {
  }
}
