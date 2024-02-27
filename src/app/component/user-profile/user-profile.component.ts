import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { DataViewModule } from 'primeng/dataview';


@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent {

  profileData = {
    id: '12345',
    name: 'John Doe',
    email: 'john.doe@example.com',
    phone: '123-456-7890',
    address: '123 Street, City, State, Country'
  };

  updatePassword() {
    // Implement password update logic here
    console.log('Updating password...');
  }

  editProfile() {
    // Implement profile edit logic here
    console.log('Editing profile...');
  }
  products: any[] = []; // Define the 'products' property as an array of any type

  
}
