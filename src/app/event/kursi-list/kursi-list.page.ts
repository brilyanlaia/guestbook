import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from 'src/app/shared/services/api.service';

@Component({
  selector: 'app-kursi-list',
  templateUrl: './kursi-list.page.html',
  styleUrls: ['./kursi-list.page.scss'],
})
export class KursiListPage implements OnInit {

  subs: Subscription
  id:any;
  constructor(private route:ActivatedRoute,private api:ApiService) { 
    this.subs = this.route.params.subscribe(res =>{
      this.id = res.id
    })
  }

  ngOnInit() {
  }


  addOne(){

  }

}
