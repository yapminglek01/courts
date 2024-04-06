import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor(private http: HttpClient) { }

  // Method to fetch orders
  getOrders(): Observable<any> {
    return this.http.get<any>(`${environment.api_url}/api/getOrders`);
  }
}
