import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { RegisterComponent } from '../register/register.component';

import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  passMinLength = 4;

  constructor(private router: Router, private matDialog: MatDialog) {}

  loginForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', {validators: [Validators.required, Validators.minLength(this.passMinLength)]}),
  });

  async login() {
    if (this.loginForm.invalid) return;

    Swal.fire({
      title: 'Logging in...',
      icon: 'question',
      showConfirmButton: false,
      allowOutsideClick: false,
      didOpen: () => {
        Swal.showLoading();
      }
    });

    // Call your backend login service here
    await new Promise(resolve => setTimeout(resolve, 3000));
    const loginStatus = this.loginForm.value.email === 'admin@gmail.com' && this.loginForm.value.password === 'admin'

    if(loginStatus) {
      Swal.fire({
        title: 'Success!',
        text: 'You are now logged in',
        icon: 'success',
        showConfirmButton: false,
        allowOutsideClick: false,
      });
      // Navigate to home

      await this.delay(2000);
      this.router.navigate(['']);
      Swal.close();

    } else {
      // If error, then show error message
      Swal.fire({
        title: 'Error!',
        text: 'Invalid email or password',
        icon: 'error',
        confirmButtonText: 'OK'
      });
    }
  }

  onRegister() {
    this.matDialog.open(RegisterComponent);
  }

  private delay(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
}
