import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/shared/services/api.service';
import { LoadingService } from 'src/app/shared/services/loading.service';
import { ToastService } from 'src/app/shared/services/toast.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-list',
  templateUrl: './admin-list.page.html',
  styleUrls: ['./admin-list.page.scss'],
})
export class AdminListPage implements OnInit {

  admins = [];
  url

  constructor(public as: ApiService,public ls: LoadingService,public toast: ToastService,private router:Router) { }

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
  }

  getData(){
    this.ls.presentLoading();
    this.as.getData('admins/read.php').subscribe(res =>{
      console.log('res -->',res)
      this.admins = res.records;
      console.log('admins -->',this.admins)
      this.ls.dismiss()
    })
  }

}
