import { Component } from '@angular/core';
import { Product, ProductDetails } from '../../models/product.model';
import { ProductService } from '../../services/product.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrl: './product.component.css'
})
export class ProductComponent {

  cardData: ProductDetails[] = []

  constructor(private product: ProductService) { }

  ngOnInit(): void{

    
    this.product.getProducts().subscribe(
      (response) => {
        const product = response.data.map((e: any) => {
          return new Product({id: e._id, title: e.productName, price: e.productPrice, rating: e.totalRating, image: this.product.uintBase64(e.imageData.buffer.data)})
        })
        this.cardData = product;
      })
  }




}