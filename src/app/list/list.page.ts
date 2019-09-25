import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-list',
  templateUrl: 'list.page.html',
  styleUrls: ['list.page.scss']
})
export class ListPage implements OnInit {
  private selectedItem: any;
  private icons = [
    'flask',
    'wifi',
    'beer',
    'football',
    'basketball',
    'paper-plane',
    'american-football',
    'boat',
    'bluetooth',
    'build'
  ];

  public searchTerm: string = "";
  public items: any;

  public eventlist = [
    {
      name: 'Ulang tahun Pak Jokowi'
    },
    {
      name: 'Pesta Ulang Tahun Chelsea'
    },
    {
      name: 'Arisan Bulanan Ivan Gunawan'
    },
    {
      name: 'Gala Dinner XXVI'
    },
    {
      name: 'Peresmian Kantor Baru'
    },
    {
      name: 'Gala Dinner XXVI'
    },
    {
      name: 'Peresmian Kantor Baru'
    },
    {
      name: 'Gala Dinner XXVI'
    },
    {
      name: 'Peresmian Kantor Baru'
    },
    {
      name: 'Gala Dinner XXVI'
    },
    {
      name: 'Peresmian Kantor Baru'
    },
    {
      name: 'Gala Dinner XXVI'
    },
    {
      name: 'Peresmian Kantor Baru'
    },
    {
      name: 'Gala Dinner XXVI'
    },
    {
      name: 'Peresmian Kantor Baru'
    },
    {
      name: 'Peresmian Kantor Baru'
    },
    {
      name: 'Peresmian Kantor Baru'
    },
    {
      name: 'Peresmian Kantor Baru'
    },
    {
      name: 'Peresmian Kantor Baru'
    },
    {
      name: 'Peresmian Kantor Baru'
    },
    {
      name: 'Peresmian Kantor Baru'
    },
    {
      name: 'Peresmian Kantor Baru'
    },
    {
      name: 'Peresmian Kantor Baru'
    },
  ]
   constructor() {
  
  }

  ngOnInit() {

    this.setFilteredItems();

  }
  // add back when alpha.4 is out
  // navigate(item) {
  //   this.router.navigate(['/list', JSON.stringify(item)]);
  // }

  setFilteredItems() {
    this.eventlist = this.filterItems(this.searchTerm);
  }
  
  filterItems(searchTerm) {
    return this.eventlist.filter(item => {
      return item.name.toLowerCase().indexOf(searchTerm.toLowerCase()) > -1;
    });
  }

}

