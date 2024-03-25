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
export class storesMapNonUser implements OnInit {
  constructor() { }

  ngOnInit(): void {
    this.loadGoogleMaps();
  }

  loadGoogleMaps(): void {
    if (!window.google || !window.google.maps) {
      const script = document.createElement('script');
      script.src = 'https://maps.googleapis.com/maps/api/js?key=AIzaSyAK42Zjh4o1dCn-PBKlluaoLrckFvYRMog&callback=initMap';
      script.defer = true;
      script.async = true;
      document.head.appendChild(script);
    } else {
      // Google Maps API is already loaded
      this.initMap();
    }
  }

  private initMap(): void {
    // The location of the center of the map
    const center = { lat: 3.1319, lng: 101.6841 };

    // Get the map element
    const mapElement = document.getElementById('map');

    // Check if the map element exists before creating the map
    if (mapElement) {
      // Create a new map centered at the specified location
      new google.maps.Map(mapElement, {
        zoom: 6,
        center: center
      });
    } else {
      console.error('Map element not found.');
    }
  }
}