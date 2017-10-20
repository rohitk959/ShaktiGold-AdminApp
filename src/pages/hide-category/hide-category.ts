import { Component } from '@angular/core';
import { NavController, NavParams, AlertController, LoadingController, Platform } from 'ionic-angular';
import { AddStuffService } from '../../providers/add-stuff-service';

@Component({
  selector: 'page-hide-category',
  templateUrl: 'hide-category.html'
})

export class HideCategoryPage {

  private subcategories: any = [];
  private disableSubcategory: any;

  constructor(private navCtrl: NavController, 
      private navParams: NavParams,
      private addStuffSrvc: AddStuffService,
      private alertCtrl: AlertController,
      private loadingCtrl: LoadingController,
      private platform: Platform) {}

  ionViewDidEnter() {
    let loader = this.loadingCtrl.create({
      content: "Loading..."
    });
    loader.present();

    this.addStuffSrvc.loadSubcategoryAdmin().then( successData => {
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

  showSubcategory(subcategory) {
    let loader = this.loadingCtrl.create({
      content: "Loading..."
    });
    loader.present();

    this.addStuffSrvc.enableDisableSubcategory(subcategory, false).then( successData => {
      this.disableSubcategory = successData;
      this.subcategories = [];
      this.ionViewDidEnter();
      loader.dismiss();
    }, failureData => {
      let alert = this.alertCtrl.create({
        title:'Failed to show subcategory.',
        buttons: ['OK']
      });
      loader.dismiss();
      alert.present();
    });
  }

  hideSubcategory(subcategory) {
    let loader = this.loadingCtrl.create({
      content: "Loading..."
    });
    loader.present();

    this.addStuffSrvc.enableDisableSubcategory(subcategory, true).then( successData => {
      this.disableSubcategory = successData;
      this.subcategories = [];
      this.ionViewDidEnter();
      loader.dismiss();
    }, failureData => {
      let alert = this.alertCtrl.create({
        title:'Failed to hide subcategory.',
        buttons: ['OK']
      });
      loader.dismiss();
      alert.present();
    });
  }

}
