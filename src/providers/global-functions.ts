import { Injectable } from "@angular/core";
import { AlertController, Events, LoadingController } from 'ionic-angular';
 
@Injectable()
export class GlobalFunctions {

  loader;
  alert;

  constructor(private alertCtrl: AlertController, private event: Events, private loadingCtrl: LoadingController) {}

    public hadleApiError(err) {
      this.dismissLoader();
      console.log(`Backend returned code ${err.status}, body was: ${err._body}`);
      switch(err.status) {
        case 401:
          this.alert = this.alertCtrl.create({
            title: 'Authentication Failure',
            message: 'Invalid user name or password.',
            buttons: [{
              text: 'OK',
              handler: () => {
                console.log("Logging out user");
                this.event.publish('logout:user',false);
              }
            }]
          });
          this.alert.present();
          break;
        case 400:
        case 500:
          this.displayOkAlert(JSON.parse(err._body).message);
          break;
      };
    }

    showLoader() {
      this.loader = this.loadingCtrl.create({
        content: "Loading..."
      });
      this.loader.present();
    }

    dismissLoader() {
      this.loader.dismiss();
    }

    displayOkAlert(title: string, message?: string) {
      this.alert = this.alertCtrl.create({
        title: title,
        message: message,
        buttons: ["OK"]
      });
      this.alert.present();
    }
}
