import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/shared/services/api.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-customer-detail',
  templateUrl: './customer-detail.page.html',
  styleUrls: ['./customer-detail.page.scss'],
})
export class CustomerDetailPage implements OnInit {
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

      
    this.api.getData(`pelanggan/read_one.php?ID_P=${id}`).subscribe(res=>{

     
      this.event = res;

      console.log("res event fetched-->",this.event)

    })
    })

  }
}
