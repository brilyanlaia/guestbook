import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/shared/services/api.service';
import { LoadingService } from 'src/app/shared/services/loading.service';
import { ToastService } from 'src/app/shared/services/toast.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-customer-list',
  templateUrl: './customer-list.page.html',
  styleUrls: ['./customer-list.page.scss'],
})
export class CustomerListPage implements OnInit {
  
  customers = []
  url
  constructor(public as: ApiService,public ls: LoadingService,
    public toast: ToastService, private router:Router) { }
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
    this.as.getData('pelanggan/read.php').subscribe(res =>{
      console.log('res -->',res)
      this.customers = res.records;
      console.log('admins -->',this.customers)
      this.ls.dismiss()
    })
  }

}
