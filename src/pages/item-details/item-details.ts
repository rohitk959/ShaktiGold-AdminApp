import { Component } from '@angular/core';
import { NavParams } from 'ionic-angular';
import { OrdersService } from '../../providers/orders-service';
import { NotificationsService } from '../../providers/notifications-service';
import { GlobalFunctions } from '../../providers/global-functions';

@Component({
  selector: 'page-item-details',
  templateUrl: 'item-details.html'
})
export class ItemDetailsPage {
  itemId: string;
  approxAmount: number;
  notificationId: number;
  notificationFlag: boolean;
  public itemDetailsData: any = [];
  public itemProperties: any = [];

  constructor(
    private navParams: NavParams,
    private gfunc: GlobalFunctions,
    private orderSrvc: OrdersService,
    private notificationSrvc: NotificationsService
  ) {}

  ionViewDidLoad() {
    this.itemId = this.navParams.get("itemId");
    this.notificationFlag = this.navParams.get("notificationFlag");
    if(this.notificationFlag) {
      this.notificationId = this.navParams.get("notificationId");
      this.itemDetailsData = this.navParams.get("item");
      this.itemProperties = this.itemDetailsData.itemProperty;
      this.approxAmount = this.navParams.get("approxAmount");
    } else {
      this.loadItemDetails();
    }
  }

  loadItemDetails() {
    this.gfunc.showLoader();
    this.orderSrvc.loadItemDetails(this.itemId).subscribe(
      response => {
        this.itemDetailsData = response.message;
        this.itemProperties = this.itemDetailsData.itemProperty;
        this.gfunc.dismissLoader();
      },
      err => {
        this.gfunc.hadleApiError(err);
      }
    );
  }

  submitApproxAmount() {
    this.gfunc.showLoader();
    this.notificationSrvc.submitApproxAmount(this.notificationId, this.approxAmount).subscribe( (response) => {
      this.gfunc.dismissLoader();
      this.gfunc.displayOkAlert(response.message);
    }, err => {
      this.gfunc.hadleApiError(err);
    } );
  }
}
