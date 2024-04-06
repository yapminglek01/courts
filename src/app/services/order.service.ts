import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Order } from '../models/order.model';
import { UserApiResponse } from './http.response.interface';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor(private http: HttpClient) { }

  makePurchase(data: any | object): Observable<any> {
    return this.http.post<UserApiResponse>(`${environment.api_url}/api/order/purchase`, data)
  }

  updateOrder(data: any | object): Observable<any> {
    return this.http.post<UserApiResponse>(`${environment.api_url}/api/order/update-order`, data);
  }

  getOrders(): Observable<any> {
    return this.http.get<any>(`${environment.api_url}/api/order/getOrders`);
  }
}