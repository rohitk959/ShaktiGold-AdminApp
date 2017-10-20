import { Component } from '@angular/core';

import { ContactPage } from '../contact/contact';
import { OrdersPage } from '../orders/orders';
import { AddStuffPage } from '../add-stuff/add-stuff';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {
  // this tells the tabs component which Pages
  // should be each tab's root Page
  tab1Root: any = OrdersPage;
  tab2Root: any = AddStuffPage;
  tab3Root: any = ContactPage;

  constructor() {

  }
}
