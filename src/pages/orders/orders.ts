import { Component } from "@angular/core";
import {
  NavController,
  AlertController,
  LoadingController
} from "ionic-angular";
import { OrdersService } from "../../providers/orders-service";
import { ItemOwnerDetailsPage } from "../item-owner-details/item-owner-details";
import { ItemDetailsPage } from "../item-details/item-details";
import { GlobalFunctions } from "../../providers/global-functions";

@Component({
  selector: "page-orders",
  templateUrl: "orders.html"
})
export class OrdersPage {
  ordersData: any;
  showOrders: boolean = true;

  constructor(
    private navCtrl: NavController,
    private ordersSrvc: OrdersService,
    private gfunc: GlobalFunctions,
    private alertCtrl: AlertController,
    private loadingCtrl: LoadingController
  ) {}

  ionViewDidLoad() {}

  ionViewDidEnter() {
    this.loadOrders();
  }

  loadOrders() {
    if (this.ordersData == null) {
      let loader = this.loadingCtrl.create({
        content: "Loading..."
      });
      loader.present();
      this.ordersSrvc.loadOrders().subscribe(
        response => {
          this.ordersData = response;
          this.showOrders = true;
          loader.dismiss();
        },
        err => {
          loader.dismiss();
          this.gfunc.hadleApiError(err);
        }
      );
    }
  }

  updateOrder(invoiceNumber) {
    let alert = this.alertCtrl.create({
      title: "Update Order",
      inputs: [
        {
          type: "radio",
          label: "NEW",
          value: "NEW"
        },
        {
          type: "radio",
          label: "PROCESSING",
          value: "PROCESSING"
        },
        {
          type: "radio",
          label: "DELIVERED",
          value: "DELIVERED"
        },
        {
          type: "radio",
          label: "CANCELLED",
          value: "CANCELLED"
        }
      ],
      buttons: [
        {
          text: "Update",
          handler: data => {
            this.ordersSrvc.updateOrder(invoiceNumber, data).subscribe(
              response => {
                this.ordersData = null;
                this.loadOrders();
              },
              err => {
                this.gfunc.hadleApiError(err);
              }
            );
          }
        }
      ]
    });
    alert.present();
  }

  getItemDetails(itemId) {
    this.navCtrl.push(ItemDetailsPage, {
      itemId: itemId,
      notificationFlag: false
    });
  }

  getItemOwnerDetails(invoiceNumber) {
    this.navCtrl.push(ItemOwnerDetailsPage, {
      invoiceNumber: invoiceNumber
    });
  }

  updateItemList() {
    this.ordersData = null;
    this.loadOrders();
  }
}
