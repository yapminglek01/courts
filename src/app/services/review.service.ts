import { Injectable } from '@angular/core';
import { UserApiResponse } from './http.response.interface';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ReviewService {


  private apiUrl = environment.api_url;

  constructor(private http: HttpClient) { }

  submitReview(reviewData: any): Observable<any> {
    return this.http.post<UserApiResponse>(`${this.apiUrl}/api/review/addcomment`, reviewData);
  }
}
