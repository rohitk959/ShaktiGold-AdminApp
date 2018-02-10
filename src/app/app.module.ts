import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import {HttpModule, XHRBackend, RequestOptions, Http} from '@angular/http';
import { Storage, IonicStorageModule } from '@ionic/storage';
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
import { Notifications } from '../pages/notifications/notifications';

import { HttpInterceptor } from '../providers/auth-interceptor';
import { OrdersService } from '../providers/orders-service';
import { AddStuffService } from '../providers/add-stuff-service';
import { NotificationsService } from '../providers/notifications-service';
import { GlobalFunctions } from '../providers/global-functions';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

export function httpInterceptorFactory(xhrBackend: XHRBackend, requestOptions: RequestOptions, storage: Storage) {
  return new HttpInterceptor(xhrBackend, requestOptions, storage);
}

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
    DeleteItemsPage,
    Notifications
  ],
  imports: [
    BrowserModule,
    HttpModule,
    IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot({
      name: '__shaktiGold',
         driverOrder: ['sqlite', 'websql', 'indexeddb']
    })
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
    DeleteItemsPage,
    Notifications
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    OrdersService,
    AddStuffService,
    NotificationsService,
    GlobalFunctions,
    Camera,
    {
      provide: Http,
      useFactory: httpInterceptorFactory,
      deps: [XHRBackend, RequestOptions, Storage]
    }
  ]
})
export class AppModule {}
