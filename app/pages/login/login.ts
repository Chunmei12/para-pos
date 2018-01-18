import {Component} from '@angular/core';
import {Headers, Http} from '@angular/http';
import {NavController} from 'ionic-angular';

import {TabsPage} from '../tabs/tabs';

import 'rxjs/add/operator/toPromise';

@Component({
  templateUrl: 'build/pages/login/login.html'
})
export class LoginPage {
  
  user = { username: "admin", password: "admin"}; 
  private loginUrl = 'http://192.168.1.45:3000/employee/login/';
  
  constructor(private http: Http, private _navController: NavController) { }
   
  signIn() {
   
    let headers = new Headers({'Content-Type': 'application/json'});
    return this.http
               .post(this.loginUrl, JSON.stringify(this.user), {headers: headers})
               .toPromise()
               .then(res => {
                 if (typeof res.json().token != 'undefined') {
                    window.localStorage.setItem('token',res.json().token);
                    this._navController.push(TabsPage)
                 }
                 else
                    this.handleError;
                })
               .catch(this.handleError); 
  }

  private handleError(error: any) {
    console.error('An error occurred', error);
    return Promise.reject(error.message || error);
  }
   
}
