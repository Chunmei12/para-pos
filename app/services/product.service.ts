import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';
import { Product } from './product';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class ProductService {
    
    private productUrl = 'http://192.168.1.45:3000/product/';
    private headers = new Headers({Authorization: 'Bearer ' + window.localStorage['token'],
                                   'Content-Type': 'application/json'});
    constructor(private http: Http) { }
    
    getProducts(): Promise<Product[]> {
        return this.http.get(this.productUrl, {headers: this.headers})
                .toPromise()
                .then(response => response.json())
                .catch(this.handleError);
    }
    
    getProduct(barcode: string) {
        return this.getProducts()
                .then(products => products.filter(product => product.barcode === barcode)[0]);
    }
    
    save(product: Product): Promise<Product>  {
        if (product._id) {
            return this.patch(product);
        }
        return this.post(product);
    }
   
    private post(product: Product): Promise<Product> {

        return this.http
                    .post(this.productUrl, JSON.stringify(product), {headers: this.headers})
                    .toPromise()
                    .then(res => res.json().data)
                    .catch(this.handleError);
    }
    
    private patch(product: Product) {

        let url = `${this.productUrl}/${product._id}`;

        return this.http
                    .patch(url, JSON.stringify(product), {headers: this.headers})
                    .toPromise()
                    .then(() => product)
                    .catch(this.handleError);
    }
    
    private delete(product: Product) {
        let headers = new Headers();
        headers.append('Content-Type', 'application/json');

        let url = `${this.productUrl}/${product._id}`;

        return this.http
                    .delete(url, headers)
                    .toPromise()
                    .catch(this.handleError);
    }
    
    private handleError(error: any) {
        console.error('An error occurred', error);
        return Promise.reject(error.message || error);
    }    
    
}