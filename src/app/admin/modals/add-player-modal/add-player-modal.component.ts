import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ModalController, ToastController, IonicModule } from '@ionic/angular';
import { Admin } from 'src/app/services/admin';

@Component({
  selector: 'app-add-player-modal',
  templateUrl: './add-player-modal.component.html',
  styleUrls: ['./add-player-modal.component.scss'],
  imports: [FormsModule, IonicModule, CommonModule]
})
export class AddPlayerModalComponent  implements OnInit {

@Input() teamId!: string;
@Input() playerData: any;
@Input() isEdit: boolean = false;

  player: any = {
    teamId: '',
    name: '',
    role: 'Batsman',
    jerseyNumber: ''
  };

  constructor(
    private modalCtrl: ModalController,
    private adminService: Admin,
    private toastCtrl: ToastController
  ) {}

  close() {
    this.modalCtrl.dismiss();
  }

  ngOnInit() {
    console.log(this.teamId);
     if (this.isEdit && this.playerData) {
    this.player = { ...this.playerData };
  }
    this.player.teamId = this.teamId;
  }

   async submit() {

  if (!this.player.name || !this.player.jerseyNumber) return;

  if (this.isEdit) {

    this.adminService
      .updatePlayer(this.player._id, this.player)
      .subscribe(async (res: any) => {

        const toast = await this.toastCtrl.create({
          message: 'Player updated successfully',
          duration: 1500,
          color: 'success'
        });

        await toast.present();

        this.modalCtrl.dismiss(res.player);

      });

  } else {

    this.adminService
      .addPlayer( this.player)
      .subscribe(async (res: any) => {

        const toast = await this.toastCtrl.create({
          message: 'Player added successfully',
          duration: 1500,
          color: 'success'
        });

        await toast.present();

        this.modalCtrl.dismiss(res.player);

      });
  }
}
}

