import { Component } from '@angular/core';
import { MenuController, ActionSheetController } from '@ionic/angular';
import { ApiService } from '../shared/services/api.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastService } from '../shared/services/toast.service';
import { async } from '@angular/core/testing';
import { Storage } from '@ionic/storage';
import { LoadingService } from '../shared/services/loading.service';
@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  url
  localpath: string

  constructor(public actionSheetController: ActionSheetController,public loading: LoadingService,private storage:Storage,private menu: MenuController, private toast: ToastService, private api: ApiService, private router: Router) {
    this.menu.enable(true);
  }

  
  ionViewWillEnter(){
    
    this.isLogin()
      
      this.getPath();
    
  }

  isLogin(){
    let logged = localStorage.getItem('isLogin');
    if(logged === 'false'){
      //this.loading.presentLoading()
      this.router.navigate(['/login'])
     // this.loading.dismiss()
    }
    console.log("logged",logged)
  }

  ionViewDidEnter(){
    
  }


  async presentActionSheet() {
    const actionSheet = await this.actionSheetController.create({
      header: 'Menu',
      buttons: [{
        text: 'Setting',
        icon: 'settings',
        handler: () => {
          this.router.navigate(['/setting'])
          //console.log('Delete clicked');
        }
      },/*  {
        text: 'Share',
        icon: 'share',
        handler: () => {
          console.log('Share clicked');
        }
      }, */ {
        text: 'Logout',
        icon: 'log-out',
        role: 'destructive',
        handler: () => {
          this.logout()
          console.log('Cancel clicked');
        }
      }]
    });
  
    await actionSheet.present();
  }

  logout(){
    console.log("logout")
    localStorage.setItem('isLogin',"false");
    this.isLogin()
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
