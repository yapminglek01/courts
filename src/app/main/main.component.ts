import { Component } from '@angular/core';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrl: './main.component.css'
})
export class MainComponent {

  check = true;
  constructor() {}



  toggleCheck() {
    this.check = !this.check;
  }
}
