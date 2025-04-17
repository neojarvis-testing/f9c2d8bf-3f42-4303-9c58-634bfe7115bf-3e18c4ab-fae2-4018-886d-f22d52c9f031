import { Component, OnInit } from '@angular/core';
import { Feedback } from 'src/app/models/feedback.model';
import { AuthService } from 'src/app/services/auth.service';
import { FeedbackService } from 'src/app/services/feedback.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-userviewfeedback',
  templateUrl: './userviewfeedback.component.html',
  styleUrls: ['./userviewfeedback.component.css']
})
export class UserviewfeedbackComponent implements OnInit {
  feedbacks: Feedback[] = [];
  selectedFeedback: Feedback | null = null;
  showDeleteModal: boolean = false;
  showLogoutModal: boolean = false;
  errorMessage: string = '';
  constructor(private feedbackService: FeedbackService, private authService: AuthService, private router: Router) {}
  ngOnInit(): void {
    this.loadFeedbacks();
  }
  loadFeedbacks(): void {
    const userId = parseInt(localStorage.getItem('userId') || '0');
    if (userId) {
      this.feedbackService.getAllFeedbacksByUserId(userId).subscribe(
        (data) => {
          this.feedbacks = data;
          if (this.feedbacks.length === 0) {
            this.errorMessage = 'No data found';
          }
        },
        (error) => {
          console.error('Error fetching feedbacks:', error);
          this.errorMessage = 'No Feedbacks Found.';
        }
      );
    }
  }
  confirmDelete(feedback: Feedback): void {
    this.selectedFeedback = feedback;
    this.showDeleteModal = true;
  }
  deleteFeedback(): void {
    if (this.selectedFeedback) {
      this.feedbackService.deleteFeedback(this.selectedFeedback.FeedbackId!).subscribe(
        () => {
          this.showDeleteModal = false;
          this.loadFeedbacks();
         
          Swal.fire({
            title: 'Feedback Deleted',
            text: 'The feedback has been successfully deleted!',
            icon: 'success',
            confirmButtonText: 'OK'
          });
          this.router.navigate(['/userviewfeedback']);
        },
        (error) => {
          console.error('Error deleting feedback:', error);
          this.errorMessage = 'Failed to delete feedback.';
        }
      );
    }
  }
  logout(): void {
    this.showLogoutModal = true;
  }
  confirmLogout(): void {
    this.showLogoutModal = false;
    localStorage.clear();
    this.router.navigate(['/login']);
  }
  cancelLogout(): void {
    this.showLogoutModal = false;
  }
}