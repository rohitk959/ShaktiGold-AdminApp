import { Injectable } from "@angular/core";
import { Http } from "@angular/http";
import { Observable } from "rxjs/Observable";

@Injectable()
export class OrdersService {
  constructor(private http: Http) {}

  loadOrders() {
    return this.http
      .get(`/admin/orders`)
      .do(res => console.log(res.json()))
      .map(res => res.json());
  }

  updateOrder(invoiceNumber, orderStatus) {
    return this.http
      .patch(`/admin/order/${invoiceNumber}/${orderStatus}`, null)
      .do(res => console.log(res.json()))
      .map(res => res.json());
  }

  loadUserDetailsByInvoiceNumber(invoiceNumber) {
    return this.http
      .get(`/admin/userProfileByInvoiceNumber/${invoiceNumber}`)
      .do(res => console.log(res.json()))
      .map(res => res.json());
  }

  loadItemDetails(itemId: string) {
    return this.http
      .get(`/user/itemDetails/${itemId}`)
      .do(res => console.log(res.json()))
      .map(res => res.json());
  }
}
