import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { ApiService } from 'src/app/shared/services/api.service';
import { IonicSelectableComponent } from 'ionic-selectable';
import { ToastService } from 'src/app/shared/services/toast.service';

@Component({
  selector: 'app-check-in',
  templateUrl: './check-in.page.html',
  styleUrls: ['./check-in.page.scss'],
})
export class CheckInPage implements OnInit {

  subs: Subscription
  id: any;
  guestlist = []
  detailcust;
  admin;
  guesthadir = []
  guestbelum = []
  segment = "not"
  
  constructor(private toast:ToastService,private route:ActivatedRoute,private api:ApiService) { 
    this.subs = this.route.params.subscribe(res =>{
      this.id = res.id
    })

    this.admin = localStorage.getItem("current")
  }

  ngOnInit() {
    this.getData()
  }

  getData(){
    this.api.getData(`guestlist/readone.php?ID_E=${this.id}`).subscribe(res =>
     {
       console.log("res",res)
       this.guestlist = res.records;
      var random = this.guestlist[Math.floor(Math.random() * this.guestlist.length)]
      console.log("random",random)
     }
    )
  }

  custChange(event: {
    component: IonicSelectableComponent,
    value: any
  }){
  
    this.detailcust = event.value
    console.log("event",this.detailcust)
  }

  ionViewWillEnter(){
    this.getHadir();
    this.getNotHadir();
  }
  

  check(){

    let model = {
      
      IDD_M: parseInt(this.detailcust.IDD_M),
      ID_K: parseInt(this.detailcust.ID_K),
      ID_P: parseInt(this.detailcust.ID_P),
      kehadiran: "ya",
      modifiedby: this.admin
    }

    let json = JSON.stringify(model)
    console.log("send",json)
    this.api.postData(`guestlist/update.php`,json).subscribe(res=>{
      console.log("Res",res)

      this.toast.presentToast("success checkin")

    })
  }

  getHadir(){
    this.api.getData(`guestlist/hadir.php?ID_E=${this.id}`).subscribe(res => {
      console.log("hadir list",res)
      if(res.records){

        this.guesthadir = res.records
      }
    })

  }

  getNotHadir(){
    this.api.getData(`guestlist/nohadir.php?ID_E=${this.id}`).subscribe(res =>{
      console.log("list tidak hadir",res)
      if(res.records){

        this.guestbelum = res.records
      }
    })
  }

 

}
