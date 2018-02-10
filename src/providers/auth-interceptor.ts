import {
  Http,
  RequestOptionsArgs,
  Response,
  RequestOptions,
  ConnectionBackend,
  Headers
} from "@angular/http";
import { Observable } from "rxjs/Observable";
import { Storage } from "@ionic/storage";
import "rxjs";
import * as globals from "./../app/globals";

export class HttpInterceptor extends Http {
  constructor(
    connectionBackend: ConnectionBackend,
    requestOptions: RequestOptions,
    public storage: Storage
  ) {
    super(connectionBackend, requestOptions);
  }

  public get(url: string, options?: RequestOptionsArgs): Observable<Response> {
    return Observable.fromPromise(
      this.getRequestOptionArgs(options, url)
    ).mergeMap(options => {
      return super.get(
        globals.host.concat(globals.contextPath).concat(url),
        options
      );
    });
  }

  public post(
    url: string,
    body: string,
    options?: RequestOptionsArgs
  ): Observable<Response> {
    return Observable.fromPromise(
      this.getRequestOptionArgs(options, url)
    ).mergeMap(options => {
      return super.post(
        globals.host.concat(globals.contextPath).concat(url),
        body,
        options
      );
    });
  }

  public put(
    url: string,
    body: string,
    options?: RequestOptionsArgs
  ): Observable<Response> {
    return Observable.fromPromise(
      this.getRequestOptionArgs(options, url)
    ).mergeMap(options => {
      return super.put(
        globals.host.concat(globals.contextPath).concat(url),
        body,
        options
      );
    });
  }

  public delete(
    url: string,
    options?: RequestOptionsArgs
  ): Observable<Response> {
    return Observable.fromPromise(
      this.getRequestOptionArgs(options, url)
    ).mergeMap(options => {
      return super.delete(
        globals.host.concat(globals.contextPath).concat(url),
        options
      );
    });
  }

  public patch(
    url: string,
    body: string,
    options?: RequestOptionsArgs
  ): Observable<Response> {
    return Observable.fromPromise(
      this.getRequestOptionArgs(options, url)
    ).mergeMap(options => {
      return super.patch(
        globals.host.concat(globals.contextPath).concat(url),
        body,
        options
      );
    });
  }

  private getRequestOptionArgs(options?: RequestOptionsArgs, url?: string) {
    return this.storage.get("token").then(token => {
      console.log(globals.host.concat(globals.contextPath).concat(url));
      if (options == null) {
        options = new RequestOptions();
      }

      if (options.headers == null) {
        options.headers = new Headers();
      }

      if (globals.unprotected_urls.indexOf(url) === -1) {
        options.headers.append("Authorization", "Basic " + btoa(globals.userName + ':' + globals.password));
      }
      console.log("Token Fetched : " + token);
      console.log(options.headers);

      options.headers.append("Access-Control-Allow-Origin", "*");
      options.headers.append("Content-Type", "application/json");

      return options;
    });
  }
}
