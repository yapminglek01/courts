import { Component, OnInit } from '@angular/core';
import { Product } from '../../../models/product.model';
import { ProductService } from '../../../services/product.service'; 
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-admin-product',
  templateUrl: './admin-product.component.html',
  styleUrls: ['./admin-product.component.css']
})
export class adminProduct implements OnInit {
  displayedColumns: string[] = ['image', 'productName', 'productPrice', 'productDescription', 'quantity', 'actions'];
  dataSource: Product[] = [];

  constructor(private router: Router, private productService: ProductService,  private dialogPop: MatDialog) { }

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
          Swal.fire({
            title: 'Deleted Successfully!',
            text: response.message,
            icon: 'success',
            showConfirmButton: false,
            allowOutsideClick: false,
            timer: 750,
          });
          this.dialogPop.closeAll();
        }, (error) =>{
          Swal.fire({
            title: 'Error!',
            text: error.error.message,
            icon: 'error',
            confirmButtonText: 'OK'
          });
        },
      );
    } else {
      console.log(product.id);
      console.error('Product id is undefined:', product);
    }
  }

  updateProduct(product: Product): void {
    if (product.id) {
      // Navigate to app-update-product with the product id as a route parameter
      console.log(product.id);
      this.router.navigate(['/app-update-product', product.id]);
      
    } else {
      console.error('Product id is undefined:', product);
    }
  }

}