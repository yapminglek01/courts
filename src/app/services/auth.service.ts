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

  constructor(private http: HttpClient) { }
  


  register(data: any | object): Observable<any> {
    return this.http.post<UserApiResponse>(`${environment.api_url}/api/auth/register`, data)
  }


  login(data: any | object): Observable<any> {
    return this.http.post<UserApiResponse>(`${environment.api_url}/api/auth/login`, data)
      .pipe(
        map((res: UserApiResponse) => {
          if(res.status === 200){
            this.setUser(res.data)
            this.currentUser = res.data; // Set currentUser after successful login

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
  

 

  verifyOldPassword(oldPassword: string): Observable<boolean> {
    // Check if currentUser is set
    if (!this.currentUser) {
        console.error('User is not logged in');
        return throwError('User is not logged in');
    }

    // Construct the URL using the appropriate endpoint
    const apiUrl = `${environment.api_url}/api/auth/verify-old-password`;

    // Make the request using the constructed URL
    return this.http.post<boolean>(apiUrl, { oldPassword });
}


updatePassword(newPassword: string): Observable<any> {
  // Make an HTTP request to your backend to update the password
  // Example:
  return this.http.post<any>(`${this.currentUser}/update-password`, { newPassword });
}
  
}
