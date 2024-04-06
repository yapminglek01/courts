import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { UserApiResponse } from './http.response.interface';

@Injectable({
  providedIn: 'root'
})

export class OrderService {

  constructor(private http: HttpClient) { }

  // Method to fetch orders
  getOrders(): Observable<any> {
    return this.http.get<UserApiResponse>(`${environment.api_url}/api/getOrders`);
  }


}
