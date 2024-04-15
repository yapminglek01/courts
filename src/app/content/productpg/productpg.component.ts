import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from '../../services/product.service';

@Component({
  selector: 'app-productpg',
  templateUrl: './productpg.component.html',
  styleUrl: './productpg.component.css'
})
export class ProductpgComponent {
  productId: string = '';
  productInfo: any = {}

  constructor(private route: ActivatedRoute, private product: ProductService, private router: Router) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.productId = params['id'];
    });

    this.product.getProduct(this.productId)
    .subscribe(
      (response) => {
        this.productInfo = response.data
        this.productInfo.image = this.product.uintBase64(this.productInfo.imageData.buffer.data)
        delete this.productInfo.imageData
        
      },
      (error) => {
        this.router.navigate(['/product']);
      }
    )
  }
}
