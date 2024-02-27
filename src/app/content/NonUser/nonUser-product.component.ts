import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nonUser-product',
  templateUrl: './nonUser-product.component.html',
  styleUrl: './nonUser-product.component.css'
})

export class nonUserProduct {

  constructor(private router:Router){
  }
  navigate() {
    this.router.navigate(['/login']);
  }
  products = [
    { name: 'Product 1', description: 'Description of Product 1', price: '$10.00', imageUrl: 'assets/images/c5.jpg' },
    { name: 'Product 2', description: 'Description of Product 2', price: '$20.00', imageUrl: 'assets/images/c5.jpg' },
    { name: 'Product 3', description: 'Description of Product 3', price: '$30.00', imageUrl: 'assets/images/c5.jpg' },
    { name: 'Product 4', description: 'Description of Product 4', price: '$40.00', imageUrl: 'assets/images/c5.jpg' },
    // Add more products as needed
  ];





}