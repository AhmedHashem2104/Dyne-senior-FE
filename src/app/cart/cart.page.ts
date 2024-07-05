import { Component, OnInit } from '@angular/core';
import { globalVariable, setData } from '../cart';
import axios from 'axios';
import { Router } from '@angular/router';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.page.html',
  styleUrls: ['./cart.page.scss'],
})
export class CartPage implements OnInit {
  constructor(private router: NavController) {}

  public cart: any[] = globalVariable;

  public orderAmount: number = globalVariable.reduce(
    (acc, v) => acc + v.price * v.count,
    0
  );

  ngOnInit() {
    console.log(this.cart);
  }

  addToBasket(data: any) {
    const index = globalVariable.findIndex((v) => v.id === data.id);
    if (index < 0) globalVariable.push({ ...data, count: 1 });
    else {
      globalVariable[index].count = globalVariable[index].count + 1;
    }
    this.cart = globalVariable;
    this.orderAmount = globalVariable.reduce(
      (acc, v) => acc + v.price * v.count,
      0
    );
  }

  removeFromBasket(data: any) {
    const index = globalVariable.findIndex((v) => v.id === data.id);
    if (globalVariable[index].count > 1)
      globalVariable[index].count = globalVariable[index].count - 1;
    else {
      setData(globalVariable.filter((v) => v.id !== data.id));
    }
    this.cart = globalVariable;

    this.orderAmount = globalVariable.reduce(
      (acc, v) => acc + v.price * v.count,
      0
    );
  }

  async createOrder() {
    const orderNumber = Math.random();
    const data = globalVariable.map((v) => ({
      itemId: v.id,
      quantity: v.count,
    }));
    if (globalVariable.length > 0)
      await axios
        .post(`https://api.mocki.io/v2/aqprm7yv/order/${orderNumber}`, data)
        .then(() => {
          alert(`Order created successfully with Number# ${orderNumber}`);
          setData([]);
          this.cart = [];
        })
        .catch(() => alert(`Order failed`));
    else alert(`No Orders in Cart`);
  }

  goBack() {
    this.router.back();
  }
}
