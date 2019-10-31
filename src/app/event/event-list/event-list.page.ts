import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/shared/services/api.service';
import { LoadingService } from 'src/app/shared/services/loading.service';
import { ToastService } from 'src/app/shared/services/toast.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-event-list',
  templateUrl: './event-list.page.html',
  styleUrls: ['./event-list.page.scss'],
})
export class EventListPage implements OnInit {

  events = []
  url

  constructor(public as: ApiService,
    public ls: LoadingService,
    public toast: ToastService,
    public router:Router) { }

  ngOnInit() {
    this.getData();
  }

  ionViewWillEnter(){
    this.getData()
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
    this.url = this.as.getUrl()
    this.toast.presentToast('Connected to ',this.url)
  }


  doRefresh(event) {
    console.log('Begin async operation');

    setTimeout(() => {
      this.justGet()
      console.log('refreshing data');
      event.target.complete();
    }, 2000);
  }

  justGet(){
    this.as.getData('events/read.php').subscribe(res =>{
      console.log('res -->',res)
      this.events = res.records;
      console.log('admins -->',this.events)
      this.ls.dismiss()
    },
    err =>{
      console.log("err",err)
      this.toast.presentToast("error",err)
      this.ls.dismiss()
    })
  }

  getData(){
    this.ls.presentLoading();
    this.as.getData('events/read.php').subscribe(res =>{
      console.log('res -->',res)
      this.events = res.records;
      console.log('admins -->',this.events)
      this.ls.dismiss()
    })
  }
}
