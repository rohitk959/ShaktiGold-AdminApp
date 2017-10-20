import { Component } from '@angular/core';
import { NavController, NavParams, AlertController, LoadingController } from 'ionic-angular';
import { AddStuffService } from '../../providers/add-stuff-service';
import { ItemDetailsPage } from '../item-details/item-details';

@Component({
  selector: 'page-delete-items',
  templateUrl: 'delete-items.html'
})
export class DeleteItemsPage {

  selectedSubcategory: string = "";
  private subcategories: any;
  private items: any;

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
    this.addStuffSrvc.getAllItems(this.selectedSubcategory).then( (successData) => {
      this.items = successData;
      this.items = this.items.message.items;
    }, (failureData) => {
      this.items = [];
      let alert = this.alertCtrl.create({
        title:'There are no Items for selected Category.',
        buttons: ['OK']
      });
      alert.present();
    } );
  }

  deleteItem(itemId) {
    let loader = this.loadingCtrl.create({
      content: "Loading..."
    });
    loader.present();

    this.addStuffSrvc.deleteItem(itemId).then( (successData)=> {
      let alert = this.alertCtrl.create({
        title:'Item deleted successfully.',
        buttons: ['OK']
      });
      loader.dismiss();
      alert.present();
      this.getItems();
    }, (failureData) => {
      let alert = this.alertCtrl.create({
        title:'Failed to delete Item.',
        buttons: ['OK']
      });
      loader.dismiss();
      alert.present();
    } );
  }

  getItemDetails(itemId) {
    this.navCtrl.push(ItemDetailsPage, {
      'itemId': itemId
    });
  }

}
