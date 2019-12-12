import { Component, OnInit, Input } from '@angular/core';
import { Subscription } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from 'src/app/shared/services/api.service';
import { LoadingService } from 'src/app/shared/services/loading.service';
import { IonicSelectableComponent } from 'ionic-selectable';
import { ToastService } from 'src/app/shared/services/toast.service';
@Component({
  selector: 'app-kursi-detail',
  templateUrl: './kursi-detail.page.html',
  styleUrls: ['./kursi-detail.page.scss'],
})
export class KursiDetailPage implements OnInit {
  subs: Subscription
  id: any;
  customers = []
  current: any;
  customerId: any;
  tableId: any;
  eventId:any;
  admin;


  constructor(private router:Router,private route:ActivatedRoute, private api: ApiService,private ls: LoadingService,private toast: ToastService) { 
    this.subs = this.route.params.subscribe(res =>{
      this.id = res.id
    })

    
    this.route.queryParams.subscribe(params => {
      if (this.router.getCurrentNavigation().extras.state) {
        this.eventId = this.router.getCurrentNavigation().extras.state.eventId;
        console.log("eventid",this.eventId)
      }
    });

    this.admin = localStorage.getItem("current")
   
  }

  ngOnInit() {
    if(this.id){
        this.getChairDetail()
    }
    this.getData()
  }

  getChairDetail(){
    this.api.getData(`kursi/readone.php?ID_K=${this.id}`).subscribe(res =>{
      console.log("kursi",res)
      this.customerId = res.ID_P
      this.tableId = res.IDD_M
      if(this.customerId){

        this.getCurrent(this.customerId)
      }
    })
  }

  getCurrent(id){
    this.api.getData(`pelanggan/read_one.php?ID_P=${id}`).subscribe(res => {
      console.log("res",res);
      this.current = res
      console.log("current",this.current)
    })
  }

  getData(){
    this.ls.presentLoading();
    this.api.getData('pelanggan/read.php').subscribe(res =>{
      console.log('res -->',res)
      this.customers = res.records;
      console.log('customer -->',this.customers)
      this.ls.dismiss()
    })
  }

  custChange(event: {
    component: IonicSelectableComponent,
    value: any
  }) {
    console.log('cust:', event.value.ID_P);
    let body = {
      IDD_M: parseInt(this.tableId),
      ID_K: parseInt(this.id),
      ID_P: parseInt(event.value.ID_P),
      modifiedby: this.admin


    }

    let a = parseInt(this.eventId)
    let b = parseInt(this.id)
    let c = a+b
    console.log("a",a)
    console.log("b",b)
    console.log("c",c)

    let model = {
      
      IDD_M: parseInt(this.tableId),
      ID_K: parseInt(this.id),
      ID_P: parseInt(event.value.ID_P),
      kehadiran: "tidak",
      modifiedby: this.admin
    }
    
    let guest = JSON.stringify(model)
    let json = JSON.stringify(body)
    console.log("guestlist send",guest)
    this.api.postData(`kursi/update.php`,json).subscribe(res => {
      console.log("Res",res);
      this.toast.presentToast('update chair success')
    })

    this.api.postData(`guestlist/update.php`,guest).subscribe(res => {
      console.log("on guestlist",res)
    })

   
  }

}
