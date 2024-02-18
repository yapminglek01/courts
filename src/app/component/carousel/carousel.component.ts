import { Component } from '@angular/core';

@Component({
  selector: 'app-carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.css']
})
export class CarouselComponent {
  items = [
    { imageUrl: 'assets/images/carousel1.jpg' },
    { imageUrl: 'assets/images/carousel2.jpg' },
    { imageUrl: 'assets/images/carousel3.jpg' },

  ];
  currentIndex = 0;

  next() {
    this.currentIndex = (this.currentIndex + 1) % this.items.length;
  }

  prev() {
    this.currentIndex = (this.currentIndex - 1 + this.items.length) % this.items.length;
  }
}
