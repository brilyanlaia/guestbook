import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ApiService } from 'src/app/shared/services/api.service';
import { LoadingService } from 'src/app/shared/services/loading.service';

@Component({
  selector: 'app-table-detail',
  templateUrl: './table-detail.page.html',
  styleUrls: ['./table-detail.page.scss'],
})
export class TableDetailPage implements OnInit {
 subs: Subscription
 id: any;
 fg2: FormGroup
 table= []
  constructor(private router:Router,private route: ActivatedRoute, private api: ApiService, public loading: LoadingService) {
    this.subs = this.route.params.subscribe(res =>{
      this.id = res.id
    })
   }

  ngOnInit() {
    console.log("param id event",this.id)
    this.getData()
    this.initFormMeja()
  }

  ionViewDidLeave(){
    this.subs.unsubscribe()
  }

  initFormMeja(){

    this.fg2 = new FormGroup ({
      tname: new FormControl("",Validators.required),
      createdby: new FormControl("admin",Validators.required),
      modifiedby: new FormControl("no",Validators.required),
      
    })

  } 

  openKursi(val){
    this.router.navigate(['kursi-list',val])
  }



  getData(){
    this.api.getData(`meja/readone.php?ID_E=${this.id}`).subscribe(res=>{
      this.table = res.records
      console.log("table by evnet",res.records)
    })
  }
  
  updateTable(id){

this.loading.presentLoading()
    
    let body = {
      tname:  this.fg2.value.tname,
      IDD_M: id,
      modifiedby: "admin",
      createdby: "admin"
    }

    let json = JSON.stringify(body);
    console.log("update table",json)
    
    this.api.postData(`meja/update.php`,json).subscribe(res =>{

      this.getData()
      console.log("res update",res)
      this.loading.dismiss()
    },err => {
      console.log("err",err)
      this.loading.dismiss()
    })
  }

}
