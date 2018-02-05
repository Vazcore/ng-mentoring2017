import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { RequestsService } from '../../common/requests/requests.service';
import { Author } from './author.model';
import 'rxjs/add/observable/of';

@Injectable()
export class AuthorsService {
  constructor(
    private requetsSrv: RequestsService
  ) {}

  getAuthors(): Observable<Author[]> {
    return this.requetsSrv.request('authors', 'Get', null, null);
  }
}