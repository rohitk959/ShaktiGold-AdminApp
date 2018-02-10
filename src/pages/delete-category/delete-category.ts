import { Component } from "@angular/core";
import { AlertController, LoadingController } from "ionic-angular";
import { AddStuffService } from "../../providers/add-stuff-service";
import { GlobalFunctions } from "../../providers/global-functions";

@Component({
  selector: "page-delete-category",
  templateUrl: "delete-category.html"
})
export class DeleteCategoryPage {
  private subcategories: any;

  constructor(
    private addStuffSrvc: AddStuffService,
    private alertCtrl: AlertController,
    private gfunc: GlobalFunctions,
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
        this.gfunc.hadleApiError(err);
      }
    );
  }

  deleteSubcategory(subcategory: string) {
    let alert = this.alertCtrl.create({
      title: `Are you sure you want to delete ${subcategory}?`,
      message: `Note: all items under ${subcategory} will be deleted.`,
      buttons: [
        {
          text: "OK",
          handler: data => {
            let loader = this.loadingCtrl.create({
              content: "Loading..."
            });
            loader.present();

            this.addStuffSrvc.deleteSubcategory(subcategory).subscribe(
              response => {
                this.subcategories = [];
                loader.dismiss();
                this.ionViewDidEnter();
              },
              err => {
                this.gfunc.hadleApiError(err);
              }
            );
          }
        },
        {
          text: "Cancel",
          role: "cancel"
        }
      ]
    });
    alert.present();
  }
}
