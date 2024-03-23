import { Injectable } from '@angular/core';
import { UserApiResponse } from './http.response.interface';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private http: HttpClient) { }

  addProduct(data: any | object): Observable<any> {
    return this.http.post<UserApiResponse>(`${environment.api_url}/api/product/addProduct`, data)
  }

  getProducts(): Observable<any>{
    return this.http.get<UserApiResponse>(`${environment.api_url}/api/product/products`);
  }

  getProduct(id: string): Observable<any>{
    return this.http.get<UserApiResponse>(`${environment.api_url}/api/product/product/${id}`);
  }


  uintBase64(data: any): string {
    const uint = new Uint8Array(data)
    return "data:image/jpeg;base64," + btoa(uint.reduce((str, byte) => str + String.fromCharCode(byte), ''));
  }
}
