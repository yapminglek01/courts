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
        this.dataSource = response.data.map((productData: any) => {
          const product = new Product(productData);
          product.id = productData._id; // Set the id property to _id from the response
          return product;
        });
      },
      (error) => {
        console.error('Error fetching products:', error);
      }
    );
  }


  deleteProduct(product: Product): void {
    if (product.id) {
      console.log(product.id)
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
      console.log(product.id)
      console.error('Product id is undefined:', product);
    }
  }

}