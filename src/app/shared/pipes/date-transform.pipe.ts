import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'dateTransform'
})
export class DateTransformPipe implements PipeTransform {
  transform(value: string): string {
    const currentDate = new Date();
    if (value === 'today') {
      return 'Today';
      // return `${currentDate.getDate()} ${currentDate.toLocaleString('en-us', { month: 'long'})}, ${currentDate.getFullYear()}`;
    } else if (value === 'week') {
      return 'This week';
    } else if (value === 'month') {
      return 'This month';
      // return `${currentDate.toLocaleString('en-us', { month: 'long'})}, ${currentDate.getFullYear()}`;
    } else if (value === 'year') {
      return 'This Year';
      // return `${currentDate.getFullYear()}`;
    } else {
      return 'Today';
    }
  }

}
