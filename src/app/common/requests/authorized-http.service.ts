import { Injectable } from '@angular/core';
import { Http, XHRBackend, RequestOptions, RequestOptionsArgs, Headers, Request, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { AppLocalStorage } from '../storage/localStorage';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

const ACTIVE_USER = 'active_user_token';

@Injectable()
export class AuthorizedHttpService extends Http  {

  private token;

  constructor(backend: XHRBackend, options: RequestOptions) {
    let token = AppLocalStorage.getItem(ACTIVE_USER);
    token = token ? token.toString() : '';
    options.headers.set('authorization', token);
    super(backend, options);
  }

  request(url: string|Request, options?: RequestOptionsArgs): Observable<Response> {
    let token = AppLocalStorage.getItem(ACTIVE_USER);
    token = token ? token.toString() : '';

    if (typeof url === 'string') { // meaning we have to add the token to the options, not in url
      if (!options) {
        // let's make option object
        options = {headers: new Headers()};
      }
      options.headers.set('authorization', token);
    } else {
    // we have to add the token to the url object
      url.headers.set('authorization', token);
    }
    return super.request(url, options).catch(this.catchAuthError(this));
  }

  private catchAuthError (self: AuthorizedHttpService) {
    // we have to pass HttpService's own instance here as `self`
    return (res: Response) => {
      console.log(res);
      if (res.status === 401 || res.status === 403) {
        // if not authenticated
        console.log(res);
      }
      return Observable.throw(res);
    };
  }

}
