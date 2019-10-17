import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/shared/services/api.service';
import { LoadingService } from 'src/app/shared/services/loading.service';
import { Router } from '@angular/router';
import { ToastService } from 'src/app/shared/services/toast.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-customer-create',
  templateUrl: './customer-create.page.html',
  styleUrls: ['./customer-create.page.scss'],
})
export class CustomerCreatePage implements OnInit {
  customer: FormGroup
  hidden = true;
  constructor(
    private api: ApiService,
    private loading:LoadingService, 
    private router: Router,
    private toast: ToastService
  ) { }

  ngOnInit() {
    this.initForm()
  }

  ionViewWillEnter(){
    this.initForm()
  }
  
  initForm(){
    this.customer = new FormGroup ({
      nama: new FormControl("",Validators.required),
      email: new FormControl("",Validators.required),
      nomorhp: new FormControl("",Validators.required),
      kehadiran: new FormControl("xax",Validators.required),
      password: new FormControl("",Validators.required)
    })
  }


  save(){
    let body = this.customer.getRawValue();
    let shit = JSON.stringify(body);
    console.log("shit",shit)
    console.log("sending this shit -->",body)
    this.loading.presentLoading();
    this.api.postData('pelanggan/create.php',shit).subscribe(res => {
      console.log("res -->",res)
      this.loading.dismiss();
      this.router.navigateByUrl('/customer-list')
      this.toast.presentToast('Customer berhasil ditambahkan')
    },err => {
      console.log("error",err)
      this.loading.dismiss();
      this.router.navigateByUrl('/customer-list')
      this.toast.presentToast('Terjadi kesalahan ..')
    }
    )
  }
}
