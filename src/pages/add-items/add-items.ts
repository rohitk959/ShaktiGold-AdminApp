import { Component } from '@angular/core';
import { NavController, NavParams, AlertController, ActionSheetController, LoadingController, Loading, Platform } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AddStuffService } from '../../providers/add-stuff-service';
import { Camera, CameraOptions } from '@ionic-native/camera';

declare var cordova: any;

@Component({
  selector: 'page-add-items',
  templateUrl: 'add-items.html'
})
export class AddItemsPage {

  lastImage: string = null;
  loading: Loading;

  private selectedSubcategory: string = "";
  private base64Image: string;
  private fileType: string = "";
  private subcategories: any = [];
  private itemTemplate: any= [];
  private showTemplate = false;
  private elements = [];
  itemForm = {
    itemName: '',
    imgUrl: ''};
  itemPropForm: FormGroup = new FormGroup({});

  constructor(private navCtrl: NavController,
      private navParams: NavParams,
      private addStuffSrvc: AddStuffService,
      private alertCtrl: AlertController,
      private formBuilder: FormBuilder,
      private actionSheetCtrl: ActionSheetController,
      private loadingCtrl: LoadingController,
      private platform: Platform,
      private camera: Camera) {
      }

  ionViewDidLoad() { }

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

  public presentActionSheet() {
    let actionSheet = this.actionSheetCtrl.create({
      title: 'Image Source',
      buttons: [
        {
          text: 'Gallery',
          handler: () => {
            this.takePicture(this.camera.PictureSourceType.PHOTOLIBRARY, this.fileType);
          }
        },
        {
          text: 'Camera',
          handler: () => {
            this.takePicture(this.camera.PictureSourceType.CAMERA, this.fileType);
          }
        },
        {
          text: 'Cancel',
          role: 'cancel'
        }
      ]
    });
    actionSheet.present();
  }

  public takePicture(sourceType, fileType) {

    let loader = this.loadingCtrl.create({
      content: "Loading..."
    });
    loader.present();
    // Create options for the Camera Dialog
    var options: CameraOptions = {
      quality: 100,
      sourceType: sourceType,
      saveToPhotoAlbum: false,
      correctOrientation: true,
      destinationType: this.camera.DestinationType.DATA_URL,
      mediaType: this.camera.MediaType.PICTURE
    };
  
    // Get the data of an image
    this.camera.getPicture(options).then((imageData) => {
        // imageData is a base64 encoded string
          this.base64Image = "data:image/" + fileType + ";base64," + imageData;
          loader.dismiss();
      }, (err) => {
          console.log(err);
          loader.dismiss();
      });
  }

  getItemTemplate() {
    this.addStuffSrvc.getItemTemplate(this.selectedSubcategory).then( successData => {
      this.itemTemplate = successData;
      this.itemTemplate = this.itemTemplate.message;
      this.showTemplate = true;
      this.attachForm();
    }, failureData => {
      let alert = this.alertCtrl.create({
        title:'Failed to get item Template.',
        buttons: [{
          text: 'OK',
          handler: data => {
            this.navCtrl.pop();
          }
        }]
      });
      alert.present();
    })
  }

  attachForm() {
    var formData = {};
    this.itemTemplate.forEach(element => {
      var key = element.name;
      formData[key] = [''];
      formData[key].push(Validators.required);
      this.itemPropForm = this.formBuilder.group(formData);
    });
  }

  AddItem() {
    for(let key in this.itemPropForm.controls){
      this.elements.push(new ItemProperty(key, this.itemPropForm.controls[key].value));
    }

    let loader = this.loadingCtrl.create({
      content: "Loading..."
    });
    loader.present();

    this.addStuffSrvc.registerItem(this.selectedSubcategory,
        this.base64Image,
        this.elements).then( successData => {
          let alert = this.alertCtrl.create({
            title: 'Item has been added successfully',
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
}

export class ItemProperty {
  name: string;
  value: string;

  constructor(_name: string, _value: string) {
    this.name = _name;
    this.value = _value;
  }
}
