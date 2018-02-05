import { PagingInterface } from './paging.interface';

export class Paging implements PagingInterface {
  constructor(
    public start: number,
    public count: number
  ) {}
}