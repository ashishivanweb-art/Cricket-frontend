import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IonContent } from "@ionic/angular/standalone";
import { Admin } from 'src/app/services/admin';
import { ToastController } from '@ionic/angular';
import { ModalController } from '@ionic/angular'

@Component({
  selector: 'app-add-team-modal',
  templateUrl: './add-team-modal.component.html',
  styleUrls: ['./add-team-modal.component.scss'],
  imports: [IonContent, CommonModule, FormsModule],
})
export class AddTeamModalComponent  implements OnInit {
  @Input() teamData!: any;
@Input() isEditMode!: boolean;

team = {
  id: '',
  name: '',
  shortName: '',
  logo: '' as string | ArrayBuffer | null
};

logoPreview: string | ArrayBuffer | null = null;
 
 

constructor(private adminService: Admin, private modalCtrl: ModalController, private toastCtrl: ToastController){}

ngOnInit(): void {
  if(this.teamData && this.isEditMode){
    this.team = {...this.teamData};
    console.log(this.team);
    this.team.id = this.teamData?._id
  }
}

onLogoSelected(event: any) {
  const file = event.target.files[0];

  if (!file) return;

  if (!file.type.startsWith('image/')) {
    alert('Please select a valid image');
    return;
  }

  const reader = new FileReader();

  reader.onload = () => {
    this.logoPreview = reader.result;
    this.team.logo = reader.result; // 🔥 store base64
  };

  reader.readAsDataURL(file);
}

submit() {
  if (!this.team.name || !this.team.shortName) return;

  if (this.isEditMode) {
   this.adminService.updateTeam(this.team.id, this.team)
      .subscribe(async (res:any) => {
       const toast = await this.toastCtrl.create({
          message: 'Team updated successfully',
          duration: 1500,
          color: 'success'
        });

        await toast.present();

        this.modalCtrl.dismiss(res?.team);
      });
  } else {
    this.adminService.addTeams(this.team)
      .subscribe(async (res:any) => {
          const toast = await this.toastCtrl.create({
          message: 'Team Created successfully',
          duration: 1500,
          color: 'success'
        });

        await toast.present();

        this.modalCtrl.dismiss(res.player);
      });
  }
}

closeModal() {
 this.modalCtrl.dismiss();
}
}
