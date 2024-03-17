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

  getProduct(): Observable<any>{
    return this.http.get<UserApiResponse>(`${environment.api_url}/api/product/getProducts`);
  }

  deleteProduct(productId: string): Observable<any> {
    return this.http.delete<any>(`${environment.api_url}/api/product/deleteProduct/${productId}`);
  }

  // updateProduct(productId: string, data: any | object): Observable<any> {
  //   return this.http.put<any>(`${environment.api_url}/api/product/updateProduct/${productId}`, data);
  // }

  getProductById(productId: string): Observable<any> {
    return this.http.get<UserApiResponse>(`${environment.api_url}/api/product/getProducts/${productId}`);
  }
  
}  
