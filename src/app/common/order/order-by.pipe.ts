import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'orderBy'
})
export class OrderByPipe implements PipeTransform {
  param: string;

  sortFunction(a: Object, b: Object): number {
    if (a[this.param] < b[this.param]) return 1;
    else if (a[this.param] > b[this.param]) return -1;
    else return 0;
  }

  transform(list: Array<Object>, param: string): Array<Object> {
    this.param = param;
    return list.sort(this.sortFunction.bind(this));
  }

}
