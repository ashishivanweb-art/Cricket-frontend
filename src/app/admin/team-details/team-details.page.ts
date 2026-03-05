import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Admin } from 'src/app/services/admin';
import { AlertController } from '@ionic/angular';
import { ToastController } from '@ionic/angular';
import { ModalController } from '@ionic/angular'
import { AddPlayerModalComponent } from '../modals/add-player-modal/add-player-modal.component';
import { IonicModule } from '@ionic/angular';
import { createOutline, trashOutline } from 'ionicons/icons';
import { addIcons } from 'ionicons';


@Component({
  selector: 'app-team-details',
  templateUrl: './team-details.page.html',
  styleUrls: ['./team-details.page.scss'],
  standalone: true,
  imports: [CommonModule, FormsModule, IonicModule]
})
export class TeamDetailsPage implements OnInit {

team: any;

constructor(private route: ActivatedRoute,
            private adminService: Admin,
          private router : Router,
        private alertCtrl: AlertController,
      private toastCtrl: ToastController,
    private modalCtrl: ModalController) {
      addIcons({
  createOutline,
  trashOutline
});
    }

ngOnInit() {
  const id = this.route.snapshot.paramMap.get('id');
  this.loadTeam(id);
}

goHome() {
  this.router.navigate(['/admin-dashboard']);
}
  
async openAddPlayerModal() {

  const modal = await this.modalCtrl.create({
    component: AddPlayerModalComponent,
    componentProps: {
      teamId: this.team._id
    }
  });

  await modal.present();

  const { data } = await modal.onWillDismiss();

  if (data) {
    this.team.players.push(data);
    this.loadTeam(this.team._id)
  }
}

loadTeam(id: any) {
  this.adminService.getTeams().subscribe((res:any) => {
    const teams = res;
    this.team = teams.find((t: any) => t._id === id);
    console.log('Team loaded:', this.team);
  });
}

async confirmRemove(playerId: string) {
  const alert = await this.alertCtrl.create({
    header: 'Remove Player',
    message: 'Are you sure you want to remove this player?',
    buttons: [
      {
        text: 'Cancel',
        role: 'cancel'
      },
      {
        text: 'Remove',
        role: 'destructive',
        handler: () => {
          this.removePlayer(playerId);
          this.toastCtrl.create({
          message: 'Player removed successfully',
         duration: 1500,
         color: 'success'
});
          // this.loadTeam(this.team._id); // Refresh team details after removal
        }
      }
    ]
  });

  await alert.present();
}



async removePlayer(playerId: string) {
  this.adminService
    .removePlayer(this.team._id, playerId)
    .subscribe({
      next: async () => {
        // Update UI instantly
        this.team.players = this.team.players.filter(
          (p: any) => p._id !== playerId
        );

        // 🔥 Show Toast
        const toast = await this.toastCtrl.create({
          message: 'Player removed successfully',
          duration: 1500,
          position: 'bottom',
          color: 'success'
        });

        await toast.present();
      },
      error: async (err) => {
        console.error(err);

        const toast = await this.toastCtrl.create({
          message: 'Failed to remove player',
          duration: 1500,
          position: 'bottom',
          color: 'danger'
        });

        await toast.present();
      }
    });
}

async openEditPlayerModal(player: any) {

  const modal = await this.modalCtrl.create({
    component: AddPlayerModalComponent,
    componentProps: {
      teamId: this.team._id,
      playerData: player,   // 🔥 send existing player
      isEdit: true
    }
  });

  await modal.present();

  const { data } = await modal.onWillDismiss();

  if (data) {
    // Update local array
    const index = this.team.players.findIndex(
      (p: any) => p._id === data._id);
    if (index !== -1) {
      this.team.players[index] = data;
    }
  
  }
  this.loadTeam(this.team._id) // Refresh team details after edit
}

}
