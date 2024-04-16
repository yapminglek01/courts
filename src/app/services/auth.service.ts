import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable, map, throwError } from 'rxjs';
import { UserApiResponse } from './http.response.interface';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private currentUser: any = null;
  private token: string = '';

  constructor(private http: HttpClient) { }

  register(data: any | object): Observable<any> {
    return this.http.post<UserApiResponse>(`${environment.api_url}/api/auth/register`, data)
  }

  login(data: any | object): Observable<any> {
    return this.http.post<UserApiResponse>(`${environment.api_url}/api/auth/login`, data)
      .pipe(
        map((res: UserApiResponse) => {
          if(res.status === 200){
            this.setUser(res.data.user)
            this.setToken(res.data.token)
          }
          return res;
        })
      )
  }

  updatePassword(data: any | object): Observable<any>{
    return this.http.post<UserApiResponse>(`${environment.api_url}/api/auth/update-password`, data)
  }

  
  updateProfile(data: any | object): Observable<any> {
    return this.http.post<UserApiResponse>(`${environment.api_url}/api/auth/update-profile`, data);
  }

  logout(){
    localStorage.removeItem('currentUser');
    localStorage.removeItem('token')
  }


  getCurrentUser(){
    return JSON.parse(localStorage.getItem('currentUser') || '{}');
  }

  setCurrentUser(user: any | object){
    localStorage.setItem('currentUser', JSON.stringify(user));
  }


  getToken(){
    this.token = localStorage.getItem('token') || '';
    return this.token;
  }

  setToken(token: string){
    localStorage.setItem('token', token)
    this.token = token;
  }

  private setUser(data: any){
    data.role =
    data.type === 'U' ? 'user' : 
    data.type === 'A' ? 'admin' :
    ''
    this.setCurrentUser(data);
    this.currentUser = data.user; // Set currentUser after successful login
  }
  

 

  
}
