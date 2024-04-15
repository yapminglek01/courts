import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent {
  @Input() productInfo: any;

  // Define a hard-coded list of reviews for testing
  mockReviews = [
    { rating: 4, comment: 'Great product!', productId: 'abc123', orderId: 'order123' },
    { rating: 3, comment: 'Good value for money.', productId: 'def456', orderId: 'order456' },
    { rating: 5, comment: 'Excellent service.', productId: 'ghi789', orderId: 'order789' }
  ];

  items = Array.from({ length: 100 }).map((_, i) => `Item #${i}`);
}
