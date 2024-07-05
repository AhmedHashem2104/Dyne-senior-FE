import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import axios from 'axios';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.page.html',
  styleUrls: ['./menu.page.scss'],
})
export class MenuPage implements OnInit {
  constructor() {}

  public menu: any = [];

  async ngOnInit() {
    const response = await axios.get(
      'https://api.mocki.io/v2/aqprm7yv/restaurants'
    );
    this.menu = response.data.map((v: any) => ({
      ...v,
      restaurantBackground: v.restaurantBackground || v.background,
    }));
  }
}
