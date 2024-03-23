import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../../services/auth.service';
import { MatDialog } from '@angular/material/dialog';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-update-profile',
  templateUrl: './update-profile.component.html',
  styleUrls: ['./update-profile.component.css']
})

export class UpdateProfileComponent implements OnInit {
  updateProfileForm!: FormGroup;
  profileData: any; // Assuming this holds current user profile data

  constructor(private authService: AuthService, private updatePop: MatDialog, private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    // Retrieve current user data
    this.fetchUserProfile();
  }

  fetchUserProfile(): void {
    this.profileData = this.authService.getCurrentUser();
    this.updateProfileForm = this.formBuilder.group({
      name: [this.profileData.name, Validators.required],
      phone: [this.profileData.phone, [Validators.required, Validators.pattern('^[0-9]{9,}$')]], // Ensure only numbers and minimum 9 digits
      address: [this.profileData.address, Validators.required]
    });
  }

  updateProfile(): void {
    if (this.updateProfileForm.invalid) return;
  
    const { name, phone, address } = this.updateProfileForm.value;
  
    this.authService.updateProfile({ name, phone, address }).subscribe(
      (response: any) => {
        Swal.fire({
          title: 'Success!',
          text: 'Successfully updated profile',
          icon: 'success',
          showConfirmButton: false,
          allowOutsideClick: false,
          timer: 2000
        });
  
        // Update currentUser in frontend with the updated user data
        const updatedUserData = response.user;
        this.authService.setCurrentUser(updatedUserData); // Update currentUser data
  
        // Log current user info after update
        console.log('Updated current user:', updatedUserData);
        setTimeout(() => {
          window.location.reload();
        }, 1000);
        // Fetch updated user profile after successful update
        this.fetchUserProfile();
      },
      (error) => {
        Swal.fire({
          title: 'Error!',
          text: error.error.message,
          icon: 'error',
          confirmButtonText: 'OK'
        });
      }
    );
  }
}