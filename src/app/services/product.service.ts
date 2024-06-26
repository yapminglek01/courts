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


  getReviewsByProductId(id: string): Observable<any[]> {
    return this.http.get<any[]>(`${environment.api_url}/api/product/product/${id}`);
  }


  getReviewsByProductIt(id: string): Observable<any[]> {
    return this.http.get<any[]>(`${environment.api_url}/api/product/productreview/${id}`);
  }

  uintBase64(data: any): string {
    const uint = new Uint8Array(data)
    return "data:image/jpeg;base64," + btoa(uint.reduce((str, byte) => str + String.fromCharCode(byte), ''));
  }

  private apiUrl = environment.api_url;
  getProductById(productId: string): Observable<any> {
    const url = `${this.apiUrl}/api/product/${productId}`;
    return this.http.get<any>(url);
  }

  deleteProduct(productId: string): Observable<any> {
    return this.http.delete<any>(`${environment.api_url}/api/product/deleteProduct/${productId}`);
  }

  updateProduct(productId: string, data: any | object): Observable<any> {
    return this.http.put<any>(`${environment.api_url}/api/product/updateProduct/${productId}`, data);
  }  
  
  getProductID(productId: string): Observable<any> {
    return this.http.post<any>(`${environment.api_url}/api/product/getProduct`, { productId });
  }
  
}
