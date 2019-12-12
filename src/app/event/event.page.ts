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
  fg2: FormGroup
  url
  step1 = true;
  step2 = false;
  tableCount: any;
  newEvent = []
  table= []

  admin;

  pageTitle = 'Create New Event'

  constructor(private api: ApiService,
     private loading: LoadingService, 
     private toast:ToastService, private router: Router) { 

      this.admin = localStorage.getItem("current")

     }

  ngOnInit() {
    this.initFormMeja()
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
      createdby: new FormControl(this.admin,Validators.required),
      notes: new FormControl("",Validators.required)
     
    })
  }

  initFormMeja(){

    this.fg2 = new FormGroup ({
      tname: new FormControl("",Validators.required),
      createdby: new FormControl("",Validators.required),
      modifiedby: new FormControl("",Validators.required),
      
    })

  } 


  getTableCount(){


   //this.api.getData(`readone.php?ID_E=${}`)

  }




  next(){
    //let body = this.fg.getRawValue();
    
    let body = {
      nama_e: this.fg.value.nama_e,
      lokasi_e: this.fg.value.lokasi_e,
      tanggal_e: moment(this.fg.value.tanggal_e).format("YYYY-MM-DD"),
      waktu_e: moment(this.fg.value.waktu_e).format("hh:mm:ss"),
      jumlah_m: this.fg.value.jumlah_m,
      createdby: this.fg.value.createdby,
      modifiedby: "",
      notes: this.fg.value.notes
      
      
    } 
    let eventname = this.fg.value.nama_e

   // this.tableCount = this.fg.value.jumlah_m
    
  //  let date = moment(this.fg.value.tanggal_e).format("YYYY-MM-DD")
   
   

    let shit = JSON.stringify(body);
    console.log("shit",shit)
    console.log("sending this shit -->",body)
    this.loading.presentLoading();
    this.api.postData('events/create.php',shit).subscribe(res => {
      console.log("res -->",res)
      this.loading.dismiss();

      this.toast.presentToast('Event berhasil dibuat')
      this.router.navigateByUrl('/event-list')

     // this.pageTitle = 'Enter table details for ' + eventname
      //this.step2 = true;
      //this.step1 = false;
   
      //this.getEvent()

    },err => {
      console.log("error",err)
      this.loading.dismiss();
      //this.router.navigateByUrl('/home')
      this.toast.presentToast('Terjadi kesalahan ..'+err.message)
    }
    )
  }

  getTables(id){
    this.api.getData(`meja/readone.php?ID_E=${id}`).subscribe(res=>{
      this.table = res.records
      console.log("table by evnet",res.records)
    })
  }

  getEvent(){
    this.api.getData('events/read.php').subscribe(res => {
      console.log("Res list event",res)
      this.newEvent = res.records;

      console.log("result array",this.newEvent)
      let a = this.newEvent[this.newEvent.length-1]
      console.log("last element", a.ID_E)

      this.getTables(a.ID_E);

  })


  }

  updateTable(id){


    
    let body = {
      tname:  this.fg2.value.tname,
      IDD_M: id,
      modifiedby: "admin",
      createdby: "admin"
    }

    let json = JSON.stringify(body);
    console.log("update table",json)
    
    this.api.postData(`meja/update.php`,json).subscribe(res =>{


      console.log("res update",res)
    })
  }



}
