import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CricketService } from 'src/app/services/cricket.service';
import { IonHeader, IonCardSubtitle, IonCardContent, IonCardTitle, IonCardHeader, IonCard, IonContent, IonToolbar, IonTitle, IonIcon } from "@ionic/angular/standalone";
import { CommonModule } from '@angular/common';
import { addIcons } from 'ionicons';
import { locationOutline } from 'ionicons/icons';
import { SocketService } from 'src/app/services/socket.service';

addIcons({
  'location-outline': locationOutline
});
@Component({
  selector: 'app-scorecard',
  templateUrl: './scorecard.component.html',
  styleUrls: ['./scorecard.component.scss'],
  imports: [CommonModule, IonHeader, IonCardSubtitle, IonCardContent, IonCardTitle, IonCardHeader, IonCard, IonContent, IonToolbar, IonTitle, IonIcon],
})
export class ScorecardComponent  implements OnInit {
  matchId!: string;
  scorecard: any;
  lastOver: any[] = [];

  constructor(
    private route: ActivatedRoute, private cricketService: CricketService, private socketService: SocketService
  ) { }

  ngOnInit() {
     this.matchId = this.route.snapshot.paramMap.get('matchId')!;
  console.log('Match ID:', this.matchId);

    this.socketService.connect();

  this.loadScorecard();

  this.socketService.listen(this.matchId, () => {
    this.loadScorecard();
    this.loadLastOver();   // 🔥 auto refresh from API
  });

  //  this.cricketService.getScorecard(this.matchId)
  //   .subscribe((res: any) => {
  //     this.scorecard = res;
  //     console.log(res);
  //   });
  }

  loadScorecard() {
  this.cricketService.getScorecard(this.matchId)
    .subscribe((res:any) => {
      this.scorecard = res;
    });
}

loadLastOver() {
  this.cricketService.getLastOver(this.matchId).subscribe((res: any) => {
    this.lastOver = res;
  });
}

  

}
