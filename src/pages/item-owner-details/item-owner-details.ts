import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { OrdersService } from '../../providers/orders-service';

@Component({
  selector: 'page-item-owner-details',
  templateUrl: 'item-owner-details.html'
})
export class ItemOwnerDetailsPage {

  invoiceNumber: string;
  userDetails: any;
  message: any = [];
  userDetailsModel: any = [];

  constructor(private navCtrl: NavController, 
      private navParams: NavParams,
      private orderSrvc: OrdersService) {}

  ionViewDidLoad() {
    this.invoiceNumber = this.navParams.get('invoiceNumber');
  }

  ionViewDidEnter() {
    this.loadOwnerDetails();
  }

  loadOwnerDetails() {
    this.orderSrvc.loadUserDetailsByInvoiceNumber(this.invoiceNumber).then( successData => {
      this.userDetails = successData;
      this.message = this.userDetails.message;
      this.userDetailsModel = this.message.userDetailsModel;
    }, failureData => {

    });
  }

}
