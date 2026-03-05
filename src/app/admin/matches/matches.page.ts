import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule, ToastController } from '@ionic/angular';
import { addIcons } from 'ionicons';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { Admin } from 'src/app/services/admin';
import { closeOutline, createOutline, trashOutline } from 'ionicons/icons';
import { AlertController } from '@ionic/angular';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-matches',
  templateUrl: './matches.page.html',
  styleUrls: ['./matches.page.scss'],
  standalone: true,
  imports: [ CommonModule, FormsModule, IonicModule]
})
export class MatchesPage implements OnInit {

 seriesId!: string;
matches: any[] = [];
teams: any[] = [];

newMatch: any = {};
isModalOpen = false;
teamAPlayers: any[] = [];
teamBPlayers: any[] = [];

constructor(
  private route: ActivatedRoute,
  private router: Router,
  private adminService: Admin,
  private toastCtrl: ToastController,
  private alertController: AlertController
) {
  addIcons({
        'create-outline': createOutline,
        'trash-outline': trashOutline,
        'close-outline': closeOutline
      });
     
}

ngOnInit() {
  this.seriesId = this.route.snapshot.paramMap.get('id')!;
  this.loadMatches();
  this.loadTeams();

   
}

onTeamAChange(teamId: string) {
    if (teamId === this.newMatch.teamB) {
    this.newMatch.teamB = null;
  }
  this.newMatch.teamAPlaying11 = [];
  this.teamAPlayers = this.teams.find((t) => t._id === teamId)?.players || [];
}

onTeamBChange(teamId: string) {
    if (teamId === this.newMatch.teamA) {
    this.newMatch.teamA = null;
  }
  this.newMatch.teamBPlaying11 = [];
  this.teamBPlayers = this.teams.find((t) => t._id === teamId)?.players || [];
}

isDisabled(playerId: string, team: string): boolean {

  const list = team === 'A'
    ? this.newMatch.teamAPlaying11
    : this.newMatch.teamBPlaying11;

  if (!list) return false;

  return list.length >= 11 && !list.includes(playerId);
}

isSelected(playerId: string, team: string): boolean {
  if (team === 'A') {
    return this.newMatch.teamAPlaying11?.includes(playerId);
  }
  return this.newMatch.teamBPlaying11?.includes(playerId);
}

togglePlayer(playerId: string, team: string) {

  if (team === 'A') {
    let list = [...this.newMatch.teamAPlaying11];

    if (list.includes(playerId)) {
      list = list.filter(id => id !== playerId);
    } else {
      if (list.length < 11) {
        list.push(playerId);
      }
    }

    this.newMatch.teamAPlaying11 = list;
  }

  if (team === 'B') {
    let list = [...this.newMatch.teamBPlaying11];

    if (list.includes(playerId)) {
      list = list.filter(id => id !== playerId);
    } else {
      if (list.length < 11) {
        list.push(playerId);
      }
    }

    this.newMatch.teamBPlaying11 = list;
  }
}

resetMatchForm() {
  this.newMatch = {
    teamA: null,
    teamB: null,
    venue: '',
    matchDate: '',
    matchTime: '',
    teamAPlaying11: [],
    teamBPlaying11: []
  };

  this.teamAPlayers = [];
  this.teamBPlayers = [];
}

closeModal() {
  this.resetMatchForm();
  this.isModalOpen = false;
}

loadMatches() {
  this.adminService.getMatchesBySeries(this.seriesId)
    .subscribe((res: any) => {
      this.matches = res || [];
    });
}

loadTeams() {
  this.adminService.getTeams()
    .subscribe((res: any) => {
      this.teams = res || [];
      // console.log(this.teams)
    });
}

openAddMatchModal() {
  this.newMatch = {};
  this.isModalOpen = true;
}



submitMatch() {
try {
  

   if (!this.newMatch.matchDate || !this.newMatch.matchTime) {
  alert("Match date and time required");
  return;
}

// Combine date + time into ISO format
const dateTimeString =
  this.newMatch.matchDate + 'T' +
  this.newMatch.matchTime + ':00';


  const payload = {
    ...this.newMatch,
     matchDateTime: new Date(dateTimeString),
    series: this.seriesId
  };

 

  if (this.newMatch._id) {
    this.adminService.updateMatch(this.newMatch._id, payload)
      .subscribe(async () => {
         const toast = await this.toastCtrl.create({
          message: 'Match Updated Successfully',
          duration: 1500,
          color: 'success'
        });
        this.closeModal();
        await toast.present();
        this.loadMatches();
      });
  } else {
    this.adminService.addMatch(payload)
      .subscribe(async() => {
        const toast = await this.toastCtrl.create({
          message: 'Match Created Successfully',
          duration: 1500,
          color: 'success'
        });

        await toast.present();
        this.closeModal();
        this.loadMatches();
      });
  }
} catch (error) {
window.alert(error);
}
}

editMatch(match: any) {

  this.resetMatchForm();
  this.isModalOpen = true;

  this.newMatch._id = match._id;
  this.newMatch.teamA = match.teamA._id.toString();
  this.newMatch.teamB = match.teamB._id.toString();
  this.newMatch.venue = match.venue;

  const dateObj = new Date(match.matchDateTime);

  this.newMatch.matchDate =
    dateObj.toISOString().split('T')[0];

  this.newMatch.matchTime =
    dateObj.toTimeString().slice(0, 5);

  // VERY IMPORTANT → load players first
  this.loadPlayersForEdit(match);
}

loadPlayersForEdit(match: any) {
    console.log(match)
  // Load Team A players
      this.teamAPlayers = this.teams.find((t) => t._id === match.teamA._id)?.players || [];
      console.log(this.teamAPlayers)
      // Now patch playing11
     this.newMatch.teamAPlaying11 =
     match.teamAPlaying11.map((p: any) => p);
     console.log(this.newMatch.teamAPlaying11);


  // Load Team B players
      this.teamBPlayers = this.teams.find((t) => t._id === match.teamB._id)?.players || [];

    this.newMatch.teamBPlaying11 =
    match.teamBPlaying11.map((p: any) => p);
    console.log(this.newMatch.teamBPlaying11);
    }



    async confirmRemoveMatch(id: string) {
  const alert = await this.alertController.create({
    header: 'Delete Match?',
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
          this.deleteMatch(id);
        }
      }
    ]
  });

  await alert.present();
  // this.loadMatches();
}

deleteMatch(id: string) {
  this.adminService.deleteMatch(id)
    .subscribe(async() => {
       const toast = await this.toastCtrl.create({
          message: 'Match deleted successfully',
          duration: 1000,
          color: 'success'
        });
         this.loadMatches();
        await toast.present();
       
    });
}
}
