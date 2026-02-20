import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonList, IonItem, IonLabel } from '@ionic/angular/standalone';
import { ActivatedRoute, Router } from '@angular/router';
import { CricketService } from 'src/app/services/cricket.service';

@Component({
  selector: 'app-matches',
  templateUrl: './matches.page.html',
  styleUrls: ['./matches.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, IonList, IonItem, IonLabel]
})
export class MatchesPage implements OnInit {

  matches: any[] = [];
  seriesId!: string;

  constructor(
    private route: ActivatedRoute,
    private cricketService: CricketService,
    private router: Router
  ) {}

  ngOnInit() {
    this.seriesId = this.route.snapshot.paramMap.get('seriesId') || '';
    console.log('Series ID:', this.seriesId);

      this.cricketService.getMatches().subscribe((res) =>{
        const allMatches = res as any[];
        this.matches = allMatches.filter(match => match.series === this.seriesId);
      })
  }

  openMatch(id: string) {
    this.router.navigate(['/scorecard', id]);
  }

}
