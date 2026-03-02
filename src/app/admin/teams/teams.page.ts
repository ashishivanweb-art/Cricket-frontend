import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Admin } from 'src/app/services/admin';
import { NavigationEnd, Router } from '@angular/router';
import { ModalController } from '@ionic/angular'
import { AddTeamModalComponent } from '../modals/add-team-modal/add-team-modal.component';
import { IonicModule } from '@ionic/angular';
import { addIcons } from 'ionicons';
import { createOutline, trashOutline } from 'ionicons/icons';
import { AlertController } from '@ionic/angular';
import { filter } from 'rxjs/operators';
@Component({
  selector: 'app-teams',
  templateUrl: './teams.page.html',
  styleUrls: ['./teams.page.scss'],
  standalone: true,
  imports: [ CommonModule, FormsModule, IonicModule]
})
export class TeamsPage implements OnInit {

 teams: any[] = [];
 team:any;
 isEditMode!: boolean;
 isModalOpen!:boolean;

 constructor(private adminService: Admin,
             private router: Router,
             private modalCtrl: ModalController,
             private alertController: AlertController ){
  addIcons({
    'create-outline': createOutline,
    'trash-outline': trashOutline
  });

    this.router.events
    .pipe(filter(event => event instanceof NavigationEnd))
    .subscribe(() => {
      if (this.router.url.includes('/teams')) {
        this.loadTeams();
      }
    });
 }

ngOnInit() {
  this.loadTeams();
}

ionViewWillEnter() {
  this.loadTeams();
}

loadTeams() {
  this.adminService.getTeams().subscribe((res: any) => {
    this.teams = res;
    console.log('Teams loaded:', this.teams);
  });
}

async openAddTeamModal() {

  const modal = await this.modalCtrl.create({
    component: AddTeamModalComponent
  });

  await modal.present();

  const { data } = await modal.onWillDismiss();

  if (data) {
    console.log(data)
    this.loadTeams();    
  }
}

openTeam(id: string) {
  console.log(id)
  this.router.navigate([`/team-details/${id}`]);
}

async openEditTeamModal(team: any) {
  const modal = await this.modalCtrl.create({
      component: AddTeamModalComponent,
      componentProps: {
        teamData: team,
        isEditMode: true
      }
    });
  
    await modal.present();
  
    const { data } = await modal.onWillDismiss();
  
    if (data) {
      console.log(data)
      // this.team.push(data);
      this.loadTeams();
    }
}

async confirmRemoveTeam(id: string) {
  const alert = await this.alertController.create({
    header: 'Delete Team?',
    message: 'This action cannot be undone.',
    buttons: [
      {
        text: 'Cancel',
        role: 'cancel'
      },
      {
        text: 'Delete',
        role: 'destructive',
        handler: () => {
          this.deleteTeam(id);
        }
      }
    ]
  });

  await alert.present();
}

deleteTeam(id: string) {
  this.adminService.deleteTeam(id).subscribe(() => {
    this.loadTeams(); // refresh list
  });
}




}
