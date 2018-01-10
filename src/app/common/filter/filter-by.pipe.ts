import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterBy'
})
export class FilterByPipe implements PipeTransform {

  transform<T>(
    list: Array<T>,
    param: string,
    value: string
  ): Array<T> {
    return list.filter(el => {
      return el[param].toLowerCase().indexOf(value.toLowerCase()) !== -1;
    });
  }

}
