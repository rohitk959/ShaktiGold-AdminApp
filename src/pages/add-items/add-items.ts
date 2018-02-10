import { Component } from "@angular/core";
import {
  NavController,
  AlertController,
  ActionSheetController,
  LoadingController,
  Loading
} from "ionic-angular";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { AddStuffService } from "../../providers/add-stuff-service";
import { Camera, CameraOptions } from "@ionic-native/camera";
import { GlobalFunctions } from "../../providers/global-functions";

@Component({
  selector: "page-add-items",
  templateUrl: "add-items.html"
})
export class AddItemsPage {
  lastImage: string = null;
  loading: Loading;

  private selectedSubcategory: string = "";
  private base64Image: string;
  private subcategories: any = [];
  private itemTemplate: any = [];
  private showTemplate = false;
  private elements = [];
  itemForm = {
    itemName: "",
    imgUrl: ""
  };
  itemPropForm: FormGroup = new FormGroup({});

  constructor(
    private navCtrl: NavController,
    private addStuffSrvc: AddStuffService,
    private gfunc: GlobalFunctions,
    private alertCtrl: AlertController,
    private formBuilder: FormBuilder,
    private actionSheetCtrl: ActionSheetController,
    private loadingCtrl: LoadingController,
    private camera: Camera
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

    // Get the data of an image
    this.camera.getPicture(options).then(
      imageData => {
        // imageData is a base64 encoded string
        this.base64Image = 'data:image/jpeg;base64,' + imageData;
      },
      err => {
        console.log(err);
      }
    );
  }

  getItemTemplate() {
    this.addStuffSrvc.getItemTemplate(this.selectedSubcategory).subscribe(
      response => {
        this.itemTemplate = response.message;
        this.showTemplate = true;
        this.attachForm();
      },
      err => {
        this.gfunc.hadleApiError(err);
      }
    );
  }

  attachForm() {
    var formData = {};
    this.itemTemplate.forEach(element => {
      var key = element.name;
      formData[key] = [""];
      formData[key].push(Validators.required);
      this.itemPropForm = this.formBuilder.group(formData);
    });
  }

  AddItem() {
    for (let key in this.itemPropForm.controls) {
      this.elements.push(
        new ItemProperty(key, this.itemPropForm.controls[key].value)
      );
    }

    let loader = this.loadingCtrl.create({
      content: "Loading..."
    });
    loader.present();

    this.addStuffSrvc
      .registerItem(this.selectedSubcategory, this.base64Image, this.elements)
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
          this.gfunc.hadleApiError(err);
        }
      );
  }
}

export class ItemProperty {
  name: string;
  value: string;

  constructor(_name: string, _value: string) {
    this.name = _name;
    this.value = _value;
  }
}
