import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/shared/services/api.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-admin-detail',
  templateUrl: './admin-detail.page.html',
  styleUrls: ['./admin-detail.page.scss'],
})
export class AdminDetailPage implements OnInit {
  event= []
  constructor(private api: ApiService, private route: ActivatedRoute) { }


  ngOnInit() {
    this.getData()
  }

  ionViewWillEnter(){
    this.getData()
  }

  
  getData(){

    this.route.params.subscribe(res => {
      let id = res['id']

      
    this.api.getData(`admins/read_one.php?ID_A=${id}`).subscribe(res=>{

     
      this.event = res;

      console.log("res event fetched-->",this.event)

    })
    })

  }


}
