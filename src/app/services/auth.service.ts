import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable, map } from 'rxjs';
import { UserApiResponse } from './http.response.interface';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private currentUser: any = null;

  constructor(private http: HttpClient) { }
  

  register(data: any | object): Observable<any> {
    return this.http.post<UserApiResponse>(`${environment.api_url}/api/auth/register`, data)
  }

  
  addProduct(data: any | object): Observable<any> {
    return this.http.post<UserApiResponse>(`${environment.api_url}/api/auth/addProduct`, data)
  }

  login(data: any | object): Observable<any> {
    return this.http.post<UserApiResponse>(`${environment.api_url}/api/auth/login`, data)
      .pipe(
        map((res: UserApiResponse) => {
          if(res.status === 200){
            this.setUser(res.data)
          }
          return res;
        })
      )
  }

  logout(){
    localStorage.removeItem('currentUser');
  }


  getCurrentUser(){
    return JSON.parse(localStorage.getItem('currentUser') || '{}');
  }

  setCurrentUser(user: any | object){
    localStorage.setItem('currentUser', JSON.stringify(user));
  }

  // Temporary delay simulation. Can be removed when backend is ready
  private delay(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  private setUser(data: any){
    data.role =
    data.type === 'U' ? 'user' : 
    data.type === 'A' ? 'admin' :
    ''
    this.setCurrentUser(data);
  }
}
