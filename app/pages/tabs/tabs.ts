import {Component} from '@angular/core';
import {StatistiquePage} from '../statistique-page/statistique-page';
import {AccountPage} from '../account-page/account-page';
import {ProductPage} from '../product-page/product-page';

@Component({
  templateUrl: 'build/pages/tabs/tabs.html'
})
export class TabsPage {

  private tab1Root: any;
  private tab3Root: any;
  private tab4Root: any;

  constructor() {
    // this tells the tabs component which Pages
    // should be each tab's root Page
    this.tab1Root = ProductPage;
    this.tab3Root = StatistiquePage;
    this.tab4Root = AccountPage;
  }
}
