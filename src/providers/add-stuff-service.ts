import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/timeout';
import * as globals from "./../app/globals";

@Injectable()
export class AddStuffService {

  private registerSubCategoryData: any;
  private getAllSubCategoryData: any;
  private getItemTemplateData: any;
  private registerItemData: any;
  private enableDisableSubcategoryData: any;
  private getAllSubCategoryAdminData: any;
  private getAllItemData: any;
  private getAllItemsAdminData: any;
  private enableDisableItemData: any;
  private deleteSubcategoryData: any;
  private deleteItemData: any;

  private registerSubCategoryURL: string = globals.host.concat('/ShaktiGold/registerSubCategory.htm');
  private getAllSubCategoryURL: string = globals.host.concat('/ShaktiGold/getAllSubCategory.htm');
  private getAllSubCategoryAdminURL: string = globals.host.concat('/ShaktiGold/getAllSubCategoryAdmin.htm');
  private getItemTemplateURL: string = globals.host.concat('/ShaktiGold/getItemTemplate.htm');
  private registerItemURL: string = globals.host.concat('/ShaktiGold/registerItem.htm');
  private enableDisableSubcategoryURL: string = globals.host.concat('/ShaktiGold/enableDisableSubcategory.htm');
  private getAllItemURL: string = globals.host.concat('/ShaktiGold/getAllItem.htm');
  private getAllItemsAdminURL: string = globals.host.concat('/ShaktiGold/getAllItemAdmin.htm');
  private enableDisableItemURL: string = globals.host.concat('/ShaktiGold/enableDisableItem.htm');
  private deleteSubcategoryURL: string = globals.host.concat('/ShaktiGold/deleteSubcategory.htm');
  private deleteItemURL: string = globals.host.concat('/ShaktiGold/deleteItem.htm');

  constructor(private http: Http) { }

  registerSubCategory(subcategory: string, description: string, imageUrl: string, properties: any) {
    let body = JSON.stringify({
      'email': globals.AdminUserName,
      'categoryName': globals.categoryName,
      'subcategory': Array({
        'subcategoryName': subcategory,
        'description': description,
        'imgUrl': imageUrl,
        'properties': properties
      })
    });

    let headers = new Headers({ 'Content-Type': 'application/json' });

    let options = new RequestOptions({ headers: headers });

    return new Promise( (resolve, reject) => {
      this.http.post(this.registerSubCategoryURL, body, options)
      .timeout(globals.http_timeout)
      .map(res => res.json())
      .subscribe(data => {
        this.registerSubCategoryData = data;

        if(this.registerSubCategoryData.result == "SUCCESS") {
          resolve(this.registerSubCategoryData);
        } else {
          this.registerSubCategoryData.message = null;
          reject(this.registerSubCategoryData);
        }
        
      }, err => {
        reject("LOAD_ORDERS_FAILED_TIMEOUT");
      });
    });
  }

  loadSubcategory() {
    
    let body = JSON.stringify({
      'email': globals.AdminUserName,
      'categoryName': globals.categoryName
    });

    let headers = new Headers({ 'Content-Type': 'application/json' });

    let options = new RequestOptions({ headers: headers });

    return new Promise( (resolve, reject) => {
      this.http.post(this.getAllSubCategoryURL, body, options)
      .timeout(globals.http_timeout)
      .map(res => res.json())
      .subscribe(data => {
        this.getAllSubCategoryData = data;

        if(this.getAllSubCategoryData.result == "SUCCESS") {
          resolve(this.getAllSubCategoryData);
        } else {
          this.getAllSubCategoryData.message = [];
          reject(this.getAllSubCategoryData);
        }

      }, err => {
        reject("LOAD_SUBCATEGORY_FAILED_TIMEOUT");
      });
    });
  }

  loadSubcategoryAdmin() {
    
    let body = JSON.stringify({
      'email': globals.AdminUserName,
      'categoryName': globals.categoryName
    });

    let headers = new Headers({ 'Content-Type': 'application/json' });

    let options = new RequestOptions({ headers: headers });

    return new Promise( (resolve, reject) => {
      this.http.post(this.getAllSubCategoryAdminURL, body, options)
      .timeout(globals.http_timeout)
      .map(res => res.json())
      .subscribe(data => {
        this.getAllSubCategoryAdminData = data;

        if(this.getAllSubCategoryAdminData.result == "SUCCESS") {
          resolve(this.getAllSubCategoryAdminData);
        } else {
          this.getAllSubCategoryAdminData.message = [];
          reject(this.getAllSubCategoryAdminData);
        }

      }, err => {
        reject("LOAD_SUBCATEGORY_FAILED_TIMEOUT");
      });
    });
  }

  getItemTemplate(subcategoryName) {
    let body = JSON.stringify({
      'email': globals.AdminUserName,
      'categoryName': globals.categoryName,
      'subcategoryName': subcategoryName
    });

    let headers = new Headers({ 'Content-Type': 'application/json' });

    let options = new RequestOptions({ headers: headers });

    return new Promise( (resolve, reject) => {
      this.http.post(this.getItemTemplateURL, body, options)
      .timeout(globals.http_timeout)
      .map(res => res.json())
      .subscribe(data => {
        this.getItemTemplateData = data;

        if(this.getItemTemplateData.result == "SUCCESS") {
          resolve(this.getItemTemplateData);
        } else {
          this.getItemTemplateData.message = [];
          reject(this.getItemTemplateData);
        }

      }, err => {
        reject("GET_ITEM_TEMPLATE_FAILED_TIMEOUT");
      });
    });
  }

  registerItem(subcategory, itemImage, itemProperties) {
    let body = JSON.stringify({
      'email': globals.AdminUserName,
      'categoryName': globals.categoryName,
      'subcategoryName': subcategory,
      'imgUrl': itemImage,
      'itemProperty': itemProperties
    });

    let headers = new Headers({ 'Content-Type': 'application/json' });

    let options = new RequestOptions({ headers: headers });

    return new Promise( (resolve, reject) => {
      this.http.post(this.registerItemURL, body, options)
      .timeout(globals.http_timeout)
      .map(res => res.json())
      .subscribe(data => {
        this.registerItemData = data;

        if(this.registerItemData.result == "SUCCESS") {
          resolve(this.registerItemData);
        } else {
          this.registerItemData.message = null;
          reject(this.registerItemData);
        }
        
      }, err => {
        reject("REGISTER_ITEM_FAILED_TIMEOUT");
      });
    });
  }

  enableDisableSubcategory(subcategory: string, hidden: boolean) {
    let url = this.enableDisableSubcategoryURL + "?subcategory=" + subcategory + "&hidden=" + hidden;
    return new Promise( (resolve, reject) => {
      this.http.get(url)
      .timeout(globals.http_timeout)
      .map(res => res.json())
      .subscribe(data => {
        this.enableDisableSubcategoryData = data;

        if(this.enableDisableSubcategoryData.result == "SUCCESS") {
          resolve(this.enableDisableSubcategoryData);
        } else {
          this.enableDisableSubcategoryData.message = null;
          reject(this.enableDisableSubcategoryData);
        }
      }, err => {
        reject("ENABLE_DISABLE_SUBCATEGORY_FAILED_TIMEOUT");
      });
    });
  }

  getAllItems(subcategory: string) {
    let body = JSON.stringify({
      'email': globals.AdminUserName,
      'categoryName': globals.categoryName,
      'subcategoryName': subcategory,
      'limit':500,
      'offset':0
    });

    let headers = new Headers({ 'Content-Type': 'application/json' });

    let options = new RequestOptions({ headers: headers });

    return new Promise( (resolve, reject) => {
      this.http.post(this.getAllItemURL, body, options)
      .timeout(globals.http_timeout)
      .map(res => res.json())
      .subscribe(data => {
        this.getAllItemData = data;
        console.log(this.getAllItemData);

        if(this.getAllItemData.result == "SUCCESS") {
          resolve(this.getAllItemData);
        } else {
          this.getAllItemData.message = [];
          reject(this.getAllItemData);
        }

      }, err => {
        reject("GET_ALL_ITEMS_FAILED_TIMEOUT");
      });
    });
  }

  getAllItemsAdmin(subcategory: string) {
    let body = JSON.stringify({
      'email': globals.AdminUserName,
      'categoryName': globals.categoryName,
      'subcategoryName': subcategory
    });

    let headers = new Headers({ 'Content-Type': 'application/json' });

    let options = new RequestOptions({ headers: headers });

    return new Promise( (resolve, reject) => {
      this.http.post(this.getAllItemsAdminURL, body, options)
      .timeout(globals.http_timeout)
      .map(res => res.json())
      .subscribe(data => {
        this.getAllItemsAdminData = data;

        if(this.getAllItemsAdminData.result == "SUCCESS") {
          resolve(this.getAllItemsAdminData);
        } else {
          this.getAllItemsAdminData.message = [];
          reject(this.getAllItemsAdminData);
        }

      }, err => {
        reject("GET_ALL_ITEMS_FAILED_TIMEOUT");
      });
    });
  }

  enableDisableItem(itemId: string, hidden: boolean) {
    let url = this.enableDisableItemURL + "?itemId=" + itemId + "&hidden=" + hidden;
    return new Promise( (resolve, reject) => {
      this.http.get(url)
      .timeout(globals.http_timeout)
      .map(res => res.json())
      .subscribe(data => {
        this.enableDisableItemData = data;
        if(this.enableDisableItemData.result == "SUCCESS") {
          resolve(this.enableDisableItemData);
        } else {
          this.enableDisableItemData.message = null;
          reject(this.enableDisableItemData);
        }
      }, err => {
        reject("ENABLE_DISABLE_ITEM_FAILED_TIMEOUT");
      });
    });
  }

  deleteSubcategory(subcategory: string) {
    let url = this.deleteSubcategoryURL + "?subcategory=" + subcategory;
    return new Promise( (resolve, reject) => {
      this.http.get(url)
      .timeout(globals.http_timeout)
      .map(res => res.json())
      .subscribe(data => {
        this.deleteSubcategoryData = data;

        if(this.deleteSubcategoryData.result == "SUCCESS") {
          resolve(this.deleteSubcategoryData);
        } else {
          this.deleteSubcategoryData.message = null;
          reject(this.deleteSubcategoryData);
        }
      }, err => {
        reject("DELETE_SUBCATEGORY_FAILED_TIMEOUT");
      });
    });
  }

  deleteItem(itemId: string) {
    let url = this.deleteItemURL + "?itemId=" + itemId;
    return new Promise( (resolve, reject) => {
      this.http.get(url)
      .timeout(globals.http_timeout)
      .map(res => res.json())
      .subscribe(data => {
        this.deleteItemData = data;

        if(this.deleteItemData.result == "SUCCESS") {
          resolve(this.deleteItemData);
        } else {
          this.deleteItemData.message = null;
          reject(this.deleteItemData);
        }
      }, err => {
        reject("DELETE_ITEM_FAILED_TIMEOUT");
      });
    });
  }
}
