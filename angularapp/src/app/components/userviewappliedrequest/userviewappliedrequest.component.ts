import { Component, OnInit } from '@angular/core';
import { CookingClassRequest } from 'src/app/models/cooking-class-request.model';
import { AuthService } from 'src/app/services/auth.service';
import { CookingClassService } from 'src/app/services/cooking-class.service';
@Component({
  selector: 'app-userviewappliedrequest',
  templateUrl: './userviewappliedrequest.component.html',
  styleUrls: ['./userviewappliedrequest.component.css']
})
export class UserviewappliedrequestComponent implements OnInit {
  appliedRequests: CookingClassRequest[] = [];
  filteredRequests: CookingClassRequest[] = [];
  searchQuery: string = '';
 
  currentPage: number = 1;
  requestsPerPage: number = 10;
  constructor(
    private cookingClassService: CookingClassService,
    private authService: AuthService
  ) {}
  ngOnInit(): void {
    const userId = this.authService.getUserIdFromToken(localStorage.getItem('token')!);
    this.loadAppliedRequests(userId);
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
  
  loadAppliedRequests(userId: string): void {
    this.showLoader();
    this.cookingClassService.getCookingClassRequestsByUserId(userId).subscribe(
      (requests) => {
        this.appliedRequests = requests;
        this.updateFilteredRequests();
        this.hideLoader();
      },
      (error) => console.error('Error fetching requests:', error)
    );
  }
  searchRequests(): void {
    this.currentPage = 1;
    this.updateFilteredRequests();
  }
  changePage(page: number): void {
    this.currentPage = page;
    this.updateFilteredRequests();
  }
  updateFilteredRequests(): void {
    let filtered = this.appliedRequests;
    if (this.searchQuery) {
      filtered = filtered.filter(request => {
        return request.CookingClass.ClassName.toLowerCase().includes(this.searchQuery.toLowerCase());
      });
    }
    const startIndex = (this.currentPage - 1) * this.requestsPerPage;
    const endIndex = startIndex + this.requestsPerPage;
    this.filteredRequests = filtered.slice(startIndex, endIndex);
  }
  confirmDelete(requestId: number): void {
    if (confirm('Are you sure you want to delete this request?')) {
      this.deleteRequest(requestId);
    }
  }
  deleteRequest(requestId: number): void {
    this.cookingClassService.deleteCookingClassRequest(requestId).subscribe(
      () => {
        this.appliedRequests = this.appliedRequests.filter(
          (request) => request.CookingClassRequestId !== requestId
        );
        this.updateFilteredRequests();
      },
      (error) => console.error('Error deleting request:', error)
    );
  }
  getTotalPages(): number {
    return Math.ceil(this.appliedRequests.length / this.requestsPerPage);
  }
  previousPage(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.updateFilteredRequests();
    }
  }
  nextPage(): void {
    if (this.currentPage < this.getTotalPages()) {
      this.currentPage++;
      this.updateFilteredRequests();
    }
  }
}