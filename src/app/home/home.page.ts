import { Component } from '@angular/core';
import { MenuController } from '@ionic/angular';
import { ApiService } from '../shared/services/api.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastService } from '../shared/services/toast.service';
import { async } from '@angular/core/testing';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  url

  constructor(private menu: MenuController, private toast: ToastService, private api: ApiService, private router: Router) {
    this.menu.enable(true);
  }

  ionViewWillEnter(){
      this.getPath();
     /*  if(this.url === 'http://'){
        this.toast.presentToast('Anda belum mengisi server path, memindahkan anda ...')
       
        this.redirect()

       
      } */
  }

  async redirect(){


    await this.delay(2000)
    this.router.navigateByUrl('/setting')
  }

  getPath(){
    this.url = this.api.getUrl()
  }

  delay(ms: number) {
    return new Promise( resolve => setTimeout(resolve, ms) );
}

  

}
