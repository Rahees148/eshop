
import { environment } from './../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { ProductModel } from './../models/product-model';
import { CategoryModal } from '../models/category-model';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private url:string = environment.backend_api_url;

  constructor(
    private httpClient:HttpClient
  ) { }

  getAllProducts( pageNumber:number = 1 ) : Observable<ProductModel[]>{
   return this.httpClient.get<ProductModel[]>(`${this.url}/products?page=${pageNumber}&per_page=10`);
  }

  getSingleProduct(id:number) : Observable<ProductModel>{
    return this.httpClient.get<ProductModel>(`${this.url}/products/${id}`);
  }

  serachProducts(keyword:string):Observable<ProductModel[]>{
    return this.httpClient.get<ProductModel[]>(`${this.url}/products?search=${keyword}`)
  }

  getAllCategories():Observable<CategoryModal[]>{
    return this.httpClient.get<CategoryModal[]>(`${this.url}/products/categories?per_pag=100&hide_empty=true&parent=0`);
  }

}
