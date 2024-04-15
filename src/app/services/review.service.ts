import { Injectable } from '@angular/core';
import { UserApiResponse } from './http.response.interface';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ReviewService {


  constructor(private http: HttpClient) { }
  private apiUrl = environment.api_url;

  submitReview(reviewData: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/add-review`, reviewData);
  }
}
