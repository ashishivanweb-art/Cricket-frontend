import { Component, OnInit } from '@angular/core';
import { IonHeader, IonToolbar, IonTitle, IonContent } from '@ionic/angular/standalone';
import { LiveCardComponent } from "../components/ui/live-card/live-card.component";
import { CommonModule } from '@angular/common';
import { CricketService } from '../services/cricket.service';
import { SocketService } from '../services/socket.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  imports: [IonContent, LiveCardComponent, CommonModule],
})
export class HomePage implements OnInit{
liveMatches: any[] = [];


  constructor(private cricketService: CricketService, private socketService: SocketService, private router: Router) {}

  ngOnInit(): void {
    this.socketService.connect();
  this.loadLiveMatches();
};


  

 loadLiveMatches() {
  this.cricketService.getMatches().subscribe((matches: any) => {

    matches.forEach((match: any) => {

      // Add match to array first (so UI shows instantly)
      this.liveMatches.push(match);

      this.cricketService.getScorecard(match._id).subscribe((score: any) => {
        this.mapScores(match, score);

        // ✅ Listen socket for THIS match
        this.socketService.listen(match._id, () => {
          this.refreshScore(match._id);
        });
      });

    });

  });
}

mapScores(match: any, score: any) {
  const battingTeamId = score.battingTeam?._id;

  if (battingTeamId === match.teamA._id) {
    match.teamAScore = `${score.totalRuns}/${score.wickets}`;
    match.teamBScore = score.secondInningsScore || '0/0';
  } else {
    match.teamBScore = `${score.totalRuns}/${score.wickets}`;
    match.teamAScore = score.secondInningsScore || '0/0';
  }

  match.overs = score.overs;
}



refreshScore(matchId: string) {
  const match = this.liveMatches.find(m => m._id === matchId);
  if (!match) return;

  this.cricketService.getScorecard(matchId).subscribe((score: any) => {
    this.mapScores(match, score);
  });
}




goToScorecard(matchId: string) {
  console.log(matchId)
}

adminNavigate(){
  this.router.navigate(['/admin-login']);
}

}




