import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/shared/services/api.service';
import { ActivatedRoute } from '@angular/router';
import { CallNumber } from '@ionic-native/call-number/ngx';
@Component({
  selector: 'app-customer-detail',
  templateUrl: './customer-detail.page.html',
  styleUrls: ['./customer-detail.page.scss'],
})
export class CustomerDetailPage implements OnInit {
  event= []
  custId;
  waNumber;
  localpath;
  url;
  constructor(private callNumber: CallNumber,private api: ApiService, private route: ActivatedRoute) { 

    
    this.route.params.subscribe(res => {
      let id = res['id']
      this.custId = id;
      
    this.api.getData(`pelanggan/read_one.php?ID_P=${id}`).subscribe(res=>{

     
      this.event = res;
      this.waNumber = res.nomorhp.replace("0","62")
      
      console.log("wa", this.waNumber)

      console.log("res event fetched-->",this.event)

    })
    })
  }

  ngOnInit() {
   // this.getData()
  }

  call(number){
  let call = this.callNumber.callNumber(number, true)
  .then(res => console.log('Launched dialer!', res))
  .catch(err => console.log('Error launching dialer', err));
  }
  

  

  ionViewWillEnter(){
    this.getData()
  }


  getData(){



      
    this.api.getData(`pelanggan/read_one.php?ID_P=${this.custId}`).subscribe(res=>{

     
      this.event = res;

      console.log("res event fetched-->",this.event)

    })
    

  }
}
