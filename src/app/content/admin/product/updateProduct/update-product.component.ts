import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';
import { MatDialog } from '@angular/material/dialog';
import { ProductService } from '../../../../services/product.service';
import { Product } from '../../../../models/product.model';

@Component({
  selector: 'app-update-product',
  templateUrl: './update-product.component.html',
  styleUrls: ['./update-product.component.css']
})

export class UpdateProductComponent implements OnInit {
  updateProductForm: FormGroup;
  file: File | any;
  productId: string = ''; // Initialize productId here

  constructor(
    private productService: ProductService,
    private dialogPop: MatDialog,
    private route: ActivatedRoute
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
  
        // Convert image data to base64 string
        // const uint = new Uint8Array(productData.imageData.buffer.data);
        // const base64String = "data:image/jpeg;base64," + btoa(uint.reduce((str, byte) => str + String.fromCharCode(byte), ''));
  
        // Create a Product object with fetched data
        const product = new Product({
          id: productData._id,
          productName: productData.productName,
          price: productData.productPrice,
          productDescription: productData.productDescription,
          quantity: productData.quantity,
          image: productData.image
        });
      },
      (error) => {
        console.error('Error fetching product details:', error);
      }
    );
  }
  


  updateProduct(): void {
    if (this.updateProductForm.invalid) return;

    // Proceed with updating the product...
  }

  onFileSelected(event: any): void {
    this.file = event.target.files[0];
  }
}
