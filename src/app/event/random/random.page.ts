import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from 'src/app/shared/services/api.service';
import { LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-random',
  templateUrl: './random.page.html',
  styleUrls: ['./random.page.scss'],
})
export class RandomPage implements OnInit {

  subs: Subscription
  id: any;
  guestlist = []
  randomed:any;
  selected =false
  constructor(private route:ActivatedRoute,private api: ApiService,public loadingController: LoadingController) {
    this.subs = this.route.params.subscribe(res =>{
      this.id = res.id
    })
   }

  ngOnInit() {
    this.api.getData(`guestlist/readone.php?ID_E=${this.id}`).subscribe(res =>
      {
        console.log("res",res)
        this.guestlist = res.records;
      
      }
     )
  }

  random(){
    this.presentLoading()
  
    setTimeout(()=>{
      this.randomed = this.guestlist[Math.floor(Math.random() * this.guestlist.length)]
      console.log("random",this.randomed)
      this.selected = true
    },5500)


  }

  async presentLoading() {
    const loading = await this.loadingController.create({
      message: 'Randoming..',
      duration: 5000,
      spinner: 'dots'
    });
    await loading.present();
  }

}
