import { CartService } from './../../services/cart.service';
import { ProductModel } from './../../models/product-model';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-cart-view',
  templateUrl: './cart-view.component.html',
  styleUrls: ['./cart-view.component.css']
})
export class CartViewComponent implements OnInit {

  @Input('prod') productsInCart:ProductModel[] = [];

  constructor(
    private cartservice:CartService
  ) { }

  ngOnInit(): void {
  }

  updateQuantity(prod:ProductModel, ev:any, index:number){
    const updatedInCartValue = ev.target.value;
    this.cartservice.updateQuantity(index, updatedInCartValue)
  }

  removeItemFromCart(product:ProductModel){
    this.productsInCart = this.cartservice.removeFromCart(product);
  }

}
