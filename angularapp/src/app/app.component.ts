import { Component } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title:'angularapp';
  isLoggedIn = false;
  userRole: string | null = null;

  constructor(private router: Router) {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.userRole = localStorage.getItem('userRole');
        this.isLoggedIn = !!this.userRole;
      }
    });

  }
  ngOnInit(): void {
    this.userRole = localStorage.getItem('userRole');
    this.isLoggedIn = !!this.userRole;
  }
}
