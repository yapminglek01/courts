import { Component, Input } from '@angular/core';
import { ProductDetails } from '../../models/product.interface';

@Component({
  selector: 'app-product-tiles',
  templateUrl: './product-tiles.component.html',
  styleUrl: './product-tiles.component.css'
})
export class ProductTilesComponent {
  @Input() cardData: ProductDetails = {} as ProductDetails;

  constructor() { }
  ngOnInit() {
  }
}
