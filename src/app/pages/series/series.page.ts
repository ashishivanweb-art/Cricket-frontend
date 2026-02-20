import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonList, IonItem, IonLabel } from '@ionic/angular/standalone';
import { CricketService } from 'src/app/services/cricket.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-series',
  templateUrl: './series.page.html',
  styleUrls: ['./series.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, IonList, IonItem, IonLabel]
})
export class SeriesPage implements OnInit {

  seriesList: any[] = [];

  constructor(
    private cricketService: CricketService,
    private router: Router
  ) {}

  ngOnInit() {
    this.loadSeries();
  }

  loadSeries() {
    this.cricketService.getSeries().subscribe((res: any) => {
      this.seriesList = res;
    });
  }

  openSeries(id: string) {
    this.router.navigate(['/matches', id]);
  }

  

}
