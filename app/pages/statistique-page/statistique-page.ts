import {Component} from '@angular/core';
import {NavController} from 'ionic-angular';
import { Product } from '../../services/product';
import { ProductService } from '../../services/product.service';
@Component({
  templateUrl: 'build/pages/statistique-page/statistique-page.html',
  providers: [ProductService]
})
export class StatistiquePage {
  
  private products: Product[];
  private totalReference: number = 0;
  private totalStock: number = 0;
  private totalCost:number = 0;
  private totalNoBuyingPrice:number = 0;
 
  constructor(
    private navController: NavController,
    private productservice: ProductService) {
     this.getProducts();
     
    }
    
  getProducts(){
    this.productservice.getProducts()
    .then(products => {
      this.products = products;
      this.getTotal();
    })
    .catch();
  }
  
  getTotal(){
    for (var idx in this.products) {
      this.totalReference += 1;
      if (typeof (this.products[idx].buying_price) == 'undefined') {
        this.totalNoBuyingPrice++;
        continue;
      } 
      
      this.totalStock += this.products[idx].stockQuantity;
      this.totalCost += Number(this.products[idx].buying_price)*this.products[idx].stockQuantity;
    }
  }
  
}
