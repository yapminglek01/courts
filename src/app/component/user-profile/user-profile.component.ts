import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { DataViewModule } from 'primeng/dataview';
import { AuthService } from '../../services/auth.service';
import { MatDialog } from '@angular/material/dialog';
import { UpdatePassComponent } from '../update-pass/update-pass.component';


@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent {

  profileData: any;

  constructor(private matDialog: MatDialog, private authService: AuthService) { }

  ngOnInit(): void {
    // Retrieve current user data
    this.profileData = this.authService.getCurrentUser();
  }

  

 

  editProfile() {
    // Implement profile edit logic here
    console.log('Editing profile...');
  }
  products: any[] = []; // Define the 'products' property as an array of any type

  updatePassword() {
    this.matDialog.open(UpdatePassComponent);
  }
}
