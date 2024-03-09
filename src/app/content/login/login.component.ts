import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { RegisterComponent } from '../register/register.component';

import Swal from 'sweetalert2';
import { AuthService } from '../../services/auth.service';
import { response } from 'express';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'] // Link to the component-specific CSS file
})
export class LoginComponent {
  passMinLength = 4;

  constructor(private router: Router, private matDialog: MatDialog, private authService: AuthService) {}

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
    const loginStatus = this.authService.login(this.loginForm.value)

    loginStatus.subscribe(
      (response) => {
        Swal.fire({
          title: 'Success!',
          text: 'You are now logged in',
          icon: 'success',
          showConfirmButton: false,
          allowOutsideClick: false,
          timer: 2000,
        });
        if(this.authService.getCurrentUser().role === 'admin'){
          this.router.navigate(['dashboard']);
        }else{
          this.router.navigate([''])
        }
      },
      (error) => {
        Swal.fire({
          title: 'Error!',
          text: error.error.message,
          icon: 'error',
          confirmButtonText: 'OK'
        });
      }
    )
  }

  onRegister() {
    this.matDialog.open(RegisterComponent);
  }


}
