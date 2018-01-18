import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class VatService {

    private vatUrl = 'http://192.168.1.45:3000/vat/';
    private headers = new Headers({Authorization: 'Bearer ' + window.localStorage['token'],
                                   'Content-Type': 'application/json'});
                                   
    
    constructor(private http: Http) { }
    
    getVats(): Promise<any> {
        return this.http.get(this.vatUrl, {headers: this.headers})
                .toPromise()
                .then(response => response.json())
                .catch(this.handleError);
    }
    
    private handleError(error: any) {
        console.error('An error occurred', error);
        return Promise.reject(error.message || error);
    }    
    
}