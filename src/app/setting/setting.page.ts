import { Component, OnInit } from '@angular/core';
import { ApiService } from '../shared/services/api.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ToastService } from '../shared/services/toast.service';
import { LoadingService } from '../shared/services/loading.service';

@Component({
  selector: 'app-setting',
  templateUrl: './setting.page.html',
  styleUrls: ['./setting.page.scss'],
})
export class SettingPage implements OnInit {
  
  
  fg: FormGroup
  url
  constructor(private api:ApiService,private loading:LoadingService, 
   
    private toast: ToastService) { }

  ngOnInit() {
    
    this.getPath()

    this.fg = new FormGroup({
      path: new FormControl(this.url,Validators.required)
    })

  }

  ionViewWillEnter(){
    this.getPath()
  }

  getPath(){
    this.url = this.api.getUrl();
  }

  save(){
    
   
    let path = this.fg.value.path
    console.log("path --> ",path)

    this.api.setUrl(path);
   
    this.toast.presentToast('Path berhasil diset')
    
  }
  

}
