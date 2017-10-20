import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController, AlertController } from 'ionic-angular';
import { OrdersService } from '../../providers/orders-service';
import * as globals from '../../app/globals';

@Component({
  selector: 'page-item-details',
  templateUrl: 'item-details.html'
})
export class ItemDetailsPage {

  itemId: string;
  public itemDetailsData: any = [];
  public message: any = [];
  public itemProperties: any = [];

  constructor(private navCtrl: NavController, 
      private navParams: NavParams,
      private loadingCtrl: LoadingController,
      private alertCtrl: AlertController,
      private orderSrvc: OrdersService) {}

  ionViewDidLoad() {
    this.itemId = this.navParams.get('itemId');
  }

  ionViewDidEnter() {
    this.loadItemDetails();
  }

  loadItemDetails() {
    let loader = this.loadingCtrl.create({
      content: "Loading..."
    });
    loader.present();
    this.orderSrvc.loadItemDetails(this.itemId).then( data => {
      this.itemDetailsData = data;
      this.message = this.itemDetailsData.message;
      this.itemProperties = this.itemDetailsData.message.itemProperty;
      loader.dismiss();
    }).catch( err => {
        loader.dismiss();
        let alert = this.alertCtrl.create({
            title: globals.MAINTAINANCE_TITLE,
            subTitle: globals.MAINTAINANCE_MSG,
            buttons: ['OK']
          });
        alert.present();
      });
  }

}
