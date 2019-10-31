import { Component } from '@angular/core';
import { MenuController } from '@ionic/angular';
import { ApiService } from '../shared/services/api.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastService } from '../shared/services/toast.service';
import { async } from '@angular/core/testing';
import { Storage } from '@ionic/storage';
@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  url
  localpath: string

  constructor(private storage:Storage,private menu: MenuController, private toast: ToastService, private api: ApiService, private router: Router) {
    this.menu.enable(true);
  }

  ionViewWillEnter(){
    
      
      this.getPath();
    
  }

  ionViewDidEnter(){
    
  }

  async redirect(){


    await this.delay(2000)
    this.router.navigateByUrl('/setting')
  }

  async getPath(){
     await this.storage.get('urlpath').then((val) => {
       
      this.localpath = val
    
      console.log('Path: ',this.localpath);
     
    });
    this.api.setUrl(this.localpath)
    this.url = this.api.getUrl()


    
    if(!this.localpath){
      console.log("present toast ->")
      this.toast.presentToast('Anda belum mengisi server path, memindahkan anda ...')
     
      this.redirect()

     
    }

  }

  delay(ms: number) {
    return new Promise( resolve => setTimeout(resolve, ms) );
}

  

}
