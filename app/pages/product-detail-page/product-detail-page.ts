import {Component} from '@angular/core';
import {NavController,NavParams, Alert} from 'ionic-angular';
import { ProductService } from '../../services/product.service';
import { VatService } from '../../services/vat.service';
import { Product } from '../../services/product';

@Component({
  templateUrl: 'build/pages/product-detail-page/product-detail-page.html',
  providers: [ProductService, VatService]
})
export class ProductDetailPage {
  
  private product:Product;
  private vats;
  
  constructor(private _navController: NavController, 
              private _navParams: NavParams, 
              private productService: ProductService,
               private vatService: VatService) {
    this.product = this._navParams.data.selectedProduct;
    vatService.getVats().then(vats => {this.vats = vats; console.log(this.vats)});
  }
  
  save() {
      this.productService.save(this.product).then(product => { this.presentConfirm()});
  }
  
  presentConfirm() {
    let alert = Alert.create({
      title: 'SUCCESS',
      buttons: [
        {
          text: 'Ok',
          handler: () => {
            this._navController.pop();         
          }
        }
      ]
    });
    this._navController.present(alert);
  }
  
}
