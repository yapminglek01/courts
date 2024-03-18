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
      
      // Set form control values with retrieved data
      this.updateProductForm.patchValue({
        image: productData.imageName,
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
  
    const productId = this.productId; // Assuming you have the productId available in your component
    const formData = new FormData();
    formData.append('image', this.updateProductForm.get('image')?.value || null);
    formData.append('productName', this.updateProductForm.get('productName')?.value || null);
    formData.append('productDetails', this.updateProductForm.get('productDetails')?.value || null);
    formData.append('productPrice', this.updateProductForm.get('productPrice')?.value || null);
    formData.append('productDescription', this.updateProductForm.get('productDescription')?.value || null);
    formData.append('quantity', this.updateProductForm.get('quantity')?.value || null);
  
    this.productService.updateProduct(productId, formData).subscribe(
      (response) => {
        // Handle success response
      },
      (error) => {
        // Handle error response
      }
    );
  }

  onFileSelected(event: any): void {
    this.file = event.target.files[0];
    if (this.file) {
      const fileName = this.file.name;
      console.log('Selected file name:', fileName);
      // Now you can use the file name as needed
    }
  }
}
