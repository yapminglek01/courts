import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {

  currentUser: any = this.authService.getCurrentUser();
  currentUserId: any;

  constructor(private authService: AuthService, private router:Router) {}

  ngOnInit() : void {
  }


  logout(){
    this.authService.logout();
    // this.router.navigate(['/home']);
    window.location.reload();
    
  }
}
