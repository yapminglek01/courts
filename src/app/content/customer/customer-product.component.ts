import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-customer-product',
  templateUrl: './customer-product.component.html',
  styleUrl: './customer-product.component.css'
})

export class customerProduct {

  constructor(private router:Router){
  }
  navigate() {
    this.router.navigate(['/customerProduct']);
  }
  products = [
    { name: 'Product 1', description: 'Description of Product 1', price: '$10.00', imageUrl: 'assets/images/c5.jpg' },
    { name: 'Product 2', description: 'Description of Product 2', price: '$20.00', imageUrl: 'assets/images/c5.jpg' },
    { name: 'Product 3', description: 'Description of Product 3', price: '$30.00', imageUrl: 'assets/images/c5.jpg' },
    { name: 'Product 4', description: 'Description of Product 4', price: '$40.00', imageUrl: 'assets/images/c5.jpg' },
    // Add more products as needed
  ];





}