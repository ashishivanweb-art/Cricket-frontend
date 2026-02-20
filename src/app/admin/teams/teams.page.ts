import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar } from '@ionic/angular/standalone';
import { Admin } from 'src/app/services/admin';
import { Router } from '@angular/router';

@Component({
  selector: 'app-teams',
  templateUrl: './teams.page.html',
  styleUrls: ['./teams.page.scss'],
  standalone: true,
  imports: [IonContent, CommonModule, FormsModule]
})
export class TeamsPage implements OnInit {

 teams: any[] = [];

 constructor(private adminService: Admin, private router: Router ){}

ngOnInit() {
  this.loadTeams();
}

loadTeams() {
  this.adminService.getTeams().subscribe((res: any) => {
    this.teams = res;
  });
}

openAddTeam() {
  // open modal or navigate to create page
}

openTeam(id: string) {
  this.router.navigate(['/admin-team', id]);
}

}
