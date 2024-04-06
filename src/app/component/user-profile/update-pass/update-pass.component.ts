import { Component } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { AuthService } from '../../../services/auth.service';
import Swal from 'sweetalert2';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-update-pass',
  templateUrl: './update-pass.component.html',
  styleUrls: ['./update-pass.component.css'] // Change styleUrl to styleUrls
})
export class UpdatePassComponent {
  
  updatePasswordForm = new FormGroup({
    oldPassword: new FormControl('', Validators.required),
    newPassword: new FormControl('', Validators.required),
    confirmPassword: new FormControl('', Validators.required),
  }, {validators: this.confirmPasswordValidation('newPassword', 'confirmPassword')});


  confirmPasswordValidation(password: string, confirmPassword: string): ValidatorFn {
    return (control: AbstractControl): {[key: string] : any} | null => {
      const passwordControl = control.get(password);
      const confirmPasswordControl = control.get(confirmPassword);
      if(confirmPasswordControl?.value === '') return null;
      if(passwordControl?.value !== confirmPasswordControl?.value){
        return { 'mismatch': true };
      }
      return null;
    }
  }

  constructor(private authService: AuthService, private updatePop: MatDialog) {}

  updatePassword() {
    if(this.updatePasswordForm.invalid) return;

    const updateStatus = this.authService.updatePassword(this.updatePasswordForm.value)

    updateStatus.subscribe(
      (response) =>{
        Swal.fire({
          title: 'Success!',
          text: 'Successfully updated password',
          icon: 'success',
          showConfirmButton: false,
          allowOutsideClick: false,
          timer: 2000,
        });
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
}
