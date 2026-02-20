import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar } from '@ionic/angular/standalone';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.page.html',
  styleUrls: ['./admin-dashboard.page.scss'],
  standalone: true,
  imports: [IonContent, CommonModule, FormsModule]
})
export class AdminDashboardPage implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
  }

  logout() {
  localStorage.removeItem('adminToken');
  this.router.navigate(['/admin-login']);
}

goToTeams() {
  this.router.navigate(['/admin-teams']);
}

}
