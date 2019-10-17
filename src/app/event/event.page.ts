import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { LoadingService } from '../shared/services/loading.service';
import { ToastService } from '../shared/services/toast.service';
import { Router } from '@angular/router';
import { ApiService } from '../shared/services/api.service';
import * as moment from 'moment';
@Component({
  selector: 'app-event',
  templateUrl: './event.page.html',
  styleUrls: ['./event.page.scss'],
})
export class EventPage implements OnInit {

  fg: FormGroup
  url
  constructor(private api: ApiService,
     private loading: LoadingService, 
     private toast:ToastService, private router: Router) { }

  ngOnInit() {
    this.initForm()
   // this.api.setUrl('http://192.168.200.1/')
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
    this.fg = new FormGroup ({
      nama_e: new FormControl("",Validators.required),
      lokasi_e: new FormControl("",Validators.required),
      tanggal_e: new FormControl("",Validators.required),
      waktu_e: new FormControl("",Validators.required),
      jumlah_m: new FormControl("",Validators.required),
      jumlah_k: new FormControl("",Validators.required),
    })
  }

  save(){
    //let body = this.fg.getRawValue();
    
    let body = {
      nama_e: this.fg.value.nama_e,
      lokasi_e: this.fg.value.lokasi_e,
      tanggal_e: moment(this.fg.value.tanggal_e).format("YYYY-MM-DD"),
      waktu_e: moment(this.fg.value.waktu_e).format("hh:mm:ss"),
      jumlah_m: this.fg.value.jumlah_m,
      jumlah_k: this.fg.value.jumlah_k
    }

  //  let date = moment(this.fg.value.tanggal_e).format("YYYY-MM-DD")
   

    let shit = JSON.stringify(body);
    console.log("shit",shit)
    console.log("sending this shit -->",body)
    this.loading.presentLoading();
    this.api.postData('events/create.php',shit).subscribe(res => {
      console.log("res -->",res)
      this.loading.dismiss();
      this.router.navigateByUrl('/event-list')
      this.toast.presentToast('Event berhasil dibuat')
    },err => {
      console.log("error",err)
      this.loading.dismiss();
      this.router.navigateByUrl('/home')
      this.toast.presentToast('Terjadi kesalahan ..')
    }
    )
  }

}
