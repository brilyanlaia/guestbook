import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/shared/services/api.service';
import { ActivatedRoute, Router } from '@angular/router';
import * as moment from 'moment';
import { Events } from 'src/app/shared/models/event'
@Component({
  selector: 'app-event-detail',
  templateUrl: './event-detail.page.html',
  styleUrls: ['./event-detail.page.scss'],
})
export class EventDetailPage implements OnInit {

  event: Events[] = [];

  tanggal: any;
  jam = "";

  constructor(private api: ApiService, private route: ActivatedRoute,private router: Router) { }

  ngOnInit() {
    this.getData()
  }

  ionViewWillEnter(){
    this.getData()
  }


  getData(){

    this.route.params.subscribe(res => {
      let id = res['id']

      
    this.api.getData(`events/read_one.php?ID_E=${id}`).subscribe(res=>{

     
      this.event = res;

      console.log("res event fetched-->",this.event)

      this.tanggal = moment(res.tanggal_e).format("DD MMMM YYYY");
      this.jam = res.waktu_e.substring(0,5)
      console.log("wakty",res.waktu_e)
    })
    })

  }

  goToTable(id){
    this.router.navigate(['table-detail',id])
    console.log("move to event table id ",id)
  }

  goToCheck(id){
    this.router.navigate(['check-in',id])
  }
  random(id){
    this.router.navigate(['random',id])
  }



}
