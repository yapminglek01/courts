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
    this.product.getProduct().subscribe(
      (response) => {
        const product = response.data.map((e: any) => {
          const uint = new Uint8Array(e.imageData.buffer.data)
          const base64String = "data:image/jpeg;base64," + btoa(uint.reduce((str, byte) => str + String.fromCharCode(byte), ''));
          return new Product({id: e._id, title: e.productName, price: e.productPrice, rating: e.totalRating, image: base64String})
        })
        this.cardData = product;
      })
  }




}
