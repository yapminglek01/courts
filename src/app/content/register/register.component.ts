import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {

  constructor() {}

  registerForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', {validators: [Validators.required, Validators.minLength(4)]}),
    confirmPassword: new FormControl('', {validators: [Validators.required, Validators.minLength(4)]}),
  });


  async register(){
    if(this.registerForm.invalid) return;

    // Call your backend register service here
    // await new Promise(resolve => setTimeout(resolve, 3000));
  }
}
