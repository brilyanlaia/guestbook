import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/shared/services/api.service';

@Component({
  selector: 'app-admin-list',
  templateUrl: './admin-list.page.html',
  styleUrls: ['./admin-list.page.scss'],
})
export class AdminListPage implements OnInit {

  admins = [];

  constructor(public as: ApiService) { }

  ngOnInit() {
    this.getData();
  }

  getData(){
    this.as.getData('admins/read.php').subscribe(res =>{
      console.log('res -->',res)
      this.admins = res.records;
      console.log('admins -->',this.admins)
    })
  }

}
