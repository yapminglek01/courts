import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { HttpClient } from '@angular/common/http';
import { ReviewService } from '../../../services/review.service';

@Component({
  selector: 'app-review',
  templateUrl: './review.component.html',
  styleUrls: ['./review.component.css']
})
export class ReviewComponent {
  reviewForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private dialogRef: MatDialogRef<ReviewComponent>,
    private http: HttpClient,
    private reviewService: ReviewService, // Inject ReviewService
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.reviewForm = this.formBuilder.group({
      rating: [null, Validators.required],
      reviewComment: ['', Validators.required],
      orderId: [data.orderId, Validators.required],
      productId: [data.productId, Validators.required]
    });
  }

  submitReview(): void {
    if (this.reviewForm.invalid) {
      return;
    }

    const selectedRating = this.reviewForm.get('rating')?.value;
    const reviewComment = this.reviewForm.get('reviewComment')?.value;
    const orderId = this.reviewForm.get('orderId')?.value;
    const productId = this.reviewForm.get('productId')?.value;

    const reviewData = {
      rating: selectedRating,
      comment: reviewComment,
      orderId: orderId,
      productId: productId
    };

    this.reviewService.submitReview(reviewData).subscribe(
      (response) => {
        console.log('Review submitted successfully:', reviewData);
        this.dialogRef.close(); // Close dialog after successful submission
      },
      (error) => {
        console.error('Error submitting review:', reviewData);
        // Handle error if submission fails
      }
    );
    this.dialogRef.close();

  }

  
  cancel(): void {
    this.reviewForm.reset();
    console.log('Review submission canceled');
    this.dialogRef.close();
  }
}
