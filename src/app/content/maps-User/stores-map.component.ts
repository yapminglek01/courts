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
  center: google.maps.LatLngLiteral = { lat: 3.1319, lng: 101.6841 };
  zoom = 11.5;
  defaultMarkerOptions: google.maps.MarkerOptions = { draggable: false }; // Default marker options
  currentLocationMarkerOptions: google.maps.MarkerOptions | null = null; // Marker options for current location
  defaultMarkers: google.maps.LatLngLiteral[] = [ // Default markers
    { lat: 3.235420, lng: 101.644630 }, //Selayang
    { lat: 3.193840, lng: 101.605540 }, //Sri Damansara
    { lat: 3.037820, lng: 101.550660 }, //Shah Alam
    { lat: 3.200540, lng: 101.718090 }, //Setapak
    { lat: 3.052034, lng: 101.781237 }, //Cheras
    { lat: 3.009600, lng: 101.599340 }, //Puchong
  ];
  currentLocation: google.maps.LatLngLiteral | null = null; // Current location marker

  constructor() {}

  ngOnInit(): void {
    this.getCurrentLocation();
  }

  moveMap(event: google.maps.MapMouseEvent) {
    if (event.latLng) {
      this.center = event.latLng.toJSON();
    }
  }

  getCurrentLocation(): void {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        position => {
          this.currentLocation = {
            lat: position.coords.latitude,
            lng: position.coords.longitude
          };
          // Customize marker options for current location
          this.currentLocationMarkerOptions = {
            draggable: false,
            icon: {
              fillColor: 'black',
              fillOpacity: 1,
              strokeWeight: 0,
              scale: 10, // Adjust the scale to make it a circle
              path: google.maps.SymbolPath.CIRCLE // Set the shape to circle
            }
          };
        },
        error => {
          console.error('Error getting current location:', error);
        }
      );
    } else {
      console.error('Geolocation is not supported by this browser.');
    }
  }

  onMapReady(event: google.maps.Map) {
    console.log('Adding markers...');
  }
}
