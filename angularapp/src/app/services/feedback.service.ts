import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { Feedback } from '../models/feedback.model';
import { AuthService } from './auth.service';
import { environment } from 'src/environments/environment';
 
@Injectable({
  providedIn: 'root'
})
export class FeedbackService {
  private apiUrl = environment.apiUrl;
 
  constructor(private http: HttpClient, private authService: AuthService) {}
  private getHeaders(): HttpHeaders {
    const token = this.authService.getToken();
    return new HttpHeaders({ 'Authorization': `Bearer ${token}` });
  }
  sendFeedback(feedback: Feedback): Observable<void> {
    return this.http.post<void>(`${this.apiUrl}/feedback`, feedback, { headers: this.getHeaders() }).pipe(
      catchError(this.handleError)
    );
  }
  getAllFeedbacksByUserId(userId: number): Observable<Feedback[]> {
    return this.http.get<Feedback[]>(`${this.apiUrl}/feedback/user/${userId}`, { headers: this.getHeaders() }).pipe(
      catchError(this.handleError)
    );
  }
<<<<<<< HEAD
  getUsernameByUserId(userId: number): Observable<string> {
    return this.http.get<{ username: string }>(`${this.apiUrl}/feedback/username/${userId}`, { headers: this.getHeaders() }).pipe(
=======
  
  getUsernameByUserId(userId: number): Observable<string> {
    return this.http.get<{ username: string }>(`${this.apiUrl}/feedback/user/${userId}`, { headers: this.getHeaders() }).pipe(
>>>>>>> e7139b0ee7f2973207a95c07c4bb65e0ebeb4350
      map(response => {
        console.log(`Full response for userId ${userId}: `, response);
        return response.username;
      }),
      catchError(error => {
        console.error('Fetch username error:', {
          status: error.status,
          message: error.message,
          error: error.error
        });
        return throwError(error);
      })
    );
  }
<<<<<<< HEAD
=======

>>>>>>> e7139b0ee7f2973207a95c07c4bb65e0ebeb4350
  deleteFeedback(feedbackId: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/feedback/${feedbackId}`, { headers: this.getHeaders() }).pipe(
      catchError(this.handleError)
    );
  }
  getFeedbacks(): Observable<Feedback[]> {
    return this.http.get<Feedback[]>(`${this.apiUrl}/feedback`, { headers: this.getHeaders() }).pipe(
      catchError(this.handleError)
    );
  }
  private handleError(error: any): Observable<never> {
    console.error('An error occurred:', error);
    return throwError(error);
  }
}