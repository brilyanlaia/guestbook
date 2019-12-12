import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ActivatedRoute, Router, NavigationExtras } from '@angular/router';
import { ApiService } from 'src/app/shared/services/api.service';
import { LoadingService } from 'src/app/shared/services/loading.service';


@Component({
  selector: 'app-kursi-list',
  templateUrl: './kursi-list.page.html',
  styleUrls: ['./kursi-list.page.scss'],
})
export class KursiListPage implements OnInit {

  subs: Subscription
  id:any;
  chair = [];
  admin;
  eventId: any;
  constructor(private router: Router,private route:ActivatedRoute,private api:ApiService, public loading: LoadingService) { 
    this.subs = this.route.params.subscribe(res =>{
      this.id = res.id
    })

    this.route.queryParams.subscribe(params => {
      if (this.router.getCurrentNavigation().extras.state) {
        this.eventId = this.router.getCurrentNavigation().extras.state.eventId;
        console.log("eventid",this.eventId)
      }
    });

    this.admin = localStorage.getItem("current");
  }

  ngOnInit() {
    this.getAllChair()
  }

  ionViewWillEnter(){
    this.getAllChair()
  }


  addOne(){
    let body = {
      IDD_M: parseInt(this.id),
      ID_P: parseInt("1"),
      createdby: "meh",
      modifiedby: "null"
      
    }

    

   

    let model = JSON.stringify(body)
    console.log("sending",model)
    this.api.postData(`kursi/create.php`,model).subscribe(res => {
      console.log("create one chair",res)
      let idkursi = res.records[0].ID_K
      console.log("idkursi",idkursi)
      let a = parseInt(this.eventId)
      let b = parseInt(idkursi)
      let c = a+b
      console.log("c",c)
      let guest = {
        ID_E: parseInt(this.eventId),
        IDD_M: parseInt(this.id),
        ID_K: parseInt(idkursi),
        ID_P: parseInt("1"),
        raffle: c,
        kehadiran: "tidak",
        createdby: this.admin,
        modifiedby: this.admin
      }

      let guestjson = JSON.stringify(guest)
      console.log("send this guest",guestjson)
      this.api.postData(`guestlist/create.php`,guestjson).subscribe(res => {
        console.log("on guestlist",res)
      })
      

      this.getAllChair()
    })
  }

  addFive(){
    let body = {
      IDD_M: parseInt(this.id),
      ID_P: parseInt("1"),
      createdby: "admin",
      modifiedby: "null"
      
    }

    let model = JSON.stringify(body)

    /* let guest = {
      ID_E: parseInt(this.eventId),
      IDD_M: parseInt(this.id),

    } */


    console.log("sending",model)
    this.loading.presentLoading()
    for(let a = 0; a<5;a++){
      this.api.postData(`kursi/create.php`,model).subscribe(res => {
        console.log("create one chair",res)
        
      })
    /*   this.api.postData(`guestlist/create.php`,model).subscribe(res => {
        console.log("on guestlist",res)
      }) */
    }
    this.loading.dismiss()
    this.getAllChair()
  }

  addTen(){
    let body = {
      IDD_M: parseInt(this.id),
      ID_P: parseInt("1"),
      createdby: "meh",
      modifiedby: "null"
      
    }

    let model = JSON.stringify(body)
    console.log("sending",model)
    this.loading.presentLoading()
    for(let a = 0; a<10;a++){
      this.api.postData(`kursi/create.php`,model).subscribe(res => {
        console.log("create one chair",res)
        
      })
      
    }
    this.loading.dismiss()
    
    this.getAllChair()
  }

  edit(val){
    console.log("id",val)
    let navigationExtras: NavigationExtras = {
      state: {
        eventId: this.eventId
      }
    };
    this.router.navigate(['/kursi-detail',val],navigationExtras)
  }

  getAllChair(){

    this.api.getData(`kursi/readbyidmeja.php?IDD_M=${this.id}`).subscribe(res =>{
     
      if(res.records){

      
      this.chair = res.records
      console.log("res",this.chair)
    }
    console.log("res",res)
    })
  }

}
