import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-review',
  templateUrl: './review.component.html',
  styleUrls: ['./review.component.css']
})
export class ReviewComponent implements OnInit {
  reviewForm: FormGroup;

  constructor(private formBuilder: FormBuilder) {
    this.reviewForm = this.formBuilder.group({
      rating: [null, Validators.required],
      reviewComment: ['', Validators.required]
    });
  }

  ngOnInit(): void {
  }

  setRating(event: MouseEvent): void {
    const rating = parseInt((event.target as HTMLElement).innerText);
    (this.reviewForm.get('rating') as any).setValue(rating); // Type assertion
  }

  submitReview(): void {
    if (this.reviewForm.invalid) return;

    // Submit the review form data
    console.log('Review submitted:', this.reviewForm.value);

    // Clear the form after submission
    this.reviewForm.reset();
  }

  cancel(): void {
    // Navigate to a different page or perform any other action
    console.log('Review submission canceled');
  }
}
