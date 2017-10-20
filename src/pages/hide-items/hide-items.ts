import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController, AlertController } from 'ionic-angular';
import { AddStuffService } from '../../providers/add-stuff-service';
import { ItemDetailsPage } from '../item-details/item-details'

@Component({
  selector: 'page-hide-items',
  templateUrl: 'hide-items.html'
})
export class HideItemsPage {

  private subcategories: any = [];
  selectedSubcategory: string = "";
  private items: any;
  private disableItems: any;

  constructor(private navCtrl: NavController, 
      private navParams: NavParams,
      private addStuffSrvc: AddStuffService,
      private loadingCtrl: LoadingController,
      private alertCtrl: AlertController) {}

  ionViewDidEnter() {
    let loader = this.loadingCtrl.create({
      content: "Loading..."
    });
    loader.present();

    this.addStuffSrvc.loadSubcategory().then( successData => {
      this.subcategories = successData;
      this.subcategories = this.subcategories.message;
      loader.dismiss();
    }, failureData => {
      let alert = this.alertCtrl.create({
        title:'Failed to get subcategories.',
        buttons: [{
          text: 'OK',
          handler: data => {
            this.navCtrl.pop();
          }
        }]
      });
      loader.dismiss();
      alert.present();
    });
  }

  getItems() {
    this.addStuffSrvc.getAllItemsAdmin(this.selectedSubcategory).then( (successData) => {
      this.items = successData;
      this.items = this.items.message;
    }, (failureData) => {
      this.items = [];
      let alert = this.alertCtrl.create({
        title:'There are no Items for selected Categories.',
        buttons: ['OK']
      });
      alert.present();
    } );
  }

  hideItem(itemId, hidden) {
    let loader = this.loadingCtrl.create({
      content: "Loading..."
    });
    loader.present();

    this.addStuffSrvc.enableDisableItem(itemId, hidden).then( successData => {
      this.disableItems = successData;
      this.items = [];
      loader.dismiss();
      this.getItems();
    }, failureData => {
      this.disableItems = failureData;
      let alert = this.alertCtrl.create({
        title:this.disableItems.message,
        buttons: ['OK']
      });
      loader.dismiss();
      alert.present();
    });
  }

  getItemDetails(itemId) {
    this.navCtrl.push(ItemDetailsPage, {
      'itemId': itemId
    });
  }
}
