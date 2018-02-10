import { Component } from "@angular/core";
import {
  NavController,
  AlertController,
  LoadingController
} from "ionic-angular";
import { AddStuffService } from "../../providers/add-stuff-service";
import { ItemDetailsPage } from "../item-details/item-details";
import { GlobalFunctions } from "../../providers/global-functions";

@Component({
  selector: "page-delete-items",
  templateUrl: "delete-items.html"
})
export class DeleteItemsPage {
  selectedSubcategory: string = "";
  private subcategories: any;
  private items: any;

  constructor(
    private navCtrl: NavController,
    private addStuffSrvc: AddStuffService,
    private gfunc: GlobalFunctions,
    private loadingCtrl: LoadingController,
    private alertCtrl: AlertController
  ) {}

  ionViewDidEnter() {
    let loader = this.loadingCtrl.create({
      content: "Loading..."
    });
    loader.present();

    this.addStuffSrvc.loadSubcategory().subscribe(
      successData => {
        this.subcategories = successData;
        this.subcategories = this.subcategories.message;
        loader.dismiss();
      },
      err => {
        this.gfunc.hadleApiError(err);
      }
    );
  }

  getItems() {
    this.addStuffSrvc.getAllItems(this.selectedSubcategory).subscribe(
      response => {
        this.items = response.message.items;
      },
      err => {
        this.gfunc.hadleApiError(err);
      }
    );
  }

  deleteItem(itemId) {
    let loader = this.loadingCtrl.create({
      content: "Loading..."
    });
    loader.present();

    this.addStuffSrvc.deleteItem(itemId).subscribe(
      response => {
        loader.dismiss();
        let alert = this.alertCtrl.create({
          title: response.message,
          buttons: ["OK"]
        });
        alert.present();
        this.getItems();
      },
      err => {
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
