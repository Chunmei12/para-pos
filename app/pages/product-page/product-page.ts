import {Component} from '@angular/core';
import {NavController, Loading, Alert} from 'ionic-angular';
import {BarcodeScanner} from 'ionic-native';
import { ProductService } from '../../services/product.service';
import { Product } from '../../services/product';
import { ProductDetailPage } from '../product-detail-page/product-detail-page';

@Component({
  templateUrl: 'build/pages/product-page/product-page.html',
  providers: [ProductService]
})
export class ProductPage {
  
  products:Array<Product> = [];
  loading:any;
  
  constructor(private _navController: NavController, private productService: ProductService) {
    productService.getProducts().then(products => this.products = products);
  }
  
  scan() {
    this.presentLoadingModal();
    BarcodeScanner.scan().then((barcodeData) => {
        this.productService.getProduct(barcodeData.text).then(product => {
          this.dismissLoadingModal();
          if (product)
            this._navController.push(ProductDetailPage, {selectedProduct: product});
          else {
            this.presentConfirm(barcodeData.text)
          }
        });
    }, (err) => {
        alert(err)
    });
  }
  
  presentLoadingModal() {
    this.loading = Loading.create({
      content: 'Please wait...',
      spinner: 'dots'
    });

    this._navController.present(this.loading);
  }
  
  dismissLoadingModal() {
    this.loading.dismiss();
  }
  
  presentConfirm(barcode:string) {
    let alert = Alert.create({
      title: 'Product not found',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
            
          }
        },
        {
          text: 'Create',
          handler: () => {
            let p = new Product();
            p.barcode = barcode;
            this.selectProduct(p);
          }
        }
      ]
    });
    this._navController.present(alert);
  }


  
  selectProduct(product:Product) {
    this._navController.push(ProductDetailPage, {selectedProduct: product});
  }
  
}
