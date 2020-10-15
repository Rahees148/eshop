import { ProductModel } from './../../models/product-model';
import { ProductService } from './../../services/product.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-search',
  templateUrl: './search.page.html',
  styleUrls: ['./search.page.scss'],
})
export class SearchPage implements OnInit {

  filtereProducts:ProductModel[] = [];
  showSkeleton: boolean;
  touched: boolean = false
  constructor(
    private productService : ProductService
  ) { }

  ngOnInit() {
  }

  search(ev:any){
    this.touched = true;
    this.filtereProducts = [];
    this.showSkeleton = true;
    this.productService.serachProducts(ev.target.value).subscribe((prods:ProductModel[])=>{
      if(prods.length <= 0 ){
        this.touched = true
      }else{
        this.touched = false;
      }

      this.showSkeleton = false
      this.filtereProducts = prods;

    }, err => console.log(err));
  }

}
