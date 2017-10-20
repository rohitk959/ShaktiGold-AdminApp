import { Component } from '@angular/core';
import { NavController, NavParams, AlertController, LoadingController, Platform } from 'ionic-angular';
import { AddStuffService } from '../../providers/add-stuff-service';

@Component({
  selector: 'page-delete-category',
  templateUrl: 'delete-category.html'
})
export class DeleteCategoryPage {

  private subcategories: any;

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

  deleteSubcategory(subcategory: string) {
    let alert = this.alertCtrl.create({
      title:'Are you sure you want to delete category ' + subcategory + "?",
      message: 'Note: all items under ' + subcategory + ' will be deleted.',
      buttons: [{
        text: 'OK',
        handler: data => {
          let loader = this.loadingCtrl.create({
          content: "Loading..."
          });
          loader.present();

          this.addStuffSrvc.deleteSubcategory(subcategory).then( (successData) => {
            this.subcategories = [];
            loader.dismiss();
            this.ionViewDidEnter();
          }, (failureData) => {
            let alert = this.alertCtrl.create({
            title:'Failed to delete subcategory.',
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
      },
      {
        text: 'Cancel',
        role: 'cancel'
      }]
  });
  alert.present();
  }
}
