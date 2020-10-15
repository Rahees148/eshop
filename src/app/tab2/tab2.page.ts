import { CartModal } from './../models/cart-model';
import { CartService } from './../services/cart.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page implements OnInit {
  cart:CartModal;
  total:number;

  constructor(
    private cartService:CartService
  ) {}

  ngOnInit(){
    this.cartService.cartData.subscribe((data:CartModal) => {
      this.cart = data;
    })
    this.cartService.cartTotal.subscribe( (total:number )=> {
      this.total = total;
    })
  }

}
