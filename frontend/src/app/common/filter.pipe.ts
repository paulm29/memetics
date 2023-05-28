import { Pipe, PipeTransform } from '@angular/core';

@Pipe({name: 'filter'})
export class FilterPipe implements PipeTransform {

  constructor() {
  }

  transform(array, filterAttrs) {
    if (filterAttrs instanceof Function) {
      return array.filter(filterAttrs);
    }
    return array.filter((obj) => {
      let match = true;
      Object.keys(filterAttrs).forEach((key) => {
        if (match) {
          match = obj[key] === filterAttrs[key];
        }
      });
      return match;
    });
  }
}
