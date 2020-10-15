import { CartService } from './../../services/cart.service';
import { ProductService } from './../../services/product.service';
import { ProductModel } from './../../models/product-model';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-prod-detail',
  templateUrl: './prod-detail.page.html',
  styleUrls: ['./prod-detail.page.scss'],
})
export class ProdDetailPage implements OnInit {
  product:ProductModel;
  showData:boolean = false;
  constructor(
    private route:ActivatedRoute,
    private cartService: CartService
  ) { }

  ngOnInit() {
    
    this.route.data.subscribe((data:{product:ProductModel})=>{
      this.product = data.product;
      this.showData = true;
      
    });

   
    // let id;
    // this.route.params.subscribe( data =>{
    //   id = data.id;
    //   this.productService.getSingleProduct(id).subscribe( (prod:ProductModel) => {
    //     this.product = prod;
    //   })   
    // });
   
  }

  addProduct(product:ProductModel){
    this.cartService.addToCart(product);
  }

}
