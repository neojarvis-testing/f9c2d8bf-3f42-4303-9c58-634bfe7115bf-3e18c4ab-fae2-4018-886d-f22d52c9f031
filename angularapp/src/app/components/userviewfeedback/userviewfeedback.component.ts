// import { Component, OnInit } from '@angular/core';
// import { Feedback } from 'src/app/models/feedback.model';
// import { AuthService } from 'src/app/services/auth.service';
// import { FeedbackService } from 'src/app/services/feedback.service';
// import { Router } from '@angular/router';
// import Swal from 'sweetalert2';
// @Component({
//   selector: 'app-userviewfeedback',
//   templateUrl: './userviewfeedback.component.html',
//   styleUrls: ['./userviewfeedback.component.css']
// })
// export class UserviewfeedbackComponent implements OnInit {
//   feedbacks: Feedback[] = [];
//   selectedFeedback: Feedback | null = null;
//   showDeleteModal: boolean = false;
//   showLogoutModal: boolean = false;
//   errorMessage: string = '';
//   constructor(private feedbackService: FeedbackService, private authService: AuthService, private router: Router) {}
//   ngOnInit(): void {
//     this.loadFeedbacks();
//   }
//   loadFeedbacks(): void {
//     const userId = parseInt(localStorage.getItem('userId') || '0');
//     if (userId) {
//       this.feedbackService.getAllFeedbacksByUserId(userId).subscribe(
//         (data) => {
//           this.feedbacks = data;
//           if (this.feedbacks.length === 0) {
//             this.errorMessage = 'No data found';
//           }
//         },
//         (error) => {
//           console.error('Error fetching feedbacks:', error);
//           this.errorMessage = 'No Feedbacks Found.';
//         }
//       );
//     }
//   }
//   confirmDelete(feedback: Feedback): void {
//     this.selectedFeedback = feedback;
//     this.showDeleteModal = true;
//   }
//   deleteFeedback(): void {
//     if (this.selectedFeedback) {
//       this.feedbackService.deleteFeedback(this.selectedFeedback.FeedbackId!).subscribe(
//         () => {
//           this.showDeleteModal = false;
//           this.loadFeedbacks();
         
//           Swal.fire({
//             title: 'Feedback Deleted',
//             text: 'The feedback has been successfully deleted!',
//             icon: 'success',
//             confirmButtonText: 'OK'
//           });
//           this.router.navigate(['/userviewfeedback']);
//         },
//         (error) => {
//           console.error('Error deleting feedback:', error);
//           this.errorMessage = 'Failed to delete feedback.';
//         }
//       );
//     }
//   }
//   logout(): void {
//     this.showLogoutModal = true;
//   }
//   confirmLogout(): void {
//     this.showLogoutModal = false;
//     localStorage.clear();
//     this.router.navigate(['/login']);
//   }
//   cancelLogout(): void {
//     this.showLogoutModal = false;
//   }
// }
import { Component, OnInit } from '@angular/core';
import { Feedback } from 'src/app/models/feedback.model';
import { AuthService } from 'src/app/services/auth.service';
import { FeedbackService } from 'src/app/services/feedback.service';
import { Router } from '@angular/router';

declare var bootstrap: any;
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
    this.showLoader();
    const userId = parseInt(localStorage.getItem('userId') || '0');
    if (userId) {
      this.feedbackService.getAllFeedbacksByUserId(userId).subscribe(
        (data) => {
          this.feedbacks = data;
          this.hideLoader();
          if (this.feedbacks.length === 0) {
            Swal.fire({
              icon: 'info',
              title: 'No Data',
              text: 'No feedbacks available.'
            });
          }
        },
        (error) => {
          console.error('Error loading feedbacks', error);
          this.hideLoader();
          Swal.fire({
            icon: 'info',
              title: 'No Data',
              text: 'No feedbacks available.'
          });
        }
      );
    }
  }

  showLoader(): void {
    const loader = document.getElementById('loader');
    if (loader) {
      loader.style.display = 'block';
    }
  }

  hideLoader(): void {
    const loader = document.getElementById('loader');
    if (loader) {
      loader.style.display = 'none';
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

// import { Component, OnInit } from '@angular/core';
// import { Feedback } from 'src/app/models/feedback.model';
// import { AuthService } from 'src/app/services/auth.service';
// import { FeedbackService } from 'src/app/services/feedback.service';
// import { Router } from '@angular/router';
 
// declare var bootstrap: any;
// import Swal from 'sweetalert2';
// @Component({
//   selector: 'app-userviewfeedback',
//   templateUrl: './userviewfeedback.component.html',
//   styleUrls: ['./userviewfeedback.component.css']
// })
// export class UserviewfeedbackComponent implements OnInit {
//   feedbacks: Feedback[] = [];
//   selectedFeedback: Feedback | null = null;
//   showDeleteModal: boolean = false;
//   showLogoutModal: boolean = false;
//   errorMessage: string = '';
//   constructor(private feedbackService: FeedbackService, private authService: AuthService, private router: Router) {}
//   ngOnInit(): void {
//     this.loadFeedbacks();
//   }
//   loadFeedbacks(): void {
//     Swal.fire({
//       title: 'Loading feedbacks...',
//       text: 'Please wait while we load your feedbacks.',
//       allowOutsideClick: false,
//       didOpen: () => {
//         Swal.showLoading();
//       }
//     });
 
//     const userId = parseInt(localStorage.getItem('userId') || '0');
//     if (userId) {
//       this.feedbackService.getAllFeedbacksByUserId(userId).subscribe(
//         (data) => {
//           this.feedbacks = data;
//           Swal.close();
 
//           if (this.feedbacks.length === 0) {
//             Swal.fire({
//               icon: 'info',
//               title: 'No Data',
//               text: 'No feedbacks available.'
//             });
//           }
//         },
//         (error) => {
//           console.error('Error loading feedbacks', error);
//           // Optionally, you can log the error or handle it silently
//           Swal.close(); // Close the loading spinner even if there's an error
//           Swal.fire({
//             icon: 'info',
//             title: 'No Data',
//             text: 'No feedbacks available.'
//           });
//         }
//       );        
     
//     }
//   }
//   confirmDelete(feedback: Feedback): void {
//     this.selectedFeedback = feedback;
//     this.showDeleteModal = true;
//   }
//   deleteFeedback(): void {
//     if (this.selectedFeedback) {
//       this.feedbackService.deleteFeedback(this.selectedFeedback.FeedbackId!).subscribe(
//         () => {
//           this.showDeleteModal = false;
//           this.loadFeedbacks();
         
//           Swal.fire({
//             title: 'Feedback Deleted',
//             text: 'The feedback has been successfully deleted!',
//             icon: 'success',
//             confirmButtonText: 'OK'
//           });
//           this.router.navigate(['/userviewfeedback']);
//         },
//         (error) => {
//           console.error('Error deleting feedback:', error);
//           this.errorMessage = 'Failed to delete feedback.';
//         }
//       );
//     }
//   }
//   logout(): void {
//     this.showLogoutModal = true;
//   }
//   confirmLogout(): void {
//     this.showLogoutModal = false;
//     localStorage.clear();
//     this.router.navigate(['/login']);
//   }
//   cancelLogout(): void {
//     this.showLogoutModal = false;
//   }
// }