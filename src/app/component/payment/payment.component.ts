import { Component, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { OrderService } from '../../services/order.service';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrl: './payment.component.css',
  encapsulation: ViewEncapsulation.None
})
export class PaymentComponent {

  processing = true;
  orderId: string = '';
  spinnerType = 'default'; // Initial spinner type
  status: string = 'pending'

  constructor(private route: ActivatedRoute, private order: OrderService, private router: Router){}

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.orderId = params['session_id'];
    });

    if(this.orderId === undefined) return this.router.navigate(['/'])

    this.order.updateOrder({id: this.orderId}).subscribe(
      (response) => {
        this.status = 'complete'
        setTimeout(() => {
          this.router.navigate(['/order'])
        }, 5000)

      },
      (error) => {
        console.log(error)
        return this.router.navigate(['/'])
      }
    )

    return;
  }
}
