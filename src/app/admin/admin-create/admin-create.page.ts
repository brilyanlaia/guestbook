import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ApiService } from 'src/app/shared/services/api.service';
import { LoadingService } from 'src/app/shared/services/loading.service';
import { ToastController } from '@ionic/angular';
import { Router } from '@angular/router';
import { ToastService } from 'src/app/shared/services/toast.service';


@Component({
  selector: 'app-admin-create',
  templateUrl: './admin-create.page.html',
  styleUrls: ['./admin-create.page.scss'],
})
export class AdminCreatePage implements OnInit {

 
  adminForm: FormGroup
  url
  constructor(private api: ApiService,
    private loading:LoadingService, 
    private router: Router,
    private toast: ToastService) { }

  ngOnInit() {
    this.initForm()
  }

  ionViewWillEnter(){
    this.initForm()
    this.getPath()

    if(this.url === 'http://'){
      this.toast.presentToast('Anda belum mengisi server path, memindahkan anda ...')
     
      setTimeout(() => {
        console.log('Async operation has ended');
        this.router.navigateByUrl('/setting')
      }, 2000);

     
    }
  }

  getPath(){
    this.url = this.api.getUrl()
  }
  
  initForm(){
    this.adminForm = new FormGroup ({
      nama: new FormControl("",Validators.required),
      email: new FormControl("",Validators.required),
      password: new FormControl("",Validators.required)
    })
  }


  save(){
    let body = this.adminForm.getRawValue();
    let shit = JSON.stringify(body);
    console.log("shit",shit)
    console.log("sending this shit -->",body)
    this.loading.presentLoading();
    this.api.postData('admins/create.php',shit).subscribe(res => {
      console.log("res -->",res)
      this.loading.dismiss();
      this.router.navigateByUrl('/admin-list')
      this.toast.presentToast('Admin berhasil dibuat')
    },err => {
      console.log("error",err)
      this.loading.dismiss();
      this.router.navigateByUrl('/admin-list')
      this.toast.presentToast('Terjadi kesalahan ..')
    }
    )
  }
}
