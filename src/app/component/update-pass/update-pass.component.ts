import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
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
  });

  constructor(private authService: AuthService, private updatePop: MatDialog) {}

  updatePassword() {
    if (!this.updatePasswordForm || this.updatePasswordForm.invalid) return;
  
    const oldPassword = this.updatePasswordForm.get('oldPassword')?.value;
    const newPassword = this.updatePasswordForm.get('newPassword')?.value;
    const confirmPassword = this.updatePasswordForm.get('confirmPassword')?.value;
  
    if (!oldPassword || !newPassword || !confirmPassword) {
      // Handle null or undefined values appropriately
      console.log("1")


      return;
    }
  
    if (newPassword !== confirmPassword) {
      console.log("2")
      // Passwords don't match, handle this case appropriately
      return;
    }
  
    // Verify old password
    this.authService.verifyOldPassword(oldPassword).subscribe(valid => {
      if (valid) {
        // Old password is correct, update password
        this.authService.updatePassword(newPassword).subscribe(response => {
          Swal.fire({
            title: 'Success!',
            text: response.message, // Use response message from server
            icon: 'success',
            showConfirmButton: false,
            timer: 2000
          }).then(() => {
            this.updatePop.closeAll();
          });
        }, error => {
          Swal.fire({
            title: 'Error!',
            text: error.message, // Use error message from server
            icon: 'error',
            confirmButtonText: 'OK'
          });
        });
      } else {
        // Old password is incorrect
        Swal.fire({
          title: 'Error!',
          text: 'Old password is incorrect.',
          icon: 'error',
          confirmButtonText: 'OK'
        });
      }
    });
  }
  
}
