import { Component, OnInit } from '@angular/core';
import { MenuController } from '@ionic/angular';
import { ApiService } from '../shared/services/api.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastService } from '../shared/services/toast.service';
import { LoadingService } from '../shared/services/loading.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  fg: FormGroup
  constructor(private menu: MenuController,private api: ApiService, private router:Router,private toast: ToastService,public loading: LoadingService) {
    this.menu.enable(false);
   }

  ngOnInit() {
    this.initform()
   
    let logged = localStorage.getItem('isLogin');
    if(logged === 'true'){
      this.loading.presentLoading()
      this.router.navigate(['/home'])
      this.loading.dismiss()
    }
    
  }


  initform(){
    this.fg = new FormGroup({
      email: new FormControl("",Validators.required),
      password: new FormControl("",Validators.required)
    })
  }

  login(){
    let body = this.fg.value
    this.loading.presentLoading()
    
    let json = JSON.stringify(body)
    console.log("send",json)
    this.api.postData("admins/login.php",json).subscribe(res =>{
      console.log("login res",res)
      if(res.message === 'Login Success'){
        localStorage.setItem("isLogin","true")
        localStorage.setItem("current",this.fg.value.email)
        this.toast.presentToast('Login Success')
        this.router.navigate(['/home'])
        this.loading.dismiss()
      }
    },err => {
      this.toast.presentToast('Login failed');
      this.loading.dismiss()
    })
  }

}
