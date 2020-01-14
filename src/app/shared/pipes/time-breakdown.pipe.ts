import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'timeBreakdown'
})
export class TimeBreakdownPipe implements PipeTransform {

  transform(duration: number, ...args: any[]): any {
    const timeBreakdown = {
      year: 60 * 60 * 24 * 365,
      month: 60 * 60 * 24 * 30,
      day: 60 * 60 * 24,
      hour: 60 * 60,
      minute: 60,
      second: 1
    };
    // console.log(timeBreakdown.year);
    const breakdowns = [];
    let breakdownText = '';
    let seconds = duration;
    let isPlural = '';
    Object.entries(timeBreakdown).forEach(
      (entry) => {
        const period = entry[0];
        if (seconds > timeBreakdown[period]) {
          const periodValue = Math.floor(seconds / timeBreakdown[period]);
          const remainder = duration % timeBreakdown[period];
          if (periodValue > 1 ) {
            isPlural = 's';
          }
          seconds = remainder;
          breakdowns.push(`${periodValue} ${period}${isPlural}`);
        }
      });
    if (breakdowns.length > 1) {
      // breakdowns = [...breakdowns.splice(0, breakdowns.length - 1), ...breakdowns.splice(breakdowns.length - 1)];
      breakdownText = breakdowns.splice(0, breakdowns.length - 1).join(', ')
      + ' and ' + breakdowns.splice(breakdowns.length - 1).join(', ');
    } else {
      breakdownText = breakdowns.join(', ');
    }
    return breakdownText;
  }
}
