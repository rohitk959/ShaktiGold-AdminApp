import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';
import * as globals from "./../app/globals";

@Injectable()
export class OrdersService {

  private getAllAdminOrdersData: any;
  private updateOrderData: any;
  private getUserProfileByInvoiceNumberData: any;
  private getItemDetailsData: any;

  private getAllAdminOrdersURL: string = globals.host.concat('/ShaktiGold/getAllAdminOrders.htm');
  private updateOrderURL: string = globals.host.concat('/ShaktiGold/updateOrderAdmin.htm');
  private getUserProfileByInvoiceNumberURL: string = globals.host.concat('/ShaktiGold/getUserProfileByInvoiceNumber.htm');
  private getItemDetailsURL: string = globals.host.concat( '/ShaktiGold/getItemDetails.htm' );

  constructor(private http: Http) { }

  loadOrders() {
    
    let body = JSON.stringify({
      'email':'SG-Admin'
    });

    let headers = new Headers({ 'Content-Type': 'application/json' });

    let options = new RequestOptions({ headers: headers });

    return new Promise( (resolve, reject) => {
      this.http.post(this.getAllAdminOrdersURL, body, options)
      .map(res => res.json())
      .subscribe(data => {
        this.getAllAdminOrdersData = data;

        if(this.getAllAdminOrdersData.result == "SUCCESS") {
          resolve(this.getAllAdminOrdersData);
        } else {
          this.getAllAdminOrdersData.message = null;
          reject(this.getAllAdminOrdersData);
        }
        
      }, err => {
        reject("LOAD_ORDERS_FAILED_TIMEOUT");
      });
    });
  }

  updateOrder(invoiceNumber, orderStatus) {

    let body = JSON.stringify({
      'email': 'SG-Admin',
      'invoiceNumber': invoiceNumber,
      'orderStatus': orderStatus
    });

    let headers = new Headers({ 'Content-Type': 'application/json' });

    let options = new RequestOptions({ headers: headers });

    return new Promise( (resolve, reject) => {
      this.http.post(this.updateOrderURL, body, options)
      .map(res => res.json())
      .subscribe(data => {
        this.updateOrderData = data;

        if(this.updateOrderData.result == "SUCCESS") {
          resolve(this.updateOrderData);
        } else {
          this.updateOrderData.message = null;
          reject(this.updateOrderData);
        }
        
      }, err => {
        reject("UPDATE_ORDER_FAILED_TIMEOUT");
      });
    });
  }

  loadUserDetailsByInvoiceNumber(invoiceNumber) {
    let body = JSON.stringify({
      'email': 'SG-Admin',
      'invoiceNumber': invoiceNumber
    });

    let headers = new Headers({ 'Content-Type': 'application/json' });

    let options = new RequestOptions({ headers: headers });

    return new Promise( (resolve, reject) => {
      this.http.post(this.getUserProfileByInvoiceNumberURL, body, options)
      .map(res => res.json())
      .subscribe(data => {
        this.getUserProfileByInvoiceNumberData = data;

        if(this.getUserProfileByInvoiceNumberData.result == "SUCCESS") {
          resolve(this.getUserProfileByInvoiceNumberData);
        } else {
          this.getUserProfileByInvoiceNumberData.message = [];
          reject(this.getUserProfileByInvoiceNumberData);
        }
        
      }, err => {
        reject("UPDATE_ORDER_FAILED_TIMEOUT");
      });
    });
  }

  loadItemDetails(itemId: string) {
    
    let body = JSON.stringify({
      'email': 'SG-Admin',
      'itemId': itemId
    });

    let headers = new Headers({ 'Content-Type': 'application/json' });

    let options = new RequestOptions({ headers: headers });

    return new Promise( (resolve,reject) => {
      this.http.post(this.getItemDetailsURL, body, options)
      .map(res => res.json())
      .subscribe(data => {
        this.getItemDetailsData = data;
        resolve(this.getItemDetailsData);
      }, err => {
        reject("LOAD_ITEM_DETAILS_FAILED_TIMEOUT");
      });
    });
  }

}
