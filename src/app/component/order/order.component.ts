import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AuthService } from '../../services/auth.service';
import { OrderService } from '../../services/order.service';
import { ReviewComponent } from './review/review.component';
import { ProductService } from '../../services/product.service';


@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class OrderComponent implements OnInit {
  userId: string | undefined;
  profileData: any;
  orders: any[] = [];

  constructor(
    private matDialog: MatDialog,
    private authService: AuthService,
    private orderService: OrderService,
    private productService: ProductService

  ) {}

  ngOnInit(): void {
    this.profileData = this.authService.getCurrentUser();

    if (this.profileData && this.profileData._id) {
      this.userId = this.profileData._id;

      if (this.userId) {
        console.log('User ID:', this.userId);

        // Fetch completed orders for the current user
        this.orderService.getCompleteOrdersByUserId(this.userId).subscribe(
          (orders: any[]) => {
            this.orders = orders.map((order) => {
              order.productImage = this.productService.uintBase64(order.product_id.imageData.buffer.data);
              return order
            });
            console.log('Completed Orders:', this.orders);
          },
          (error) => {
            console.error('Error fetching completed orders:', error);
          }
        );
      } else {
        console.error('User ID is undefined.');
      }
    } else {
      console.error('User profile data not found.');
    }
  }



  submitReview(order: any): void {
    this.matDialog.open(ReviewComponent, {
      data: { orderId: order._id, productId: order.product_id }

    });
    console.log('Order ID:',  order._id);
    console.log('Product ID:', order.product_id);
  }

  viewReceipt(order: any): void {
    if (order.receipt_url) {
      window.open(order.receipt_url, '_blank'); // Open receipt_url in a new tab
    } else {
      console.error('Receipt URL not found.');
    }
  }


  convertImageDataForOrders(): void {
    for (const order of this.orders) {
      if (order.product_id) {
        this.productService.getProductById(order.product_id).subscribe(
          (productResponse: any) => {
            const product = productResponse.data; // Assuming product data is nested under 'data' property
            if (product && product.imageData) {
              const base64Image = this.uintBase64(product.imageData.buffer.data);
              order.productImage = `data:image/jpeg;base64,${base64Image}`;
            } else {
              console.error('Invalid product data:', product);
            }
          },
          (error) => {
            console.error('Error fetching product:', error);
          }
        );
      }
    }
  }

  uintBase64(buffer: Uint8Array): string {
    let binary = '';
    buffer.forEach((byte) => {
      binary += String.fromCharCode(byte);
    });
    return btoa(binary);
  }

}
