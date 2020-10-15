import { OrderModel } from './../models/order-model';
import { ProductModel } from './../models/product-model';
import { NavigationExtras, Router } from '@angular/router';
import { AlertController, LoadingController, ToastController } from '@ionic/angular';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { CartModal } from './../models/cart-model';
import { environment } from './../../environments/environment';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import {Storage} from '@ionic/storage';
import { WriteObject } from './backend.interceptor';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  private serverUrl = environment.backend_api_url;
  private cartDataArray:CartModal = {
    count: 0,
    productData: []
  }

  private cartData$:BehaviorSubject<CartModal> = new BehaviorSubject<CartModal>({count:0, productData: []});
  private totalAmount:number = 0;
  private totalAmount$ = new BehaviorSubject<number>(0);

  constructor(
    private httpClinet: HttpClient,
    private loadingController: LoadingController,
    private alertController: AlertController,
    private toastController: ToastController,
    private storage: Storage,
    private router: Router
  ) { 

    this.totalAmount = 0;
    this.storage.get('cart').then(data => {
      if(data)
      this.cartDataArray = data;
      this.cartData$.next(this.cartDataArray);
      this.calcaulateTotalAmount();
    })

  }

  async addToCart(product:ProductModel){

    const loader = await this.loadingController.create({
      message : "Adding to Cart..",
      animated: true,
      spinner: "circles",
      backdropDismiss: false,
      showBackdrop: true
    });

    const alert = await this.alertController.create({
      header: 'Cart Updated',
      buttons: [
        {
          text: 'Continue',
          role: 'cancel',
          cssClass: 'continue',
          handler: () => {
            console.log('Product added ')
          }
        },
        {
          text: 'View Cart',
          cssClass: 'view-cart',
          handler: () => {
            this.router.navigateByUrl('/tabs/tab2').then();
          }
        }
      ],
      message : "Product added to cart",
      animated: true,
      backdropDismiss: false,
      cssClass: "add-product"
    });

    const toast = await this.toastController.create({
      message: 'only 5 allowed in cart ',
      header: 'Max Quantity reached',
      duration: 2000,
      position: 'bottom',
      animated: true,
      color: 'warning',
      buttons:[
        {
          side: 'end',
          role: 'cancel',
          text: 'OK'
        }
      ]
    })

    await loader.present().then();

    if(this.cartDataArray.count !== 0){

      const index = this.cartDataArray.productData.findIndex( p => p.id === product.id);

      //if product already available in cart
      if(index > -1){

        if(this.cartDataArray.productData[index].in_cart >= 5){
          this.cartDataArray.productData[index].in_cart = 5;
         this.calcaulateTotalAmount();
          this.storage.set('cart', {...this.cartDataArray}).then();
          await loader.dismiss().then();
          await toast.present().then();
        }else{
          this.cartDataArray.productData[index].in_cart += 1;
          this.calcaulateTotalAmount();
          this.storage.set('cart', {...this.cartDataArray}).then();
          await loader.dismiss().then();
          await alert.present().then();
        }

        this.cartData$.next(this.cartDataArray);
        
      } else{
        this.cartDataArray.productData.push(product);

        const newProductIndex = this.cartDataArray.productData.findIndex( p => p.id === product.id);
        this.cartDataArray.productData[newProductIndex].in_cart = 1;
        this.calcaulateTotalAmount()
        await loader.dismiss().then();
        await alert.present().then();
        this.cartDataArray.count = this.cartDataArray.productData.length;
        
        this.storage.set('cart', {...this.cartDataArray}).then();

        this.cartData$.next(this.cartDataArray);

      }


    } 
    // whan cart is empty;
    else{
      this.cartDataArray.productData.push({...product, in_cart: 1});
      this.calcaulateTotalAmount()
     
      this.cartDataArray.count = this.cartDataArray.productData.length;      
      this.storage.set('cart', {...this.cartDataArray}).then();

      await loader.dismiss().then();
      await alert.present().then();
      
      this.cartData$.next(this.cartDataArray);
    }

  }

  removeFromCart(product:ProductModel){
    this.cartDataArray.productData = this.cartDataArray.productData.filter(p => p.id !== product.id);
    this.cartDataArray.count = this.cartDataArray.productData.length;
    
    this.calcaulateTotalAmount();
    
    this.storage.set('cart', {...this.cartDataArray}).then();
    this.cartData$.next(this.cartDataArray);
    this.totalAmount$.next(this.totalAmount);

    return this.cartDataArray.productData;
  }

  private calcaulateTotalAmount(){
    this.totalAmount = 0;
    if(this.cartDataArray.productData.length === 0) {
      this.totalAmount = 0;
      this.totalAmount$.next(this.totalAmount);
      return ;
    }

    this.cartDataArray.productData.forEach( p => {
      this.totalAmount += parseInt(p.price) * p.in_cart; 
    });

    this.totalAmount$.next(this.totalAmount);


  }

  updateQuantity(indexOfProduct, newInCartValue){
    this.cartDataArray.productData[indexOfProduct].in_cart = newInCartValue;
    this.calcaulateTotalAmount();
    this.storage.set('cart', {...this.cartDataArray}).then();
    this.cartData$.next(this.cartDataArray);
    this.totalAmount$.next(this.totalAmount);

  }

  private emptyCart(){
    this.cartDataArray = {
      count: 0,
      productData: []
    }
    this.calcaulateTotalAmount();
    this.storage.set('cart', {...this.cartDataArray}).then();
    this.cartData$.next(this.cartDataArray);
    this.totalAmount$.next(this.totalAmount);
  }

  get cartData():Observable<CartModal>{
    return this.cartData$.asObservable();
  }

  get cartTotal():Observable<number>{
    return this.totalAmount$.asObservable();
  }

  getAllPaymentGateways(){
    return this.httpClinet.get(`  ${this.serverUrl}/payment_gateways`);
  }
  
  getTaxes(){
    return this.httpClinet.get(`  ${this.serverUrl}/taxes`);
  }

  async createOrder(orderData:OrderModel){
    let headers:HttpHeaders = new HttpHeaders().set(WriteObject,'');
    headers = headers.set('Content-type', 'application/json');

    const loader = await this.loadingController.create({
      message: 'Placing Order',
      animated: true,
      spinner:'circles'
    });

    loader.present().then();

    this.httpClinet.post(`${this.serverUrl}/orders`, {...orderData}, {headers})
    .subscribe( async (newOrderDetails: any) => {
      await loader.dismiss().then();
      

      const navigationExtras:NavigationExtras = {
        state: {
          message: 'Order Palced',
          products: this.cartDataArray.productData,
          orderId: newOrderDetails.id,
          total: parseFloat(newOrderDetails.total)
        }
      }

      this.emptyCart();
      this.router.navigate(['/thankyou'], navigationExtras).then();

    })

  }

}
