import {Component} from '@angular/core';
import {Platform} from 'ionic-angular';
import {NavController} from 'ionic-angular';
import { MyApp } from '../../app'
@Component({
  templateUrl: 'build/pages/account-page/account-page.html'
})
export class AccountPage {
  constructor(private _navController: NavController) {
  }
  loginOut(){
  
   
    this._navController.pop()
    .then(() => window.localStorage.removeItem('token'))
    .catch();
    
    
  }
}
 
