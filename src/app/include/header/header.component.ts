import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {

  currentUser: any = this.authService.getCurrentUser();

  constructor(private authService: AuthService) {}

  ngOnInit() : void {
  }

  logout(){
    this.authService.logout();
    window.location.reload();
  }
}
