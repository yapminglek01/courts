import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { AuthService } from '../../../../services/auth.service';
import { MatDialog } from '@angular/material/dialog';


@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrl: './add-product.component.css'
})
export class addProduct {
    
    constructor(private router: Router, private authService: AuthService, private registerPop: MatDialog) {}

    addProductForm = new FormGroup({
        imagePath:new FormControl('', {validators: [Validators.required]}),
        productName: new FormControl('', {validators: [Validators.required]}),
        productDetails: new FormControl('', {validators: [Validators.required]}),
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
        this.authService.addProduct(this.addProductForm.value)
        .subscribe((response) => {
          Swal.fire({
            title: 'Success!',
            text: response.message,
            icon: 'success',
            showConfirmButton: false,
            allowOutsideClick: false,
            timer: 2000,
          });
          this.registerPop.closeAll();
        }, (error) =>{
          Swal.fire({
            title: 'Error!',
            text: error.error.message,
            icon: 'error',
            confirmButtonText: 'OK'
          });
        })
      
        setTimeout(() => {
          this.router.navigate(['dashboard']);
        }, 500); // Wait for 2 seconds before navigation    
    }
   

    // register() {
    //   if (this.addProductForm.invalid) return;
    //   this.authService.register(this.addProductForm.value)
    //   .subscribe((response) => {
    //     Swal.fire({
    //       title: 'Success!',
    //       text: response.message,
    //       icon: 'success',
    //       showConfirmButton: false,
    //       allowOutsideClick: false,
    //       timer: 2000,
    //     });
    //     this.registerPop.closeAll();
    //   }, (error) =>{
    //     Swal.fire({
    //       title: 'Error!',
    //       text: error.error.message,
    //       icon: 'error',
    //       confirmButtonText: 'OK'
    //     });
    //   })
}