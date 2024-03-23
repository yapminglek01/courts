import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';
import { MatDialog } from '@angular/material/dialog';
import { ProductService } from '../../../../services/product.service';
import { Product } from '../../../../models/product.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-update-product',
  templateUrl: './update-product.component.html',
  styleUrls: ['./update-product.component.css']
})
export class UpdateProductComponent implements OnInit {
  updateProductForm: FormGroup;
  file: File | any;
  productId: string = ''; // Initialize productId here
  dataSource: Product[] = []; // Declare dataSource here

  constructor(
    private productService: ProductService,
    private dialogPop: MatDialog,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.updateProductForm = new FormGroup({
      image: new FormControl('', { validators: [Validators.required] }),
      productName: new FormControl('', { validators: [Validators.required] }),
      productDetails: new FormControl('', { validators: [Validators.required] }),
      productPrice: new FormControl('', { validators: [Validators.required] }),
      productDescription: new FormControl('', { validators: [Validators.required] }),
      quantity: new FormControl('', { validators: [Validators.required] })
    });
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      console.log(params); // Log the params object to see its contents
      this.productId = params['id'];
      
      if (this.productId) {
        this.getProductDetails(this.productId);

      } else {
        console.error('Product ID is missing.');
      }
    });
  }
  

  getProductDetails(productId: string): void {
  this.productService.getProductById(productId).subscribe(
    (response) => {
      const productData = response.data;
      console.log("AAA")
      console.log(productData);
      const uint = new Uint8Array(productData.imageData.buffer.data);
        const base64String = "data:image/jpeg;base64," + btoa(uint.reduce((str, byte) => str + String.fromCharCode(byte), ''));
      // Set form control values with retrieved data
      this.updateProductForm.patchValue({
        image: base64String,
        productName: productData.productName,
        productDetails: productData.productDetails,
        productPrice: productData.productPrice,
        productDescription: productData.productDescription,
        quantity: productData.quantity
      });
    },
    (error) => {
      console.error('Error fetching product details:', error);
      }
    );
  }

  
  updateProduct(): void {
    if (this.updateProductForm.invalid) return;
  
    const productId = this.productId;
  
    const productData = {
      productName: this.updateProductForm.get('productName')?.value,
      productDetails: this.updateProductForm.get('productDetails')?.value,
      productPrice: this.updateProductForm.get('productPrice')?.value,
      productDescription: this.updateProductForm.get('productDescription')?.value,
      quantity: this.updateProductForm.get('quantity')?.value
    };
  
    this.productService.updateProduct(productId, productData).subscribe(
      (response) => {
        // Handle success message display
        Swal.fire({
          title: 'Success!',
          text: response.message,
          icon: 'success',
          showConfirmButton: false,
          allowOutsideClick: false,
          timer: 750,
        });
        console.log('Product updated successfully:', response);
  
        // Navigate to adminProduct after a delay
        setTimeout(() => {
          this.router.navigate(['adminProduct']);
        }, 800); // 2000 milliseconds delay
      },
      (error) => {
        // Handle error message display
        Swal.fire({
          title: 'Error!',
          text: error.error.message,
          icon: 'error',
          confirmButtonText: 'OK'
        });
        console.error('Error updating product:', error);
      }
    );
  }

}
