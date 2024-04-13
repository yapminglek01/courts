import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { GoogleMapsModule, MapInfoWindow, MapMarker } from '@angular/google-maps';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, GoogleMapsModule],
  templateUrl: './stores-map.component.html',
  styleUrls: ['./stores-map.component.css']
})
export class storesMapNonUser implements OnInit {
  center: google.maps.LatLngLiteral = { lat: 3.1319, lng: 101.6841 };
  zoom = 11.5;
  markerOptions: google.maps.MarkerOptions = { draggable: false };
  markers: google.maps.LatLngLiteral[] = [
    { lat: 3.235420, lng: 101.644630 }, //Selayang
    { lat: 3.193840, lng: 101.605540 }, //Sri Damansara
    { lat: 3.037820, lng: 101.550660 }, //Shah Alam
    { lat: 3.200540, lng: 101.718090 }, //Setapak
    { lat: 3.052034, lng: 101.781237 }, //Cheras
    { lat: 3.009600, lng: 101.599340 }, //Puchong
  ];

  constructor() {}

  ngOnInit(): void {}

  moveMap(event: google.maps.MapMouseEvent) {
    if (event.latLng) {
      this.center = event.latLng.toJSON();
    }
  }

  onMapReady(event: google.maps.Map) {
    console.log('Adding markers...');
  }

}
