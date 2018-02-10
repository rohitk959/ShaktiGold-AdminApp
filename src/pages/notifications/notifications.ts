import { Component } from "@angular/core";
import { NavController } from "ionic-angular";
import { ItemDetailsPage } from "../item-details/item-details";
import { NotificationsService } from "../../providers/notifications-service";
import { GlobalFunctions } from "../../providers/global-functions";

@Component({
  selector: "shaktigold-notifications",
  templateUrl: "notifications.html"
})
export class Notifications {
  public notificationsData;
  notificationCount;

  constructor(
    private navCtrl: NavController,
    private notificationSrvc: NotificationsService,
    private gfunc: GlobalFunctions
  ) {}

  ionViewWillEnter() {
    this.loadNotifications();
  }

  loadNotifications() {
    this.gfunc.showLoader();
    this.notificationSrvc.getNotificationCount().subscribe( (response) => {
        this.notificationCount = response.message.notificationCount;
    } );
    this.notificationSrvc.getNotifications().subscribe(
      response => {
        this.notificationsData = response;
        this.gfunc.dismissLoader();
      },
      err => {
        this.gfunc.hadleApiError(err);
      }
    );
  }

  getItemDetails(item: any, notificationId: number, approxAmount) {
    this.navCtrl.push(ItemDetailsPage, {
      notificationFlag: true,
      item: item,
      notificationId: notificationId,
      approxAmount: approxAmount
    });
  }
}
