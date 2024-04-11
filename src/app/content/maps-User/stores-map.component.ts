import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
  
import { GoogleMapsModule } from '@angular/google-maps'
  
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, GoogleMapsModule],
  templateUrl: './stores-map.component.html',
  styleUrls: ['./stores-map.component.css']
})
export class storesMapUser implements OnInit {
    
  constructor() {}
      
  ngOnInit(): void {}

  display: any;
  center: google.maps.LatLngLiteral = {
      lat: 3.1319,
      lng: 101.6841
  };
  zoom = 12;

  /*------------------------------------------
  --------------------------------------------
  moveMap()
  --------------------------------------------
  --------------------------------------------*/
  moveMap(event: google.maps.MapMouseEvent) {
      if (event.latLng != null) this.center = (event.latLng.toJSON());
  }

  /*------------------------------------------
  --------------------------------------------
  move()
  --------------------------------------------
  --------------------------------------------*/
  move(event: google.maps.MapMouseEvent) {
      if (event.latLng != null) this.display = event.latLng.toJSON();
  }
}