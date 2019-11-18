import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'dateTransform'
})
export class DateTransformPipe implements PipeTransform {
  transform(value: string): string {
    let currentDate = new Date();
    if (value === 'today') {
      return `${currentDate.getDate()} ${currentDate.toLocaleString('en-us', { month: 'long'})}, ${currentDate.getFullYear()}`;
    } else if (value === 'week') {
      return 'This week';
    } else if (value === 'month') {
      return `${currentDate.toLocaleString('en-us', { month: 'long'})}, ${currentDate.getFullYear()}`;
    } else if (value === 'year') {
      return `${currentDate.getFullYear()}`;
    } else {
      return 'Today';
    }
  }

}
