// import { Component } from '@angular/core';
// import { Router } from '@angular/router';
// import { AuthService } from 'src/app/services/auth.service';
// import Swal from 'sweetalert2';
 
// @Component({
//   selector: 'app-login',
//   templateUrl: './login.component.html',
//   styleUrls: ['./login.component.css']
// })
// export class LoginComponent {
//   credentials = { email: '', password: '' };
//   passwordFieldType: string = 'password';
//   constructor(private authService: AuthService, private router: Router) { }
//   onLogin(): void {
//     this.authService.login(this.credentials).subscribe({
//       next: (response: any) => {
//         localStorage.setItem('token', response.token);
//         const role = this.authService.getUserRoleFromToken(response.token);
//         localStorage.setItem('userRole', role);
 
 
//         if (role) {
//           if (role.toLowerCase() === 'admin') {
//             this.router.navigate(['/home']);
//           } else if (role.toLowerCase() === 'user') {
//             this.router.navigate(['/home']);
//           }
//           Swal.fire({
//             title: 'Success!',
//             text: `Successfully logged in as ${role}`,
//             icon: 'success',
//             confirmButtonText: 'OK'
//           });
//         } else {
//           this.router.navigate(['/error']);
//         }
//       },
//       error: () => {
//         Swal.fire({
//           title: 'Error!',
//           text: 'Invalid credentials. Please try again.',
//           icon: 'error',
//           confirmButtonText: 'OK'
//         });
//       },
//     });
//   }
 
//   togglePasswordVisibility(): void {
//     this.passwordFieldType = this.passwordFieldType === 'password' ? 'text' : 'password';
//   }
// }

import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  credentials = { email: '', password: '' };
  passwordFieldType: string = 'password';

  constructor(private authService: AuthService, private router: Router) { }

  onLogin(): void {
    // Show loading popup
    Swal.fire({
      title: 'Loading...',
      text: 'Please wait while we log you in.',
      allowOutsideClick: false,
      didOpen: () => {
        Swal.showLoading();
      }
    });

    this.authService.login(this.credentials).subscribe({
      next: (response: any) => {
        localStorage.setItem('token', response.token);
        const role = this.authService.getUserRoleFromToken(response.token);
        localStorage.setItem('userRole', role);

        // Close loading popup
        Swal.close();

        if (role) {
          if (role.toLowerCase() === 'admin') {
            this.router.navigate(['/home']);
          } else if (role.toLowerCase() === 'user') {
            this.router.navigate(['/home']);
          }
          Swal.fire({
            title: 'Success!',
            text: `Successfully logged in as ${role}`,
            icon: 'success',
            confirmButtonText: 'OK'
          });
        } else {
          this.router.navigate(['/error']);
        }
      },
      error: () => {
        // Close loading popup
        Swal.close();

        Swal.fire({
          title: 'Error!',
          text: 'Invalid credentials. Please try again.',
          icon: 'error',
          confirmButtonText: 'OK'
        });
      },
    });
  }

  togglePasswordVisibility(): void {
    this.passwordFieldType = this.passwordFieldType === 'password' ? 'text' : 'password';
  }

  loadBookings(): void {
    // Show loading popup
    Swal.fire({
      title: 'Loading recipies...',
      text: 'Please wait while we load your recipies.',
      allowOutsideClick: false,
      didOpen: () => {
        Swal.showLoading();
      }
    });

    this.authService.().subscribe(
      (bookings: any[]) => {
        // Close loading popup
        Swal.close();

        if (bookings.length === 0) {
          Swal.fire({
            icon: 'info',
            title: 'No Data',
            text: 'No recipies available.'
          });
        }
      },
      (error) => {
        console.error('Error loading recipies', error);
        // Close loading popup
        Swal.close();
        Swal.fire({
          icon: 'info',
          title: 'No Data',
          text: 'No recipies available.'
        });
      }
    );
  }
}
