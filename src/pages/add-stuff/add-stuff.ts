import { Component } from "@angular/core";
import { NavController, ActionSheetController } from "ionic-angular";
import { AddCategoryPage } from "../add-category/add-category";
import { AddItemsPage } from "../add-items/add-items";
import { HideCategoryPage } from "../hide-category/hide-category";
import { HideItemsPage } from "../hide-items/hide-items";
import { DeleteCategoryPage } from "../delete-category/delete-category";
import { DeleteItemsPage } from "../delete-items/delete-items";

@Component({
  selector: "page-add-stuff",
  templateUrl: "add-stuff.html"
})
export class AddStuffPage {
  constructor(
    private navCtrl: NavController,
    private actionSheetCtrl: ActionSheetController
  ) {}

  ionViewDidLoad() {}

  displayActionsCategory() {
    let actionSheet = this.actionSheetCtrl.create({
      title: "Category Actions",
      buttons: [
        {
          text: "Add Category",
          handler: () => {
            this.navCtrl.push(AddCategoryPage);
          }
        },
        {
          text: "Modify Category",
          handler: () => {}
        },
        {
          text: "Hide Category",
          handler: () => {
            this.navCtrl.push(HideCategoryPage);
          }
        },
        {
          text: "Delete Category",
          role: "destructive",
          handler: () => {
            this.navCtrl.push(DeleteCategoryPage);
          }
        },
        {
          text: "Cancel",
          role: "cancel"
        }
      ]
    });
    actionSheet.present();
  }

  displayActionsItem() {
    let actionSheet = this.actionSheetCtrl.create({
      title: "Item Actions",
      buttons: [
        {
          text: "Add Item",
          handler: () => {
            this.navCtrl.push(AddItemsPage);
          }
        },
        {
          text: "Modify Item",
          handler: () => {}
        },
        {
          text: "Hide Item",
          handler: () => {
            this.navCtrl.push(HideItemsPage);
          }
        },
        {
          text: "Delete Item",
          role: "destructive",
          handler: () => {
            this.navCtrl.push(DeleteItemsPage);
          }
        },
        {
          text: "Cancel",
          role: "cancel"
        }
      ]
    });
    actionSheet.present();
  }
}
