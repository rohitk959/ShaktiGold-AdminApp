import { Component } from "@angular/core";
import { NavController, LoadingController } from "ionic-angular";
import { AddStuffService } from "../../providers/add-stuff-service";
import { ItemDetailsPage } from "../item-details/item-details";
import { GlobalFunctions } from "../../providers/global-functions";

@Component({
  selector: "page-hide-items",
  templateUrl: "hide-items.html"
})
export class HideItemsPage {
  private subcategories: any = [];
  selectedSubcategory: string = "";
  private items: any;
  private disableItems: any;

  constructor(
    private navCtrl: NavController,
    private gfunc: GlobalFunctions,
    private addStuffSrvc: AddStuffService,
    private loadingCtrl: LoadingController
  ) {}

  ionViewDidEnter() {
    let loader = this.loadingCtrl.create({
      content: "Loading..."
    });
    loader.present();

    this.addStuffSrvc.loadSubcategory().subscribe(
      response => {
        this.subcategories = response;
        loader.dismiss();
      },
      err => {
        loader.dismiss();
        this.gfunc.hadleApiError(err);
      }
    );
  }

  getItems() {
    this.addStuffSrvc.getAllItemsAdmin(this.selectedSubcategory).subscribe(
      response => {
        this.items = response;
      },
      err => {
        this.gfunc.hadleApiError(err);
      }
    );
  }

  hideItem(itemId, enabled) {
    let loader = this.loadingCtrl.create({
      content: "Loading..."
    });
    loader.present();

    this.addStuffSrvc.enableDisableItem(itemId, enabled).subscribe(
      successData => {
        this.disableItems = successData;
        this.items = [];
        loader.dismiss();
        this.getItems();
      },
      err => {
        loader.dismiss();
        this.gfunc.hadleApiError(err);
      }
    );
  }

  getItemDetails(itemId) {
    this.navCtrl.push(ItemDetailsPage, {
      itemId: itemId,
      notificationFlag: false
    });
  }
}
