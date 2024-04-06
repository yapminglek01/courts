import { Component } from '@angular/core';
import { OnInit } from '@angular/core';
import { ReviewComponent } from './review/review.component';
import { AuthService } from '../../services/auth.service';
import { MatDialog } from '@angular/material/dialog';

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

  constructor(private matDialog: MatDialog, private authService: AuthService) { }

  ngOnInit(): void {
    // Fetch orders from your backend service here if needed
  }

  submitReview(order: any) {
    this.matDialog.open(ReviewComponent);
  }

  viewReceipt(order: any) {
    // Implement logic to view the receipt for the selected order
  }
}
