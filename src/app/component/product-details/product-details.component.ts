import { Component, Input } from '@angular/core';
import { Product, ProductDetails } from '../../models/product.model';
import { ProductService } from '../../services/product.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent {
  @Input() productInfo: any;
  productId!: string;
  reviews: any[] = [];

  constructor(
    private route: ActivatedRoute,
    private productService: ProductService
  ) { }

  ngOnInit(): void {
    // Retrieve productId from route parameters
    this.route.params.subscribe(params => {
      this.productId = params['id'];
      this.loadReviews(); // Load reviews for the current product
    });
  }

  loadReviews(): void {
    this.productService.getReviewsByProductId(this.productId).subscribe(
      (reviews) => {
        this.reviews = reviews;
        console.log(this.productId); // Log reviews to check in the browser console

        console.log('Reviews:', reviews); // Log reviews to check in the browser console
      },
      (error) => {
        console.error('Error fetching reviews:', error);
      }
    );
  }

  items = Array.from({ length: 100 }).map((_, i) => `Item #${i}`);
}
