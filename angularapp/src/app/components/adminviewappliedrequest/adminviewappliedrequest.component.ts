import { Component, OnInit } from '@angular/core';
<<<<<<< HEAD
import { $$ } from 'protractor';
import { CookingClassRequest } from 'src/app/models/cooking-class-request.model';
import { CookingClassService } from 'src/app/services/cooking-class.service';
=======
import { CookingClassRequest } from 'src/app/models/cooking-class-request.model';
import { CookingClassService } from 'src/app/services/cooking-class.service';
 
>>>>>>> e7139b0ee7f2973207a95c07c4bb65e0ebeb4350
@Component({
  selector: 'app-adminviewappliedrequest',
  templateUrl: './adminviewappliedrequest.component.html',
  styleUrls: ['./adminviewappliedrequest.component.css']
})
export class AdminviewappliedrequestComponent implements OnInit {
  requests: CookingClassRequest[] = [];
  filteredRequests: CookingClassRequest[] = [];
  paginatedRequests: CookingClassRequest[] = [];
  selectedRequest: CookingClassRequest | null = null;
  statusFilter: string | 'all' = 'all';
  searchText: string = '';
  searchTerm: string = '';
  currentPage: number = 1;
  itemsPerPage: number = 5;
<<<<<<< HEAD
  constructor(private cookingClassService: CookingClassService) { }
  ngOnInit(): void {
    this.fetchRequests();
  }
=======
  showModal : boolean = false;
 
  constructor(private cookingClassService: CookingClassService) { }
 
  ngOnInit(): void {
    this.fetchRequests();
  }
 
>>>>>>> e7139b0ee7f2973207a95c07c4bb65e0ebeb4350
  fetchRequests(): void {
    this.cookingClassService.getAllCookingClassRequests().subscribe({
      next: (data: CookingClassRequest[]) => {
        this.requests = data.map(req => {
          if (!req.CookingClassRequestId) {
            console.error("Missing request ID for:", req);
          }
          if (req.Status === undefined || req.Status === null) {
            req.Status = 'Pending';
          }
          return req;
        });
        this.filteredRequests = this.requests;
        this.filterData();
        this.updatePagination();
      },
      error: (error) => {
        console.error('Error fetching requests:', error);
      }
    });
  }
<<<<<<< HEAD
=======
 
>>>>>>> e7139b0ee7f2973207a95c07c4bb65e0ebeb4350
  searchCookingClasses(): void {
    if (this.searchTerm) {
      this.filteredRequests = this.requests.filter(c => {
        const ClassNameMatch = c.CookingClass.ClassName.toLowerCase().includes(this.searchTerm.toLowerCase());
        return ClassNameMatch;
      });
    } else {
      this.filteredRequests = this.requests;
      console.log('Reset filtered classes', this.filteredRequests);
    }
    this.updatePagination();
  }
<<<<<<< HEAD
=======
 
>>>>>>> e7139b0ee7f2973207a95c07c4bb65e0ebeb4350
  filterData(): void {
    this.filteredRequests = this.requests.filter(req => {
      console.log(req);
      const status = req.Status ? req.Status.toLowerCase() : '';
      const dietaryPreferences = req.DietaryPreferences ? req.DietaryPreferences.toLowerCase() : '';
      const cookingGoals = req.CookingGoals ? req.CookingGoals.toLowerCase() : '';
      const matchesStatus = this.statusFilter === 'all' || status === this.statusFilter.toLowerCase();
      const matchesSearch = dietaryPreferences.includes(this.searchText.toLowerCase()) || cookingGoals.includes(this.searchText.toLowerCase());
      return matchesStatus && matchesSearch;
    });
    this.updatePagination();
  }
<<<<<<< HEAD
=======
 
>>>>>>> e7139b0ee7f2973207a95c07c4bb65e0ebeb4350
  updatePagination(): void {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    this.paginatedRequests = this.filteredRequests.slice(startIndex, endIndex);
  }
<<<<<<< HEAD
=======
 
>>>>>>> e7139b0ee7f2973207a95c07c4bb65e0ebeb4350
  nextPage(): void {
    if ((this.currentPage * this.itemsPerPage) < this.filteredRequests.length) {
      this.currentPage++;
      this.updatePagination();
    }
  }
<<<<<<< HEAD
=======
 
>>>>>>> e7139b0ee7f2973207a95c07c4bb65e0ebeb4350
  previousPage(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.updatePagination();
    }
  }
<<<<<<< HEAD
  getTotalPages(): number {
    return Math.ceil(this.filteredRequests.length / this.itemsPerPage);
  }
  approveRequest(index: number, request: CookingClassRequest): void {
    if (request.Status === 'Rejected') {
      console.error("Cannot approve a rejected request.");
      return;
    }
=======
 
  getTotalPages(): number {
    return Math.ceil(this.filteredRequests.length / this.itemsPerPage);
  }
 
  approveRequest(index: number, request: CookingClassRequest): void {
>>>>>>> e7139b0ee7f2973207a95c07c4bb65e0ebeb4350
    if (!request.CookingClassRequestId) {
      console.error("Invalid request ID. Request:", request);
      return;
    }
    const updatedRequest = { ...request, Status: 'Approved' };
    this.cookingClassService.updateCookingClassRequest(request.CookingClassRequestId, updatedRequest).subscribe({
      next: () => {
        this.requests[index] = updatedRequest;
        const filteredIndex = this.filteredRequests.findIndex(req => req.CookingClassRequestId === request.CookingClassRequestId);
        if (filteredIndex !== -1) {
          this.filteredRequests[filteredIndex] = updatedRequest;
        }
        this.filterData();
      },
      error: (error) => {
        console.error("Error approving request:", error);
      }
    });
  }
<<<<<<< HEAD
  rejectRequest(index: number, request: CookingClassRequest): void {
    if (request.Status === 'Approved') {
      console.error("Cannot reject an approved request.");
      return;
    }
=======
 
  rejectRequest(index: number, request: CookingClassRequest): void {
>>>>>>> e7139b0ee7f2973207a95c07c4bb65e0ebeb4350
    if (!request.CookingClassRequestId) {
      console.error("Invalid request ID.");
      return;
    }
    const updatedRequest = { ...request, Status: 'Rejected' };
    this.cookingClassService.updateCookingClassRequest(request.CookingClassRequestId, updatedRequest).subscribe({
      next: () => {
        this.requests[index] = updatedRequest;
        const filteredIndex = this.filteredRequests.findIndex(req => req.CookingClassRequestId === request.CookingClassRequestId);
        if (filteredIndex !== -1) {
          this.filteredRequests[filteredIndex] = updatedRequest;
        }
        this.filterData();
      },
      error: (error) => {
        console.error("Error rejecting request:", error);
      }
    });
  }
  showMore(request: CookingClassRequest): void {
    this.selectedRequest = request;
<<<<<<< HEAD
  }
  
    
  closeModal(): void {
    this.selectedRequest = null;
  }
=======
    this.showModal = true;
  }
  
  closeModal(): void {
    this.selectedRequest = null;
    this.showModal = false;
  }
 
>>>>>>> e7139b0ee7f2973207a95c07c4bb65e0ebeb4350
  onStatusChange(newStatus: string): void {
    this.statusFilter = newStatus;
    this.filterData();
  }
<<<<<<< HEAD
=======
 
>>>>>>> e7139b0ee7f2973207a95c07c4bb65e0ebeb4350
  onSearchChange(searchText: string): void {
    this.searchText = searchText;
    this.filterData();
  }
}

