import {Pipe, PipeTransform} from '@angular/core';

@Pipe({name: 'orderBy'})
export class OrderByPipe implements PipeTransform {

  constructor() {}

  transform(array, attributes) {
    if (!array) {
      return [];
    } else if (!(attributes instanceof Array)) {
      attributes = [attributes];
    }
    array.sort((a, b) => {
      return this.compare(a, b, attributes, 0);
    });

    return array;
  }

  compare(a, b, attributes, count): number {
    let aVal, bVal;
    let reverseMultiplier =  1;

    if (attributes[count] instanceof Function) {
      aVal = attributes[count](a);
      bVal = attributes[count](b);
    } else {
      let field = attributes[count];
      if (field[0] == '-') {
        // Use the multiplier to reverse sort order if attribute starts with minus symbol "-"
        reverseMultiplier = -1;
        field = field.substring(1);
      }

      if (field.includes(".")) {
        let tokens = field.split(".");
        aVal = a[tokens[0]];
        bVal = b[tokens[0]];
        for (let i = 1; i < tokens.length; i++) {
          aVal = aVal[tokens[i]];
          bVal = bVal[tokens[i]];
        }
      } else {
        aVal = a[field];
        bVal = b[field];
      }
    }

    if (aVal < bVal) {
      return -1 * reverseMultiplier;
    } else if (aVal > bVal) {
      return 1 * reverseMultiplier;
    } else if (attributes.length > (count+1)) {
      // If both values equal and more sorting criteria exist then keep comparing
      return this.compare(a, b, attributes, count+1);
    } else {
      return 0;
    }
  }
}
