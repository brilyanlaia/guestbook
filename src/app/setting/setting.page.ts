import { Component, OnInit } from '@angular/core';
import { ApiService } from '../shared/services/api.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ToastService } from '../shared/services/toast.service';
import { LoadingService } from '../shared/services/loading.service';
import { Storage } from '@ionic/storage';
@Component({
  selector: 'app-setting',
  templateUrl: './setting.page.html',
  styleUrls: ['./setting.page.scss'],
})
export class SettingPage implements OnInit {
  
  
  fg: FormGroup
  url;
  constructor(private storage: Storage,private api:ApiService,private loading:LoadingService, 
   
    private toast: ToastService) { }

  ngOnInit() {
    
    this.getPath()
    
    this.storage.get('urlpath').then((val) => {
      console.log('Path: ', val);
     
      this.api.setUrl(val)
    });


    this.fg = new FormGroup({
      path: new FormControl(this.url,Validators.required)
    })

  }

  ionViewWillEnter(){
    this.getPath()
    this.storage.get('urlpath').then((val) => {
      console.log('Path: ', val);
     
      this.api.setUrl(val)
    });

  }

  getPath(){
    this.url = this.api.getUrl();
  }

  save(){
    
   
    let path = this.fg.value.path
    console.log("path --> ",path)

    this.storage.set('urlpath',path);

    this.api.setUrl(path);

   
    this.toast.presentToast('Path berhasil diset')
    
  }
  

}
