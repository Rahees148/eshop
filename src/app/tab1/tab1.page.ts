import { CartModal } from './../models/cart-model';
import { CategoryModal } from './../models/category-model';
import { SortModalComponent } from './../components/sort-modal/sort-modal.component';
import { async } from '@angular/core/testing';
import { ProductModel } from './../models/product-model';
import { ProductService } from './../services/product.service';
import { Component, OnInit } from '@angular/core';
import { LoadingController, MenuController, ModalController, ToastController } from '@ionic/angular';
import { CartService } from '../services/cart.service';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit {
  sliderImages:any[] = [
    '/assets/slider-1',
    '/assets/slider-2',
    '/assets/slider-3'
  ];
  sliderOptions = {
    autoplay: {
      delay:2000
    },
    loop: true

  }

  listArrayOfProducts:ProductModel[] =[];
  displayedList:ProductModel[] = []
  currentPage:number = 1;
  filterCount:number = 0;
  filteredCatgeryList:any[] = [];
  categories:CategoryModal[] = [];
  cartCount:number;

  constructor(
    private productService: ProductService,
    private loadingController: LoadingController,
    private menuController: MenuController,
    private toastController: ToastController,
    private modalController: ModalController,
    private cartService:CartService 
  ) {
    this.loadMoreData(null).then();
  }

  async ngOnInit(){
    const loader = await this.loadingController.create({
      message : 'Getting Products..',
      spinner : 'bubbles',
      animated : true

    });
    await loader.present().then()
    this.productService.getAllProducts().subscribe( async(products:ProductModel[]) => {
      await loader.dismiss().then();
      this.listArrayOfProducts = products;
      this.displayedList = [...this.listArrayOfProducts];
    }, async (err) => {
      await loader.dismiss().then();
      console.log('err',err)
    }
      );

    this.categories = await this.productService.getAllCategories().toPromise();

    this.cartService.cartData.pipe(
      map( (data:CartModal) => data.count)
    ).subscribe(count => {
      this.cartCount = count
    })
    
  }

  async loadMoreData(ev:any){
    const toast = await this.toastController.create({
      message: 'No More Products',
      animated: true,
      duration:2000,
      buttons:[
        {
          text: 'Done',
          role: 'cancel',
          icon: 'close'
        }
      ]
    })

    if(ev == null){
      this.currentPage = 1;
    }else{
      this.currentPage++;
      this.productService.getAllProducts(this.currentPage).subscribe(async (prods: ProductModel[]) => {
        this.listArrayOfProducts = this.listArrayOfProducts.concat(prods);
        this.displayedList = [...this.listArrayOfProducts];

        if(ev !== null){
          ev.target.complete();
        }
        if(prods.length < 10){
          await toast.present().then()
          ev.target.disabled = true;
        }
      }, (err) => {
        console.log('err-infinite load', err);
      })
    }
  }

  loadingSpinner(){
    this.loadingController.create({
      message: "Loading Details",
      animated: true,
      spinner: "crescent",
      backdropDismiss: false,
      showBackdrop: true
    }).then(el => el.present());
  }

  openModal(){
    this.modalController.create({
      component: SortModalComponent,
      animated: true,
      cssClass:'sortModal'
    }).then(el =>{
      el.present();
      return el.onDidDismiss().then(resultData => {
        this.sort({role: resultData.role, data: resultData.data} )
      })
    });
  }

  sort(resultData:{role: string, data: any}){
    const {role, data} = {...resultData}
      if(role === 'cancel'){
        return
      }else if(role === 'sort'){
         if(data === 'title-asc'){
           this.displayedList.sort((a, b)=>{
              const x = a.name.toLowerCase();
              const y = b.name.toLowerCase();

              if(x < y){
                return -1;
              }
              if(x > y){
                return 1;
              }

              return 0;
           })
         }
         else if (data === 'title-desc'){
          this.displayedList.sort((a, b)=>{
              const x = a.name.toLowerCase();
              const y = b.name.toLowerCase();

              if(x > y){
                return -1;
              }
              if(x < y){
                return 1;
              }

              return 0;
          })
         }
         else if(data === 'price-asc'){
           this.displayedList.sort((a, b)=>{
            //@ts-ignore  
            return a.price - b.price;  // low to high
           })
         }
         else if(data === 'price-desc'){
          this.displayedList.sort((a, b)=>{
           //@ts-ignore  
           return b.price - a.price;  // high to low
          })
        }

      }

  }

  openFilter(){
    this.menuController.enable(true,'filter').then();
    this.menuController.open('filter').then();
  }

  categoryFilter(ev: {name:string, selected:boolean}){
    if(ev.selected && this.filterCount === 0){
      this.filteredCatgeryList.push(ev.name);
      this.filterCount++;
      this.displayedList = this.displayedList.filter(p => p.categories.some( cat => cat.name === ev.name));
    }
    else if(ev.selected && this.filterCount >= 1){
      const newArray:ProductModel[] = [...this.listArrayOfProducts];
      this.filterCount++;

      if(!this.filteredCatgeryList.includes(ev.name)){
        this.filteredCatgeryList.push(ev.name);

        const product:ProductModel[] = newArray.filter(p => p.categories.some(cat => cat.name === ev.name));
        let i; // product index

        product.forEach( p => {
          i = this.displayedList.findIndex(prod => prod.id === p.id);
          
          // if product is not present in the array
            if( i !== -1 ) {
              return;
            }else {
              this.displayedList = this.displayedList.concat(p)
            }
        })
      }else{
        return;
      }   

    } // End of else if

    else if(!ev.selected && this.filterCount >= 1){
      const newArray:ProductModel[] = [...this.listArrayOfProducts];
      this.filterCount--;

      //remove the category from the filter list array
      this.filteredCatgeryList = this.filteredCatgeryList.filter(el => el !== ev.name)
      
      if(this.filteredCatgeryList.length > 0){
        this.displayedList = [];
        this.filteredCatgeryList.forEach(el => {
            this.displayedList = this.displayedList.concat(
              newArray.filter(p => p.categories.some(cat => cat.name === el))
            )
        });
      }

      //check if the filtter count has reached 0, 

      if(this.filterCount === 0){
        this.displayedList = [...this.listArrayOfProducts]
      }
    }

  }

  segmentChange(ev:any){
    const value = ev.target.value;

    if(value === 'featured'){
      this.displayedList = this.listArrayOfProducts.filter( p => {p.featured === true});
    }else {
      this.displayedList = [...this.listArrayOfProducts]
    }

  }
}
