import { Component, Input } from '@angular/core';
import { ProductDetails } from '../../../models/product.model';
import { AuthService } from '../../../services/auth.service';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Component({
  selector: 'app-product-tiles',
  templateUrl: './product-tiles.component.html',
  styleUrl: './product-tiles.component.css'
})
export class ProductTilesComponent {
  @Input() cardData: ProductDetails = {} as ProductDetails;

  constructor(private auth: AuthService, private router: Router) { }
  ngOnInit() {
  }

  selectProduct(id: string){
    if(this.auth.getCurrentUser().role == null){
      Swal.fire({
        icon: "info",
        title: "Please login to continue",
        showConfirmButton: false,
        timer: 1500
      });
    }

    this.router.navigate(['/product', id]);
  }
}
