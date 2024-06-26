import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { ProductService } from '../../../../services/product.service';


@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrl: './add-product.component.css'
})
export class addProduct {
    
    constructor(private router: Router, private productService: ProductService, private dialogPop: MatDialog) {}

    addProductForm = new FormGroup({
        image: new FormControl('', {validators: [Validators.required]}),
        productName: new FormControl('', {validators: [Validators.required]}),
        productDetails: new FormControl('', {validators: [Validators.required]}),
        productPrice: new FormControl('', {validators: [Validators.required]}),
        productDescription: new FormControl('', {validators: [Validators.required]}),
        quantity: new FormControl('', {validators: [Validators.required]}),
    });

    file: File | any

    async addProduct() {
        if (this.addProductForm.invalid) return;
        const formData = new FormData();
        formData.append('image', this.file);
        Object.keys(this.addProductForm.controls)
        .filter(controlName => controlName !== 'image') // Filter out the 'file' control
        .forEach(controlName => {
            formData.append(controlName, this.addProductForm.get(controlName)?.value);
        });

        this.productService.addProduct(formData)
        .subscribe((response) => {
          Swal.fire({
            title: 'Success!',
            text: response.message,
            icon: 'success',
            showConfirmButton: false,
            allowOutsideClick: false,
            timer: 1000,
          });
          this.dialogPop.closeAll();
        }, (error) =>{
          Swal.fire({
            title: 'Error!',
            text: error.error.message,
            icon: 'error',
            confirmButtonText: 'OK'
          });
        })
      
        setTimeout(() => {
          this.router.navigate(['adminProduct']);
        }, 500); 
    }

    onFileSelected(event: any) {
      this.file = event.target.files[0];
    }
}