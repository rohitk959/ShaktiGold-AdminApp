import { Component } from '@angular/core';
import { NavController, NavParams, AlertController, LoadingController } from 'ionic-angular';
import { OrdersService } from '../../providers/orders-service';
import { ItemOwnerDetailsPage } from '../item-owner-details/item-owner-details';
import { ItemDetailsPage } from '../item-details/item-details';

@Component({
  selector: 'page-orders',
  templateUrl: 'orders.html'
})
export class OrdersPage {

  ordersData: any;
  message: any = [];
  showOrders: boolean = true;

  constructor(private navCtrl: NavController, 
      private navParams: NavParams,
      private ordersSrvc: OrdersService,
      private alertCtrl: AlertController,
      private loadingCtrl: LoadingController) {}

  ionViewDidLoad() { }

  ionViewDidEnter() {
    this.loadOrders();
  }

  loadOrders() {
    if(this.ordersData == null) {
      let loader = this.loadingCtrl.create({
        content: 'Loading...'
      });
      loader.present();
      this.ordersSrvc.loadOrders().then( successData => {
        this.ordersData = successData;
        this.showOrders = true;
        this.message = this.ordersData.message;
        loader.dismiss();
      }, failureData => {
        this.ordersData = null;
        this.showOrders = false;
        loader.dismiss();
      });
    }
  }

  updateOrder(invoiceNumber) {
    let alert = this.alertCtrl.create({
      title: 'Update Order',
      inputs: [
        {
          type: 'radio',
          label: 'NEW',
          value: 'NEW'
        },
        {
          type: 'radio',
          label: 'PROCESSING',
          value: 'PROCESSING'
        },
        {
          type: 'radio',
          label: 'DELIVERED',
          value: 'DELIVERED'
        },
        {
          type: 'radio',
          label: 'CANCELLED',
          value: 'CANCELLED'
        }
      ],
      buttons: [
        {
          text: 'Update',
          handler: data => {
            this.ordersSrvc.updateOrder(invoiceNumber, data).then( successData => {
              this.ordersData = null;
              this.message = [];
              this.loadOrders();
            }, failureData => {
              console.log("Failed to update order");
            });
          }
        }
      ]
    });
    alert.present();
  }

  getItemDetails(itemId) {
    this.navCtrl.push(ItemDetailsPage, {
      'itemId': itemId
    });
  }

  getItemOwnerDetails(invoiceNumber) {
    this.navCtrl.push(ItemOwnerDetailsPage, {
      'invoiceNumber': invoiceNumber
    });
  }

  updateItemList() {
    this.ordersData = null;
    this.message = [];
    this.loadOrders();
  }

}
