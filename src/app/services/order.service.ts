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
}
