import { Injectable } from '@angular/core';
import { ToastController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class ToastService {

  constructor(public toastController:ToastController) {}

  async presentToast(message: string, val="") {
    const toast = await this.toastController.create({
      message: message+val,
      duration: 2000
    });
    toast.present();
  }

}
