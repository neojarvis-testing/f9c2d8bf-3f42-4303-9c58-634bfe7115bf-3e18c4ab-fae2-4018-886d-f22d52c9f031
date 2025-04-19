// import { Component, OnInit } from '@angular/core';
// import { Router } from '@angular/router';
// import { FeedbackService } from 'src/app/services/feedback.service';
// import { Feedback } from 'src/app/models/feedback.model';
// @Component({
//   selector: 'app-adminviewfeedback',
//   templateUrl: './adminviewfeedback.component.html',
//   styleUrls: ['./adminviewfeedback.component.css']
// })
// export class AdminviewfeedbackComponent implements OnInit {
//   feedbacks: Feedback[] = [];
//   feedbackUsernames: { [key: number]: string } = {};
//   selectedFeedback: Feedback | null = null;
//   showProfileModal: boolean = false;
//   showLogoutModal: boolean = false;
//   errorMessage: string = '';
//   Username: string = '';
 
//   currentPage: number = 1;
//   itemsPerPage: number = 5;
//   constructor(private feedbackService: FeedbackService, private router: Router) { }
//   ngOnInit(): void {
//     this.loadFeedbacks();
//     this.Username = localStorage.getItem('userName');
//   }
//   loadFeedbacks(): void {
//     this.feedbackService.getFeedbacks().subscribe(
//       (data) => {
//         console.log('Loading feedbacks...');
//         this.feedbacks = data;
//         this.loadUsernames();
//         console.log(this.feedbacks);
//         if (this.feedbacks.length === 0) {
//           this.errorMessage = 'No data found';
//         }
//       },
//       (error) => {
//         console.error('Error fetching feedbacks:', error);
//         this.errorMessage = 'Failed to load feedbacks.';
//       }
//     );
//   }
//   loadUsernames(): void {
//     console.log('Loading usernames...');
//     this.feedbacks.forEach(feedback => {
//       this.feedbackService.getUsernameByUserId(feedback.UserId).subscribe(
//         username => {
//           console.log(`Username for user ID ${feedback.UserId} is: ${username}`); // Log the username here
//           this.feedbackUsernames[feedback.UserId] = username;
//         },
//         error => {
//           console.error('Error fetching username:', error);
//           this.feedbackUsernames[feedback.UserId] = 'Unknown';
//         }
//       );
//     });
//   }
//   showProfile(feedback: Feedback): void {
//     this.selectedFeedback = feedback;
//     this.showProfileModal = true;
//   }

//   closeProfileModal(): void {
//     this.showProfileModal = false;
//     this.selectedFeedback = null;
//   }
  
//   closeLogoutModal(): void {
//     this.showLogoutModal = false;
//   }
//   logout(): void {
//     this.router.navigate(['/login']);
//   }
 
//   get paginatedFeedbacks(): Feedback[] {
//     const startIndex = (this.currentPage - 1) * this.itemsPerPage;
//     return this.feedbacks.slice(startIndex, startIndex + this.itemsPerPage);
//   }
//   nextPage(): void {
//     if (this.currentPage * this.itemsPerPage < this.feedbacks.length) {
//       this.currentPage++;
//     }
//   }
//   previousPage(): void {
//     if (this.currentPage > 1) {
//       this.currentPage--;
//     }
//   }
//   getTotalPages(): number {
//     return Math.ceil(this.feedbacks.length / this.itemsPerPage);
//   }
// }



import { Component, OnInit } from '@angular/core';
import { Feedback } from 'src/app/models/feedback.model';
import { FeedbackService } from 'src/app/services/feedback.service';
import { User } from 'src/app/models/user.model';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
 
import { GridOptions } from 'ag-grid-community';
 
import { AgGridAngular } from 'ag-grid-angular';
declare var bootstrap: any;
 
 
@Component({
  selector: 'app-adminviewfeedback',
  templateUrl: './adminviewfeedback.component.html',
  styleUrls: ['./adminviewfeedback.component.css']
})
export class AdminviewfeedbackComponent implements OnInit {
  feedbacks: Feedback[] = [];
  filteredFeedbacks : Feedback[]=[];
  paginatedFeedbacks: Feedback[] = [];
  selectedUser: User | null = null;
  currentPage: number = 1;
  itemsPerPage: number = 5;
  totalPagesArray: number[] = [];

 
 
  gridOptions: GridOptions = {
     pagination: true,
     defaultColDef: { resizable: true }
     };
   
 
  columnDefs = [
    {
      headerName: 'S.No',
      valueGetter: (params: any) => {
        return (this.currentPage - 1) * this.itemsPerPage + params.node.rowIndex + 1;
      },
      sortable: false,
      filter: false,
      width: 80
    },
    {field:'UserId', sortable: true, filters: true},
    {field:'User.Username', sortable: true, filters: true},
    {field:'FeedbackText', sortable: true, filters: true},
    {field:'Date', sortable: true, filters: true},
    {field:'User.MobileNumber', sortable: true, filters: true}
  ]
 
  constructor(private feedbackService: FeedbackService, private router: Router) { }
 
  ngOnInit(): void {
    this.loadFeedbacks();
  }
 
  loadFeedbacks(): void {
    Swal.fire({
      title: 'Loading Feedbacks...',
      text: 'Please wait while we load the feedbacks.',
      allowOutsideClick: false,
      didOpen: () => {
        Swal.showLoading();
      }
    });
 
    this.feedbackService.getFeedbacks().subscribe(
      (res) => {
        console.log(res);
        this.feedbacks = res;
        this.filteredFeedbacks = res;
        this.paginateFeedbacks();
        this.setupPagination();
        Swal.close(); // Close the loading spinner when data is successfully loaded
      },
      (error) => {
        console.error('Error fetching feedbacks:', error);
        Swal.close(); // Close the loading spinner if there's an error
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Failed to load feedbacks. Please try again later.'
        });
      }
    );
  }
 
 
  paginateFeedbacks(): void {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    this.paginatedFeedbacks = this.feedbacks.slice(startIndex, endIndex);
  }
 
  setupPagination(): void {
    const totalPages = Math.ceil(this.feedbacks.length / this.itemsPerPage);
    this.totalPagesArray = Array.from({ length: totalPages }, (_, i) => i + 1);
  }
 
  changePage(page: number): void {
    this.currentPage = page;
    this.paginateFeedbacks();
  }
 
  openModal(user: User): void {
    this.selectedUser = user;
    const modalElement = document.getElementById('userModal');
    if (modalElement) {
      const modal = new bootstrap.Modal(modalElement);
      modal.show();
    }
  }
}
 
