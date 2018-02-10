import { Component } from "@angular/core";
import { LoadingController } from "ionic-angular";
import { AddStuffService } from "../../providers/add-stuff-service";
import { GlobalFunctions } from "../../providers/global-functions";

@Component({
  selector: "page-hide-category",
  templateUrl: "hide-category.html"
})
export class HideCategoryPage {
  private subcategories: any = [];
  private disableSubcategory: any;

  constructor(
    private addStuffSrvc: AddStuffService,
    private gfunc: GlobalFunctions,
    private loadingCtrl: LoadingController
  ) {}

  ionViewDidEnter() {
    let loader = this.loadingCtrl.create({
      content: "Loading..."
    });
    loader.present();

    this.addStuffSrvc.loadSubcategoryAdmin().subscribe(
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

  showSubcategory(subcategory) {
    let loader = this.loadingCtrl.create({
      content: "Loading..."
    });
    loader.present();

    this.addStuffSrvc.enableDisableSubcategory(subcategory, false).subscribe(
      response => {
        this.disableSubcategory = response;
        this.subcategories = [];
        this.ionViewDidEnter();
        loader.dismiss();
      },
      err => {
        loader.dismiss();
        this.gfunc.hadleApiError(err);
      }
    );
  }

  hideSubcategory(subcategory) {
    let loader = this.loadingCtrl.create({
      content: "Loading..."
    });
    loader.present();

    this.addStuffSrvc.enableDisableSubcategory(subcategory, true).subscribe(
      response => {
        this.disableSubcategory = response;
        this.subcategories = [];
        this.ionViewDidEnter();
        loader.dismiss();
      },
      err => {
        loader.dismiss();
        this.gfunc.hadleApiError(err);
      }
    );
  }
}
