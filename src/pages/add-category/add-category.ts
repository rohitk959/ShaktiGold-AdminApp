import { Component } from "@angular/core";
import {
  NavController,
  AlertController,
  LoadingController,
  ActionSheetController
} from "ionic-angular";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Camera, CameraOptions } from "@ionic-native/camera";
import { AddStuffService } from "../../providers/add-stuff-service";
import { GlobalFunctions } from "../../providers/global-functions";

@Component({
  selector: "page-add-category",
  templateUrl: "add-category.html"
})
export class AddCategoryPage {
  categoryForm = {
    category: "",
    description: ""
  };

  private base64Image: string;
  addCategoryForm: FormGroup;
  propertyName: string = "";
  propertyUnit: string = "";
  showPropInput: boolean = false;
  properties: ItemProperty[] = [];
  categoryData: any;

  constructor(
    private navCtrl: NavController,
    private formBuilder: FormBuilder,
    private addStuffSrvc: AddStuffService,
    private gfunc: GlobalFunctions,
    private alertCtrl: AlertController,
    private loadingCtrl: LoadingController,
    private actionSheetCtrl: ActionSheetController,
    private camera: Camera
  ) {
    this.addCategoryForm = this.formBuilder.group({
      category: [
        "",
        Validators.compose([
          Validators.pattern("[A-Za-z0-9- ]+"),
          Validators.required
        ])
      ],
      description: [""]
    });
  }

  showProp() {
    this.showPropInput = true;
  }

  addProp(propertyName, propertyUnit) {
    this.properties.push(new ItemProperty(propertyName, propertyUnit));
    this.showPropInput = false;
    this.propertyName = "";
    this.propertyUnit = "";
  }

  cancelProp() {
    this.showPropInput = false;
  }

  deleteItem(index) {
    this.properties.splice(index, 1);
  }

  addCategory() {
    let loader = this.loadingCtrl.create({
      content: "Loading..."
    });
    loader.present();
    this.addStuffSrvc
      .registerSubCategory(
        this.categoryForm.category,
        this.categoryForm.description,
        this.base64Image,
        this.properties
      )
      .subscribe(
        response => {
          let alert = this.alertCtrl.create({
            title: response.message,
            buttons: [
              {
                text: "OK",
                handler: data => {
                  this.navCtrl.pop();
                }
              }
            ]
          });
          loader.dismiss();
          alert.present();
        },
        err => {
          loader.dismiss();
          this.gfunc.hadleApiError(err);
        }
      );
  }

  public presentActionSheet() {
    let actionSheet = this.actionSheetCtrl.create({
      title: "Image Source",
      buttons: [
        {
          text: "Gallery",
          handler: () => {
            this.takePicture(this.camera.PictureSourceType.PHOTOLIBRARY);
          }
        },
        {
          text: "Camera",
          handler: () => {
            this.takePicture(this.camera.PictureSourceType.CAMERA);
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

  public takePicture(sourceType) {
    // Create options for the Camera Dialog
    var options: CameraOptions = {
      quality: 100,
      sourceType: sourceType,
      saveToPhotoAlbum: true,
      correctOrientation: true,
      allowEdit: true,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE
    };

    /* let loader = this.loadingCtrl.create({
      content: "Loading..."
    });
    loader.present();*/

    // Get the data of an image
    this.camera.getPicture(options).then(
      imageData => {
        // imageData is a base64 encoded string
        this.base64Image = 'data:image/jpeg;base64,' + imageData;
        // loader.dismiss();
      },
      err => {
        console.log(err);
        // loader.dismiss();
      }
    );
  }
}

export class ItemProperty {
  name: string;
  type: string;
  unit: string;
  constructor(_propName: string, _propUnit: string) {
    this.name = _propName;
    this.type = "string";
    this.unit = _propUnit;
  }
}
