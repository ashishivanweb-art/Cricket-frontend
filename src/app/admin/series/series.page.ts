import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Admin } from 'src/app/services/admin';
import { IonicModule } from "@ionic/angular";
import { addIcons } from 'ionicons';
import { createOutline, trashOutline } from 'ionicons/icons';
import { ToastController } from '@ionic/angular';
import { NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs';

@Component({
  selector: 'app-series',
  templateUrl: './series.page.html',
  styleUrls: ['./series.page.scss'],
  standalone: true,
  imports: [ CommonModule, FormsModule, IonicModule]
})
export class SeriesPage implements OnInit {
deleteSeries(arg0: any) {
throw new Error('Method not implemented.');
}

 seriesList: any[] = [];
series: any = {};
isEditMode = false;
  showModal!: boolean;

constructor(private adminService: Admin, private toastCtrl: ToastController, private router: Router) {
  addIcons({
      'create-outline': createOutline,
      'trash-outline': trashOutline
    });
      this.router.events
    .pipe(filter(event => event instanceof NavigationEnd))
    .subscribe(() => {
      console.log('Current URL:', this.router.url);
      if (this.router.url.includes(`/admin-series`)) {
        this.loadSeries();
      }
    });
}

ngOnInit() {
  this.loadSeries();
}

loadSeries() {
  this.adminService.getSeries().subscribe((res: any) => {
    this.seriesList = res;
    console.log('Series List:', this.seriesList);
  });
}

openAddSeriesModal() {
  this.series = {};
  this.isEditMode = false;
  this.showModal = true;
}

editSeries(data: any) {

  this.series = { ...data };

  // 🔥 Convert ISO date → yyyy-mm-dd
  if (this.series.startDate) {
    this.series.startDate =
      new Date(this.series.startDate).toISOString().split('T')[0];
  }

  if (this.series.endDate) {
    this.series.endDate =
      new Date(this.series.endDate).toISOString().split('T')[0];
  }

  this.isEditMode = true;
  this.showModal = true;
}

submitSeries() {

  if (!this.series.name) {
    alert('Series name is required');
    return;
  }

  if (this.isEditMode) {

    this.adminService.updateSeries(this.series)
      .subscribe(async (res: any) => {
         const toast = await this.toastCtrl.create({
          message: 'Series updated successfully',
          duration: 1500,
          color: 'success'
        });

        await toast.present();
        this.loadSeries();
        this.showModal = false;
      });

  } else {

    this.adminService.addSeries(this.series)
      .subscribe(async (res:any) => {
         const toast = await this.toastCtrl.create({
          message: 'Series added successfully',
          duration: 1500,
          color: 'success'
        });

        await toast.present();
        this.loadSeries();
        this.showModal = false;
      });

  }
}

viewMatches(series: any) {
  this.router.navigate([`/matches/${series._id}`]);
}
}
