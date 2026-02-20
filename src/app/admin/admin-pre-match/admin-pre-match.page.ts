import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar } from '@ionic/angular/standalone';
import { ActivatedRoute } from '@angular/router';
import { CricketService } from 'src/app/services/cricket.service';

@Component({
  selector: 'app-admin-pre-match',
  templateUrl: './admin-pre-match.page.html',
  styleUrls: ['./admin-pre-match.page.scss'],
  standalone: true,
  imports: [IonContent, CommonModule, FormsModule]
})
export class AdminPreMatchPage implements OnInit {
  matchId!: string;
  teamA: any;
teamB: any;

teamA11: string[] = [];
teamB11: string[] = [];

batting11: any[] = [];
bowling11: any[] = [];

tossWinner = '';
tossDecision = '';

striker = '';
nonStriker = '';
bowler = '';
  constructor(private route: ActivatedRoute, private cricketService:CricketService) { }

  ngOnInit() {
       this.matchId = this.route.snapshot.paramMap.get('id')!;

    // Load match to get teams
    this.cricketService.getMatchById(this.matchId).subscribe((match: any) => {
      this.teamA = match.teamA;
      this.teamB = match.teamB;
    });
  }

 togglePlayer(team: 'A' | 'B', playerId: string, ev: any) {
    if (ev.target.checked) {
      if (team === 'A') this.teamA11.push(playerId);
      else this.teamB11.push(playerId);
    } else {
      if (team === 'A')
        this.teamA11 = this.teamA11.filter(id => id !== playerId);
      else
        this.teamB11 = this.teamB11.filter(id => id !== playerId);
    }

    this.update11Lists();
  }

  // ✅ When toss selected, rebuild dropdown players
  onTossChange() {
    this.update11Lists();
  }


update11Lists() {
    if (!this.tossWinner) return;

    const battingTeamIsA =
      (this.tossWinner === this.teamA._id && this.tossDecision === 'bat') ||
      (this.tossWinner === this.teamB._id && this.tossDecision === 'bowl');

    if (battingTeamIsA) {
      this.batting11 = this.teamA.players.filter((p: any) =>
        this.teamA11.includes(p._id)
      );
      this.bowling11 = this.teamB.players.filter((p: any) =>
        this.teamB11.includes(p._id)
      );
    } else {
      this.batting11 = this.teamB.players.filter((p: any) =>
        this.teamB11.includes(p._id)
      );
      this.bowling11 = this.teamA.players.filter((p: any) =>
        this.teamA11.includes(p._id)
      );
    }
  }

 startMatch() {
    if (
      this.teamA11.length !== 11 ||
      this.teamB11.length !== 11 ||
      !this.tossWinner ||
      !this.tossDecision ||
      !this.striker ||
      !this.nonStriker ||
      !this.bowler
    ) {
      alert('Complete all selections (11 players + toss + openers)');
      return;
    }

    const payload = {
      teamAPlaying11: this.teamA11,
      teamBPlaying11: this.teamB11,
      tossWinner: this.tossWinner,
      tossDecision: this.tossDecision,
      striker: this.striker,
      nonStriker: this.nonStriker,
      bowler: this.bowler
    };

    this.cricketService.startMatch(this.matchId, payload).subscribe(() => {
      alert('Match Started Successfully!');
    });
  }
}



