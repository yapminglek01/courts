import { Component, OnInit } from '@angular/core';
import { Product } from '../../../models/product.model';
import { ProductService } from '../../../services/product.service'; 

@Component({
  selector: 'app-admin-product',
  templateUrl: './admin-product.component.html',
  styleUrls: ['./admin-product.component.css']
})
export class adminProduct implements OnInit {
  displayedColumns: string[] = ['image', 'productName', 'productPrice', 'productDescription', 'quantity', 'actions'];
  dataSource: Product[] = [];

  constructor(private productService: ProductService) { }

  ngOnInit(): void {
    this.getProducts();
  }

  getProducts(): void {
    this.productService.getProduct().subscribe(
      (response) => {
        const products = response.data.map((e: any) => {
          const uint = new Uint8Array(e.imageData.buffer.data);
          const base64String = "data:image/jpeg;base64," + btoa(uint.reduce((str, byte) => str + String.fromCharCode(byte), ''));
          return new Product({
            id: e._id,
            productName: e.productName,
            price: e.productPrice,
            productDescription: e.productDescription,
            quantity: e.quantity,
            image: base64String
          });
        });
        this.dataSource = products;
      },
      (error) => {
        console.error('Error fetching products:', error);
      }
    );
  }
  

  deleteProduct(product: Product): void {
    if (product.id) {
      console.log(product.id);
      this.productService.deleteProduct(product.id).subscribe(
        (response) => {
          this.dataSource = this.dataSource.filter(p => p.id !== product.id);
          console.log('Product deleted successfully:', product);
        },
        (error) => {
          console.error('Error deleting product:', error);
        }
      );
    } else {
      console.log(product.id);
      console.error('Product id is undefined:', product);
    }
  }
}
