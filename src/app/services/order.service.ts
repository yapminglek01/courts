import { Injectable } from '@angular/core';
import { UserApiResponse } from './http.response.interface';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';


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


  private apiUrl = environment.api_url; // Base API URL from environment

  getOrdersByUserId(userId: string): Observable<any[]> {
    const url = `${this.apiUrl}/api/order/user/${userId}`;
    return this.http.get<any[]>(url);
  }
  getCompleteOrdersByUserId(userId: string): Observable<any[]> {
    const url = `${this.apiUrl}/api/order/user/${userId}?status=complete`;

    return this.http.get<any[]>(url);
  }

  
  getAllOrders(): Observable<any[]> {
    const url = `${this.apiUrl}/api/order/all`;
    return this.http.get<any[]>(url);
  }

  uintBase64(data: any): string {
    const uint = new Uint8Array(data)
    return "data:image/jpeg;base64," + btoa(uint.reduce((str, byte) => str + String.fromCharCode(byte), ''));
  }
  
}

