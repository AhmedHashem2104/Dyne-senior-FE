import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import axios from 'axios';
import { globalVariable, setData } from '../cart';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-items',
  templateUrl: './items.page.html',
  styleUrls: ['./items.page.scss'],
})
export class ItemsPage implements OnInit {
  constructor(private route: ActivatedRoute, private router: NavController) {}
  public fileData: any;

  public items: any = [];

  public cart: any[] = globalVariable;

  public name: string | null = '';

  async ngOnInit() {
    let id = this.route.snapshot.paramMap.get('menuId');
    this.name = this.route.snapshot.paramMap.get('name');
    const response = await axios.get(
      `https://api.mocki.io/v2/aqprm7yv/menus/${id}`
    );
    this.items = response.data;
  }

  async addToBasket(data: any) {
    const index = globalVariable.findIndex((v) => v.id === data.id);
    console.log(index);
    if (index < 0) globalVariable.push({ ...data, count: 1 });
    else {
      globalVariable[index].count = globalVariable[index].count + 1;
    }
    this.cart = globalVariable;
  }

  goBack() {
    this.router.back();
  }
}
