import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NavController } from '@ionic/angular';
import axios from 'axios';

@Component({
  selector: 'app-menus',
  templateUrl: './menus.page.html',
  styleUrls: ['./menus.page.scss'],
})
export class MenusPage implements OnInit {
  constructor(private route: ActivatedRoute, private router: NavController) {}

  public menus: any = [];

  public restaurantName: string = '';

  async ngOnInit() {
    let id = this.route.snapshot.paramMap.get('id');
    const response = await axios.get(
      'https://api.mocki.io/v2/aqprm7yv/restaurants'
    );
    this.restaurantName = response.data[Number(id) - 1].name;
    this.menus = response.data[Number(id) - 1].menus;
  }

  goBack() {
    this.router.back();
  }
}
