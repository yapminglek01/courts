import { Component, Input } from '@angular/core';
import Swal from 'sweetalert2';
import { OrderService } from '../../services/order.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-product-info',
  templateUrl: './product-info.component.html',
  styleUrl: './product-info.component.css'
})
export class ProductInfoComponent {
  @Input() productInfo: any;
  @Input() productId: string = '';
  
  quantity: number = 1;

  constructor(private order: OrderService, private router: Router){}

  buy(){
    const costs = this.quantity * this.productInfo.productPrice

    Swal.fire({
      title: "Are you sure?",
      text: "Would you like to proceed with your purchase at RM" + costs,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes!"
    }).then((result) => {
      if (result.isConfirmed) {
        const swal = Swal.fire({
          title: 'Redirecting you to payment page',
          timerProgressBar: true,
          icon: 'info',
          showConfirmButton: false,
        })
        const data = {
          product_id: this.productId,
          quantity: this.quantity,
          router: this.router.url
        }
        this.order.makePurchase(data).subscribe(
          (response) => {
            window.location.href = response.data.url
          },
          (error) => {
            console.log(error)
          }
        )
      }
    });
  }

}
