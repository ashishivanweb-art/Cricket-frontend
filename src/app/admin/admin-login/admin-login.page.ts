import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar } from '@ionic/angular/standalone';
import { Admin } from 'src/app/services/admin';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-login',
  templateUrl: './admin-login.page.html',
  styleUrls: ['./admin-login.page.scss'],
  standalone: true,
  imports: [IonContent, CommonModule, FormsModule]
})
export class AdminLoginPage implements OnInit {

email: string = '';
password: string = '';
 loading = false;

  constructor(
    private adminService: Admin,
    private router: Router
  ) {}
  ngOnInit(): void {
  }



login() {
  if (!this.email || !this.password) return;

  this.loading = true;

  this.adminService.login(this.email, this.password)
    .subscribe({
      next: (res: any) => {
        localStorage.setItem('adminToken', res.token);
        this.loading = false;
        this.router.navigate(['/admin-dashboard']);
      },
      error: () => {
        this.loading = false;
        alert('Login failed');
      }
    });
}



}
