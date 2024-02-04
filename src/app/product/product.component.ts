import { Component } from '@angular/core';
import Product from '../claass/product.class';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrl: './product.component.css'
})
export class ProductComponent {

  cardData: Product[] = [
    { title: 'Card 1', content: 'This is the content for Card 1.' },
    { title: 'Card 2', content: 'This is the content for Card 2.' },
    { title: 'Card 3', content: 'This is the content for Card 3.' },
    { title: 'Card 4dsadasdsa', content: 'This is the content for Card 4.' },
  ];

  product2: Product[] = [
    { title: 'Card 1dsadsa', content: 'This is the csadsadsaontent for Card 1.', image: 'https://via.placeholder.com/150' },
    { title: 'Cardsadsad 2adsa', content: 'This is thedsad content for Card 2.' },
    { title: 'Cardsadsadsadasd 3', content: 'This is the content for Cadsadsard 3.' },
    { title: 'Card 4dsadasdsa', content: 'This is thedsadas content for Card 4.' },
  ]

  constructor() { }
}
