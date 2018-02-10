import { Injectable } from "@angular/core";
import { Http } from "@angular/http";
import { Observable } from "rxjs/Observable";
import * as globals from "./../app/globals";

@Injectable()
export class AddStuffService {
  constructor(private http: Http) {}

  registerSubCategory(
    subcategory: string,
    description: string,
    imageUrl: string,
    properties: any
  ) {
    let body = JSON.stringify({
      subcategoryName: subcategory,
      description: description,
      imgUrl: imageUrl,
      properties: properties
    });

    console.log(body);

    return this.http
      .post(`/admin/${globals.category}/subcategory`, body)
      .do(res => console.log(res.json()))
      .map(res => res.json());
  }

  loadSubcategory() {
    return this.http
      .get(`/user/${globals.category}/subcategory`)
      .do(res => console.log(res.json()))
      .map(res => res.json());
  }

  loadSubcategoryAdmin() {
    return this.http
      .get(`/admin/${globals.category}/subcategory`)
      .do(res => console.log(res.json()))
      .map(res => res.json());
  }

  getItemTemplate(subcategoryName) {
    return this.http
      .get(`/admin/${globals.category}/${subcategoryName}/itemTemplate`)
      .do(res => console.log(res.json()))
      .map(res => res.json());
  }

  registerItem(subcategory, itemImage, itemProperties) {
    let body = JSON.stringify({
      itemName: subcategory,
      imgUrl: itemImage,
      itemProperty: itemProperties
    });

    console.log(body);

    return this.http
      .post(`/admin/${globals.category}/${subcategory}/item`, body)
      .do(res => console.log(res.json()))
      .map(res => res.json());
  }

  enableDisableSubcategory(subcategory: string, hidden: boolean) {
    return this.http
      .patch(`/admin/${globals.category}/${subcategory}?enabled=${!hidden}`, null)
      .do(res => console.log(res.json()))
      .map(res => res.json());
  }

  getAllItems(subcategory: string) {
    return this.http
      .get(
        `/user/${globals.category}/${subcategory}/items?limit=${globals.limit}&offset=${globals.offset}`
      )
      .do(res => console.log(res.json()))
      .map(res => res.json());
  }

  getAllItemsAdmin(subcategory: string) {
    return this.http
      .get(`/admin/${globals.category}/${subcategory}/items`)
      .do(res => console.log(res.json()))
      .map(res => res.json());
  }

  enableDisableItem(itemId: string, enabled: boolean) {
    return this.http
      .get(`/admin/item/${itemId}?enabled=${enabled}`)
      .do(res => console.log(res.json()))
      .map(res => res.json());
  }

  deleteSubcategory(subcategory: string) {
    return this.http
      .delete(`/admin/${globals.category}/${subcategory}`)
      .do(res => console.log(res.json()))
      .map(res => res.json());
  }

  deleteItem(itemId: string) {
    return this.http
      .delete(`/admin/item/${itemId}`)
      .do(res => console.log(res.json()))
      .map(res => res.json());
  }
}
