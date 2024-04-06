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
    
  constructor() {}
      
  ngOnInit(): void {}

  display: any;
  center: google.maps.LatLngLiteral = {
      lat: 3.1319,
      lng: 101.6841
  };
  zoom = 11;

  moveMap(event: google.maps.MapMouseEvent) {
      if (event.latLng != null) this.center = (event.latLng.toJSON());
  }

  move(event: google.maps.MapMouseEvent) {
      if (event.latLng != null) this.display = event.latLng.toJSON();
  }

  addMarker(map: google.maps.Map) {
      const marker = new google.maps.Marker({
          position: { lat: 3.1481, lng: 101.6164 }, // Set the desired latitude and longitude
          map: map,
          title: 'My Marker'
      });
  }

  onMapReady(event: any) {
      const map = event.target as google.maps.Map;
      this.addMarker(map);
  }
}
