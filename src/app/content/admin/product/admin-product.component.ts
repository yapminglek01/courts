import {Component} from '@angular/core';
import {MatTableModule} from '@angular/material/table';

export interface Product {
  image: string; // Assuming image is a URL
  name: string;
  category: string;
  location: string;
  price: number;
  description: string;
  stock: string;
  // Assuming actions is an array of strings representing possible actions
  actions: string[]; 
}
const ELEMENT_DATA: Product[] = [
  { 
    image: 'assets/images/c5.jpg',
    name: 'Product 1', 
    category: 'Category 1', 
    location: 'Location 1', 
    price: 10.99, 
    description: 'Description of Product 1', 
    stock: '3',
    actions: ['Edit', 'Delete'] 
  },
  { 
    image: 'assets/images/c5.jpg',
    name: 'Product 2', 
    category: 'Category 2', 
    location: 'Location 2', 
    price: 20.99, 
    description: 'Description of Product 2', 
    stock: '5',
    actions: ['Edit', 'Delete'] 
  },
  // Add more products here
];

@Component({
  selector: 'app-admin-product',
  templateUrl: './admin-product.component.html',
  styleUrl: './admin-product.component.css'
})
export class adminProduct {
  displayedColumns: string[] = ['image', 'name', 'category', 'location', 'price', 'description','stock', 'actions'];
  dataSource = ELEMENT_DATA;
  
}