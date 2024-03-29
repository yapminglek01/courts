import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrl: './add-product.component.css'
})
export class addProduct {
    
    constructor(private router: Router) {}

    addProductForm = new FormGroup({
        productName: new FormControl('', {validators: [Validators.required]}),
        productCategory: new FormControl('', {validators: [Validators.required]}),
        location: new FormControl('', {validators: [Validators.required]}),
        price: new FormControl('', {validators: [Validators.required]}),
        description: new FormControl('', {validators: [Validators.required]}),
        numberOfProducts: new FormControl('', {validators: [Validators.required]}),
        
    });

    // Define the method to handle file selection
    onFileSelected(event: any) {
      const file: File = event.target.files[0];
      // Handle the file as needed
    }

    async addProduct() {
        if (this.addProductForm.invalid) return;
      
        await Swal.fire({
          title: 'Success!',
          text: 'You have successfully added product!',
          icon: 'success',
          showConfirmButton: false,
          allowOutsideClick: false,
          timer: 1000,
        });
      
        setTimeout(() => {
          this.router.navigate(['dashboard']);
        }, 500); // Wait for 2 seconds before navigation
      
        
          
    }
   
    
}