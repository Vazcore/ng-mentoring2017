import { Injectable } from '@angular/core';
import { QueryParam } from './query-param.interace';
import { HeaderParam } from './header-params.interface';
import { AuthorizedHttpService } from './authorized-http.service';
import { 
  Http,
  URLSearchParams,
  RequestOptions,
  RequestMethod,
  Response,
  Headers,
  Request } from '@angular/http';

@Injectable()
export class RequestsService {

  private host: string = 'http://localhost:3004/';

  constructor(
    private http: AuthorizedHttpService
  ) { }

  prepareQueryParams(queries: Array<any>): URLSearchParams {
    let urlParams: URLSearchParams = new URLSearchParams();
    queries.forEach(urlParam => urlParams.set(urlParam.param, urlParam.value));

    return urlParams;
  }

  prepareHeaders(headerParams: Array<HeaderParam>): Headers {
    let headers = new Headers;
    headerParams.forEach(header => {
      headers.set(header.param, header.value);
    });

    return headers;
  }

  request(
    collection: string,
    method: 'Get'|'Post'|'Put'|'Delete',
    body?: Object,
    queries?: Array<QueryParam>,
    headersParm?: Array<HeaderParam>
  ) {
    let requestOptions: RequestOptions = new RequestOptions(),
    request: Request;

    requestOptions.url = this.host + collection;
    requestOptions.method = RequestMethod[method];

    if (queries) {
      requestOptions.search = this.prepareQueryParams(queries);
    } 
    if (body) {
      requestOptions.body = body;
    }

    if (headersParm) {
      requestOptions.headers = this.prepareHeaders(headersParm);
    }
    
    request = new Request(requestOptions);

    return this.http.request(request)
      .map((resp: Response) => resp.json());
  }

}
