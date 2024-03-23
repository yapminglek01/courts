import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrl: './product-details.component.css'
})
export class ProductDetailsComponent {
  @Input() productInfo: any;

  items = Array.from({length: 10}).map((_, i) => `Item #${i}`);

}
