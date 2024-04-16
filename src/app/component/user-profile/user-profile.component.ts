import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { DataViewModule } from 'primeng/dataview';
import { AuthService } from '../../services/auth.service';
import { MatDialog } from '@angular/material/dialog';
import { UpdatePassComponent } from './update-pass/update-pass.component';
import { UpdateProfileComponent } from './update-profile/update-profile.component';


@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent {

  profileData: any;

  constructor(private matDialog: MatDialog, private authService: AuthService) { }

  ngOnInit(): void {
    this.profileData = this.authService.getCurrentUser();
  }

  

 

  updateProfile() {
    this.matDialog.open(UpdateProfileComponent);

  }
  products: any[] = []; // Define the 'products' property as an array of any type

  updatePassword() {
    this.matDialog.open(UpdatePassComponent);
  }
}
