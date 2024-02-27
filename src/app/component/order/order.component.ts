import { Component } from '@angular/core';
import { OnInit } from '@angular/core';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrl: './order.component.css'
})
export class OrderComponent implements OnInit  {
  orders: any[] = [
    { id: 12345, date: 'January 1, 2024', total: '$100' },
    // Add more orders here
  ];

  constructor() { }

  ngOnInit(): void {
    // Fetch orders from your backend service here if needed
  }

  reviewOrder(order: any) {
    // Implement logic to navigate to the review page for the selected order
  }

  viewReceipt(order: any) {
    // Implement logic to view the receipt for the selected order
  }
}
