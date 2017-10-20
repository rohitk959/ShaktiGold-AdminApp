import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { Camera } from '@ionic-native/camera';
import { MyApp } from './app.component';
import { ContactPage } from '../pages/contact/contact';
import { TabsPage } from '../pages/tabs/tabs';
import { OrdersPage } from '../pages/orders/orders';
import { ItemOwnerDetailsPage } from '../pages/item-owner-details/item-owner-details';
import { ItemDetailsPage } from '../pages/item-details/item-details';
import { AddStuffPage } from '../pages/add-stuff/add-stuff';
import { AddCategoryPage } from '../pages/add-category/add-category';
import { AddItemsPage } from '../pages/add-items/add-items';
import { HideCategoryPage } from '../pages/hide-category/hide-category';
import { HideItemsPage } from '../pages/hide-items/hide-items';
import { DeleteCategoryPage } from '../pages/delete-category/delete-category';
import { DeleteItemsPage } from '../pages/delete-items/delete-items';

import { OrdersService } from '../providers/orders-service';
import { AddStuffService } from '../providers/add-stuff-service';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

@NgModule({
  declarations: [
    MyApp,
    ContactPage,
    TabsPage,
    OrdersPage,
    ItemOwnerDetailsPage,
    ItemDetailsPage,
    AddStuffPage,
    AddCategoryPage,
    AddItemsPage,
    HideCategoryPage,
    HideItemsPage,
    DeleteCategoryPage,
    DeleteItemsPage
  ],
  imports: [
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    ContactPage,
    TabsPage,
    OrdersPage,
    ItemOwnerDetailsPage,
    ItemDetailsPage,
    AddStuffPage,
    AddCategoryPage,
    AddItemsPage,
    HideCategoryPage,
    HideItemsPage,
    DeleteCategoryPage,
    DeleteItemsPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    OrdersService,
    AddStuffService,
    Camera
  ]
})
export class AppModule {}
