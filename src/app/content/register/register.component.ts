import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import Swal from 'sweetalert2';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {

  registerForm = new FormGroup({
    name: new FormControl('', Validators.required),
    phone: new FormControl('', [Validators.required, Validators.pattern('^[0-9]*$')]), // Ensure only numbers are entered
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(4)]),
    address: new FormControl('', [Validators.required]),
  });

  constructor(private authService: AuthService, private registerPop: MatDialog) {}

  register() {
    if (this.registerForm.invalid) return;
    this.authService.register(this.registerForm.value)
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
    // Call your backend register service here
    // await new Promise(resolve => setTimeout(resolve, 3000));
  }
}
