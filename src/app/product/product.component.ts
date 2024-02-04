import { Component } from '@angular/core';
import { Product, ProductDetails } from '../models/product.interface';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrl: './product.component.css'
})
export class ProductComponent {

  cardData: ProductDetails[] = [
    new Product({title: 'Card 1', content: 'This is the content for Card 1.', price: 1000, image: 'https://via.placeholder.com/150'}),
    new Product({title: 'Card 2', content: 'This is the content for Card 2.'}),
    new Product({title: 'Card 3', content: 'This is the content for Card 3.'}),
    new Product({title: 'Card 4', content: 'This is the content for Card 4.'}),
  ]

  constructor() { }


}
