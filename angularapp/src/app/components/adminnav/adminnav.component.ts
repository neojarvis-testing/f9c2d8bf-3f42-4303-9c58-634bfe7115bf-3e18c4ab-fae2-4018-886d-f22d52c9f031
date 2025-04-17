import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { FeedbackService } from 'src/app/services/feedback.service';
@Component({
  selector: 'app-adminnav',
  templateUrl: './adminnav.component.html',
  styleUrls: ['./adminnav.component.css']
})
export class AdminnavComponent implements OnInit {
  isAdmin: boolean = true;
  Username: string = '';
  role: string = this.isAdmin ? 'Admin' : 'User';
  userId: number; 
  showLogoutModal: boolean = false; 
  toggleSelect : string = "";
  constructor(private authService: AuthService, private router: Router, private feedbackService: FeedbackService) {}
  ngOnInit(): void {
    this.userId = parseInt(localStorage.getItem('userId')!, 10);
    this.Username = localStorage.getItem('userName');
  }
 
  logout(): void {
    this.showLogoutModal = true;
  }
  confirmLogout(): void {
    this.showLogoutModal = false;
    this.authService.logout();
    this.router.navigate(['/login']);
  }
  cancelLogout(): void {
    this.showLogoutModal = false;
  }
  toggleDropdown(event: Event): void {
    event.preventDefault();
    const dropdown = (event.currentTarget as HTMLElement).closest('.dropdown');
    if (dropdown) {
      dropdown.classList.toggle('show');
    }
  }
}