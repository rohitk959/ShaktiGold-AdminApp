import { Component } from "@angular/core";
import { NavParams } from "ionic-angular";
import { OrdersService } from "../../providers/orders-service";
import { GlobalFunctions } from "../../providers/global-functions";

@Component({
  selector: "page-item-owner-details",
  templateUrl: "item-owner-details.html"
})
export class ItemOwnerDetailsPage {
  invoiceNumber: string;
  userDetails: any;
  message: any = [];
  userDetailsModel: any = [];

  constructor(
    private navParams: NavParams,
    private gfunc: GlobalFunctions,
    private orderSrvc: OrdersService
  ) {}

  ionViewDidLoad() {
    this.invoiceNumber = this.navParams.get("invoiceNumber");
  }

  ionViewDidEnter() {
    this.loadOwnerDetails();
  }

  loadOwnerDetails() {
    this.orderSrvc.loadUserDetailsByInvoiceNumber(this.invoiceNumber).subscribe(
      response => {
        this.userDetails = response.message;
      },
      err => {
        this.gfunc.hadleApiError(err);
      }
    );
  }
}
